const mysql = require('mysql2/promise'); // Use the promise version of mysql2
const dotenv = require('dotenv');

dotenv.config();

// Create a promise-based database connection
const connection = mysql.createPool({ // Use a pool for better performance with concurrent queries
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'project_museo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
