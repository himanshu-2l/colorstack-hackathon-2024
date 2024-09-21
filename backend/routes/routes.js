const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Register route should come before the /:id routes
router.post('/register', async (req, res) => {
  try {
    const { NameFirst, NameLast, email, Pass, Admin } = req.body;
    const newUser = new User({
      NameFirst,
      NameLast,
      email,
      Pass,
      Admin
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, Pass } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Login failed' });
    }

    // Check password (use bcrypt in production to hash passwords)
    const isMatch = Pass === user.Pass; // Use bcrypt.compare in production

    if (!isMatch) {
      return res.status(401).json({ message: 'Login failed' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;