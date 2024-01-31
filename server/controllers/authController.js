const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, referrallink } = req.body;
    const newUser = await authService.signup(username, email, password, referrallink);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Signup failed.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message || 'Login failed.' });
  }
});

module.exports = router;
