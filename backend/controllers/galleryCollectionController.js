// backend/controllers/galleryCollectionController.js

const GalleryCollection = require('../models/GalleryCollection');

exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await GalleryCollection.getAllGalleryItems();
    console.log("Fetched gallery items:", galleryItems); // Log items to the console
    res.status(200).json(galleryItems);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ message: "Failed to fetch gallery items" });
  }
};
