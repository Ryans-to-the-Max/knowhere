var express = require('express');
var router = express.Router();

var groupController = require('../controllers/groupController');

router.get('/users', groupController.getAllMembers);

router.get('/fav', groupController.getAllFavs);

router.get('/all', groupController.getAllInfo);

router.post('/create', groupController.createGroup);

router.post('/fav', groupController.addFav);

router.post('/set', groupController.setDest);

router.post('/user', groupController.addMember);

router.post('/rating', groupController.addRating);

router.post('/modify', groupController.modifyRating);

router.delete('/user', groupController.removeMember);

router.delete('/fav', groupController.removeFav);

module.exports = router