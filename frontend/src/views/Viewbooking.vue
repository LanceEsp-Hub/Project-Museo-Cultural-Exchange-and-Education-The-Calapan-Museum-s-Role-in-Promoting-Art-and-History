<template>
      <!-- Navbar -->
      <nav class="navbar navbar-custom navbar-dark">
        <router-link to="/Profile">
  <img v-if="profilePictureContainer.imageUrl" 
       :src="profilePictureContainer.imageUrl" 
       alt="Profile Picture" 
       class="profile-picture" 
       style="width: 50px; height: 50px; margin-left: 25%;" />
</router-link>
<p v-if="profilePictureContainer.error">{{ profilePictureContainer.error }}</p>

        <div class="container d-flex justify-content-between align-items-center">
          <!-- Social Media Icons and Brand Name -->
          <div class="d-flex align-items-center">
            
            <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
            <span class="navbar-brand ms-2">ORIENTAL MINDORO HERITAGE MUSEUM</span>
            
          </div>
  
          <!-- Toggle Button for Navbar Links -->
          <button class="navbar-toggler" type="button" @click="toggleNavbarLinks">
            <i class="bi bi-list text-white fs-3"></i>
          </button>
          
        </div>
  
        <!-- Collapsible Navbar Links Below Header -->
        <div v-if="showNavbarLinks" id="navbarLinks" class="text-center">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link text-white" href="/Profile">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="#" @click="gotoView">Booking</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="#">Home</a>
    </li>
    <li class="nav-item">
      <!-- Updated link for accessing the Collections page -->
      <a class="nav-link text-white" href="/Collection">Collections</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="#">About</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="#">Contact</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-white" href="#" @click="logout">Logout</a>
    </li>
  </ul>
</div>

      </nav>
   
   <div class="booking-container">
      <h2>Your Bookings</h2>
      
      <!-- Bookings Table -->
      <table v-if="bookings.length > 0" class="booking-table">
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Visit Date</th>
            <th>Booking Time</th>
            <th>Number of Guests</th>
            <th>Booking Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in bookings" :key="index">
            <td>{{ booking.booking_id }}</td>
            <td>{{ booking.visit_date }}</td>
            <td>{{ booking.booking_time }}</td>
            <td>{{ booking.number_of_guests }}</td>
            <td>{{ booking.booking_status }}</td>
            <td>
            <!-- Cancel Button -->
            <button @click="cancelBooking(booking.booking_id, index)" class="cancel-button">
              Cancel
            </button>
          </td>
          </tr>
        </tbody>
      </table>
  
      <!-- If no bookings are found -->
      <p v-else>No bookings found.</p>
  
      <!-- Error Messages -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showNavbarLinks: false,
        bookings: [],        // Holds the list of bookings
        errorMessage: '',     // To store any error messages
        profilePictureContainer: {
          imageUrl: null,
        error: null,
      },

      };
    },
    methods: {
      // Fetch bookings for the user
      async fetchBookings() {
        const token = localStorage.getItem('auth_token'); // Assuming JWT token is stored in localStorage
  
        try {
          const response = await axios.get('http://localhost:3000/api/auth/view', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.bookings = response.data.bookings;
        } catch (error) {
          this.errorMessage = 'Failed to fetch bookings.';
          console.error('Error fetching bookings:', error);
        }
      },
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
      async cancelBooking(bookingId, index) {
  const token = localStorage.getItem('auth_token'); // Get the JWT token

  try {
    // DELETE request to cancel the booking
    const response = await axios.delete(`http://localhost:3000/api/auth/cancel/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Attach token to the header
      }
    });
    // If cancellation is successful, remove the booking from the list
    this.bookings.splice(index, 1);
    console.log(response.data.message); // Log the success message
  } catch (error) {
    // Handle the error
    this.errorMessage = 'Failed to cancel booking.';
    console.error('Error cancelling booking:', error.response ? error.response.data : error);
  }
},
    },
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      localStorage.removeItem('profile_picture'); // Remove profile picture on logout
      this.$router.push('/login'); // Redirect to login page
    },
    gotobook() {
      this.$router.push('/Booking');
    },
    gotoView(){
      this.$router.push('/bookrecord');
    
  },
      toggleNavbarLinks() {
         this.showNavbarLinks = !this.showNavbarLinks;
      },
    
    mounted() {
      this.fetchBookings(); // Fetch bookings when the component is mounted
    },
  };
  </script>
  
  <style scoped>

.navbar-custom {
      background-color: #0a0a0a;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 10px 0;
    }
    
    .navbar-brand {
      font-size: 1.25rem;
      font-weight: bold;
      color: white;
    }
    
    /* Navbar Links */
    #navbarLinks {
      background-color: #0a0a0a;
      width: 100%;
      padding: 10px 0;
    }
    
    #navbarLinks ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    #navbarLinks .nav-item {
      margin: 10px 0;
    }
  .booking-container {
    padding: 20px;
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
  </style>
  