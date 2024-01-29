const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const config = require('../../');

async function signup(username, email, password) {
  try {
    // Check if the username is already taken
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.createUser(username, email, hashedPassword);
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Signup failed.');
  }
}

async function login(username, password) {
  try {
    // Find the user by username
    const user = await userModel.findUserByUsername(username);

    // Check if the user exists
    if (!user) {
      throw new Error('Invalid username or password.');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a token
      const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('Invalid username or password.');
    }
  } catch (error) {
    throw new Error(error.message || 'Login failed.');
  }
}

module.exports = {
  signup,
  login,
};
