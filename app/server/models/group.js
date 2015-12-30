var db = require('../../../db/db.js');
var mongoose = require('mongoose');

// db.groupSchema.pre('init', function(next, data) {
//   Group.populate(data, {
//     path: 'members hosts'
//   }, function(err, group) {
//     data = group;
//     next();
//   });
// });

var Group = mongoose.model('Group', db.groupSchema);


module.exports = Group;