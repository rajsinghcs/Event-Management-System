const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, requireRole } = require('../server/authMiddleware');

// Get all users (organiser only)
router.get('/', auth, requireRole('organiser'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 