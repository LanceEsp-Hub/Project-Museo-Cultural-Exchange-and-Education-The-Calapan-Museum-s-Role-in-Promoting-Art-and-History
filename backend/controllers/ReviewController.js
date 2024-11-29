// backend/controllers/ReviewController.js
const Review = require('../models/Reviews'); // Import the Reviews model

exports.submitReview = async (req, res) => {
    try {
      const reviewData = req.body;
  
      // Add the review and get the result
      const result = await Review.addReview(reviewData);
  
      // Send a response with the relevant data
      res.json({
        success: true,
        message: 'Review submitted successfully!',
        reviewId: result.insertId,  // ID of the newly inserted review
        affectedRows: result.affectedRows  // Optional field based on result structure
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit review. Please try again later.',
        error: error.message
      });
    }
  };


  exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.getAllReviews();  // Call the function from the model
      res.json(reviews);  // Send the reviews as a response
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal Server Error' });  // Handle the error
    }
  };