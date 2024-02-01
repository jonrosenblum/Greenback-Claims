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
        referralLink VARCHAR(255) NOT NULL UNIQUE,
        formSubmissions INTEGER NOT NULL DEFAULT 0,
        referralLinkFrequency INTEGER NOT NULL DEFAULT 0
      );
    `);
  } finally {
    client.release();
  }
}

async function createUser(username, email, password, referralLink) {
  await createUserTableIfNotExists();

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password, referrallink) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, referralLink]
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

module.exports = {
  createUser,
  findUserByUsername,
};
