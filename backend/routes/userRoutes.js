const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContr');

// Get all users
router.get('/users', userController.getAllUsers);

// Update user by ID
router.put('/users/:id', userController.updateUser);

module.exports = router;