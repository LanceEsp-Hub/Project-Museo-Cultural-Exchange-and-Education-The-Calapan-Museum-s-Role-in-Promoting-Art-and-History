const User = require('../models/User');
const Address = require('../models/Address');
const Account = require('../models/Account');
const Booking = require('../models/Booking.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dbp = require('../config/dbpromise');

exports.createBook = (req, res) => {
  const {
    user_id,
    visit_date,
    booking_time,
    number_of_guests,
    organization,  // New field for organization
  } = req.body;

  // Step 1: Check if the user already has a pending booking
  const checkBookingQuery = `
    SELECT * FROM visitbookings
    WHERE user_id = ? AND booking_status = 'Pending'
  `;
  
  dbp.query(checkBookingQuery, [user_id], (err, results) => {
    if (err) {
      console.error('Error checking pending booking:', err);
      return res.status(500).send('Error checking booking status');
    }

    if (results.length > 0) {
      // If a pending booking exists, return a notification
      return res.status(400).json({
        message: 'You already have a pending booking. You cannot create another one.'
      });
    }

    // Step 2: Generate Booking Data with Optional Organization Field
    const bookingData = {
      user_id,
      visit_date,
      booking_time,
      number_of_guests,
      organization: organization && organization.trim() !== "" ? organization : "Individual",  // Default to "Individual"
      booking_status: "Pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Step 3: Insert Booking
    Booking.createBooking(bookingData, (err, result) => {
      if (err) {
        console.error('Error creating booking:', err); // Log error
        return res.status(500).send('Error creating booking');
      }

      // Step 4: Send response back with the created booking data or success message
      res.status(201).json({
        message: 'Booking successfully created',
        bookingId: result.booking_id, // Assuming the result contains the booking ID
      });
    });
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
  const { bookingId } = req.params;  // Get the bookingId from the route parameter
  const { cancellation_reason } = req.body;  // Get the cancellation reason from the request body

  // Ensure cancellation_reason is provided
  if (!cancellation_reason || cancellation_reason.trim() === "") {
    return res.status(400).json({ message: "Cancellation reason is required." });
  }

  // SQL query to update booking with cancellation reason
  const query = `
    UPDATE visitbookings
    SET booking_status = 'Cancelled', cancellation_reason = ?
    WHERE booking_id = ?
  `;
  
  dbp.query(query, [cancellation_reason, bookingId], (err, result) => {
    if (err) {
      console.error('Error canceling booking:', err);
      return res.status(500).json({ message: 'Failed to cancel booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Booking cancelled successfully' });
  });
};
