// backend/models/gallery.js
const db = require('../config/dbpromise'); // your existing database connection

// Insert gallery data into the database
exports.addGalleryItem = async (name, category, description, date, imagePath) => {
  const query = `
    INSERT INTO gallery (name, category, description, date, image, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  
  try {
    const result = await db.execute(query, [name, category, description, date, imagePath]);
    
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

exports.updateGalleryItem = async (id, name, category, description, image) => {
  if (image === undefined) {
    image = null;  // Explicitly set image to null if undefined
  }

  try {
    const result = await dbp.query(
      'UPDATE gallery SET name = ?, category = ?, description = ?, image = ? WHERE id = ?',
      [name, category, description, image, id]
    );

    // Log the result to inspect the structure
    console.log('Database result:', result);

    // Check if affectedRows is available in the result
    if (result && result[0] && result[0].affectedRows > 0) {
      return result;  // Successfully updated
    } else {
      console.error('No rows were updated.');
      return null;  // Or handle as needed
    }
  } catch (error) {
    console.error('Error during update:', error);
    throw error;  // Or handle the error as needed
  }
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

exports.updateGalleryItem = async (id, name, category, description, imagePath) => {
  if (!id || !name || !category || !description) {
    throw new Error('Missing required fields for updating gallery item');
  }

  const query = `
    UPDATE gallery 
    SET name = ?, category = ?, description = ?, image = ?, updatedAt = NOW() 
    WHERE id = ?
  `;

  try {
    const [rows] = await db.execute(query, [name, category, description, imagePath, id]);
    console.log('Update result:', rows);

    if (rows.affectedRows > 0) {
      return rows;
    } else {
      throw new Error('No rows updated');
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

exports.archiveGalleryItem = async (id) => {
  const query = 'UPDATE gallery SET status = "Archived", updatedAt = NOW() WHERE id = ?';

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error updating status to archived:', error);
    throw error;
  }
};

exports.reactivateGalleryItem = async (id) => {
  const query = 'UPDATE gallery SET status = "Active", updatedAt = NOW() WHERE id = ?';

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error('Error updating status to active:', error);
    throw error;
  }
};