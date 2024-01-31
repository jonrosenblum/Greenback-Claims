const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432,
  });
  
async function saveFormData(formData) {
  // Implement logic to save form data to the database
  const client = await pool.connect();
  try {
    // Your SQL query to save form data
    // For example:
    // await client.query('INSERT INTO formData (column1, column2, ...) VALUES ($1, $2, ...)', [formData.field1, formData.field2, ...]);
  } finally {
    client.release();
  }
}

module.exports = {
  saveFormData,
};