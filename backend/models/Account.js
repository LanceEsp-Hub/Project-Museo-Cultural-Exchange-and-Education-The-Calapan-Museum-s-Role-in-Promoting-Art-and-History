// Backend/models/Account.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const Account = {
  createAccount: async (accountData, userId, callback) => {
    const { role, email, password, verification_token } = accountData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Accounts_db (role, email, password, verification_token, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [role, email, hashedPassword, verification_token, userId], callback);
  },

  verifyAccount: (token, callback) => {
    const query = `
      UPDATE Accounts_db SET is_verified = TRUE, verification_token = NULL
      WHERE verification_token = ?
    `;
    db.query(query, [token], callback);
  }
};

module.exports = Account;
