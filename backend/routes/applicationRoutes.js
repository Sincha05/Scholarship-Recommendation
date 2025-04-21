const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, applicationController.applyToScholarship);
router.get('/', verifyToken, applicationController.getUserApplications);

module.exports = router;
