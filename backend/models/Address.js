// Backend/models/Address.js
const db = require('../config/db');

const Address = {
  createAddress: (addressData, userId, callback) => {
    const { country, region, province, city, barangay, street_address, zip_code } = addressData;
    const query = `
      INSERT INTO Address_db (country, region, province, city, barangay, street_address, zip_code, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [country, region, province, city, barangay, street_address, zip_code, userId], callback);
  },
};

module.exports = Address;
