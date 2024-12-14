const { Stats } = require('../models/Stats'); // Stats model

// Controller to get total visits (logins)
exports.getTotalVisits = async (req, res) => {
  try {
    const totalVisits = await Stats.getTotalVisits(); // Get total visits from loginhistory
    res.json({
      success: true,
      message: 'Total visits fetched successfully!',
      stats: [
        {
          title: 'TOTAL VISITS',
          value: totalVisits.toString(),
          id: 'TotalVisits',
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching total visits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total visits.',
      error: error.message,
    });
  }
};

// Controller to get total users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Stats.getTotalUsers(); // Get total users from users_db
    res.json({
      success: true,
      message: 'Total users fetched successfully!',
      stats: [
        {
          title: 'TOTAL USERS',
          value: totalUsers.toString(),
          id: 'TotalUsers',
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total users.',
      error: error.message,
    });
  }
};

// Controller to get total accepted bookings
exports.getTotalAcceptedBookings = async (req, res) => {
  try {
    const totalAcceptedBookings = await Stats.getTotalAcceptedBookings(); // Fetch total accepted bookings from the database

    res.status(200).json({
      success: true,
      message: 'Total accepted bookings fetched successfully!',
      stats: [
        {
          title: 'ACCEPTED BOOKINGS',
          value: totalAcceptedBookings.toString(),
          id: 'AcceptedBookings',
        },
      ],
    });
  } catch (error) {
    console.error('Error in getTotalAcceptedBookings controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accepted bookings.',
    });
  }
};


exports.getTotalGalleryItems = async (req, res) => {
    try {
      const totalGalleryItems = await Stats.getTotalGalleryItems(); // Get total rows from gallery table
      res.json({
        success: true,
        message: 'Total gallery items fetched successfully!',
        stats: [
          {
            title: 'TOTAL GALLERY ITEMS',
            value: totalGalleryItems.toString(),
            id: 'TotalGalleryItems',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching total gallery items:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch total gallery items.',
        error: error.message,
      });
    }
  };

  exports.getVisitBookingsByDate = async (req, res) => {
    try {
      // Fetch visit bookings grouped by visit_date
      const results = await Stats.getVisitBookingsByDate();
  
      // Send the results to the frontend
      res.status(200).json({
        success: true,
        message: 'Visit bookings by date fetched successfully!',
        bookings: results,
      });
    } catch (error) {
      console.error('Error fetching visit bookings by date:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch visit bookings by date.',
      });
    }
  };

  exports.getVisitBookingsByDate = async (req, res) => {
    try {
      const results = await Stats.getVisitBookingsByDate();
  
      res.status(200).json({
        success: true,
        message: 'Visit bookings by date fetched successfully!',
        bookings: results, // Send the raw array
      });
    } catch (error) {
      console.error('Error fetching visit bookings by date:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch visit bookings by date.',
      });
    }
  };
  

// Controller method to handle the API request for booking status counts
exports.getBookingStatusCounts = async (req, res) => {
    try {
      const statusCounts = await Stats.getBookingStatusCounts();  // Call the model method
      res.json(statusCounts);  // Send the result back as a JSON response
    } catch (error) {
      console.error('Error in controller:', error);
      res.status(500).json({ message: 'Error fetching booking status counts' });
    }
  };
  