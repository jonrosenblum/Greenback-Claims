const formModel = require("../models/formModel");
const userModel = require("../models/userModel");

async function saveFormDataService(formData) {
  try {
    // Additional logic, validation, etc. before saving to the database
    // For example:
    // if (formData.field1 === 'something') {
    //   throw new Error('Invalid value for field1');
    // }

    // Save the form data to the database
    const savedFormData = await formModel.saveFormData(formData);

    // Update form_submissions count for the user
    await userModel.updateFormSubmissionsCount(formData.referralID);

    return savedFormData; // Optionally return the saved form data if needed
  } catch (error) {
    // Handle errors
    throw new Error(`Error saving form data: ${error.message}`);
  }
}

module.exports = {
  saveFormDataService,
};
