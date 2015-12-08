var express = require('express');
var router = express.Router();

var destController = require('../controllers/destController');

router.get('/hotels', destController.getHotels);

router.get('/rests', destController.getRestaurants);

router.get('/places', destController.getPlaces);

module.exports = router;