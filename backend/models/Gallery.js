
// backend/models/gallery.js
const db = require('../config/dbpromise'); // your existing database connection

// Insert gallery data into the database
exports.addGalleryItem = async (name, category, description, imagePath) => {
  const query = `
    INSERT INTO gallery (name, category, description, image, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  
  try {
    const result = await db.execute(query, [name, category, description, imagePath]);
    
    // Returning the result object (no need to destructure here)
    return result[0];  // The first element is the result object
  } catch (error) {
    throw error; // Propagate the error up to the controller
  }
};

// Get all gallery items
// Function to get all gallery items
exports.getAllGalleryItems = () => {
  return db.promise().query('SELECT * FROM gallery');  // Query to fetch all items from the gallery table
};

// Update a gallery item by ID
exports.updateGalleryItem = async (id, name, category, description, image) => {
  const result = await dbp.query(
    'UPDATE gallery SET name = ?, category = ?, description = ?, image = ? WHERE id = ?',
    [name, category, description, image, id]
  );
  return result;
};

// Delete a gallery item by ID
exports.deleteGalleryItem = async (id) => {
  const query = 'DELETE FROM gallery WHERE id = ?';

  try {
    // Use db.query() instead of db.execute() to get the result in a simpler format
    const [result] = await db.promise().query(query, [id]);  // Using promise().query() to directly get the result

    console.log('Delete Result:', result);  // Log the result to see the structure

    // Return the result which will include `affectedRows`
    return result;
  } catch (error) {
    console.error('Error executing delete query:', error);
    throw error; // Propagate the error up to the controller
  }
};