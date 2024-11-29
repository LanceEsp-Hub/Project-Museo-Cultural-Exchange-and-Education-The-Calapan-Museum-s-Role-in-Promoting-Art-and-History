// Backend/models/User.js
const db = require('../config/db');

const User = {
  createUser: (userData, callback) => {
    const { first_name, middle_name, last_name, birthdate, gender, phone_number } = userData;
    const query = `
      INSERT INTO Users_db (first_name, middle_name, last_name, birthdate, gender, phone_number)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [first_name, middle_name, last_name, birthdate, gender, phone_number], callback);
  },
};

module.exports = User;
