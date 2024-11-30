const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Route to fetch all gallery items
router.get('/collection', collectionController.getAllGalleryItems);
router.post('/favorites/add-to-favorites', collectionController.addToFavorites);
router.get('/favorites', collectionController.getFavorites);
router.delete('/favorites', collectionController.removeFromFavorites);


module.exports = router;
