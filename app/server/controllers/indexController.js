var User   = require('../models/user');
var Venue  = require('../models/venue');
var Group  = require('../models/group');
var Rating = require('../models/rating');

var path   = require('path');
var util   = require(path.join(__dirname, '../util'));

var PROTOCOL_DOMAIN  = ( process.env.NODE_ENV === 'production' ?
                        'https://knowhere.herokuapp.com' :
                        'http://localhost:3000' );

sendEmail = function(check, email, groupId, sender){
  if (check) {
    util.mailer.sendMail({    
      from: 'appKnowhere@gmail.com',
      to: newUser.username,
      subject: "You've been invited to a new group!" ,
      html: '<div> <h1><b>Welcome to Knowhere!<b></h1>.  Validate your account by clicking ' +
      ' <a href=' + PROTOCOL_DOMAIN + '/#/validate?id=' + newUser._id + '>here!</a></div>'
    });
  } else{
      util.mailer.sendMail({    
      from: 'appKnowhere@gmail.com',
      to: newUser.username,
      subject: 'Welcome to Knowhere!',
      html: '<div> Welcome to Knowhere!.  Validate your account by clicking ' +
      ' <a href=' + PROTOCOL_DOMAIN + '/#/validate?id=' + newUser._id + '>here!</a></div>'
    });
  }
};

module.exports = {

  getIndex: function(req, res, next) {
    res.render('index');
  },

  getInfo: function (req, res, next){
    var userId = req.query.userId;

    User.findById(userId, function (err, user){
      if (!user) return util.send400(res, err);
      if (err) return util.send500(res, err);

      util.send200(res, user);
    });
  },

  validateUser: function (req, res, next){

    var userId = req.body.id;

    User.findById(userId, function (err, user){
      console.log(user);
      if (err) return util.send500(res, err);
      if (!user) return util.send400(res, err);

      user.validUser = true;

      user.save(function (err, user){
        if (err) return util.send500(res, err);
        if (!user) return util.send400(res, err);

        res.status(200).send(user);
      });
    }); 
  },

  sendInvite: function(req, res, next){
    var userEmail = req.body.username;
    var groupId   = req.body.groupId;
    var sender    = req.body.sender;

    Group.findById(groupId, function (err, group){
      if (err) return util.send500(res, err);
      if (!user) return util.send400(res, err);
      User.findOne({username: userEmail}, function (err, user){
        if (err) return util.send500(res, err);
        var context = {
          groupName: group.title,
          groupId: group._id,
          senderName: sender.firstname ? sender.firstName + " " + sender.lastName : sender.username,
          inviteName: user.firstName ? user.firstName : 'there',
          domain: PROTOCOL_DOMAIN,
          userId: user._id ? user._id.toSTring() : '1234'
        };
        if (user) {
         util.mail('inviteUser.html', context, "You've been invited to a group", userEmail);
        } else {
          util.mail('inviteNewUser.html', context, "Come sign up! You've been invited", userEmail);
        }
      });
    });
  }
};
