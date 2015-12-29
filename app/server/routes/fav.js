var express = require('express');
var router = express.Router();

var favController = require('../controllers/favController');

router.get('/', favController.getGroupFavs);

router.post('/', favController.addGroupFav);

router.post('/user', favController.addUserFav);

router.delete('/', favController.removeGroupFav);

router.delete('/user', favController.removeUserFav);

module.exports = router;