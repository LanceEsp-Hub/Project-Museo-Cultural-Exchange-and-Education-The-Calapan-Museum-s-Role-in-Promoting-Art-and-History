// backend/routes/galleryRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/gallery'); // Directory for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Route to add a new gallery item
router.post('/api/gallery', upload.single('image'), galleryController.addGalleryItem);

router.get('/all', galleryController.getAllGalleryItems);

// Other routes...
router.delete('/delete/:id', galleryController.deleteGalleryItem);


module.exports = router;
