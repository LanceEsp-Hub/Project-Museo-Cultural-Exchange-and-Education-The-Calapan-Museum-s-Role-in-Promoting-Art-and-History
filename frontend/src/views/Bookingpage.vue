<template>
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the Oriental Mindoro Heritage Museum's collections. Book your visit and discover history, culture, and art.">
    <meta name="keywords" content="Museum, Oriental Mindoro, Heritage, Artifacts, Booking, Collections">
    <meta name="author" content="Oriental Mindoro Heritage Museum">
    <meta property="og:title" content="Oriental Mindoro Heritage Museum">
    <meta property="og:description" content="Discover the rich cultural heritage of Oriental Mindoro.">
    <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />
    <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />
    <meta property="og:title" content="Oriental Mindoro Heritage Museum" />
    <meta property="og:description" content="Discover the rich culture and history of Oriental Mindoro at our heritage museum." />
    <meta property="og:type" content="website" />
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
  

    <div class="background">
  <!-- Your content here -->


  <!-- Modal for Successful Booking -->
  <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Booking Confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Booking Form -->
  <div class="booking-form-wrapper my-5">
  <div class="booking-form-container my-5 ">
    <h2 class="text-center mb-4 textbooking">Visit Booking Form</h2>
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
            :max="maxDate"
            required
          />
        </div>

         <!-- Booking Time -->
         <div class="mb-3">
          <label for="booking_time" class="form-label">Booking Time (45-minute intervals between 8:00 AM and 4:30 PM)</label>
          <select class="form-select" id="booking_time" v-model="form.bookingTime" required>
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
            min="1" max="20"
            required
          />
        </div>

        <!-- Organization Option -->
        <div class="mb-3">
          <label for="organization" class="form-label">Is this visit for an Organization?</label>
          <input type="checkbox" id="organizationCheckbox" v-model="form.isOrganization" />
        </div>
        <div v-if="form.isOrganization" class="mb-3">
          <label for="organization" class="form-label">Organization Name</label>
          <input
            type="text"
            class="form-control"
            id="organization"
            v-model="form.organization"
            placeholder="Enter Organization Name"
            required
          />
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
            I agree to the museum's rules and guidelines for visits, including respecting the artifacts and following staff instructions.
          </label>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary w-100">Book Visit</button>
        </div>
      </form>
    </div>
  </div>
</div>

 
  <footer class="footer-section-unique">
  <div class="container">
    <div class="row">
      <!-- Address and Contact Section -->
      <div class="col-md-3">
        <h5>Oriental Mindoro Heritage Museum</h5>
        <p>
          123 Museum Avenue<br />
          Main City, Province<br />
          Country
        </p>
        <p>
          Landline: (01) 123 4567 890<br />
          Mobile: (63) 912 345 6789
        </p>
        <p>
          Email: 
          <a href="mailto:info@museumemail.org" class="footer-links-unique">info@museumemail.org</a><br />
          <a href="mailto:visits@museumemail.org" class="footer-links-unique">visits@museumemail.org</a>
        </p>
        <p>
          <a href="#" class="footer-links-unique">Read our Data Privacy Policy</a>
        </p>
      </div>
      <!-- Hours Section -->
      <div class="col-md-3">
        <h5>Hours</h5>
        <p>Tuesday - Friday: 11AM - 6PM</p>
        <p>Saturday - Sunday: 10AM - 6PM</p>
        <p>Closed on Mondays, public holidays, and other special notices.</p>
      </div>
      <!-- Navigation and Social Media Section -->
      <div class="col-md-3">
        <h5>Navigation</h5>
        <p>
          <a href="#" class="footer-links-unique">Home</a><br />
          <a href="#" class="footer-links-unique">Info</a><br />
          <a href="#" class="footer-links-unique">Exhibitions</a><br />
          <a href="#" class="footer-links-unique">Programs</a><br />
          <a href="#" class="footer-links-unique">Visit</a>
        </p>
        <h5 class="mt-4">Follow</h5>
        <div class="footer-social-icons-unique">
          <a href="#" class="footer-links-unique"><i class="bi bi-instagram"></i> Instagram</a><br />
          <a href="#" class="footer-links-unique"><i class="bi bi-facebook"></i> Facebook</a><br />
          <a href="#" class="footer-links-unique"><i class="bi bi-tiktok"></i> TikTok</a>
        </div>
      </div>
      <!-- Send Reviews or Comments Section -->
      <div class="col-md-3">
          <h5>Share Your Experience</h5>

          <form @submit.prevent="submitReview">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                v-model="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                v-model="comments"
                placeholder="Your Comments"
                rows="3"
                required
              ></textarea>
            </div>
            <!-- Star Rating -->
            <div class="star-rating mb-3">
  <!-- Loop over 5 stars -->
  <span
    v-for="star in 5"
    :key="star"
    class="star"
    :class="{ filled: star <= hoverRating || star <= rating }"
    @mouseover="hoverRating = star"  
    @mouseleave="hoverRating = 0"   
    @click="setRating(star)"        
  >&#9733;</span>
</div>
            <button type="submit" class="btn btn-primary btn-sm">Submit</button>
          </form>
        </div>
    </div>
  </div>
</footer>`
<div class="modal fade" id="successModalreview" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="successModalLabel">Review Submitted</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      Your review has been successfully submitted. Thank you for your feedback!
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
    </div>
  </div>
</div>
</div>

<div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="errorModalLabel">Submission Failed</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      There was an error submitting your review. Please try again later.
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Retry</button>
    </div>
  </div>
</div>
</div>

 <!-- Modal for Error (Time restriction) -->
 <div class="modal fade" id="errorModalTime" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Booking Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>You cannot book for today as the time is past 4:15 PM.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
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

      name: '',
      email: '',
      comments: '',
      rating: 0, // The actual selected rating
      hoverRating: 0, // Store hover state for stars
      activeIndex: 0,  // Index of the active image in the carousel
      form: {
        userId: '',
        visitDate: '',
        bookingTime: '',
        numberOfGuests: 1,
        isOrganization: false,
        organization: '',
        accessibilityNeeds: false,
        agreeRules: false,
      },
      minDate: '',
      maxDate: '',
      timeOptions: [
        '08:00 AM',
        '08:45 AM',
        '09:30 AM',
        '10:15 AM',
        '11:00 AM',
        '11:45 AM',
        '12:30 PM',
        '01:15 PM',
        '02:00 PM',
        '02:45 PM',
        '03:30 PM',
        '04:15 PM',
      ],
      message: '',
    };
  },
  created() {
    this.insertStructuredData();
    const decryptedUserId = localStorage.getItem('user_id');
    this.form.userId = decryptedUserId;

    // Fetch the profile picture
    this.fetchProfilePicture();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`; // Default to today

    // Set maxDate to two weeks from today
    this.setBookingDates();
  },
  methods: {
    insertStructuredData() {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Museum",
        "name": "Oriental Mindoro Heritage Museum",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Museum Avenue",
          "addressLocality": "Main City",
          "addressRegion": "Province",
          "addressCountry": "Country"
        },
        "image": "@/assets/images/bg1.jpg",
        "description": "Explore history and culture at the Oriental Mindoro Heritage Museum, featuring artifacts, biodiversity records, and more.",
        "url": "http://www.mindoroheritagemuseum.com",
        "openingHours": [
          "Tu-Fr 11:00-18:00",
          "Sa-Su 10:00-18:00"
        ],
        "telephone": "(01) 123 4567 890",
        "email": "info@museumemail.org"
      };

      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
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

    // Set the booking dates: minDate today (but check time), maxDate 2 weeks in the future
    setBookingDates() {
      const today = new Date();
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTime = currentHour * 60 + currentMinute; // convert current time to minutes

      const cutoffTime = 16 * 60 + 15; // 4:15 PM in minutes

      // If current time is past 4:15 PM, disable today's date for booking
      if (currentTime >= cutoffTime) {
        this.minDate = today.toISOString().split('T')[0]; // Limit to today but only allow future dates after 4:15 PM
      } else {
        this.minDate = today.toISOString().split('T')[0]; // Default to today
      }

      // Set maxDate to two weeks from today
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 14); // 14 days from now for maxDate

      // Format as YYYY-MM-DD
      this.maxDate = maxDate.toISOString().split('T')[0];
    },

    async submitForm() {
      if (!this.form.agreeRules) {
        alert("You must agree to the museum's rules to book a visit.");
        return;
      }

      // Check if the booking is for today and if current time is past 4:15 PM
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      const cutoffTimeInMinutes = 16 * 60 + 15; // 4:15 PM in minutes

      if (this.form.visitDate === this.minDate && currentTotalMinutes >= cutoffTimeInMinutes) {
        // Show the error modal instead of an alert
        const errorModalTime = new bootstrap.Modal(document.getElementById('errorModalTime'));
        errorModalTime.show();
        return;
      }

      // Decrypt the user_id from localStorage
      const encryptedUserId = localStorage.getItem('user_id');
      
      // Assuming your decryption method is AES and you know the encryption key
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedUserId, 'asdasd');
      const decryptedUserId = decryptedBytes.toString(CryptoJS.enc.Utf8); // Get the string from the decrypted bytes
      
      // Assign decrypted user_id to the form data
      this.form.userId = decryptedUserId;

      try {
        const bookingData = {
          user_id: this.form.userId,  // Use the decrypted user_id here
          visit_date: this.form.visitDate,
          booking_time: this.form.bookingTime,
          number_of_guests: this.form.numberOfGuests,
          booking_status: 'Pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organization: this.form.isOrganization ? this.form.organization : null,
        };

        const response = await axios.post('http://localhost:3000/api/auth/booked', bookingData);

        this.message = response.data.message || 'Booking successfully submitted!';
        this.resetForm();

        // Show the success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
      } catch (error) {
        // Show the error message if there's a pending booking or another error
        this.message = error.response?.data.message || 'Failed to submit booking.';
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
      }
    },

    resetForm() {
      this.form = {
        userId: this.form.userId,
        visitDate: '',
        bookingTime: '',
        numberOfGuests: 1,
        isOrganization: false,
        organization: '',
        accessibilityNeeds: false,
        agreeRules: false,
      };
    },
    
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },
    
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

  
  <style scoped>

/* In your CSS file */
.textbooking {
  color: #ffffff; /* White text color for contrast */
  font-size: 2rem; /* Adjust the font size as per your design */
  font-weight: bold; /* Optional: makes the text bold */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Adds a shadow to make the text stand out */
  background-color: rgba(0, 0, 0, 0.3); /* Adds a semi-transparent background */
  padding: 10px; /* Adds some padding around the text */
  border-radius: 5px; /* Optional: rounded corners for a softer look */
  display: inline-block; /* Ensures the background only wraps the text */
}



.background {
  background-image: url('@/assets/images/bgbook.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Ensures the image doesn't repeat */
  height: 110vh; /* Makes the background image fill the full viewport height */
}


/* Wrapper styles for left alignment */
.booking-form-wrapper {
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: flex-start; /* Align at the top */
  padding: 2rem 1rem;
  min-height: 120vh;
}

/* Container styles for the form */
.booking-form-container {
  width: 100%;
  max-width: 500px; /* Limit the form's width */
  border-radius: 10px;
  margin-left: 2rem; /* Add some space from the left edge */
}

/* Form heading */
.booking-form-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Form field styles */
.booking-form-container label {
  font-weight: bold;
  color: #555;
}



.booking-form-container button {
  background-color: #007bff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.booking-form-container button:hover {
  background-color: #0056b3;
}

/* Accessibility for error messages */
.booking-form-container input:invalid,
.booking-form-container textarea:invalid {
  border-color: #e3342f;
}

  
/* Navbar container styles */
.navbar-custom {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(23, 143, 37, 0.837); /* Semi-transparent background */
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

 
/* Footer Section Styling */
.footer-section-unique {
background-color: #222; /* Dark background for contrast */
color: #fff; /* White text for readability */
padding: 40px 20px;
font-size: 0.9rem;
}

.footer-section-unique h5 {
font-weight: bold;
text-transform: uppercase;
font-size: 1rem;
margin-bottom: 15px;
color: #f8f9fa; /* Slightly lighter text for headings */
}

.footer-links-unique {
color: #adb5bd; /* Light gray for links */
text-decoration: none;
transition: color 0.3s ease;
}

.footer-links-unique:hover {
color: #ffc107; /* Gold on hover for emphasis */
}

.footer-social-icons-unique a {
font-size: 1.2rem;
margin-right: 15px;
color: #adb5bd; /* Light gray for icons */
transition: color 0.3s ease;
}

.footer-social-icons-unique a:hover {
color: #ffc107; /* Gold on hover for social media links */
}


.star-rating {
font-size: 1.5rem;
color: #ccc;
cursor: pointer;
}

.star {
display: inline-block;
}

.star.filled {
color: #f0a500; /* Gold color for filled stars */
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  /* Adjust the form container */
  .booking-form-container {
    width: 100%; /* Reduce the width for smaller screens */
    margin: 0 auto; /* Center the form */
    padding: 0rem; /* Add padding for better spacing */
  }

  /* Make labels and inputs more readable */
  .booking-form-container label {
    font-size: 0.9rem; /* Slightly smaller labels */
  }

  .booking-form-container input,
  .booking-form-container textarea,
  .booking-form-container select {
    font-size: 1rem; /* Comfortable input sizes */
    padding: 0.5rem; /* Adequate padding for touch inputs */
  }

  /* Button adjustments for mobile */
  .booking-form-container button {
    font-size: 1rem; /* Adjust button font size */
    padding: 0.6rem; /* Make buttons larger for touch accessibility */
  }

  /* Add space between form fields */
  .booking-form-container .form-field {
    margin-bottom: 1rem;
  }

  /* Add responsiveness for the overall wrapper */
  .booking-form-wrapper {
    flex-direction: column; /* Stack the elements vertically */
    align-items: center; /* Center-align items */
    padding: 1rem; /* Reduce padding for smaller screens */


  }

  .textbooking {
    font-size: 1.5rem; /* Reduce font size for smaller screens */
    padding: 8px; /* Adjust padding for smaller screens */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Subtle shadow for smaller text */
  }
  
    /* Additional Tweaks for Very Small Screens */
    .navbar-brand {
    font-size: 0.8rem; /* Smaller brand text */
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

/* Mobile Responsive Design */
@media (max-width: 768px) {
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


  </style>
  