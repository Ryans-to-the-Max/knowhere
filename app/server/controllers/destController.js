var venues = require("../../../mock-data/venues.json");
var dests = require("../../../mock-data/destinations.json");

var venue = venues.Results;
var dest = dests.Results;

module.exports = {

  getDestination: function (req, res, next){
    for (var x = 0; x < dest.length; x++){
      if (dest[x].permalink === req.query.name){
        return res.status(200).send(dest[x]);
      }
    }
    res.status(404).send();
  },

  getVenues: function (req, res, next){
    res.status(200).send(venue);
  }


};
