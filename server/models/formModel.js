const { db } = require('../db');


async function saveFormData(formData) {
  const client = await db.connect();
  try {
    const {
      firstName,
      lastName,
      email,
      businessName,
      ein,
      companyType,
      annualSales,
      franchiseAgreement,
      phone,
      address,
      referralID
    } = formData;

    const submissionResult = await client.query(
      'INSERT INTO submissions (submission_name, submission_email, submission_business, ein_social, business_type, credit_card_sales, franchise_agreement, submission_phone, submission_address, referral_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      [`${firstName} ${lastName}`, email, businessName, ein, companyType, annualSales, franchiseAgreement, phone, address, referralID]
    );
    const submissionId = submissionResult.rows[0].id;

    const adminClaimResult = await client.query(
      'INSERT INTO adminsubmissions (business_name, business_ein, contact_name, contact_phone_number, contact_address, referral) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [businessName, ein, `${firstName} ${lastName}`, phone, address, referralID]
    );
    const adminClaimId = adminClaimResult.rows[0].id;

    return {
      submissionId,
      adminClaimId
    };
  } finally {
    client.release();
  }
}

async function getMatchingSubmissions(referralID) {

  const client = await db.connect();
  try {
    // Retrieve matching submissions
    const matchingSubmissions = await client.query(
      'SELECT * FROM submissions WHERE referral_id = $1',
      [referralID]
    );

    return matchingSubmissions.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  saveFormData,
  getMatchingSubmissions,
};
