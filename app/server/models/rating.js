var db = require('../../../db/db.js');
var mongoose = require('mongoose');

// db.ratingSchema.pre('init', function(next, data) {
//   Rating.populate(data, {
//     path: 'venue'
//   }, function(err, rating) {
//     data = rating;
//     next();
//   });
// });

var Rating = mongoose.model('Rating', db.ratingSchema);

module.exports = Rating;
