const db = require('../config/db'); // Use your database connection with promises

// Function to fetch all items from the 'gallery' table
exports.getAllItems = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery where status = "Active"');
    return rows; // Return the rows
  } catch (error) {
    console.error("Error fetching gallery items from the database:", error);
    throw error; // Propagate the error to the controller
  }
};


// Function to add a favorite to the database
exports.addFavorite = async (userId, itemId) => {
  try {
    // Check if the favorite already exists
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM favorites
      WHERE user_id = ? AND item_id = ?
    `;
    const [checkResult] = await db.execute(checkQuery, [userId, itemId]);

    if (checkResult[0].count > 0) {
      throw new Error("Favorite already exists"); // Throw error if already a favorite
    }

    // Insert the favorite if it doesn't exist
    const insertQuery = `
      INSERT INTO favorites (user_id, item_id)
      VALUES (?, ?)
    `;
    const [result] = await db.execute(insertQuery, [userId, itemId]);

    console.log(`Added to favorites: userId = ${userId}, itemId = ${itemId}`);
    return result; // Return the result for further validation
  } catch (err) {
    console.error("Error adding to favorites:", err); // Log the actual error
    throw new Error(err.message); // Pass the error message back to the controller
  }
};

// Function to fetch user's favorites from the 'favorites' table
exports.getFavorites = async (userId) => {
  try {
    // Query to get the favorite items for the given user
    const query = `
      SELECT g.* 
      FROM gallery g
      INNER JOIN favorites f ON g.id = f.item_id
      WHERE f.user_id = ?
    `;
    const [favorites] = await db.execute(query, [userId]);
    return favorites; // Return the favorites
  } catch (error) {
    console.error("Error fetching favorites from the database:", error);
    throw error; // Propagate the error to the controller
  }
};

// Function to remove a favorite from the database
exports.removeFavorite = async (userId, itemId) => {
  try {
    // Check if the favorite exists
    const query = `SELECT * FROM favorites WHERE user_id = ? AND item_id = ?`;
    const [result] = await db.execute(query, [userId, itemId]);

    if (result.length === 0) {
      throw new Error("Favorite not found");
    }

    // Remove the favorite from the database
    const deleteQuery = `DELETE FROM favorites WHERE user_id = ? AND item_id = ?`;
    await db.execute(deleteQuery, [userId, itemId]);
    console.log(`Favorite removed: userId = ${userId}, itemId = ${itemId}`);
    return true; // Indicating success
  } catch (err) {
    console.error("Error removing favorite:", err);
    throw new Error("Error removing favorite: " + err.message);
  }
};

exports.getRecentCollections = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT id, name, image, createdAt 
      FROM gallery 
      ORDER BY createdAt DESC 
      LIMIT 10
    `);

    // Update the image path to point to the correct folder
    rows.forEach(row => {
      row.image_url = `http://localhost:3000/uploads/gallery/${row.image}`;  // Prepend the correct path to the image
    });

    return rows;
  } catch (error) {
    console.error('Error fetching recent collections from the database:', error);
    throw error;
  }
};
