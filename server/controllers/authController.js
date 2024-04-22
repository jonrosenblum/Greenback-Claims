const express = require('express');
const authService = require('../services/authService');
const router = express.Router();


//******************************************************************/ 
// CREATE USER ROLE
//******************************************************************/ 

router.post('/create-role', async (req, res) => {
  try {
    const { role_name } = req.body;
    const newRole = await authService.createRole(role_name)
    res.status(201).json({ message: 'User Role created successfully', role: newRole });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Create Role failed.' });
  }
});



//******************************************************************/ 
// SIGNUP USER
//******************************************************************/ 
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await authService.signup(username, email, password, role);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Signup failed.' });
  }
});



//******************************************************************/ 
// LOGIN USER
//******************************************************************/ 
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



//******************************************************************/ 
// RESET PASSWORD
//******************************************************************/ 
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Password reset failed.' });
  }
});



//******************************************************************/ 
// GET USER DETAIL BY ID
//******************************************************************/ 
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


//******************************************************************/ 
// GET USER DETAIL BY ID
//******************************************************************/ 
router.get('/refuser/:referralId', async (req, res)=> {
  try {
    const { referralId } = req.params;
    const user = await authService.findUserByReferralID
    (referralId);

    res.json({ user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//******************************************************************/ 
// FORGOT PASSWORD
//******************************************************************/ 
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Forgot password failed.' });
  }
});


//******************************************************************/ 
// FORGOT USERNAME
//******************************************************************/
router.post('/forgot-username', async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotUsername(email);
    res.json({ message: 'Username reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Forgot username failed.' });
  }
});

module.exports = router;