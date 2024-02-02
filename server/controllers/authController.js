const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, referral_ID } = req.body;
    const newUser = await authService.signup(username, email, password, referral_ID);
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

router.get('/user/:userId', async (req, res)=> {
  try {
    const { userId } = req.params;
    const user = await authService.findUserByID(userId);

    res.json({ user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;