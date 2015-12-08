var expect = require('chai').expect;
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var supertest = require('supertest');

var server = require(path.join(__dirname, '../../app/server/server.js'));


describe('Server', function () {
  var con;

  before(function () {
    process.env.NODE_ENV = 'test'; // use test database
  });

  beforeEach(function (done) {
    con = mongoose.createConnection('mongodb://localhost/knowheretest');
    setTimeout(done, 100); // give connection enough time
  });

  afterEach(function (done) {
    con.db.dropDatabase(function (err, result) {
      con.close(done);
    });
  });

  it('should work', function (done) {
    expect(con).to.be.ok;

    supertest(server)
      .get('/')
      .expect(200)
      .end(done);
  });
});
