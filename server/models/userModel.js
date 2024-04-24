const bcrypt = require("bcrypt");
const { db } = require("../db");

//******************************************************************/ 
// USER ROLES
//******************************************************************/ 
async function createUserRole(roleName) {
  const client = await db.connect();
  try {
    const result = await client.query(
      `INSERT INTO roles (role_name) VALUES ('${roleName}')`
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}


async function findRoleByName(roleName) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM roles WHERE role_name = $1', [roleName]);
    return result.rows[0];
  } finally {
    client.release();
  }
}


async function getUserRole(userId) {
  try {
    const user = await db.query('SELECT roles.role_name FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE users.id = $1', [userId]);
    return user.rows[0];
  } catch (error) {
    throw new Error(error.message || 'Failed to get user role.');
  }
}


//******************************************************************/ 
// USER CREATION
//******************************************************************/ 
async function createUser(username, email, password, referralID,role) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await db.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password, referral_id, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, email, hashedPassword, referralID, role]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}


//******************************************************************/ 
// FIND USER BY USERNAME
//******************************************************************/
async function findUserByUsername(username) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } finally {
    client.release();
  }
}


//******************************************************************/ 
// FIND USER BY ID
//******************************************************************/
async function findUserByID(userId) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

//******************************************************************/ 
// FIND USER BY EMAIL
//******************************************************************/
async function findUserByEmail(email) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

//******************************************************************/ 
// FIND USER BY REFERRAL ID
//******************************************************************/
async function findUserByReferralID(referralID) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE referral_id = $1', [referralID]);
    return result.rows[0];
  } finally {
    client.release();
  }
}


//******************************************************************/ 
// SAVE RESET PASSWORD TOKEN
//******************************************************************/
async function saveResetToken(email, resetToken, expirationDate) {
  const client = await db.connect();
  try {
    await client.query('UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3', [resetToken, expirationDate, email]);
  } finally {
    client.release();
  }
}


//******************************************************************/ 
// FIND USER BY RESET TOKEN
//******************************************************************/
async function findUserByResetToken(token) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE reset_token = $1', [token]);
    return result.rows[0];
  } finally {
    client.release();
  }
}


//******************************************************************/ 
// UPDATE USER PASSWORD 
//******************************************************************/
async function updateUserPassword(userId, newPassword) {
  const client = await db.connect();
  try {
    await client.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, userId]);
  } finally {
    client.release();
  }
}

async function clearResetToken(userId) {
  const client = await db.connect();
  try {
    await client.query('UPDATE users SET reset_token = NULL, reset_token_expires = NULL WHERE id = $1', [userId]);
  } finally {
    client.release();
  }
}
async function updateFormSubmissionsCount(referralID) {
  const client = await db.connect();
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
  const client = await db.connect();
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
  createUserRole,
  findRoleByName,
  getUserRole,
  createUser,
  findUserByUsername,
  findUserByID,
  findUserByEmail,
  updateUserPassword,
  findUserByResetToken,
  clearResetToken,
  updateFormSubmissionsCount, 
  updateReferralFrequencyCount,
  saveResetToken,
  findUserByReferralID
};
