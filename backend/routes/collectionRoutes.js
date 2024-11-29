const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Route to get all collection items
router.get('/all', collectionController.getAllCollectionItems);

module.exports = router;
