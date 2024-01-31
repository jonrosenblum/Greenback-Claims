const formModel = require("./formModel");

async function saveFormDataService(formData) {
  try {
    // Additional logic, validation, etc. before saving to the database
    // For example:
    // if (formData.field1 === 'something') {
    //   throw new Error('Invalid value for field1');
    // }

    // Save the form data to the database
    await formModel.saveFormData(formData);
  } catch (error) {
    // Handle errors
    throw new Error(`Error saving form data: ${error.message}`);
  }
}

module.exports = {
  saveFormDataService,
};
