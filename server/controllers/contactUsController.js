const contactUsService = require('../services/contactUsService');

const contactUs = async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData);

    // Email content
    const mailOptions = {
      from: 'claims@greenbackclaims.com',
      to: 'claims@greenbackclaims.com',
      subject: 'NEW ERC CLAIM',
      html: `<p>Form Data:${JSON.stringify(formData)}</p>`,
    };

    // Send email using AWS SES transporter
    await contactUsService.sendContactUsEmail(mailOptions);

    res.status(200).send({ message: 'Email sent successfully', status: 200 });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error sending email', status: 500 });
  }
};

module.exports = {
  contactUs,
};
