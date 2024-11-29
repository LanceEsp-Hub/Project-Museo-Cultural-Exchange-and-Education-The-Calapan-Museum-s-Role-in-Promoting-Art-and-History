const Gallery = require('../models/Gallery'); // Import the gallery model
const path = require('path');

// Add gallery item
exports.addGalleryItem = async (req, res) => {
  try {
    const { name, category, description, date } = req.body;
    let image = req.file ? req.file.filename : null;

    if (image) {
      // Normalize the image path to use '/' as the separator
      const uploadDir = '/uploads/gallery/';
      image = path.posix.join(uploadDir, image);
    }

    // Ensure required fields are present
    if (!name || !category || !image) {
      return res.status(400).json({ message: 'Please provide all required fields (name, category, image).' });
    }

    // Call the model to insert the gallery item
    const result = await Gallery.addGalleryItem(name, category, description, date, image);

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
    const [rows] = await Gallery.getAllGalleryItems();

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'No gallery items found.' });
    }

    // Map each item to include the full image URL
    const itemsWithImageUrls = rows.map(item => ({
      ...item,
      imageUrl: item.image
        ? `http://localhost:3000${item.image}` // Full URL for the image
        : null, // Handle cases where the image is null
    }));

    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return res.status(500).json({ message: 'An error occurred while retrieving the gallery items.' });
  }
};

// Update a gallery item by ID
exports.updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  let imagePath = req.body.imageUrl; // Default to the existing image

  // Validate input data
  if (!id || !name || !category || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (req.file) {
    imagePath = `/uploads/gallery/${req.file.filename}`;
  }

  console.log(`Updating gallery item with ID: ${id}`);
  console.log(`Received data: name=${name}, category=${category}, description=${description}, imagePath=${imagePath}`);

  try {
    // Perform the update
    const result = await Gallery.updateGalleryItem(id, name, category, description, imagePath);

    if (result && result.affectedRows > 0) {
      return res.status(200).json({ message: 'Gallery item updated successfully!' });
    } else {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    console.error('Error during update:', error);
    return res.status(500).json({ message: 'Error updating gallery item. Please try again.' });
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
