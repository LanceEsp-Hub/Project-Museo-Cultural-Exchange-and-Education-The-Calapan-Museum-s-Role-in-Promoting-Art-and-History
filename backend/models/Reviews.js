const db = require('../config/db'); // Ensure you're using your database connection properly

// Function to add a review
exports.addReview = async (reviewData) => {
  const { name, email, comments, rating } = reviewData;

  if (!name || !email || !comments) {
    throw new Error('Missing required fields for review');
  }

  const query = 'INSERT INTO reviews (name, email, comments, rating) VALUES (?, ?, ?, ?)';

  try {
    // Execute the query
    const result = await db.execute(query, [name, email, comments, rating]);
    
    // Log the result to inspect its structure
    console.log('Database result:', result);

    // Adjust according to the actual result structure
    return {
      insertId: result.insertId,  // Access insertId directly (if available)
      affectedRows: result.affectedRows  // You might need to check if this exists
    };
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
exports.getAllReviews = async () => {
  try {
    const result = await db.execute('SELECT * FROM reviews');
    console.log('Database result:', result);  // Log the result to check its structure
    return result[0];  // Adjust based on the actual result structure
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
