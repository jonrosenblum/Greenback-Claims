const formModel = require("../models/formModel");
const userModel = require("../models/userModel");

async function saveFormDataService(formData) {
  try {
    const {referralID } = formData;
    const savedFormData = await formModel.saveFormData(formData);

    if(referralID){
      await userModel.updateFormSubmissionsCount(referralID);
    }

    return savedFormData;
  } catch (error) {
    // Handle errors
    throw new Error(`Error saving form data: ${error.message}`);
  }
}

module.exports = {
  saveFormDataService,
};
