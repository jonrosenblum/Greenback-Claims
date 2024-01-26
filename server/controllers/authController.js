const db = require('../models/User');
const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await authService.hashPassword(password);

    await db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hashedPassword]);

    res.status(201).send({ message: 'User created successfully', status: 201 });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error creating user', status: 500 });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    if (!user || !await authService.comparePasswords(password, user.password)) {
      res.status(401).send({ message: 'Invalid username or password', status: 401 });
    } else {
      // You can generate and send a JWT token for authentication here
      res.status(200).send({ message: 'Login successful', status: 200 });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error during login', status: 500 });
  }
};

module.exports = {
  signup,
  login,
};
