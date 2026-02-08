const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).send({ message: 'Email already registered.' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.send({ message: 'User registered!' });
  } catch (err) {
    res.status(500).send({ message: 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid credentials.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send({ message: 'Invalid credentials.' });
    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.send({ token });
  } catch {
    res.status(500).send({ message: 'Login failed.' });
  }
});

module.exports = router;