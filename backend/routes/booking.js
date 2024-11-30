const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const dbp = require('../config/dbpromise');

router.post('/booked', BookingController.createBook);
router.get('/view', BookingController.viewBook);
router.delete('/cancel/:bookingId', BookingController.cancelBooking);

router.get('/bookings', (req, res) => {
    const query = 'SELECT * FROM visitbookings';
    dbp.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Update booking status
  router.put('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { booking_status } = req.body;
  
    if (!['pending', 'accepted', 'decline'].includes(booking_status)) {
      return res.status(400).json({ error: 'Invalid booking status' });
    }
  
    const query = 'UPDATE visitbookings SET booking_status = ? WHERE booking_id = ?';
    dbp.query(query, [booking_status, id], (err, results) => {
      if (err) throw err;
      res.json({ message: 'Booking status updated successfully.' });
    });
  });
  

module.exports = router;