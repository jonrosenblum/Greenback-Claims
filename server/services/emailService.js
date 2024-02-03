const nodemailer = require("nodemailer");
const aws = require("aws-sdk");
const sesTransport = require("nodemailer-ses-transport");

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

aws.config.update(config);

const transporter = nodemailer.createTransport(
  sesTransport({
    ses: new aws.SES({ apiVersion: "2010-12-01" }),
  })
);

const sendEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

const sendReferralEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
  sendReferralEmail,
};
