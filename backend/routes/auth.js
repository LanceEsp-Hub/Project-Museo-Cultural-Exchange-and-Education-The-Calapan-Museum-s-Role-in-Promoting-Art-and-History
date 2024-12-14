const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User authentication routes
router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login); 

// Password reset routes
router.post('/request-reset-password', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

// Frontend redirection for reset-password
router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  res.redirect(`http://localhost:8080/reset-password?token=${token}`);
});

module.exports = router;