const countService = require('../services/countService');

async function getMatchingSubmissionsController(req, res) {
  try {
    const { referralID } = req.params;
    const matchingSubmissions = await countService.getMatchingSubmissions(referralID);

    res.json({ matchingSubmissions });
  } catch (error) {
    console.error('Error getting matching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateReferralFrequencyCount(req, res) {
  try {
    const { referralID } = req.params;
    let success = await countService.updateReferralFrequencyCount(referralID);
    if(success){
      res.json({ message:'Referral Frequency Updated' });
    }
  } catch (error) {
    console.error('Error getting Referral Frequency:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getMatchingSubmissionsController,
  updateReferralFrequencyCount,
};
