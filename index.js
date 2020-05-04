/* App Configuration */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
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
    user: 'lt2p26idm0zuddx2',
    password: 'gwl0gizkdpxrbvsf',
    database: 'rbk2ltsg1dww6w1h',
    port:3306,
    multipleStatements: true
});
connection.connect();

/* Middleware section*/
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/lab10/login');
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

app.get('/',function(req, res){
    res.render('newItem');
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

//dislay restaurant Information.
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