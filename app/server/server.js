var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var path = require('path');

// Server routers:
var index = require(path.join(__dirname, 'routes/index'));



var app = express();

// App config:
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded:
app.use(bodyParser.urlencoded({ extended: false }));

// Server routing:
app.use('/api', index);



// Spin up server:
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
console.log('Server now listening on port ' + port);
