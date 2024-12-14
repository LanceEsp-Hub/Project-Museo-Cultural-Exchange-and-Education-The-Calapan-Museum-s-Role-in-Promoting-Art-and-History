const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const dbp = require('../config/dbpromise');

router.post('/booked', BookingController.createBook);
router.get('/view', BookingController.viewBook);
// router.delete('/cancel/:bookingId', BookingController.cancelBooking);
// router.delete('/cancel/:bookingId', (req, res) => {
//   const { bookingId } = req.params;
//   const { cancellation_reason } = req.body;  // Extract the cancellation reason

//   // Call the controller's cancelBooking method
//   BookingController.cancelBooking(req, res, cancellation_reason); 
// });
router.put('/cancel/:bookingId', BookingController.cancelBooking);

router.get('/bookings', (req, res) => {
  const query = 'SELECT * FROM visitbookings';
  dbp.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update booking status and handle rejection reason
router.put('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { booking_status, rejection_reason } = req.body;

  if (!['pending', 'accepted', 'decline'].includes(booking_status)) {
    return res.status(400).json({ error: 'Invalid booking status' });
  }

  // If status is accepted, set rejection_reason to null
  let query;
  let queryParams = [booking_status, id];

  if (booking_status === 'accepted') {
    query = 'UPDATE visitbookings SET booking_status = ?, rejection_reason = ? WHERE booking_id = ?';
    queryParams = ['accepted', null, id]; // Set rejection_reason to null
  } else if (booking_status === 'decline') {
    query = 'UPDATE visitbookings SET booking_status = ?, rejection_reason = ? WHERE booking_id = ?';
    queryParams = ['decline', rejection_reason, id]; // Keep the rejection reason as it is
  } else {
    query = 'UPDATE visitbookings SET booking_status = ? WHERE booking_id = ?';
  }

  dbp.query(query, queryParams, (err, results) => {
    if (err) throw err;
    res.json({ message: 'Booking status updated successfully.' });
  });
});

module.exports = router;