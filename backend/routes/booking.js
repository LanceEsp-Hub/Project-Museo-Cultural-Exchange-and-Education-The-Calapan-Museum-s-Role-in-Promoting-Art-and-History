const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

router.post('/booked', BookingController.createBook);
router.get('/view', BookingController.viewBook);
router.delete('/cancel/:bookingId', BookingController.cancelBooking);


module.exports = router;