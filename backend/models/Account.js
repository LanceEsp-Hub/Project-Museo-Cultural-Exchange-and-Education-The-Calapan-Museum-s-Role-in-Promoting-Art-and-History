const db = require('../config/db');
const dbp = require('../config/dbpromise');
const bcrypt = require('bcrypt');

const Account = {
  createAccount: async (accountData, userId, callback) => {
    const { role, email, password, verification_token } = accountData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Accounts_db (role, email, password, verification_token, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    dbp.query(query, [role, email, hashedPassword, verification_token, userId], callback);
  },

  verifyAccount: (token, callback) => {
    const query = `
      UPDATE Accounts_db SET is_verified = TRUE, verification_token = NULL
      WHERE verification_token = ?
    `;
    dbp.query(query, [token], callback);
  },

  getAccountByEmail: (email, callback) => {
    const query = 'SELECT * FROM Accounts_db WHERE email = ?';
    dbp.query(query, [email], callback);
  },
  getUserById: (userId, callback) => {
    const query = `
      SELECT first_name, middle_name, last_name FROM users_db WHERE user_id = ?
    `;
    dbp.query(query, [userId], (error, results) => {
      if (error) return callback(error);
      callback(null, results[0]); // Return the first (and likely only) result
    });
  },
  logLoginHistory: (userId, callback) => {
    const selectQuery = `SELECT * FROM loginhistory WHERE user_id = ?`;
    dbp.query(selectQuery, [userId], (err, results) => {
      if (err) return callback(err);
  
      if (results.length > 0) {
        // User ID exists, so update the timestamp
        const updateQuery = `UPDATE loginhistory SET login_timestamp = NOW() WHERE user_id = ?`;
        dbp.query(updateQuery, [userId], callback);
      } else {
        // User ID does not exist, so insert a new record
        const insertQuery = `INSERT INTO loginhistory (user_id, login_timestamp) VALUES (?, NOW())`;
        dbp.query(insertQuery, [userId], callback);
      }
    });
  },
};

module.exports = Account;