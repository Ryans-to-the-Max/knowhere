var express = require('express');
var router = express.Router();

var ratingController = require('../controllers/ratingController');

app.post('/', ratingController.addRating);

app.post('/mod', ratingController.modifyRating);

app.post('/user', ratingController.addUserRating);

app.post('/usermod', ratingController.modifyUserRating);