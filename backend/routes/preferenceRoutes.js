const express = require('express');
const router = express.Router();
const preferenceController = require('../controllers/preferenceController');
const {verifyToken} = require('../middleware/auth'); // Ensure this is the correct path to your auth middleware



// Save preferences
router.post('/',verifyToken , preferenceController.savePreferences);

// Get preferences
router.get('/', verifyToken, preferenceController.getPreferences);

module.exports = router;
