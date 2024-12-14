<template>
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the Oriental Mindoro Heritage Museum's collections. Book your visit and discover history, culture, and art.">
    <meta name="keywords" content="Museum, Oriental Mindoro, Heritage, Artifacts, Booking, Collections">
    <meta name="author" content="Oriental Mindoro Heritage Museum">
    <meta property="og:title" content="Oriental Mindoro Heritage Museum">
    <meta property="og:description" content="Discover the rich cultural heritage of Oriental Mindoro.">
       <!-- SEO Meta Tags -->
       <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />
    <!-- SEO Meta Tags -->
    <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />

    <!-- Open Graph Meta Tags for Social Sharing -->
    <meta property="og:title" content="Oriental Mindoro Heritage Museum" />
    <meta property="og:description" content="Discover the rich culture and history of Oriental Mindoro at our heritage museum." />
    <meta property="og:image" content="/path-to-your-image.jpg" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Oriental Mindoro Heritage Museum" />
    <meta name="twitter:description" content="Explore the culture and history of Oriental Mindoro at the Heritage Museum." />
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-custom navbar-dark">
      <div class="navbar-row d-flex align-items-center">
        <!-- Profile Picture -->
        <router-link to="/Profile" class="profile-link d-flex align-items-center">
          <img 
            v-if="profilePictureContainer.imageUrl" 
            :src="profilePictureContainer.imageUrl" 
            alt="Profile Picture" 
            class="profile-picture" 
          />
        </router-link>

        <!-- Brand Name -->
        <span class="navbar-brand text-center">
          ORIENTAL MINDORO HERITAGE MUSEUM
        </span>

        <!-- Toggle Button -->
        <button class="navbar-toggler" type="button" @click="toggleNavbarLinks">
          <i class="bi bi-list text-white"></i>
        </button>
      </div>

      <!-- Collapsible Navbar Links -->
      <div v-if="showNavbarLinks" id="navbarLinks">
        <ul class="navbar-nav text-center">
          <li class="nav-item">
            <a class="nav-link" href="/homepage">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/collection/:id">Collections</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/bookrecord">Booking</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>


<div class="bg">
  <!-- Modern Bookings Container -->
<div class="container booking-container p-4 shadow-lg bg-white rounded">
  <h2 class="text-center text-primary mb-4">Your Bookings</h2>

  <!-- DataTable for Bookings -->
  <table id="bookingsTable" class="table table-hover table-bordered">
    <thead class="table-primary">
      <tr>
        <th>Visit Date</th>
        <th>Booking Time</th>
        <th>Number of Guests</th>
        <th>Booking Status</th>
        <th>Organization</th>
        <th>Rejection Reason</th>
        <th>Cancellation Reason</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(booking, index) in bookings" :key="booking.booking_id">
        <td>{{ formatDate(booking.visit_date) }}</td>
        <td>{{ booking.booking_time }}</td>
        <td>{{ booking.number_of_guests }}</td>
        <td>
          <span :class="{
            'badge bg-success': booking.booking_status === 'Confirmed',
            'badge bg-danger': booking.booking_status === 'Cancelled',
            'badge bg-warning text-dark': booking.booking_status === 'pending'
          }">
            {{ booking.booking_status }}
          </span>
        </td>
        <td>{{ booking.organization || 'Individual' }}</td>
        <td>{{ booking.rejection_reason || 'N/A' }}</td>
        <td>{{ booking.cancellation_reason || 'N/A' }}</td>
        <td>
          <button v-if="booking.booking_status === 'pending'" 
                  @click="handleCancelBooking(booking.booking_id, index)" 
                  class="btn btn-outline-danger btn-sm">
            Cancel
          </button>
          <span v-else-if="booking.booking_status === 'Cancelled'" class="text-danger">
            Cancelled
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- No bookings found message -->
  <div v-if="!bookings.length" class="text-center text-muted mt-4">
    <p>No bookings found.</p>
  </div>
</div>

<!-- Confirmation Modal for Canceling Booking -->
<div class="modal fade" id="confirmCancelModal" tabindex="-1" aria-labelledby="confirmCancelModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="confirmCancelModalLabel">Cancel Booking</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to cancel this booking?</p>
        <!-- Cancellation reason input -->
        <div class="mb-3">
          <label for="cancellationReason" class="form-label">Cancellation Reason</label>
          <textarea v-model="cancellationReason" id="cancellationReason" class="form-control" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-danger" @click="confirmCancelBooking">Yes, Cancel Booking</button>
      </div>
    </div>
  </div>
</div>

<!-- Result Modal for Success/Failure Messages -->
<div class="modal fade" id="cancelBookingResultModal" tabindex="-1" aria-labelledby="cancelBookingResultModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="cancelBookingResultModalLabel">{{ modalTitle }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{ modalMessage }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button v-if="modalRedirect" type="button" class="btn btn-primary" @click="gotoView">Go to Bookings</button>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookings: [],  // Holds the list of bookings
      errorMessage: '',  // To store any error messages
      profilePictureContainer: {
        imageUrl: null,
        error: null,
      },
      showNavbarLinks: false,
      modalTitle: '',
      modalMessage: '',
      bookingToCancel: null, // Store the booking that is about to be canceled
      cancellationReason: '', // Store the cancellation reason input by the user
    };
  },
  methods: {
    formatDate(dateString) {
    const date = new Date(dateString);  // Convert to Date object
    const year = date.getFullYear();  // Get full year
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month with leading zero
    const day = String(date.getDate()).padStart(2, '0');  // Get day with leading zero
    return `${year}-${month}-${day}`;  // Return formatted string as YYYY-MM-DD
  },
    // Fetch bookings for the user
    async fetchBookings() {
      const token = localStorage.getItem('auth_token'); // Assuming JWT token is stored in localStorage

      try {
        const response = await axios.get('http://localhost:3000/api/auth/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.bookings = response.data.bookings;
        this.initializeDataTable();
      } catch (error) {
        this.showModal('Error', 'Failed to fetch bookings.');
      }
    },

    // Trigger the confirmation modal for canceling the booking
    handleCancelBooking(bookingId) {
      this.bookingToCancel = bookingId;
      const modal = new bootstrap.Modal(document.getElementById('confirmCancelModal'));
      modal.show();
    },

    // Fetch the user's profile picture
    async fetchProfilePicture() {
      try {
        const profilePictureFileName = localStorage.getItem('profile_picture');
        if (profilePictureFileName) {
          const response = await axios.get(`http://localhost:3000/uploads/user/${profilePictureFileName}`, { responseType: 'blob' });
          this.profilePictureContainer = {
            imageUrl: URL.createObjectURL(response.data),
            error: null,
          };
        } else {
          this.profilePictureContainer.error = 'Profile picture not found.';
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        this.profilePictureContainer.error = 'Failed to load profile picture.';
      }
    },

    // Initialize DataTable (using Bootstrap 5 and jQuery)
    initializeDataTable() {
      const table = $('#bookingsTable').DataTable();

      // Destroy the previous DataTable instance to avoid reinitialization errors
      table.destroy();

      setTimeout(() => {
        // Initialize DataTable with pagination, searching, and ordering enabled
        $('#bookingsTable').DataTable({
          paging: true,          // Enable pagination
          searching: true,       // Enable search bar
          ordering: true,        // Enable sorting by column
          info: true,            // Display information (e.g., showing entries 1-10 of 50)
          lengthMenu: [5, 10, 15, 20],  // Define the options for how many rows to display
        });
      }, 0);
    },

    // Confirm cancel the booking and perform the cancellation
    async confirmCancelBooking() {
      const bookingId = this.bookingToCancel;
      const cancellationReason = this.cancellationReason.trim(); // Get the cancellation reason
      const token = localStorage.getItem('auth_token'); // Get the JWT token

      if (!cancellationReason) {
        this.modalTitle = 'Error';
        this.modalMessage = 'Please provide a cancellation reason.';
        const resultModal = new bootstrap.Modal(document.getElementById('cancelBookingResultModal'));
        resultModal.show();
        return;
      }

      try {
        // Update the booking status to "Cancelled" and add the cancellation reason
        const response = await axios.put(`http://localhost:3000/api/auth/cancel/${bookingId}`, {
          cancellation_reason: cancellationReason, // Send the cancellation reason to the backend
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Show modal with success message
        this.modalTitle = 'Success';
        this.modalMessage = 'Booking canceled successfully.';
        const resultModal = new bootstrap.Modal(document.getElementById('cancelBookingResultModal'));
        resultModal.show();

        // Update the bookings list: the booking is cancelled, so we don't remove it
        const bookingIndex = this.bookings.findIndex(booking => booking.booking_id === bookingId);
        if (bookingIndex !== -1) {
          this.bookings[bookingIndex].booking_status = 'Cancelled';
          this.bookings[bookingIndex].cancellation_reason = cancellationReason; // Store cancellation reason
        }

        // Clear the cancellation reason input field
        this.cancellationReason = '';
      } catch (error) {
        console.error('Cancel Booking Error:', error);
        this.modalTitle = 'Error';
        this.modalMessage = 'Failed to cancel booking.';
        const resultModal = new bootstrap.Modal(document.getElementById('cancelBookingResultModal'));
        resultModal.show();
      }
    },

    // Show Bootstrap modal with title and message
    showModal(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      const modal = new bootstrap.Modal(document.getElementById('messageModal'));
      modal.show();
    },

    // Toggle navbar links visibility
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },

    // Log out and clear localStorage
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      localStorage.removeItem('profile_picture');
      this.$router.push('/login');
    },

    // Navigate to booking page
    gotoView() {
      this.$router.push('/bookrecord');
    },
  },

  mounted() {
    this.fetchBookings(); // Fetch bookings when the component is mounted
    this.fetchProfilePicture(); // Fetch the profile picture when the component is mounted
  },
  computed: {
  sortedBookings() {
    return this.bookings.sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
  }
},

};
</script>



<style scoped>


/* Navbar container styles */
.navbar-custom {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(23, 143, 37, 0.6); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Blurred background effect */
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap; /* Allow collapsing for smaller screens */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Profile Picture */
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.profile-picture:hover {
  transform: scale(1.1);
  border-color: #ffd700;
}

/* Navbar Row */
.navbar-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

/* Brand Name */
.navbar-brand {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

/* Toggle Button */
.navbar-toggler {
  background: transparent;
  border: none;
  outline: none;
}

.navbar-toggler i {
  font-size: 1.5rem;
}

/* Collapsible Navbar Links */
#navbarLinks {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  border-top: 1px solid #444;
  padding: 15px 0;
  transition: max-height 0.5s ease;
  overflow: hidden;
}

.navbar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 5px 0;
}

.nav-link {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 20px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
  background-color: rgba(255, 255, 255, 0.1);
}


/* General Styles */
.bg {
  position: relative; /* To position the pseudo-element */
  padding: 60px 20px; /* Slightly lower the content */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Ensure the pseudo-element doesn't spill out */
  min-height: 100vh;
  max-height: 100vh;


}

/* Add blurred background */
.bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bgviewbook.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px); /* Apply blur to the background image */
  z-index: -1; /* Place it behind the content */
}

.booking-container {
  background-color: #f8f9fa; /* Light background color */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  padding: 30px; /* Extra padding for better spacing */
  max-width: 1400px; /* Maximum width for the container */
  margin: 7% auto; /* Center the container horizontally */
}

h2 {
  font-weight: bold;
  font-size: 1.8rem; /* Larger font size for the heading */
}

.table {
  margin-top: 20px;
  font-size: 1rem; /* Increased font size for better readability */
  width: 100%; /* Ensure the table spans the container */
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1; /* Light hover effect */
}

.table-bordered th,
.table-bordered td {
  text-align: center; /* Center-align table content */
  vertical-align: middle; /* Middle-align table content */
  padding: 15px; /* Add padding for larger cells */
}

.table-primary {
  color: #ffffff;
  background-color: #007bff;
}

.error-message {
  color: #dc3545; /* Error message color */
  text-align: center;
  margin-top: 20px;
}

.modal-content {
  border-radius: 8px; /* Rounded corners for modals */
}

.modal-header.bg-danger {
  background-color: #dc3545;
}

.modal-header.bg-primary {
  background-color: #007bff;
}


h2 {
  margin-bottom: 20px;
}

.booking-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.booking-table th,
.booking-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.booking-table th {
  background-color: #f4f4f4;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  color: white;
  background-color: #f44336;
}

/* Make DataTable Mobile Responsive */
@media (max-width: 768px) {
  #bookingsTable {
    display: block; /* Table becomes a block element */
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent wrapping of table contents */
  }

  #bookingsTable thead th {
    font-size: 0.9rem; /* Smaller font for headers */
    text-align: center; /* Align header text */
  }

  #bookingsTable tbody td {
    font-size: 0.85rem; /* Smaller font for table data */
    text-align: center; /* Center-align data */
  }

  /* Table row borders for clarity */
  #bookingsTable tbody tr {
    border-bottom: 1px solid #ddd;
  }

  /* Button adjustments for mobile */
  #bookingsTable tbody td .btn {
    padding: 4px 8px; /* Smaller padding for buttons */
    font-size: 0.8rem; /* Smaller font for buttons */
  }

  /* Badge adjustments for mobile */
  .badge {
    font-size: 0.8rem; /* Smaller font size */
    padding: 5px 10px; /* Adjust padding */
  }

   /* Navbar Customizations */
   .navbar-custom {
    flex-direction: column; /* Stack items vertically */
    padding: 10px;
  }

  /* Navbar Row */
  .navbar-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  /* Toggle Button Adjustments */
  .navbar-toggler {
    display: block; /* Ensure visibility on small screens */
    margin-left: auto; /* Push to the right */
  }



  #navbarLinks.show {
    max-height: 5px; /* Enough height to display links */
  }
}



@media (max-width: 480px) {
  /* Additional Tweaks for Very Small Screens */
  .navbar-brand {
    font-size: 1rem; /* Smaller brand text */
  }

  .profile-picture {
   display: none;
  }

  .nav-link {
    font-size: 0.9rem; /* Slightly smaller text */
  }

  .navbar-brand {
    font-size: 0.7rem;
  }


}

</style>
