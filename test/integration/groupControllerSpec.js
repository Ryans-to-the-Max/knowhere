process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var mongoose = require('mongoose');
var path = require('path');
var request = require('supertest');

var db = require(path.join(__dirname, '../../db/db'));
var Group = require(path.join(__dirname, '../../app/server/models/group'));
var groupController = require(path.join(__dirname,
                              '../../app/server/controllers/groupController'));
var server = require(path.join(__dirname, '../../app/server/server'));
var testUtil = require(path.join(__dirname, '../testUtil'));
var User = require(path.join(__dirname, '../../app/server/models/user'));


describe('groupController', function () {

  var testGroupDestination, testGroupDestination2, testGroupName, testUser;

  before(function (done) {
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
    }, 100); // on @ZacharyRSmith's machine, connection needs ~15ms to set up
  });

  beforeEach(function (done) {
    testUtil.dropDb(con, function () {

      User.create({ username: 'test user' }, function (err, user) {
        if (err || !user) return console.error(err);

        testUser = user;
        done();
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

  describe('setDestination()', function () {

    var group;

    beforeEach(function (done) {
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

    it('changes group\'s destination', function (done) {
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

  describe('createGroup()', function () {

    var newGroup;

    beforeEach(function (done) {
      request
        .post('/api/group')
        .send({
          groupName: testGroupName,
          destination: testGroupDestination,
          userInfo: testUser._id,
        })
        .expect(200)
        .end(function (err, res) {
          Group.findOne({ title: testGroupName }, function (err, group) {
            newGroup = JSON.parse(res.text);

            expect(newGroup._id).to.equal(group._id + '');
            done();
          });
        });
    });

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
      expect(newGroup.host._id).to.equal(testUser.toObject()._id + '');
    });

    it('should set title and destination', function () {
      expect(newGroup.title).to.equal(testGroupName);
      expect(newGroup.destination).to.equal(testGroupDestination);
    });

    it('should add group\'s host to group.members', function () {
      expect(newGroup.members.indexOf(testUser._id + '')).not.to.equal(-1);
    });

    it('should add the new group to the host\'s groupId', function (done) {
      // Update testUser
      User.findOne({ _id: testUser._id }, function (err, user) {
        expect(user.groupId.indexOf(newGroup._id)).not.to.equal(-1);
        done();
      });
    });
  });
});
