var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'zacharysmith4989@gmail.com',
    pass: process.env.GMAIL_PASS
  }
});


module.exports = {
  mailer: {
    sendMail: transporter.sendMail.bind(transporter)
  },

  send400: function (res, err) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      res.sendStatus(400);
    }
  },

  send500: function (res, err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.sendStatus(500);
    }
  }
};
