var events       = require('events');
var eventEmitter = new events.EventEmitter();
var User         = require('../models/user');
var Venue        = require('../models/venue');
var request      = require('superagent');
var async        = require('async');
var path         = require('path');
var util         = require(path.join(__dirname, '../util'));

// =========================================================================
// Loading User Favs=============================================================
// =========================================================================
// Purpose of this file is to pre-load all the venues currently in the user's
// favorites and all of his group favorites.  This could be many requests so it
// should get started as soon as a user logs in and not wait until the user wishes
// to see it.
 

function getUserFavInfo(userId) {
  User.findById(userId)
  .populate('favorites.venue groupId')
  .exec(function (err, user){
    if (!user) return;
    if (err) return;
    (function(){ // the following is done for synchronous purposes
      var index = 0;
      var list = [];
      var noCopies = {};

      function joinFavs(){ //combine user favorites and group into single array 
        for (var i = 0; i < user.favorites.length; i++) {
          if (!user.favorites[i].venue.name){ 
            list.push(user.favorites[i].venue.lookUpId);
            noCopies[user.favorites[i].venue.lookUpId] = true;
          }
        }

        for (var x = 0; x < user.groupId.length; x++){
          for (y = 0; y < user.groupId[x].favorites.length; y++){
            if (!noCopies.hasOwnProperty(user.groupId[x].favorites[y].lookUpId)) {
              if (!user.groupId[x].favorites[y].name) {
                list.push(user.groupId[x].favorites[y].lookUpId);
              }
            }
          }
        }
        if (list.length) {
          loadVenues();
        }
      }

      joinFavs();

      function loadVenues() {
        async.parallel({ // simultaneously get venue info from api and load venue from DB
          getInfo: function(callback) {
            var loadId  = list[index];
              request.get('http://api.tripexpert.com/v1/venues/' + loadId + '?')
              .query({
              api_key: '5d8756782b4f32d2004e811695ced8b6'
              })
              .end(function (err, res) {
                if (err){
                  console.log(err);
                  return;
                }
                var text = JSON.parse(res.text);
                var info = text.response.venue[0];
                callback(null, JSON.parse(res.text).response.venue[0]);
              });
          },

          getVenue: function(callback){
            var venueId = list[index];
            Venue.findOne({lookUpId: venueId} , function (err, venue){
              if (!venue) return;
              if (err) return;
               
               //console.log("venue is ", venue);
               callback(null, venue);
            });
          }
        },
        function (err, results){
          var venue = results.getVenue;
          var info  = results.getInfo;

          venue.venue_type_id = info.venue_type_id;
          venue.name = info.name;
          venue.tripexpert_score = info.tripexpert_score;
          venue.rank_in_destination = info.rank_in_destination;
          venue.address = info.address;
          venue.telephone = info.telephone;
          venue.website = info.website;
          venue.index_photo = info.index_photo;
          venue.photos = info.photos;
          venue.amenities = info.amenities;

          venue.save();

          if (index < list.length){
            index++;
            loadVenues();
          }
        });
      }
      //loadVenues();
    })();
  });
}

function cleanUp() {
  //TODO make sure references are being deleted
}

eventEmitter.addListener('getFavInfo', getUserFavInfo);

module.exports = eventEmitter;

