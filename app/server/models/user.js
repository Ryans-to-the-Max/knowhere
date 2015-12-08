var db = require('../../../db/db.js');
var mongoose = require('mongoose');

var User = mongoose.model('User', db.userSchema);

module.exports = User;