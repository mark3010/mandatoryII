"use strict";
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(name, email, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: name, // sender address
    to: email, // list of receivers
    subject: "Recover password", // Subject line
    text: message, // plain text body
  });

}