const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

async function createAdminTableIfNotExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);
  } finally {
    client.release();
  }
}



async function createAdmin(username, email, password) {
  await createAdminTableIfNotExists();

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO admins (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function findAdminByUsername(username) {
    await createAdminTableIfNotExists();
  
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM admins WHERE username = $1', [username]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async function getAllAdminSubmissions() {
    await createAdminTableIfNotExists();

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM adminsubmittedclaims');
      return result.rows;
    } finally {
      client.release();
    }
  }
  

module.exports = {
    createAdmin,
    findAdminByUsername,
    createAdminTableIfNotExists,
    getAllAdminSubmissions
  };
  
