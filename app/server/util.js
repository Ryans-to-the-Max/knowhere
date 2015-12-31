var nodemailer = require('nodemailer');
var EmailTemplates   = require('swig-email-templates');
var path = require('path');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'appKnowhere@gmail.com',
    pass: process.env.GMAIL_PASS
  }
});


module.exports = {
  
  mailer: {
    sendMail: transporter.sendMail.bind(transporter)
  },

  mail: function(template, context, subject, email) {
    var templates = new EmailTemplates({
      root: path.join(__dirname, 'templates')
    });
    templates.render(template, context, function(err, html, text){
      if (err) {
        console.log(err);
      }
      transporter.sendMail({    
        from: 'appKnowhere@gmail.com',
        to: email,
        subject: subject,
        html: html,
        text: text
      });
    });
  },

  send200: function (res, data) {
    if (data) {
      // console.log(data);
      res.status(200).send(data);
    } else {
      res.sendStatus(200);
    }
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
