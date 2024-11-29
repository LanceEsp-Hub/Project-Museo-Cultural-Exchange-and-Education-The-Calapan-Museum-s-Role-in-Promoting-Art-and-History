// backend/routes/galleryCollectionRoutes.js

const express = require('express');
const router = express.Router();
const galleryCollectionController = require('../controllers/galleryCollectionController');

// Route to fetch all gallery items
router.get('/gallery-collection', galleryCollectionController.getAllGalleryItems);

module.exports = router;
