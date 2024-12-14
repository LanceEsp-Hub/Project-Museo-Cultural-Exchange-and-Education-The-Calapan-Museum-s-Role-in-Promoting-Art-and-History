// backend/models/GalleryCollection.js

const db = require('../config/dbpromise'); // database connection

// Fetch all gallery items
exports.getAllGalleryItems = async () => {
  const query = 'SELECT * FROM gallery';
  try {
    const [rows] = await db.query(query); // Use destructuring to get rows directly
    return rows; // Return the rows array directly
  } catch (error) {
    throw error; // Propagate the error up to the controller
  }
};
