const collectionModel = require('../models/Collection');

// Controller function to fetch all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await collectionModel.getAllItems();
    console.log("Fetched items from the model:", items); // Log fetched items for debugging
    res.json(items); // Send the data to the client
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ message: "Error fetching gallery items", error: error.message });
  }
};

// Controller method to handle adding a favorite
exports.addToFavorites = async (req, res) => {
  const { userId, itemId } = req.body; // Expecting userId and itemId from the form submission

  if (!userId || !itemId) {
    return res.status(400).json({ message: 'User ID and Item ID are required' });
  }

  try {
    const result = await collectionModel.addFavorite(userId, itemId);
    res.status(200).json({ message: 'Added to favorites successfully!', result });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Controller method to handle fetching favorites
exports.getFavorites = async (req, res) => {
  const { userId } = req.query; // Getting the userId from the query string

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const favorites = await collectionModel.getFavorites(userId);
    if (favorites.length > 0) {
      res.status(200).json(favorites); // Send favorites data
    } else {
      res.status(200).json({ message: "No favorites found." }); // Send message when no favorites
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
};

// Controller method to handle removing a favorite
exports.removeFromFavorites = async (req, res) => {
  const { userId, itemId } = req.body; // Get userId and itemId from the request body

  if (!userId || !itemId) {
    return res.status(400).json({ message: 'User ID and Item ID are required' });
  }

  try {
    const result = await collectionModel.removeFavorite(userId, itemId);

    if (result) {
      res.status(200).json({ message: "Favorite removed successfully" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Error removing favorite", error: error.message });
  }
};

// Importing model function for recent collections
const { getRecentCollections } = require('../models/Collection');

// Controller function to fetch recent collections
exports.getRecentCollections = async (req, res) => {
  try {
    const collections = await getRecentCollections();
    res.status(200).json(collections);  // Return the collections as a JSON response
  } catch (error) {
    console.error("Error fetching recent collections:", error);
    res.status(500).json({ message: 'Failed to load recent collections', error: error.message });
  }
};
