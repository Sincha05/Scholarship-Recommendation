const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', verifyToken, userController.getProfile);
router.post('/preferences', verifyToken, userController.savePreferences);
router.get('/preferences', verifyToken, userController.getPreferences);

module.exports = router;
