var express = require('express');
var path = require('path');
var router = express.Router();

var indexController = require(path.join(__dirname, '../controllers/indexController'));



module.exports = router;
