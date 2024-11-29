const db = require('../config/dbpromise'); // Database connection

// Function to retrieve all collection items from the gallery
exports.getAllItems = async () => {
  const [rows] = await db.query('SELECT * FROM gallery');
  return rows;
};
