const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET



if (!secretKey) {
    console.error('JWT_SECRET is required');
    process.exit(1);
  }

  async function getAllAdminSubmissions() {
    try {
      const submissions = await adminModel.getAllAdminSubmissions();
      return submissions;
    } catch (error) {
      throw new Error(error.message || 'Failed to get submissions.');
    }
  }

  async function updateAdminSubmission(id, notes) {
    try {
      await adminModel.updateNotes(id, notes);
    } catch (error) {
      throw new Error(error.message || 'Failed to get submissions.');
    }
  }

  module.exports = {
    getAllAdminSubmissions,
    updateAdminSubmission
  };
  
  