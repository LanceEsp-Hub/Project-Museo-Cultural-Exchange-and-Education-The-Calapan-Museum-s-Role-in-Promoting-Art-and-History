const Collection = require('../models/Collection'); // Import the collection model

// Get all collection items
exports.getAllCollectionItems = async (req, res) => {
  try {
    const items = await Collection.getAllItems();
    
    if (items.length === 0) {
      return res.status(404).json({ message: 'No collection items found.' });
    }

    // Map each item to include the full image URL
    const itemsWithImageUrls = items.map(item => ({
      ...item,
      imageUrl: `http://localhost:3000/uploads/gallery/${item.image}`
    }));

    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    console.error('Error fetching collection items:', error);
    return res.status(500).json({ message: 'An error occurred while retrieving the collection items.' });
  }
};
