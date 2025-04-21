const express = require('express');
const router = express.Router();
const preferenceController = require('../controllers/preferenceController');
const authenticate = require('../middleware/auth');

// Save preferences
router.post('/', authenticate, preferenceController.savePreferences);

// Get preferences
router.get('/', authenticate, preferenceController.getPreferences);

module.exports = router;
