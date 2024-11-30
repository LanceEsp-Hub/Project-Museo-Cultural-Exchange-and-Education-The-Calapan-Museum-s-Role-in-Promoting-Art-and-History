const dbp = require('../config/dbpromise');

const Booking = {
  createBooking: (bookingData, callback) => {
    const {
      user_id,
      visit_date,
      booking_time,
      number_of_guests,
      booking_status,
      created_at,
      updated_at
    } = bookingData;
    const query = 'INSERT INTO visitbookings (user_id, visit_date, booking_time, number_of_guests, booking_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    dbp.query(
      query,
      [
        user_id,
        visit_date,
        booking_time,
        number_of_guests,
        booking_status,
        created_at,
        updated_at
      ],
      callback
    );
  },

  getBookings: (userId, callback) => {
    try {
      // Query to fetch bookings based on user ID
      const query = `
        SELECT booking_id, visit_date, booking_time, number_of_guests, booking_status
        FROM visitbookings
        WHERE user_id = ?
      `;
      dbp.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error fetching bookings:', err);
          return callback({ status: 500, message: 'Error fetching bookings' });
        }

        if (results.length === 0) {
          return callback({ status: 404, message: 'No bookings found for this user' });
        }

        // Return the list of bookings
        callback(null, results);
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      callback({ status: 500, message: 'Failed to retrieve bookings' });
    }
  },
  deleteBooking: (bookingId, callback) => {
    const query = 'DELETE FROM visitbookings WHERE booking_id = ?';
    dbp.query(query, [bookingId], callback); // Execute the query
  }
};

module.exports = Booking;