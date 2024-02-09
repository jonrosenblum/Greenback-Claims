const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

async function createUserTableIfNotExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        referral_id VARCHAR(255) NOT NULL UNIQUE,
        form_submissions INTEGER NOT NULL DEFAULT 0,
        referral_frequency INTEGER NOT NULL DEFAULT 0
      );
    `);
  } finally {
    client.release();
  }
}

async function createUser(username, email, password, referralID) {
  await createUserTableIfNotExists();

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password, referral_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, referralID]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function findUserByUsername(username) {
  await createUserTableIfNotExists();

  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function findUserByID(userId) {
  await createUserTableIfNotExists();

  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  } finally {
    client.release();
  }
}


async function updateFormSubmissionsCount(referralID) {
  const client = await pool.connect();
  try {
    // Increment the form_submissions count for the given referralID
    const result = await client.query(
      'UPDATE users SET form_submissions = form_submissions + 1 WHERE referral_id = $1 RETURNING *',
      [referralID]
    );

    const affectedRows = result.rowCount;
    console.log(`Updated form_submissions count for referralID ${referralID}. Affected rows: ${affectedRows}`);
  } finally {
    client.release();
  }
}

async function updateReferralFrequencyCount(referralID) {
  const client = await pool.connect();
  try {
    // Increment the form_submissions count for the given referralID
    const result = await client.query(
      'UPDATE users SET referral_frequency = referral_frequency + 1 WHERE referral_id = $1 RETURNING *',
      [referralID]
    );

    const affectedRows = result.rowCount;
    console.log(`Updated referral_frequency count for referralID ${referralID}. Affected rows: ${affectedRows}`);
  } finally {
    client.release();
  }
}
module.exports = {
  createUser,
  findUserByUsername,
  findUserByID,
  updateFormSubmissionsCount, 
  updateReferralFrequencyCount,
};
