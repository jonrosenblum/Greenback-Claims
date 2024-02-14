const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET



if (!secretKey) {
    console.error('JWT_SECRET is required');
    process.exit(1);
  }
  
  async function signup(username, email, password) {
    try {
      const existingAdmin = await adminModel.findAdminByUsername(username);
      if (existingAdmin) {
        throw new Error('Admin already exists.');
      }
  
      const newAdmin = await adminModel.createAdmin(username, email, password);
      delete newAdmin.password
      return newAdmin;
    } catch (error) {
      throw new Error(error.message || 'Signup failed.');
    }
  }
  
  async function login(username, password) {
    try {
      const admin = await adminModel.findAdminByUsername(username);
  
      if (!admin) {
        throw new Error('Invalid username or password. Admin does not exist.');
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        const token = jwt.sign({ adminId: admin.id, username:admin.username, email:admin.email}, secretKey, { expiresIn: '1h' });
        return token;
      } else {
        throw new Error('Invalid username or password.');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed.');
    }
  }

  async function getAllAdminSubmissions() {
    try {
      const submissions = await adminModel.getAllAdminSubmissions();
      return submissions;
    } catch (error) {
      throw new Error(error.message || 'Failed to get submissions.');
    }
  }

  module.exports = {
    signup,
    login,
    getAllAdminSubmissions
  };
  
  