const saveFormService = require("../services/saveFormService");
async function saveFormDataController(req, res) {
  try {
    const formData = req.body; 
    await saveFormService.saveFormDataService(formData);
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
}

module.exports = {
  saveFormDataController,
};
