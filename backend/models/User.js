const db = require('../config/db');
const dbp = require('../config/dbpromise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = {
  
  getProfile: (userId, callback) => {
    

    try {
      // Decode the token to retrieve the user ID
      
      

      // Query to fetch full user profile by ID
      const query = `
        SELECT first_name, middle_name, last_name, phone_number, gender,
               birthdate
        FROM users_db
        WHERE user_id = ?
      `;
      dbp.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error fetching profile:', err);
          return callback({ status: 500, message: 'Error fetching profile' });
        }

        if (results.length === 0) {
          return callback({ status: 404, message: 'User not found' });
        }

        // Return user's profile data
        callback(null, results[0]);
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      callback({ status: 500, message: 'Failed to retrieve profile' });
    }
  },

  updateProfile: (userId, profileData, callback) => {
    const { first_name, middle_name, last_name, phone_number, gender, birthdate } = profileData;
    const query = `
      UPDATE users_db
      SET first_name = ?, middle_name = ?, last_name = ?, phone_number = ?, gender = ?, birthdate = ?
      WHERE user_id = ?
    `;
    dbp.query(query, [first_name, middle_name, last_name, phone_number, gender, birthdate, userId], (err, results) => {
      if (err) {
        console.error('Error updating profile:', err);
        return callback({ status: 500, message: 'Error updating profile' });
      }

      callback(null, { message: 'Profile updated successfully' });
    });
  },
};

module.exports = User;