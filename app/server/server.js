var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var path = require('path');

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

// Server routing:
app.use('/api', index);
app.use('/api/dest', dest);



// Spin up server:
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
console.log('Server now listening on port ' + port);
