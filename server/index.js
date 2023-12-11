const express = require('express');
const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const aws = require('aws-sdk');
// const sesTransport = require('nodemailer-ses-transport');

require('dotenv').config()

const app = express();
cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.static(path.join(__dirname, 'client/dist')));




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
    subject: 'New Form Submission',
    html: `<p>Form Data: ${JSON.stringify(formData)}</p>`,
    attachments: [
      {   // utf-8 string as an attachment
        filename: 'letter.pdf',
        content: pdfData
      }
    ]
  };

  // Send email using AWS SES transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.messageId);
      res.status(200).send({ message: 'Email sent successfully' });
    }
  });
  // res.json({message:'hello'})
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/dist/index.html'));
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
