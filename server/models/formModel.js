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
        submissionname VARCHAR(255) NOT NULL,
        submissionbusiness VARCHAR(255) NOT NULL,
        referralid VARCHAR(255) NOT NULL
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

    const submissionName = `${formData.firstName} ${formData.lastName}`;
    const submissionBusiness = formData.businessName;
    const referralLink = formData.referralLink;

    const result = await client.query(
      'INSERT INTO submissions (submissionname, submissionbusiness, referralid) VALUES ($1, $2, $3) RETURNING *',
      [submissionName, submissionBusiness, referralLink ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = {
  saveFormData,
};
