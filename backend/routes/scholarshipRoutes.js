const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, scholarshipController.createScholarship);
router.get('/', scholarshipController.getAllScholarships);
router.get('/:id', scholarshipController.getScholarshipById);

module.exports = router;
