var expect = require('chai').expect;
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var request = require('supertest');

var server = require(path.join(__dirname, '../../app/server/server.js'));


describe('Server', function () {
  var con;

  before(function () {
    process.env.NODE_ENV = 'test'; // use test database
    request = request(server);
  });

  beforeEach(function (done) {
    con = mongoose.createConnection('mongodb://localhost/knowheretest');
    setTimeout(done, 100); // give connection enough time
  });

  afterEach(function (done) {
    // This ensures no data persists between tests
    con.db.dropDatabase(function (err, result) {
      con.close(done);
    });
  });

  it('should work', function (done) {
    expect(con).to.be.ok;

    request
      .get('/')
      .expect(200, done);
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
});
