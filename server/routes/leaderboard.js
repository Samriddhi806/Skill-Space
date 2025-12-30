// server/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/:testId', authenticate, async (req, res) => {
  // Placeholder - returns empty leaderboard
  res.json([]);
});

module.exports = router;
