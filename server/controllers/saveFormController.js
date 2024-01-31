const saveFormService = require("./saveFormService");

async function saveFormDataController(req, res) {
  try {
    const formData = req.body; // Assuming your form data is in the request body
    await saveFormService.saveFormDataService(formData);

    // Send a success response
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
}

module.exports = {
  saveFormDataController,
};
