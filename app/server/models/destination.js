var db = require('../../../db/db.js');
var mongoose = require('mongoose');

var Dest = mongoose.model('Dest', db.destSchema);

module.exports = Dest;