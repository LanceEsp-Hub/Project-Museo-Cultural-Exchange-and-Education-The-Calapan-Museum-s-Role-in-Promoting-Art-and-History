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
    <div class="wrapper my-5">
      
      <div class="container my-5">
        <h2 class="text-center mb-4">Visit Booking Form</h2>
        
        <!-- Display user_id for verification -->
        <p v-if="form.userId">User ID: {{ form.userId }}</p>
        
        <form @submit.prevent="submitForm" class="border p-4 rounded bg-light shadow">
          <!-- Visit Date -->
          <div class="mb-3">
            <label for="visit_date" class="form-label">Visit Date</label>
            <input
              type="date"
              class="form-control"
              id="visit_date"
              v-model="form.visitDate"

              :min="minDate" 
              
              required
            />
          </div>
          
          <!-- Booking Time -->
          <div class="mb-3">
            <label for="booking_time" class="form-label">Booking Time (45-minute intervals between 8:00 AM and 4:30 PM)</label>
            <select
              class="form-select"
              id="booking_time"
              v-model="form.bookingTime"
              required
            >
              <option value="" disabled>Select a time</option>
              <option v-for="time in timeOptions" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          
          <!-- Number of Guests -->
          <div class="mb-3">
            <label for="number_of_guests" class="form-label">Number of Guests</label>
            <input
              type="number"
              class="form-control"
              id="number_of_guests"
              v-model.number="form.numberOfGuests"
              min="1"
              required
            />
          </div>
          
          <!-- Accessibility Needs -->
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="accessibility_needs"
              v-model="form.accessibilityNeeds"
            />
            <label class="form-check-label" for="accessibility_needs">
              Accessibility Needs: Check if any accommodations are required (e.g.,
              guided tours, wheelchair access).
            </label>
          </div>
          
          <!-- Agree to Rules -->
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="agree_rules"
              v-model="form.agreeRules"
              required
            />
            <label class="form-check-label" for="agree_rules">
              I agree to the museum's rules and guidelines for visits, including
              respecting the artifacts and following staff instructions.
            </label>
          </div>
          
          <!-- Submit Button -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary w-100">Book Visit</button>
          </div>
        </form>
        
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CryptoJS from 'crypto-js'; // Import crypto-js
  export default {
    data() {
      return {
        showNavbarLinks: false,
        profilePictureContainer: {
        imageUrl: null,
        error: null,
      },

        form: {
          userId: '',  // Initialize userId here
          visitDate: "",
          bookingTime: "",
          numberOfGuests: 1,
          accessibilityNeeds: false,
          agreeRules: false,

        },
        minDate: "",
        timeOptions: [
          "08:00 AM", "08:45 AM", "09:30 AM", "10:15 AM", 
          "11:00 AM", "11:45 AM", "12:30 PM", "01:15 PM", 
          "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM",
        ],
        message: ''
      };
    },
    created() {
      // Retrieve user_id from localStorage and set it in form data
      const decryptedUserId = CryptoJS.AES.decrypt(localStorage.getItem('user_id'), 'asdasd').toString(CryptoJS.enc.Utf8);
      this.form.userId = decryptedUserId;
      const today = new Date();
      const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  this.minDate = `${year}-${month}-${day}`;
    },

    methods: {
  async submitForm() {
    if (!this.form.agreeRules) {
      alert("You must agree to the museum's rules to book a visit.");
      return;
    }
    

    try {
      // Prepare data for insertion with explicit field mapping
      const bookingData = {         // Generate or assign a booking ID
        user_id: this.form.userId,
        visit_date: this.form.visitDate,
        booking_time: this.form.bookingTime,
        number_of_guests: this.form.numberOfGuests, // Include accessibility needs
        booking_status: "Pending",
        created_at: new Date().toISOString(),         // Current timestamp for creation
        updated_at: new Date().toISOString()          // Current timestamp for update
      };

      // Perform API request to insert booking data
      const response = await axios.post('http://localhost:3000/api/auth/booked', bookingData);
      
      // Display success message or handle response
      this.message = response.data || "Booking successfully submitted!";
      this.resetForm();
    } catch (error) {
      // Handle any error during the API request
      this.message = error.response?.data || "Failed to submit booking.";
    }
  },

  resetForm() {
    this.form = {
      userId: this.form.userId, // Keep userId after reset
      visitDate: "",
      bookingTime: "",
      numberOfGuests: 1,
      accessibilityNeeds: false,
      agreeRules: false,
    };
  },
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
      
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }

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
  </style>
  