process.env.NODE_ENV = 'test';

var _ = require('underscore');
var assert = require('chai').expect;
var expect = require('chai').expect;
var mongoose = require('mongoose');
var path = require('path');
var request = require('supertest');

var db = require(path.join(__dirname, '../../db/db'));
var server = require(path.join(__dirname, '../../app/server/server'));
var testUtil = require(path.join(__dirname, '../testUtil'));
// Models
var Group = require(path.join(__dirname, '../../app/server/models/group'));
var User = require(path.join(__dirname, '../../app/server/models/user'));
var Venue = require(path.join(__dirname, '../../app/server/models/venue'));

describe('server controllers', function () {
  var greenwichHotel, greenwichHotelInfo, group, testGroupDestination,
      testGroupDestination2, testGroupName,
      testUser, testUser2;

  before(function (done) {
    greenwichHotelInfo = {
      "id": "1",
      "venue_type_id": 1,
      "name": "Greenwich Hotel",
      "tripexpert_score": 99,
      "rank_in_destination": 1,
      "score": 99,
      "description": "Robert DeNiro and partners spared nothing in their luxurious eight-story hotel, which opened in 2008.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/637972.jpg"
    };
    request = request(server);
    testGroupDestination = 'new-york-city';
    testGroupDestination2 = 'portland';
    testGroupName = 'test group';

    // TODO Refactor how how con is set?
    con = mongoose.createConnection('mongodb://localhost/tripapptest');
    // con = mongoose.connection;

    // TODO Refactor to use promise
    setTimeout(function () {
      testUtil.dropDb(con, done);
    }, 1000); // on @ZacharyRSmith's machine, connection needs ~15ms to set up
  });

  beforeEach(function (done) {
    testUtil.dropDb(con, function () {

      User.create({ username: 'test user' }, function (err, user) {
        if (err) console.error(err);

        testUser = user;

        User.create({ username: 'test user 2'}, function (err, user2) {
          if (err) console.error(err);

          testUser2 = user2;

          Venue.create({
            lookUpId: greenwichHotelInfo.id,
            name: greenwichHotelInfo.name,
            venue_type_id: greenwichHotelInfo.venue_type_id,
            tripexpert_score: greenwichHotelInfo.tripexpert_score,
            rank: greenwichHotelInfo.rank_in_destination,
            score: greenwichHotelInfo.score,
            description: greenwichHotelInfo.description,
            photo: greenwichHotelInfo.index_photo
          }, function (err, greenwichHotel) {
            if (err) console.error(err);

            greenwichHotel = greenwichHotel;

            request
              .post('/api/group')
              .send({
                groupName: testGroupName,
                destination: testGroupDestination,
                userInfo: testUser._id,
              })
              .end(function (err, res) {
                group = JSON.parse(res.text);
                done();
              });
          });
        });
      });
    });
  });

  after(function (done) {
    testUtil.dropDb(con, function () {
      con.close(done);
    });
  });

  afterEach(function (done) {
    testUtil.dropDb(con, done);
  });

  
  describe('destController', function () {

    describe('getDestination()', function () {

      it('should get destination by name', function (done) {
        request
          .get('/api/dest/?name=paris')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);

            expect(res.body.name).to.equal('Paris');
            done();
          });
      });

      it('should return 404 when called with a bad param', function (done) {
        request
          .get('/api/dest/?name=Nowhere')
          .expect(404, done);
      });
    });
  });

  describe('favController', function () {
    
    describe('addGroupFav()', function () {

      xit('adds provided venue to group.favorites', function (done) {
        request
          .post('/api/fav/')
          .send({
            groupId: group._id,
            venue: greenwichHotel
          })
          .end(function (err, res) {
            group = res.body;

            // expect(_.contains(group.favorites, )
            done();
          });
      });

      xit('saves venue to DB if it is a new venue', function (done) {
        // body...
      });
    });

    describe('addUserFav()', function () {
      // body...
    });

    describe('getGroupFavs()', function () {
      // body...
    });

    describe('getUserFavs', function () {
      // body...
    });

    describe('removeGroupFav()', function () {
      // body...
    });

    describe('removeUserFav()', function () {
      // body...
    });
  });

  describe('groupController', function () {

    describe('addMember()', function () {

      it('does not re-add user to group and vice versa if already in group', function (done) {
        request
          .post('/api/group/add')
          .send({
            groupId: group._id,
            username: testUser.username
          })
          .end(function (err, res) {
            var updatedGroup = JSON.parse(res.text);

            expect(updatedGroup.members.length).to.equal(1);
            done();
          });
      });

      it('adds user to group and vice versa if not already in group', function (done) {
        request
          .post('/api/group/add')
          .send({
            groupId: group._id,
            username: testUser2.username
          })
          .end(function (err, res) {
            var updatedGroup = JSON.parse(res.text);

            expect(updatedGroup.members.length).to.equal(2);
            done();
          });
      });
    });

    describe('createGroup()', function () {

      it('should not create when provided with invalid userId', function (done) {
        request
          .post('/api/group')
          .send({
            groupName: testGroupName,
            destination: testGroupDestination,
            userInfo: 'fakeUserId',
          })
          .expect(400, done);
      });

      it('should not create if no group destination is provided', function (done) {
        request
          .post('/api/group')
          .send({
            groupName: testGroupName,
            destination: '            ',
            userInfo: testUser._id,
          })
          .end(function (err, res) {
            expect(res.ok).to.be.false;
            done();
          });
      });

      it('should not create if no group title is provided', function (done) {
        request
          .post('/api/group')
          .send({
            groupName: '          ',
            destination: testGroupDestination,
            userInfo: testUser._id,
          })
          .end(function (err, res) {
            expect(res.ok).to.be.false;
            done();
          });
      });

      it('should set provided userId as group host', function () {
        expect(group.host._id).to.equal(testUser._id + '');
      });

      it('should set title and destination', function () {
        expect(group.title).to.equal(testGroupName);
        expect(group.destination).to.equal(testGroupDestination);
      });

      it('should add group\'s host to group.members', function () {
        expect(_.contains(group.members, testUser._id + ''));
      });

      it('should add the new group to the host\'s groupId', function (done) {
        // Update testUser
        User.findOne({ _id: testUser._id }, function (err, user) {
          expect(_.contains(user.groupId, group._id));
          done();
        });
      });
    });

    describe('getInfo()', function () {

      beforeEach(function (done) {
        request
          .get('/api/group/all')
          .send({ groupId: group._id })
          .end(function (err, res) {
            group = res.body;
            console.log('@@@@@@', group);
            done();
          });
      });

      it('returns a plain JS object', function () {
        expect(group.constructor).to.equal(Object);
      });

      // Need test favorites to check this
      xit('populates favorites', function () {
        expect(group.favorites[0].constructor).to.equal(Object);
      });

      // Need test favorites to check this
      xit('populates favorite\'s ratings', function () {
        // body...
      });

      it('populates members', function () {
        console.log("@@@@@@@@@@@@@@@@@@");
        console.log(group)
        expect(group.members[0].constructor).to.equal(Object);
      });
    });

    describe('getMembers()', function () {

      beforeEach(function (done) {

        request
          .post('/api/group/add')
          .send({
            groupId: group._id,
            username: testUser2.username
          })
          .end(function (err, res) {
            var group = JSON.parse(res.text);
            done();
          });
      });

      it('returns members as JSON', function (done) {

        request
          .get('/api/group/users')
          .send({
            groupId: group._id,
          })
          .end(function (err, res) {
            var members = JSON.parse(res.text);
            var membersIds = members.map(function (member) {
              return member._id + '';
            });

            expect(membersIds.length).to.equal(2);
            expect(_.contains(membersIds, testUser._id + ''));
            expect(_.contains(membersIds, testUser2._id + ''));
            done();
          });
      });
    });

    describe('removeMember()', function () {

      beforeEach(function (done) {
        request
          .del('/api/group/user')
          .send({
            groupId: group._id,
            userId: testUser._id
          })
          .expect(200)
          .end(function (err, res) {

            // Update group
            Group.findById(group._id, function (err, _group_) {
              group = _group_;
              done();
            });
          });
      });

      it('removes user from group.members', function (done) {
        expect(group.members.length).to.equal(0);
        done();
      });

      it('removes group from user.groupId', function (done) {
        User.findById(testUser._id, function (err, user) {
          var userHasGroup = user.groupId.some(function (id) {
            return id.equals(group._id);
          });

          expect(userHasGroup).to.equal(false);
          done();
        });
      });
    });

    describe('setDestination()', function () {

      it('changes group\'s destination and returns updated group', function (done) {
        request
          .post('/api/group/set')
          .send({
            destination: testGroupDestination2,
            groupId: group._id,
          })
          .expect(200)
          .end(function (err, res) {
            if (err) console.error(err);

            var actualDestination = JSON.parse(res.text).destination;

            expect(actualDestination).to.equal(testGroupDestination2);
            done();
          });
      });
    });
  });
});
