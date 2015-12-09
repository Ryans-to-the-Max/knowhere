var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session  = require('express-session');
var morgan = require('morgan');

// Server routers:
var index = require(path.join(__dirname, 'routes/index'));
var dest = require(path.join(__dirname, 'routes/dest'));


var app = express();

//Client Route
app.use(express.static(path.join(__dirname, '../client')));

// App config:
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded:
app.use(bodyParser.urlencoded({ extended: false }));
// needed for auth
app.use(cookieParser());
// required for passport
app.use(session({ secret: 'tripAppIsAmazing' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport); // pass passport for configuration

// Server routing:
app.use('/api', index);
app.use('/api/dest', dest);

//Authentication Routing
app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', 
  failureRedirect : '/login', // redirect back to the login page if there is an error
  failureFlash : true // allow flash messages
}));

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


// Spin up server:
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
console.log('Server now listening on port ' + port);
