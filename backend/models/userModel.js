const dbp = require('../config/db');

const Users = {
  getAllUsers: async () => {
    const result = await dbp.query('SELECT * FROM users_db');
    return result[0];
  },

  updateUser: async (userId, userData) => {
    const { first_name, middle_name, last_name, birthdate, gender, phone_number } = userData;
    const result = await dbp.query(
      'UPDATE users_db SET first_name = ?, middle_name = ?, last_name = ?, birthdate = ?, gender = ?, phone_number = ? WHERE User_id = ?',
      [first_name, middle_name, last_name, birthdate, gender, phone_number, userId]
    );
    return { ...userData, User_id: userId }; // Returning updated user data
  },
};

module.exports = { Users };