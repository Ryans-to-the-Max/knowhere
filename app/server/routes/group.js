var express = require('express');
var router = express.Router();

var groupController = require('../controllers/groupController');


router.get('/', groupController.getUserGroups);

router.get('/users', groupController.getMembers);

// This should be made obsolete by favController.getFavs
// router.get('/fav', groupController.getFavs);

router.get('/all', groupController.getInfo);

router.post('/', groupController.createGroup);

router.post('/set', groupController.setDestination);

router.post('/add', groupController.addMember);

router.delete('/user', groupController.removeMember);

module.exports = router;

