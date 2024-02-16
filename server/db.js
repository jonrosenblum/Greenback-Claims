
require("dotenv").config();
const { Pool } = require("pg");
const connection = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432,
    ssl: {
      rejectUnauthorized: false, // Set to true in production with a valid SSL certificate
    },
};

const db = new Pool(connection)
async function createTableIfNotExists(tableName, tableDefinition) {
    const client = await db.connect();
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          ${tableDefinition}
        )
      `;
      await client.query(query);
    } finally {
      client.release();
    }
  }

async function initializeDatabase() {
  try {
    
    // Create role table
    await createTableIfNotExists(`roles`, 
    `role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL`
    );

     // Check if roles exist, and if not, insert them
     const rolesCountQuery = 'SELECT COUNT(*) FROM roles';
     const rolesCountResult = await db.query(rolesCountQuery);
 
     if (rolesCountResult.rows[0].count === '0') {
       // Insert default roles (admin and user)
       const insertRolesQuery = `
         INSERT INTO roles (role_name) VALUES
         ('admin'),
         ('user')
       `;
       await db.query(insertRolesQuery);
     }
    
    // Create user table
    await createTableIfNotExists(`users`, 
    `id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    referral_id VARCHAR(255) NOT NULL UNIQUE,
    form_submissions INTEGER NOT NULL DEFAULT 0,
    referral_frequency INTEGER NOT NULL DEFAULT 0,
    role_id INT REFERENCES roles(role_id),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP`
    );

    // Create form submission table
    await createTableIfNotExists(`submissions`, 
    `id SERIAL PRIMARY KEY,
    submission_name VARCHAR(255) NOT NULL,
    submission_email VARCHAR(255),
    submission_business VARCHAR(255) NOT NULL,
    ein_social VARCHAR(255),
    business_type VARCHAR(255),
    credit_card_sales VARCHAR(255),
    franchise_agreement VARCHAR(255),
    submission_phone VARCHAR(255) NOT NULL,
    submission_address VARCHAR(255) NOT NULL,
    referral_id VARCHAR(255)`
    );

    // Create form submission table for admin
    await createTableIfNotExists(`adminsubmissions`, 
    `id SERIAL PRIMARY KEY,
    holding VARCHAR(255),
    business_name VARCHAR(255) NOT NULL,
    business_ein VARCHAR(255) NOT NULL,
    percentage VARCHAR(255),
    referral VARCHAR(255),
    contact_name VARCHAR(255) NOT NULL,
    contact_phone_number VARCHAR(255) NOT NULL,
    contact_address VARCHAR(255) NOT NULL,
    notes TEXT`
    );



  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = {
  db,
  initializeDatabase,
};
