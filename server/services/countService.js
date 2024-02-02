const userModel = require('../models/userModel');
const formModel = require('../models/formModel');

async function getMatchingSubmissions(referralID) {
  try {
    await formModel.createSubmissionsTableIfNotExists();
    // Retrieve matching submissions
    const matchingSubmissions = await formModel.getMatchingSubmissions(referralID);

    // Update form_submissions count in users table
    await userModel.updateFormSubmissionsCount(referralID);

    return matchingSubmissions;
  } catch (error) {
    console.error('Error in count service - getMatchingSubmissions:', error);
    throw new Error('Error getting matching submissions');
  }
}

module.exports = {
  getMatchingSubmissions,
};
