var venues = require("../../../mock-data/venues.json");
var dests = require("../../../mock-data/destinations.json");

var venue = venues.Results;
var dest = dests.Results;

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

  getDestination: function (req, res, next){
    for (var x = 0; x < dest.length; x++){
      if (dest[x].permalink === req.query.name){
        return res.status(200).send(dest[x]);
      }
    }
    res.status(404).send();
  },

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