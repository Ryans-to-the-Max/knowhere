var expect = require('chai').expect;
var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var path = require('path');
var request = require('supertest');

var server = require(path.join(__dirname, '../../app/server/server'));
var util = require(path.join(__dirname, '../../app/server/util'));


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

  describe('util', function () {

    describe('mailer', function () {

      // The test below requires process.env.GMAIL_PASS
      // For now, TravisCI does not have access to it.
      // So, keep this test pending
      xit('should provide nodemailer\'s sendMail function', function (done) {
        this.timeout(5000);

        var mailOptions = {
            from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
            to: 'zacharysmith4989@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ✔', // plaintext body
            html: '<b>Hello world ✔</b>' // html body
        };

        util.mailer.sendMail(mailOptions, function (err, info) {
          if (err) return console.error(err);

          // 250 is the SMTP reply code for mail action okay
          // See more: http://www.greenend.org.uk/rjk/tech/smtpreplies.html
          expect(/250/.test(info.response));
          done();
        });
      });
    });
  });
});
