const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically determine the directory based on the field name
    let directory;
    if (file.fieldname === 'profile_picture') {
      directory = './uploads/user';  // For profile pictures
    } else if (file.fieldname === 'gallery') {
      directory = './uploads/gallery'; // For gallery items
    } else if (file.fieldname === 'events') {
      directory = './uploads/events';  // For event images
    } else {
      directory = './uploads/';  // Default directory
    }

    // Ensure the directory exists or create it if it doesn't
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);  // Set the determined directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on current timestamp and file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);  // Filename format
    cb(null, filename);  // Return only the filename (without directory)
  }
});

// Create upload instance with file filter for specific image types
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);  // Accept the file
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

module.exports = upload;  // Export for use in routes
