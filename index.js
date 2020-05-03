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

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})