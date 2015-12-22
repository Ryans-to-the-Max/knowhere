var express = require('express');
var router = express.Router();

var ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getRating);

router.post('/', ratingController.addRating);

module.exports = router;

