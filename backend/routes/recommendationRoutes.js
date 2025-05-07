const express = require('express');
const router = express.Router();
const { getRecommendationsForUser } = require('../controllers/recommendationController');
const { verifyToken } = require('../middleware/auth');

// Get recommendations by userId from URL
router.get('/:userId', verifyToken, (req, res, next) => {
  const { userId } = req.params;  // Extract userId from URL params

  getRecommendationsForUser(userId, (err, recommendations) => {
    if (err) {
      console.error('Error fetching recommendations:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }

    // Return empty array instead of 404 status to handle empty results gracefully on client side
    return res.status(200).json(recommendations || []);
  });
});

// Health check route
router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Recommendation service is running' });
});

module.exports = router;