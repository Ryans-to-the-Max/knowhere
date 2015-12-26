var express = require('express');
var router = express.Router();

var ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getRatings);

router.post('/', ratingController.addRating);

module.exports = router;

