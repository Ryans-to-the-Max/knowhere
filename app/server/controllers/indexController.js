var User = require('../models/user');

module.exports = {
  // fill in
   getIndex: function(req, res, next) {
    res.render('index');
  },

  isLoggedIn: function(req, res, next){
   if (req.isAuthenticated()) {
    res.status(200).send({status: true, user: req.user});
   } else{
    res.status(200).send({status: false});
   }
  }

};
