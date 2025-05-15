const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/auth'); // ✅ Correct import

// Debug logs
console.log('applyToScholarship:', typeof applicationController.applyToScholarship); // Should log "function"
console.log('getUserApplications:', typeof applicationController.getUserApplications); // Should log "function"
console.log('verifyToken:', typeof verifyToken); // Should log "function" (if import works)

// Routes
router.post('/', verifyToken, applicationController.applyToScholarship);
router.get('/user', verifyToken, applicationController.getUserApplications);

module.exports = router;