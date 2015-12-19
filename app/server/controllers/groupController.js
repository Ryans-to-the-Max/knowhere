var path = require('path');
var User   = require('../models/user');
var Venue  = require('../models/venue');
var Group  = require('../models/group');
var Rating = require('../models/rating');

var util = require(path.join(__dirname, '../util'));

// Mock Data Load
var venues = require("../../../mock-data/venues.json");
var venue  = venues.Results;

module.exports = {

  createGroup: function(req, res, next){
    var title  = req.body.groupName;
    var dest   = req.body.destination;
    var userId = req.body.userInfo;

    User.findById(userId, function (err, user) {
      if (err) return util.send400(res, null, err);

      var newGroup = new Group({
        title: title,
        destination: dest,
        host: user
      });

      newGroup.members.push(user);
      newGroup.save(function (err, group){
        if (err) return util.send400(res, err);

        user.groupId.push(newGroup);
        user.save();
        res.status(200).send(newGroup);

      });
    });
  },

  // getGroupByTitle: function(req, res, next){ // FIXME account for two groups with same name but with different hosts
    // title is undefined
  //   Group.findOne({title: title}, function (err, group){
  //     if (err){
  //       console.log(err);
  //       return res.status(500).send();
  //     }
  //     res.status(200).send(group);
  //   });
  // },

  setDestination: function(req, res, next){
    var dest    = req.body.destination;
    var groupId = req.body.groupId;

    Group.findById(groupId, function (err, group){
      if (err) return util.send400(res, err);

      group.destination = dest;
      group.save(function (err, group) {
        if (err) return util.send500(err);

        res.status(200).send(group);
      });
    });
  },

  addMember: function(req, res, next){ //username, groupId
    var groupId = req.body.groupId;
    var username = req.body.username;

    User.findOne({ username: username }, function (err, user){
      if (err) return util.send400(res, err);

      Group.findById(groupId, function (err, group){
        if (err) return util.send400(res, err);

        var userInGroup = group.members.some(function (member) {
          // Mongoose ObjectId comparisons are funky.
          // Read more: http://stackoverflow.com/questions/11060213/mongoose-objectid-comparisons-fail-inconsistently
          return member._id.equals(user._id);
        });

        if (userInGroup){
          return res.status(409).send(group);
        }

        user.groupId.push(group);
        user.save(function (err, user) {
          if (err) return util.send400(res, err);

          group.members.push(user);
          group.save(function (err, group) {
            if (err) return util.send400(res, err);

            return res.status(200).send(group);
          });
        });
      });
    });
  },

  removeMember: function(req, res, next){ // delete api/group/user
    var userId = req.body.userId;
    var groupId = req.body.groupId;

    Group.update({ _id: groupId }, { $pull: { members: userId } }, function (err, rawGroup){
      if (err) return util.send400(res, err);

      User.update({ _id: userId }, { $pull: { groupId: groupId } }, function (err, rawUser) {
        if (err) return util.send400(res, err);

        res.status(200).send(rawGroup);
      });
    });
    //TODO: also remove user ratings
  },

  getMembers: function(req, res, next){
    var groupId = req.params.groupId;

    Group.findById(groupId, function(err, group){
      if (err) return util.send400(res, err);

      return res.status(200).send(group.members);
    });

  },

  getFavs: function (req, res, next){
    var groupId = req.params.groupId;

    Group.findById(groupId, function(err, group){
      if (err) return util.send400(res, err);

      // TODO populate and add ratings.
      return res.status(200).send(group.favorites);
    });
  },


  getInfo: function(title){
    var groupId = req.params.groupId;

    Group.findById(groupId)
    .populate('favorites')
    .populate('members')
    .lean() // returns plain JS object
    .exec(function (err, group){
      var groupId = group._id;

      (function(){ // the following is done for synchronous purposes
        var index = 0;

        function assignRatings(){
          if (index < group.favorites.length){
            venueId = group.favorites[index]._id;

            Rating.findOne({venue: venueId, group: groupId}, function (err, rating){
              if (rating) {
                group.favorites[index].ratings = rating.ratings;
              }
              index++;
              assignRatings();
            });
          } else{
            return res.status(200).send(group);
          }
        }
        assignRatings();
      })();
    });
  }
};
