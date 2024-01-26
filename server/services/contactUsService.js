const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const sesTransport = require('nodemailer-ses-transport');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const transporter = nodemailer.createTransport(sesTransport({
  ses: new aws.SES({ apiVersion: '2010-12-01' }),
}));

const sendContactUsEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactUsEmail,
};
