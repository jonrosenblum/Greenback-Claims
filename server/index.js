const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const sesTransport = require('nodemailer-ses-transport');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure AWS SDK
aws.config.update({
  accessKeyId: 'AKIA4YIRF2DYBHNT6C57', // Update with your AWS access key ID
  secretAccessKey: 'b7ISTB5p9Ycuqrv+NdsIOH6q5KK9INCfqJIzDP4D', // Update with your AWS secret access key
  region: 'us-east-1', // Update with your AWS region
});

// Create an AWS SES transporter
const transporter = nodemailer.createTransport(sesTransport({
  ses: new aws.SES({ apiVersion: '2010-12-01' }),
}));

// POST endpoint for handling form submissions
app.post('/send-email', (req, res) => {
  const formData = req.body;

  // Email content
  const mailOptions = {
    from: 'claims@greenbackclaims.com', // Sender (from) email address
    to: 'jon.m.rosenblum@gmail.com', // Recipient (to) email address
    subject: 'New Form Submission',
    html: `<p>Form Data: ${JSON.stringify(formData)}</p>`,
  };

  // Send email using AWS SES transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
