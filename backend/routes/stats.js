// backend/routes/stats.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController'); // Controller for stats

// Route to get total visits (logins)
router.get('/total-visits', statsController.getTotalVisits);

// Route to get total users
router.get('/total-users', statsController.getTotalUsers);

router.get('/total-accepted-bookings', statsController.getTotalAcceptedBookings);

router.get('/total-gallery-items', statsController.getTotalGalleryItems);

router.get('/visit-bookings-by-date', statsController.getVisitBookingsByDate);

// routes/stats.js
router.get('/booking-status-counts', statsController.getBookingStatusCounts);


module.exports = router;