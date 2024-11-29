const Event = require('../models/Event');
const path = require('path');

// Function to handle file upload (using multer middleware)
const upload = require('../middleware/upload');  // Assuming you have a middleware for handling file upload

// Add event item
exports.addEventItem = async (req, res) => {
  try {
    const { title, description, event_date } = req.body;
    let image = req.file ? req.file.filename : null;

    console.log('Received data:', { title, description, event_date, image });

    if (image) {
      // Normalize the image path to use '/' as the separator
      const uploadDir = '/uploads/events/';
      image = path.posix.join(uploadDir, image);  // This ensures the correct path format
    }

    // Ensure required fields are present
    if (!title || !description || !event_date || !image) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Please provide all required fields (title, description, event_date, image).' });
    }

    // Call the model to insert the event item
    const result = await Event.addEventItem(title, description, event_date, image);

    console.log('Insertion result:', result);

    // Only send the relevant information back to the client
    const response = {
      eventId: result.insertId,  // Assuming `insertId` is available in the result object
      imageUrl: image,           // Send back the image URL
    };

    return res.status(201).json({
      message: 'Event item added successfully!',
      data: response,
    });
  } catch (error) {
    console.error('Error adding event:', error);
    return res.status(500).json({ message: 'An error occurred while adding the event item.' });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await Event.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [event] = await Event.getEventById(id);
    if (event.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Update event by ID
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date } = req.body;
    const imageUrl = req.file ? `/uploads/events/${req.file.filename}` : null;  // Handle image URL

    const event = await Event.updateEvent(eventId, title, description, date, imageUrl);  // Assuming updateEvent method in the model

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);  // Return the updated event as response
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Event.deleteEvent(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};


// Controller function to fetch recent events
exports.getRecentEvents = async (req, res) => {
  try {
    const recentEvents = await Event.getRecentEvents(); // Call the model function
    return res.status(200).json(recentEvents); // Return the events in JSON format
  } catch (error) {
    console.error('Error fetching recent events:', error);
    return res.status(500).json({ message: 'Error fetching recent events.' });
  }
};