const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Route for displaying the review form (you can link this to your template)
router.get('/reviews', ReviewController.getAllReviews);

// Route for handling the form submission
router.post('/submit-review', ReviewController.submitReview);

module.exports = router;