const { createUserTableIfNotExists } = require('./userModel');
const { createAdminTableIfNotExists } = require('./adminModel');
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

async function createSubmissionsTableIfNotExists() {

  await createUserTableIfNotExists();
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        submission_name VARCHAR(255) NOT NULL,
        submission_email VARCHAR(255),
        submission_business VARCHAR(255) NOT NULL,
        ein_social VARCHAR(255),
        business_type VARCHAR(255),
        credit_card_sales VARCHAR(255),
        franchise_agreement VARCHAR(255),
        submission_phone VARCHAR(255) NOT NULL,
        submission_address VARCHAR(255) NOT NULL,
        referral_id VARCHAR(255)
      );
    `);
  } finally {
    client.release();
  }
}

async function createAdminSubmittedClaimsTable() {
  await createAdminTableIfNotExists();
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS adminsubmittedclaims (
        id SERIAL PRIMARY KEY,
        holding VARCHAR(255),
        business_name VARCHAR(255) NOT NULL,
        business_ein VARCHAR(255) NOT NULL,
        percentage VARCHAR(255),
        referral VARCHAR(255),
        contact_name VARCHAR(255) NOT NULL,
        contact_phone_number VARCHAR(255) NOT NULL,
        contact_address VARCHAR(255) NOT NULL,
        notes VARCHAR(255),
      );
    `);
  } finally {
    client.release();
  }
}

async function saveFormData(formData) {
  await createSubmissionsTableIfNotExists();
  await createAdminSubmittedClaimsTable();

  const client = await pool.connect();
  try {
    const submissionName = `${formData.firstName} ${formData.lastName}`;
    const submissionEmail = formData.email;
    const submissionBusiness = formData.businessName;
    const einSocial = formData.ein;
    const businessType = formData.companyType;
    const creditCardSales = formData.annualSales;
    const franchiseAgreement = formData.franchiseAgreement;
    const submissionPhone = formData.phone;
    const submissionAddress = formData.address;
    const referralID = formData.referralID;

    // Insert data into the submissions table
    const submissionResult = await client.query(
      'INSERT INTO submissions (submission_name, submission_email, submission_business, ein_social, business_type, credit_card_sales, franchise_agreement, submission_phone, submission_address, referral_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      [submissionName, submissionEmail, submissionBusiness, einSocial, businessType, creditCardSales, franchiseAgreement, submissionPhone, submissionAddress, referralID]
    );
    const submissionId = submissionResult.rows[0].id;

    // Insert data into the adminsubmittedclaims table
    const adminClaimResult = await client.query(
      'INSERT INTO adminsubmittedclaims (business_name, business_ein, contact_name, contact_phone_number, contact_address) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [submissionBusiness, einSocial, submissionName, submissionPhone, submissionAddress]
    );
    const adminClaimId = adminClaimResult.rows[0].id;

    return {
      submissionId: submissionId,
      adminClaimId: adminClaimId
    };
  } finally {
    client.release();
  }
}

async function getMatchingSubmissions(referralID) {
  await createSubmissionsTableIfNotExists();

  const client = await pool.connect();
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
  createSubmissionsTableIfNotExists,
};
