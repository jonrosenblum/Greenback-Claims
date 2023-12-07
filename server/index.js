const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const sesTransport = require('nodemailer-ses-transport');

require('dotenv').config()

const app = express();
cors = require('cors');

app.use(cors({
  origin: '*'
}));



// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
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
    to: 'claims@greenbackclaims.com', // Recipient (to) email address
    subject: 'New Form Submission',
    html: `<p>Form Data: ${JSON.stringify(formData)}</p>`,
  };

  // Send email using AWS SES transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.messageId);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
