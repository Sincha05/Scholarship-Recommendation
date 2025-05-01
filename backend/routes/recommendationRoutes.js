const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { verifyToken } = require('../middleware/auth');

// Debug
console.log('Recommendation controller:', {
  getRecommendations: typeof recommendationController.getRecommendations
});

router.get('/', verifyToken, recommendationController.getRecommendations);

module.exports = router;