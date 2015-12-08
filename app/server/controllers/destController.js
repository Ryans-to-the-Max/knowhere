var json = require("../../../mock-data/venues.json");

var venue = json.Results;

var hotels = [];
var rests = [];
var places = [];

for (var i = 0; i < venue.length; i++) {
  if (venue[i].venue_type_id === 1) {
    hotels.push(venue[i]);
  } else if (venue[i].venue_type_id === 2){
    rests.push(venue[i]);
  } else if (venue[i].venue_type_id === 3){
    places.push(venue[i]);
  }
}

module.exports = {

  getHotels: function (req, res, next){
    res.status(200).send(hotels);
  },

  getRestaurants: function (req, res, next){
    res.status(200).send(rests);
  },

  getPlaces: function (req, res, next){
    res.status(200).send(places);
  }

};