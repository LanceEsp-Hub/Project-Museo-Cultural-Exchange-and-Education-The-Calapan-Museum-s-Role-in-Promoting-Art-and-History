const dbp = require('../config/db'); // Database connection

// Stats model
const Stats = {
  // Get the total visits (logins) from the loginhistory table
  getTotalVisits: async () => {
    const result = await dbp.query('SELECT COUNT(*) AS totalVisits FROM loginhistory');
    return result[0][0].totalVisits; // Access the first row and the totalVisits count
  },

  // Get the total users count from the users_db table
  getTotalUsers: async () => {
    const result = await dbp.query('SELECT COUNT(*) AS totalUsers FROM users_db');
    return result[0][0].totalUsers; // Access the first row and the totalUsers count
  },

  // Get the total accepted bookings count from the visitbookings table
  getTotalAcceptedBookings: async () => {
    const result = await dbp.query('SELECT COUNT(*) AS count FROM visitbookings WHERE booking_status = "accepted"');
    return result[0][0].count || 0; // Access the first row and the count value
  },

  getTotalGalleryItems: async () => {
    const result = await dbp.query('SELECT COUNT(*) AS totalGallery FROM gallery');
    return result[0][0].totalGallery; // Access the first row and the totalGallery count
  },

  // Get the visit bookings grouped by createdAt date and filtered by accepted bookings
  getVisitBookingsByDate: async () => {
    const query = `
      SELECT DATE(created_at) AS visit_date, booking_status
      FROM visitbookings
      WHERE booking_status = 'accepted'
      ORDER BY visit_date ASC;
    `;
    const result = await dbp.query(query);
    return result[0]; // Return the result directly
  },

// Get booking status counts (pending, accepted, declined, cancelled)
getBookingStatusCounts: async () => {
    try {
      // SQL query to get the count of each booking status (pending, accepted, declined, cancelled)
      const query = `
        SELECT booking_status, COUNT(*) as count
        FROM visitbookings
        WHERE booking_status IN ('pending', 'accepted', 'decline', 'Cancelled')
        GROUP BY booking_status;
      `;
      
      const result = await dbp.query(query);  // Execute the query
  
      // Return the result directly, assuming it already contains the status counts
      return result;
    } catch (error) {
      console.error('Error fetching booking status counts in model:', error);
      throw error;  // Rethrow the error to be handled upstream
    }
  }
  
  
  
};



module.exports = { Stats };
