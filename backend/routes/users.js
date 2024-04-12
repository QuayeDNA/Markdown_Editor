// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: 'Username already exists' });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });
  
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });
  
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.header('auth-token', token).json({ message: 'Logged in successfully' });
  });
  
module.exports = router;