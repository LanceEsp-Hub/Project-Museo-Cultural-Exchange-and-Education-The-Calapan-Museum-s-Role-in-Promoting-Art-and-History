const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Profile routes
router.get('/profile', UserController.getProfile);
router.put('/profileupdate', UserController.updateProfile);  // Add the PUT route for updating the profile

module.exports = router;