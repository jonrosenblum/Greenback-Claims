const countService = require('../services/countService');

async function getMatchingSubmissionsController(req, res) {
  try {
    const { referralID } = req.params;
    const matchingSubmissions = await countService.getMatchingSubmissions(referralID);

    // Respond with the matching submissions
    res.json({ matchingSubmissions });
    console.log('Matching submissions:', matchingSubmissions);
  } catch (error) {
    console.error('Error getting matching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getMatchingSubmissionsController,
};
