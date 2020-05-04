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


app.get('/',function(req, res){
    res.render('newItem');
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
        res.render('admin',{items:'Delivery Services',foodProducts:results});
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
app.get('/delivery/new', function(req, res){
    res.render('addDelivery');
});

app.post('/delivery/new', upload.single('filename') ,function(req, res){
    console.log('File uploaded locally at ', req.file.path);
    var filename = req.file.path.split('/').pop();
    var content = fs.readFileSync(req.file.path);
    var data = new Buffer(content);
    var name=req.body.name;
    var description=req.body.desc;
    var link=req.body.link;
    var stmt = 'INSERT INTO delivery (name,description,data,link) VALUES (?,?);';
    connection.query(stmt, [filename, data], function(error, result){
        if(error) throw error;
        res.redirect('/');
    })
});


/* Error Route*/
app.get('*', function(req, res){
   res.render('error'); 
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})