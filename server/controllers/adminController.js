const express = require('express');
const adminService = require('../services/adminService');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { username, email, password} = req.body;
      const newAdmin = await adminService.signup(username, email, password);
      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || 'Signup failed.' });
    }
  });
  

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await adminService.login(username, password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message || 'Login failed.' });
  }
});

router.get('/all-submissions', async (req, res) => {
  try {
    const submissions = await adminService.getAllSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;