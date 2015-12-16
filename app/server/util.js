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
  }
};
