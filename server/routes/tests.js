// server/routes/tests.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const Test = require('../models/Test');

// Admin creates test
router.post('/', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  
  try {
    const test = new Test({
      title: req.body.title,
      description: req.body.description || '',
      admin_id: req.user._id,
      questions: req.body.questions || []
    });
    await test.save();
    res.json({ message: 'Test created', testId: test._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tests (employees see available tests)
router.get('/', authenticate, async (req, res) => {
  try {
    const tests = await Test.find({}).select('title description _id');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
