    // Backend/config/db.js
    const mysql = require('mysql2');
    const dotenv = require('dotenv');
    dotenv.config();

    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'project_museo',
    });

    connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
    });

    module.exports = connection;
