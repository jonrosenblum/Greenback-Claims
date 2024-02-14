const formModel = require("../models/formModel");
const userModel = require("../models/userModel");

async function saveFormDataService(formData) {
  try {
    const savedFormData = await formModel.saveFormData(formData);

    await userModel.updateFormSubmissionsCount(formData.referralID);

    return savedFormData;
  } catch (error) {
    // Handle errors
    throw new Error(`Error saving form data: ${error.message}`);
  }
}

module.exports = {
  saveFormDataService,
};
