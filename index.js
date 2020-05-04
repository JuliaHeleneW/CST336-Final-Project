/* App Configuration */
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var multer = require('multer');
var session = require('express-session');
var bcrypt = require('bcrypt');

/*create app*/
var app = express();

/*app uses*/
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret code',
    resave: true,
    saveUninitialized: true
}));

/*view engine*/
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'hk0d4tfus25f8qhg',
    password: 'ognmavltr0h4cihh',
    database: 'vk0ju44t2gljpobs',
    port:3306,
    multipleStatements: true
});
connection.connect();

let storage = multer.diskStorage({
   destination : function(req, file, callback) {
       callback(null, path.join(__dirname, 'public/file/'))
   },
   filename: function(req, file, callback) {
       callback(null, file.fieldname + '-' + Date.now())
   }
});
let upload = multer({storage: storage});

/* Middleware section*/
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
       connection.query(stmt, [username], function(error, results){
           if(error) throw error;
           resolve(results);
       }); 
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){
       bcrypt.compare(password, hash, function(error, result){
          if(error) throw error;
          resolve(result);
       }); 
    });
}


app.get('/',async function(req, res){
  var categories=[];
    var restaurants=[];
    //get authors
    var stmt = 'select name,description,category from restaurant';
    var stmt2 = 'select distinct category from restaurant';
	connection.query(stmt.concat(';',stmt2),[1,2], function(error, found){
	    if(error) throw error;
	    if(found.length){
	        found[0].forEach(restaurant =>{
	            restaurants.push(restaurant);
	        });
	        found[1].forEach(category =>{
	            categories.push(category.category);
	        });
	        res.render('home', {categories:categories,restaurant:restaurants});
	        console.log(restaurants);
	console.log(categories);
	console.log("here");
	    }
	});
	console.log(restaurants);
	console.log(categories);
	console.log("here");
});

app.get('/viewrestaurants', function(req, res){
	var rt=req.query.restaurant;
	var cat=req.query.category;
	var del=req.query.delivery;
	var pick=req.query.pickup;
    var stmt = 'select restaurant.name AS rname,restaurant.description,delivery.name,delivery.link,category from restaurant,delivery WHERE restaurant.deliveryId=delivery.deliveryId and pickup=\''+pick+'\' and delivery=\''+del+'\'';
    if(rt!='select'){
    	stmt=stmt+' and restaurant.name=\''+rt+'\'';
    }
    if(cat!='select'){
        stmt=stmt+' and category=\''+cat+'\'';
    }
    console.log(stmt);
	connection.query(stmt, function(error, found){
	    if(error) throw error;
	    console.log(found);
	    res.render('restaurantviewpage', {restaurant:found});
	});
});

/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', async function(req, res){
    let isUserExist   = await checkUsername(req.body.username);
    let hashedPasswd  = isUserExist.length > 0 ? isUserExist[0].password : '';
    let passwordMatch = await checkPassword(req.body.password, hashedPasswd);
    if(passwordMatch){
        req.session.authenticated = true;
        req.session.user = isUserExist[0].username;
        res.redirect('/admin');
    }
    else{
        res.render('login', {error: true});
    }
});

/* Register Routes */
app.get('/register', function(req, res){
    res.render('signup');
});

app.post('/register', function(req, res){
    console.log("in post");
    let salt = 10;
    bcrypt.hash(req.body.password, salt, function(error, hash){
        if(error) throw error;
        console.log("here");
        let stmt = 'INSERT INTO users (username, password) VALUES (?, ?)';
        let data = [req.body.username, hash];
        console.log("here");
        connection.query(stmt, data, function(error, result){
           if(error) throw error;
           console.log("here");
           res.redirect('/login');
        });
    });
});

/* Logout Route */
app.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/');
});

/* The handler for the /author/name/id route */
app.get('/admin-deliveries',isAuthenticated, function(req, res){
    var stmt = 'select * from delivery';
    connection.query(stmt, function(error, results){
        if(error) throw error;
        res.render('admin-delivery',{items:'Delivery Services',foodProducts:results,type:'delivery'});
    });
});

app.get('/admin',isAuthenticated, function(req, res){
    var stmt = 'select * from restaurant';
    connection.query(stmt, function(error, results){
        if(error) throw error;
        ///console.log(results);
        res.render('admin',{items:'Restaurants',foodProducts:results});
    });
});

/* Upload Routes */
app.get('/delivery/new',isAuthenticated, function(req, res){
    res.render('addDelivery');
});

app.post('/delivery/new',isAuthenticated, function(req, res){
    var name=req.body.name;
    console.log(name);
    var description=req.body.desc;
    var link=req.body.link;
    var stmt = 'INSERT INTO delivery (name,description,link) VALUES (?,?,?);';
    connection.query(stmt, [name, description,link], function(error, result){
        if(error) throw error;
        console.log(result);
        res.redirect('/admin-deliveries');
    })
});

/* Edit delivery: update display */
app.get('/delivery/:did/edit', function(req, res){
    var stmt = 'SELECT * FROM delivery WHERE deliveryId=' + req.params.did + ';';
    connection.query(stmt, function(error, results){
       if(error) throw error;
       if(results.length){
           var delivery = results[0];
           console.log(delivery);
           res.render('editDelivery', {delivery:delivery});
       }
    });
});

/* Edit delivery */
app.put('/delivery/:did',  function(req, res){
    console.log("rb: "+req.body.desc);
    var stmt = 'UPDATE delivery SET ' +
                'name = "'+ req.body.name + '",' +
                'description = "'+ req.body.desc + '", ' +
                'link = "'+ req.body.link + '", ' +
                'image = null '+
                'WHERE deliveryId = ' + req.params.did + ";"
    console.log(stmt);
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/admin-deliveries');
        res.end();
    });
});

/* Delete delivery */
app.get('/delivery/:did/delete', function(req, res){
    var stmt = 'DELETE from delivery WHERE deliveryId='+ req.params.did + ';';
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/admin-deliveries');
    });
});


/* Error Route*/
app.get('*', function(req, res){
   res.render('error'); 
});

//add a new menu item , 
app.get('/items/add', function(req, res) {
    res.render('addItems');
});

//Create a new menu item 
app.post('/items/add', function(req, res){
	let salt = 2;
	bcrypt.hash(req.body.restId, salt, function(error, hash){
		if(error) throw error;
		let stmt = 'INSERT INTO restaurant(restId, name, type) VALUES (? , ?)';
		let data = [req.body.restId, hash];
		connection.query(stmt, data, function(error, result){
			if(error) throw error;
			res.redirect('/menu');
		});
	});
});


// Edit a restaurant record update DBMS
app.get('/item/:aid', function(req, res){
	console.log(req.body);
	var stmt = ' UPDATE menu SET' + 
				'itemId = "'+ req.body.restId +' ",' +
				'name = "'+ req.body.name + '",' +
				'WHERE itemId = '+ req.params.aid + ";"

	connection.query(stmt, function(error, result){
		if(error) throw error;
		res.redirect('/restaurants/' + req.params.aid);
	});
});

// Delete a menu item
app.get('/item/:aid/delete', function(req, res){
	var stmt = 'DELETE from menu WHERE itemId='+ req.params.aid + ';';
	connection.query(stmt, function(error, result){
		if(error) throw error;
		res.redirect('/');
	});
});

//display restaurant Information.
app.get('/rest/:aid', function(req, res){
	var stmt = ' SELECT * FROM restaurant WHERE restId=' + req.params.aid + ';' ;
	console.log(stmt);
	connection.query(stmt, function(error, results){
		if(error) throw error;
		if (results.length){
			var menu = results[0];
			menu.name = menu.name.toString().split(' ').slice(0,4).joinO(' ');
			res.render('menu', {menu: menu})
		}
	});
}); 
app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})