const express = require('express');
const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const aws = require('aws-sdk');
const sesTransport = require('nodemailer-ses-transport');

require('dotenv').config()

const app = express();
cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));




// Middleware to parse JSON bodies
// app.use(bodyParser.json());

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
app.post('/send-email', upload.single('pdf'), async (req, res) => {

  const pdfData = req.file.buffer;
  const formData = JSON.parse(req.body.formData);
  // const formData = req.body;
  // Email content
  const mailOptions = {
    from: 'claims@greenbackclaims.com', // Sender (from) email address
    to: 'claims@greenbackclaims.com', // Recipient (to) email address
    subject: 'NEW VISA & MASTERCARD CLAIM',
    html: `<h3>Personal Information:</h3>
    <p><b>Name:</b>&nbsp;&nbsp; ${formData.firstName + ' ' + formData.lastName}</p>
    <p><b>Email:</b>&nbsp;&nbsp; ${formData.email}</p>
    <p><b>Phone:</b>&nbsp;&nbsp; ${formData.phone}</p>
    <p><b>Address:</b>&nbsp;&nbsp; ${formData.address}</p>
    <p><b>City:</b>&nbsp;&nbsp; ${formData.city}</p>
    <p><b>State:</b>&nbsp;&nbsp; ${formData.state}</p>
    <p><b>ZipCode:</b>&nbsp;&nbsp; ${formData.zipcode}</p>
    </br>
    <h3>Business Information:</h3>
    <p><b>Business Name:</b>&nbsp;&nbsp; ${formData.businessName}</p>
    <p><b>Business Acceptance:</b>&nbsp;&nbsp; ${formData.businessAcceptance}</p>
    <p><b>Company Type:</b>&nbsp;&nbsp; ${formData.companyType}</p>
    <p><b>EIN/SSN:</b>&nbsp;&nbsp; ${formData.ein}</p>
    <p><b>Annual Sales:</b>&nbsp;&nbsp; ${formData.annualSales}</p>
    <p><b>Franchise Agreement:</b>&nbsp;&nbsp; ${formData.franchiseAgreement}</p>
    `,
    attachments: [
      {   // utf-8 string as an attachment
        filename: `${formData.businessName} Retainer.pdf`,
        content: pdfData
      }
    ]
  };

  // Send email using AWS SES transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Error sending email', status: 500 });
    } else {
      console.log('Email sent:', info.messageId);
      res.status(200).send({ message: 'Email sent successfully', status: 200 });
    }
  });
  // res.json({message:'hello'})
});


// POST endpoint for handling form submissions
app.post('/contact-us', upload.single('pdf'), async (req, res) => {
  const formData = JSON.parse(req.body.formData);
  console.log(formData);
  const mailOptions = {
    from: 'claims@greenbackclaims.com', // Sender (from) email address
    to: 'claims@greenbackclaims.com', // Recipient (to) email address
    html: `<p>Form Data:${JSON.stringify(formData)}</p>`
  };

  // Send email using AWS SES transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Error sending email', status: 500 });
    } else {
      console.log('Email sent:', info.messageId);
      res.status(200).send({ message: 'Email sent successfully', status: 200 });
    }
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
