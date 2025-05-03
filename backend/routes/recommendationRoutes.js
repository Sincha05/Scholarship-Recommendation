const express = require('express');
const router = express.Router();
const { generateRecommendations } = require('../controllers/recommendationController');

router.get('/generate/:userId', generateRecommendations);

module.exports = router;