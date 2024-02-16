const express = require('express');
const adminService = require('../services/adminService');
const router = express.Router();

router.get('/all-submissions', async (req, res) => {
  try {
    const submissions = await adminService.getAllAdminSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/update-submission', async (req, res) => {
  try {
    const { id, notes } = req.body;
    await adminService.updateAdminSubmission(id, notes);
    res.json({message:'record updated'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;