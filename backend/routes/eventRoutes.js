const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');
const upload = require('../middleware/upload');  // The integrated multer upload

// Route for fetching all events
router.get('/', eventController.getAllEvents);

// Route for creating a new event with image upload
router.post('/', upload.single('events'), eventController.addEventItem);  // Use upload.single('events') for file upload

// Route for getting a specific event by ID
router.get('/:id', eventController.getEventById);

// Route for updating an event by ID with image upload
router.put('/:id', upload.single('events'), eventController.updateEvent);  // Use upload.single('events') for file upload

// Route for deleting an event by ID
router.delete('/:id', eventController.deleteEvent);

// Route for fetching recent events
router.get("/recent-events", eventController.getRecentEvents);

router.put('/archive/:id', eventController.archiveEvent);
router.put('/reactivate/:id', eventController.reactivateEvent);

module.exports = router;