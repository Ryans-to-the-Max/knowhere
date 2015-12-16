var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// sets db location to Heroku Mongolab uri or local host
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/tripapp';

mongoose.connect(dbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// db connection and error logging
db.once('open', function() {
  console.log('Connection established with MongoDB at: ' + dbUri);
});
db.on('error', console.error.bind(console, 'Connection error: unable to establish connection with MongoDB at: ' + dbUri));
db.on('diconnected', mongoose.connect);

var userSchema = new Schema ({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String  
  },

  oauth: {
    type: Boolean
  },

  groupId: [{
    type: Schema.ObjectId,
    ref: 'Group'
  }],

  favorites: [{
    type: Schema.ObjectId,
    ref: 'Venue'
  }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

db.userSchema = userSchema;

var groupSchema = new Schema ({
  title: String,
  destination: String,
  members: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  favorites: [{
    type: Schema.ObjectId,
    ref: 'Venue'
  }]
})

db.groupSchema = groupSchema;

var venueSchema = new Schema ({
  lookupId: String,
  latitude: String,
  longitude: String,
});

db.venueSchema = venueSchema;

var ratingSchema = new Schema ({
  venueId: {
    type: Schema.ObjectId,
    ref: 'Venue'
  },
  groupId: {
    type: Schema.ObjectId,
    ref: 'Group'
  },
  rating: [{
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    rating: Number
  }] 
});

db.ratingSchema = ratingSchema;





module.exports = db;
