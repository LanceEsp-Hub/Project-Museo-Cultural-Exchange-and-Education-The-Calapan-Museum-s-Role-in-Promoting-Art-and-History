const User = require('../models/User');
const Address = require('../models/Address');
const Account = require('../models/Account');
const Booking = require('../models/Booking.js')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.createBook = (req, res) => {
  const {
    user_id,
    visit_date,
    booking_time,
    number_of_guests,
  } = req.body;

  // Step 1: Generate Booking Data
  const bookingData = {// Unique booking ID
    user_id,
    visit_date,
    booking_time,
    number_of_guests,
    booking_status: "Pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Step 2: Insert Booking
  Booking.createBooking(bookingData, (err, result) => {
    if (err) {
        console.error('Error creating booking:', err); // Log error
        return res.status(500).send('Error creating booking');
      }
    // Step 3: Send Confirmation Email (optional)
   
  });

  
};
exports.viewBook = async (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      // Decode the token to extract the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
      const userId = decoded.user_id; // Assuming the user ID is stored in the token payload
  
      // Fetch bookings for the user
      Booking.getBookings(userId, (err, bookings) => {
        if (err) {
          console.error('Error fetching bookings:', err);
          return res.status(500).json({ message: 'Error fetching bookings' });
        }
  
        if (!bookings || bookings.length === 0) {
          return res.status(404).json({ message: 'No bookings found for this user' });
        }
  
        // Respond with the bookings data
        res.status(200).json({ bookings: bookings });

        
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      res.status(500).json({ message: 'Failed to decode token' });
    }
  };

  exports.cancelBooking = (req, res) => {
    const { bookingId } = req.params; // Get the bookingId from the route parameter
  
    // Call the model's method to delete the booking
    Booking.deleteBooking(bookingId, (err, result) => {
      if (err) {
        console.error('Error deleting booking:', err);
        return res.status(500).json({ message: 'Failed to delete booking' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
    });
  };