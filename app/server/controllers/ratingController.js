var User   = require('../models/user');
var Venue  = require('../models/venue');
var Group  = require('../models/group');
var Rating = require('../models/rating');
var path   = require('path')
var util   = require(path.join(__dirname, '../util'));


sendGroup = function(groupId, res, rating) {
  Group.findById(groupId)
  .populate({
    path: 'favorites',
    populate: {path: 'venueId'}
  })
  .exec(function (err, group){
    console.log(group);
    if (rating !== null) {
      group.favorites.push(rating);
      group.save();
    }
    
    res.status(200).send(group.favorites);
  });
};

module.exports = {

  addRating: function(req, res, next){  //add to user and group favorites
    var venueInfo = req.body.venue;
    var groupId = req.body.groupId;
    var userId  = req.body.userId;
    var newRating  = req.body.rating;


    //first check to see if user has already rated venue
    User.update({'favorites.venueLU': venueInfo.id}, {$set : { 'favorites.$.rating': newRating}}, function (err, num) {
      //console.log("wtf is this", num)
      if (num.nModified === 0) {//user has not already rated so check to see if venue exists ---first find user
        User.findById(userId, function (err, user){
          Venue.findOne({lookUpId: venueInfo.id}, function(err, venue){
            if (venue){ //venue exists so need to just add to user favorites
              user.favorites.push({venueLU: venueInfo.id, venue: venueInfo._id, rating: newRating});
              user.save(function (err, user){
                if (!user) return util.send400(res, err);
                if (err) return util.send500(res, err); 
              });
            } else { //no venue so need to create and then add
              var newVenue = new Venue({
                lookUpId: venueInfo.id,
                name: venueInfo.name,
                venue_type_id: venueInfo.venue_type_id,
                tripexpert_score: venueInfo.tripexpert_score,
                rank_in_destination: venueInfo.rank_in_destination,
                score: venueInfo.score,
                index_photo: venueInfo.index_photo,
                address: venueInfo.address,
                telephone: venueInfo.telephone,
                website: venueInfo.website,
                photos: venueInfo.photos
              });
              newVenue.save(function (err, venue){
                if (!venue) return util.send400(res, err);
                if (err) return util.send500(res, err); 
              });
              //now push to user
              user.favorites.push({venueLU: venueInfo.id, venue: newVenue, rating: newRating})
              user.save(function (err, user){
                if (!user) return util.send400(res, err);
                if (err) return util.send500(res, err); 
              });
            }
          });
        });
      }
    });
    //user taken care of now add to group
    //check if there is a rating and also if that user has already rated
    Rating.update({'allRatings.user': userId}, {$set: {'allRatings.userRating': newRating}}, function (err, num){
      console.log(" wtf is this ", num);
      if (num.nModified === 0){ // user has not already voted so now check to see if rating exists
        Rating.findOne({venueLU: venueInfo.id, groupId: groupId}, function (err, rating){
          if (rating) { //rating exists so just push new user and rating
            rating.allRatings.push({user: userId, userRating: newRating});
            rating.save(function (err, rating) {
              console.log("83 ", err, rating);
              if (!rating) return util.send400(res, err);
              if (err) return util.send500(res, err); 
              sendGroup(groupId, res, null);
            });    
          } else { //no rating so now check to see if venue exists
            Venue.findOne({lookUpId: venueInfo.id}, function (err, venue){
              if (venue){ //venue exists so just need to create new rating
                var anotherRating = new Rating({
                  venueLU: venue.lookUpId,
                  venueId: venue._id,
                  groupId: groupId
                });
                anotherRating.allRatings.push({user: userId, userRating: newRating});
                anotherRating.save(function(err, rating) {
                  sendGroup(groupId, res, rating);
                });                   
              } else { //must create venue first and then create rating with that venue
                var newVenue = new Venue({
                  lookUpId: venueInfo.id,
                  name: venueInfo.name,
                  venue_type_id: venueInfo.venue_type_id,
                  tripexpert_score: venueInfo.tripexpert_score,
                  rank_in_destination: venueInfo.rank_in_destination,
                  score: venueInfo.score,
                  index_photo: venueInfo.index_photo,
                  address: venueInfo.address,
                  telephone: venueInfo.telephone,
                  website: venueInfo.website,
                  photos: venueInfo.photos
                });
                newVenue.save(function (err, venue){
                  if (!venue) return util.send400(res, err);
                  if (err) return util.send500(res, err);
                });
                var anotherRating = new Rating({
                  venueLU: newVenue.lookUpId,
                  venueId: newVenue,
                  groupId: groupId
                });
                anotherRating.allRatings.push({user: userId, userRating: newRating})
                anotherRating.save(function (err, rating){
                  if (!rating) return util.send400(res, err);
                  if (err) return util.send500(res, err);
                  sendGroup(groupId, res, rating);
                });
              }
            });
          }
        });
      }
    });
  },

  modifyRating: function(req, res, next){
    var userId   = req.body.userId;
    var ratingId = req.body.ratingId;
    var rating   = req.body.rating;

    Rating.update({_id: ratingId}, {$pull: {user: userId}}, function (err, rating){
      rating.ratings.rating = rating; //should probably change this around
      res.status(200).send(rating);
     });
  },

  addUserRating: function (req, res, next){

  },

  modifyUserRating: function (req, res, next){
    
  }
};
