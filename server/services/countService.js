const userModel = require('../models/userModel');
const formModel = require('../models/formModel');

async function getMatchingSubmissions(referralID) {
  try {
    // Retrieve matching submissions
    const matchingSubmissions = await formModel.getMatchingSubmissions(referralID);
    return matchingSubmissions;
  } catch (error) {
    console.error('Error in count service - getMatchingSubmissions:', error);
    throw new Error('Error getting matching submissions');
  }
}

async function updateReferralFrequencyCount(referralID) {
  try {
    // Update form_submissions count in users table
    await userModel.updateReferralFrequencyCount(referralID);
    return true;
  } catch (error) {
    console.error('Error in count service - getMatchingSubmissions:', error);
    throw new Error('Error getting matching submissions');
  }
}

module.exports = {
  getMatchingSubmissions,
  updateReferralFrequencyCount,
};
