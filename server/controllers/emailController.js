const emailService = require("../services/emailService");

// const [referralID, setReferralID] = useState('');

// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   // Get the value of the 'ref' parameter
//   const refParam = urlParams.get('ref');
//   setReferralID(refParam)
// }, []);

const sendEmail = async (req, res) => {
  try {
    const pdfData = req.file.buffer;
    const formData = JSON.parse(req.body.formData);
    const mailOptions = {
      from: "claims@greenbackclaims.com",
      to: "claims@greenbackclaims.com",
      subject: "NEW VISA & MASTERCARD CLAIM",
      html: `<h3>Personal Information:</h3>
    <p><b>Name:</b>&nbsp;&nbsp; ${
      formData.firstName + " " + formData.lastName
    }</p>
    <p><b>Email:</b>&nbsp;&nbsp; ${formData.email}</p>
    <p><b>Phone:</b>&nbsp;&nbsp; ${formData.phone}</p>
    <p><b>Address:</b>&nbsp;&nbsp; ${formData.address}</p>
    <p><b>City:</b>&nbsp;&nbsp; ${formData.city}</p>
    <p><b>State:</b>&nbsp;&nbsp; ${formData.state}</p>
    <p><b>ZipCode:</b>&nbsp;&nbsp; ${formData.zipcode}</p>
    </br>
    <h3>Referral Information:</h3>
    <p><b>Referral:</b>&nbsp;&nbsp;${formData.referralDetails}</p>
    </br>
    <h3>Business Information:</h3>
    <p><b>Business Name:</b>&nbsp;&nbsp; ${formData.businessName}</p>
    <p><b>Business Acceptance:</b>&nbsp;&nbsp; ${
      formData.businessAcceptance
    }</p>
    <p><b>Company Type:</b>&nbsp;&nbsp; ${formData.companyType}</p>
    <p><b>EIN/SSN:</b>&nbsp;&nbsp; ${formData.ein}</p>
    <p><b>Annual Sales:</b>&nbsp;&nbsp; ${formData.annualSales}</p>
    <p><b>Franchise Agreement:</b>&nbsp;&nbsp; ${
      formData.franchiseAgreement
    }</p>
    `,
      attachments: [
        {
          filename: `${formData.businessName} Retainer.pdf`,
          content: pdfData,
        },
      ],
    };

    await emailService.sendEmail(mailOptions);

    res.status(200).send({ message: "Email sent successfully", status: 200 });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ message: "Error sending email", status: 500, error });
  }
};


const sendReferralEmail = async (req, res) => {
  try {

    const mailOptions = {
      from: "claims@greenbackclaims.com",
      to: "claims@greenbackclaims.com", // the referral user whos referral link is being used the email when they signed up
      subject: "NEW VISA & MASTERCARD CLAIM",
      html: `<h3>Referral Email Test</h3>`,
    };


    await emailService.sendReferralEmail(mailOptions);

    res.status(200).send({
      message: "Referral email sent successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "Error sending Referral email",
      status: 500,
      error,
    });
  }
};

module.exports = {
  sendEmail,
  sendReferralEmail,
};
