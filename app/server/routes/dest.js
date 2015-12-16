var express = require('express');
var router = express.Router();

var destController = require('../controllers/destController');


router.get('/', destController.getDestination);

router.get('/venues', destController.getVenues);

module.exports = router;
