const Gallery = require('../models/Gallery'); // Import the gallery model

// Add gallery item
exports.addGalleryItem = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Ensure required fields are present
    if (!name || !category || !image) {
      return res.status(400).json({ message: 'Please provide all required fields (name, category, image).' });
    }

    // Call the model to insert the gallery item
    const result = await Gallery.addGalleryItem(name, category, description, image);

    return res.status(201).json({
      message: 'Gallery item added successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding the gallery item.' });
  }
};

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const [rows, fields] = await Gallery.getAllGalleryItems();
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No gallery items found.' });
    }

    // Map each item to include the full image URL
    const itemsWithImageUrls = rows.map(item => ({
      ...item,
      imageUrl: `http://localhost:3000/uploads/gallery/${item.image}`
    }));

    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return res.status(500).json({ message: 'An error occurred while retrieving the gallery items.' });
  }
};

// Update a gallery item by ID
exports.updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Ensure required fields are present
    if (!name || !category) {
      return res.status(400).json({ message: 'Please provide the required fields (name, category).' });
    }

    // Call the model to update the gallery item
    const updatedItem = await Gallery.updateGalleryItem(id, name, category, description, image);

    if (!updatedItem) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }

    return res.status(200).json({
      message: 'Gallery item updated successfully!',
      data: {
        ...updatedItem,
        imageUrl: `http://localhost:3000/uploads/gallery/${updatedItem.image}`
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the gallery item.' });
  }
};

// Delete a gallery item by ID
exports.deleteGalleryItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Call the model to delete the gallery item
    const result = await Gallery.deleteGalleryItem(id);

    console.log('Result from Model:', result);  // Log the result for debugging

    if (result && result.affectedRows > 0) {
      return res.status(200).json({ message: 'Gallery item deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return res.status(500).json({ message: 'Failed to delete gallery item.' });
  }
};
