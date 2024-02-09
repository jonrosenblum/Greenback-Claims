const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

async function createSubmissionsTableIfNotExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        submission_name VARCHAR(255) NOT NULL,
        submission_business VARCHAR(255) NOT NULL,
        submission_phone VARCHAR(255) NOT NULL,
        submission_address VARCHAR(255) NOT NULL,
        referral_id VARCHAR(255) NOT NULL
      );
    `);
  } finally {
    client.release();
  }
}

async function saveFormData(formData) {
  await createSubmissionsTableIfNotExists();

  const client = await pool.connect();
  try {

    if (!formData || !formData.firstName || !formData.lastName || !formData.businessName || !formData.phone || !formData.address) {
      throw new Error('Invalid form data');
    }

    const submissionName = `${formData.firstName} ${formData.lastName}`;
    const submissionBusiness = formData.businessName;
    const submissionPhone = formData.phone;
    const submissionAddress = formData.address;
    const referralID = formData.referralID;

    const result = await client.query(
      'INSERT INTO submissions (submission_name, submission_business, submission_phone, submission_address, referral_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [submissionName, submissionBusiness, submissionPhone, submissionAddress, referralID ]
    );
    return result.rows[0];
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
