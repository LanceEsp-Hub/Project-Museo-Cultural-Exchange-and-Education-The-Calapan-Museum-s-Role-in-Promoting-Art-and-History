// backend/models/Event.js
const db = require('../config/dbpromise'); // your existing database connection

// Add event item
exports.addEventItem = async (title, description, event_date, image) => {
  const query = 'INSERT INTO events (title, description, event_date, image_url) VALUES (?, ?, ?, ?)';
  
  try {
    const result = await db.execute(query, [title, description, event_date, image]);
    console.log('DB result:', result);  // Log what the result is
    
    // Assuming db.execute returns a result with a "affectedRows" field, otherwise check result structure
    return result;  
  } catch (error) {
    console.error('Database error in addEventItem:', error);
    throw error;
  }
};

// Get all events
exports.getAllEvents = () => {
  return db.promise().query('SELECT * FROM events ');  // Query to fetch all events from the events table
};

// Get a specific event by ID
exports.getEventById = (id) => {
  return db.promise().query('SELECT * FROM events WHERE id = ?', [id]);
};

// Update an event by ID
exports.updateEventItem = async (eventId, title, description, event_date, image) => {
  const query = `
    UPDATE events 
    SET title = ?, description = ?, event_date = ?, image_url = ?
    WHERE id = ?
  `;

  try {
    const result = await db.execute(query, [title, description, event_date, image, eventId]);
    return result;
  } catch (error) {
    console.error('Database error in updateEventItem:', error);
    throw error;
  }
};

// Delete an event by ID
exports.deleteEvent = async (id) => {
  const query = 'DELETE FROM events WHERE id = ?';

  try {
    const [result] = await db.promise().query(query, [id]);  // Using promise().query() to directly get the result
    console.log('Delete Result:', result);  // Log the result to see the structure

    return result;
  } catch (error) {
    console.error('Error executing delete query:', error);
    throw error; // Propagate the error up to the controller
  }
};


exports.getRecentEvents = () => {
  const query = "SELECT * FROM events ORDER BY created_at DESC LIMIT 3";
  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

exports.updateStatus = async (id, status) => {
  const query = 'UPDATE events SET status = ?, updated_at = NOW() WHERE id = ?';
  try {
    const [result] = await db.promise().query(query, [status, id]);
    return result;
  } catch (error) {
    console.error('Error updating event status:', error);
    throw error;
  }
};