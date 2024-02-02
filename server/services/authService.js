const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

async function signup(username, email, password, referral_ID) {
  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const referralLink = username+'_' + (await bcrypt.hash(username, 5));
    const newUser = await userModel.createUser(username, email, hashedPassword, referral_ID);
    delete newUser.password
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Signup failed.');
  }
}

async function login(username, password) {
  try {
    const user = await userModel.findUserByUsername(username);

    if (!user) {
      throw new Error('Invalid username or password.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id, username:user.username, email:user.email, referral_id:user.referral_id,form_submissions:user.form_submissions,referral_frequency:user.referral_frequency }, secretKey, { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('Invalid username or password.');
    }
  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}

async function findUserByID(userId) {
  try {
    const user = await userModel.findUserByID(userId);

    if (!user) {
      throw new Error('Invalid ID.');
    }
    return user
  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}

module.exports = {
  signup,
  login,
  findUserByID,
};
