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

  var testGroupDestination, testGroupName, testUser;

  before(function (done) {
    request = request(server);
    testGroupDestination = 'new-york-city';
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

    xit('should not create if no group destination is provided', function (done) {
      // body...
    });

    xit('should not create if no group title is provided', function (done) {
      // body...
    });

    xit('should not create if userId is invalid', function (done) {
      // body...
    });

    xit('should set provided userId as group host', function (done) {
      // body...
    });

    xit('should set title and destination', function (done) {
      // body...
    });

    xit('should add provided user to newGroup.members', function (done) {
      // body...
    });

    xit('should add the new group to the host\'s groupId', function (done) {
      Group.findOne({ destination: 'new-york-city' }, function (err, group) {
        console.log('@@@@@@@@@@', err);
        console.log('##########', group);
        done();
      });
    });

    it('should create and return the new group', function (done) {
      this.timeout(5000);

      Group.count({ title: testGroupName }, function (err, c) {
        expect(c).to.equal(0);

          request
            .post('/api/group')
            .send({
              groupName: testGroupName,
              destination: testGroupDestination,
              userInfo: testUser._id,
            })
            .expect(200)
            .then(function () {
              Group.count({ title: testGroupName }, function (err, c) {
                expect(c).to.equal(1);
                done();
              });
            });
      });
    });

    xit('should return the new group', function (done) {
      // body...
    });
  })
})