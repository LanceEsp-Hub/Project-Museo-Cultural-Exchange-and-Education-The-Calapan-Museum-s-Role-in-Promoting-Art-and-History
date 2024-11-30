<template>
    <div>
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
    </div>
  
      <!-- Hero Section -->
      <section class="hero-section d-flex align-items-center justify-content-center">
        <div class="hero-content">
          <h1>Welcome to Mindoro Heritage Museum</h1>
          <!-- <div class="play-button">
            <i class="bi bi-play-circle-fill fs-1"></i>
          </div> -->
        </div>
      </section>

      <div class="homepage-container">
      
      
          <p>Hello, <strong>{{ userName }}</strong></p>
          <p>Email: <strong>{{ userEmail }}</strong></p>
          <button class="panorama-button" @click="goToPanoramaViewer">View 360° Panorama</button>    
      </div>
  
      <!-- Introduction Section -->
      <section class="intro-section">
        <img src="YOUR_IMAGE_ICON_PATH" alt="Museum Icon" style="width: 60px;" />
          <h2>Experience history and culture at your fingertips</h2>
        <div class="divider"></div>
          <p>
            The Oriental Mindoro Heritage Museum (OMHM), Calapan, exhibits the province's
            rich culture and history. Its construction was spearheaded by Governor Bonz
            Dolor and funded through the General Appropriations Act of 2020 by the National
            Government. The museum opened its doors to the public during the 71st Founding
            Anniversary Celebration of the province on November 15, 2021.
          </p>
      </section>
        
      
      <div>
        <section class="explore-section-unique py-5">
          <div class="container">
            <div class="row align-items-center">

              <!-- Text Content -->
              <div class="col-md-7 explore-text-content-unique">
                <h3 class="explore-heading-unique mb-4">Explore what's inside.</h3>
                <p class="explore-text-unique">
                  Since the Oriental Mindoro Heritage Museum, Calapan, functions as the
                  repository and custodian of varying representations of legacy, it houses
                  cultural artifacts, historical records, evidence of abundant biodiversity,
                  and remarkably collected memorabilia throughout the province. Inside the
                  museum, visitors will see displays of old things used by native Mangyan for
                  their livelihood and household.
                </p>
                <a href="#" class="btn btn-primary book-button-unique" @click="gotobook">Book a Visit</a>
              </div>

              <!-- Image Content -->
              <div class="col-md-5 explore-image-content-unique">
                <img src="@/assets/images/bg1.jpg" alt="Museum Interior" class="img-fluid explore-image-unique" />
              </div>
            </div>
          </div>
        </section>
      </div>
  
      <!-- Explore Section -->

      <div class="container mt-5">
        <div class="row">
          <div class="col-12">
            <h2 class="now-on-view">NOW ON VIEW</h2>
          </div>
        </div>

        <!-- Loop through events -->
        <div class="row align-items-center" v-for="event in events" :key="event.id">
          <!-- Left: Image -->
          <div class="col-12 col-md-6 mb-4">
            <img
              v-if="event.image_url"
              :src="'http://localhost:3000' + event.image_url"
              :alt="event.title"
              class="exhibition-image"
            />

            <img
              v-else
              src="/placeholder.svg?height=400&width=800"
              alt="Placeholder Image"
              class="exhibition-image"
            />
            
          </div>

          <!-- Right: Text -->
          <div class="col-12 col-md-6 exhibition-text">
            <h1 class="exhibition-title">{{ event.title }}</h1>

            <div class="exhibition-details">
              <p class="mb-1">{{ formatDate(event.event_date) }}</p>
              <p class="mb-4">Location: {{ event.location || 'TBA' }}</p>
            </div>

            <div class="exhibition-description">
              <p>
                <em>{{ event.description }}</em>
              </p>
            </div>
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
            <button type="submit" class="btn btn-primary btn-sm">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </footer>`
</template>
  
  <script>
  import axios from 'axios';
  import CryptoJS from 'crypto-js';
  export default {
    name: "LandingPage",
    name: "Gallery",
    
    data() {
      return {
        showNavbarLinks: false,
        userName: '',
        userEmail: '',
        userid: '',
        profilePictureContainer: {
        imageUrl: null,
        error: null,
        events: [], // Store event data here

      },
      };
    },
    created() {
      // Retrieve user data from localStorage when the component is created
      const decryptedRole = CryptoJS.AES.decrypt(localStorage.getItem('user_role'), 'asdasd').toString(CryptoJS.enc.Utf8);
    const decryptedEmail = CryptoJS.AES.decrypt(localStorage.getItem('user_email'), 'asdasd').toString(CryptoJS.enc.Utf8);
    const decryptedName = CryptoJS.AES.decrypt(localStorage.getItem('user_name'), 'asdasd').toString(CryptoJS.enc.Utf8);
    const decryptedUserId = CryptoJS.AES.decrypt(localStorage.getItem('user_id'), 'asdasd').toString(CryptoJS.enc.Utf8);

    this.fetchEvents(); // Fetch events on component creation

    this.userName = decryptedName;
    this.userEmail = decryptedEmail;
    this.userid = decryptedUserId;
      this.fetchProfilePicture();
    },
    methods: {
      goToPanoramaViewer() {
      this.$router.push("/panorama"); // Navigate to the Panorama Viewer
    },
      submitReview() {
    // Define reviewData object with properties from the form
    const reviewData = {
  name: this.name,
  email: this.email,
  comments: this.comments,
  rating: this.rating,  // Add this field if needed
};

axios.post('http://localhost:3000/api/auth/submit-review', reviewData)
  .then(response => {
    console.log('Review submitted:', response.data);
  })
  .catch(error => {
    console.error('Error submitting review:', error);
  });
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
    async fetchEvents() {
      try {
        const response = await axios.get("http://localhost:8080/api/events");
        this.events = response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        this.errorMessage =
          error.response?.data?.message ||
          "An error occurred while fetching events.";
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
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
    }
  },
      toggleNavbarLinks() {
         this.showNavbarLinks = !this.showNavbarLinks;
      },
      
};
  
  </script>
  
  <style scoped>
  .homepage-container {
    text-align: center;
    padding: 20px;
  }

   /* Header */
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
    
/* Hero Section */
.hero-section {
  background: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url('~@/assets/images/bg_museum.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}
    
    .play-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 128, 0, 0.7);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-top: 20px;
      color: white;
      cursor: pointer;
    }
    
    .play-button:hover {
      background-color: rgba(0, 128, 0, 0.9);
    }
    
    /* Introduction Section */
    .intro-section {
      text-align: center;
      padding: 50px 20px;
    }
    
    .intro-section h2 {
      font-size: 2rem;
      font-weight: bold;
    }
    
    .intro-section p {
      font-size: 1rem;
      max-width: 600px;
      margin: 20px auto;
      line-height: 1.6;
    }
    
    .intro-section .divider {
      width: 50px;
      height: 3px;
      background-color: #000;
      margin: 10px auto;
    }
    
   /* Explore Section Styling */
/* Explore Section Unique Styling */
.explore-section-unique {
  background-color: rgba(128, 128, 128, 0.22); /* Optional: Light background for contrast */
  margin: 20px 50px; /* Vertical spacing */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.explore-text-content-unique {
  padding-right: 20px; /* Slight spacing between text and image */
  text-align: center; /* Aligns all content in this column to the left */
}

.explore-heading-unique {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: left; /* Ensures the heading aligns with the paragraph */
}

.explore-text-unique {
  font-size: 1rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left; /* Aligns paragraph text to the left */
}

.book-button-unique {
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.book-button-unique:hover {
  background-color: #0056b3;
}

.explore-image-content-unique {
  text-align: center; /* Center aligns the image horizontally */
}

.explore-image-unique {
  max-width: 100%; /* Ensures responsiveness */
  height: auto;
  border-radius: 8px; /* Smooth corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

   /* Ensures the gallery spans full width */
.gallery-container {
  max-width: 100%;
  padding: 0 15px; /* Adds padding to the left and right */
  background-color: #0a0a0a;
}

.row {
  justify-content: center; /* Ensures items are centered */
}

.gallery-item {
  margin: 15px; /* Adds spacing between items */
  text-align: center;
  background-color: #f9f9f9; /* Optional: Adds a background to the item */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Adds shadow for a better look */
}

.gallery-item img {
  width: 100%;
  height: 250px; /* Adjusts height for uniformity */
  object-fit: cover;
  border-radius: 8px 8px 0 0; /* Matches the item's rounded corners */
}

.gallery-name {
  color: white;
  font-weight: bold;
  font-family: 'Poppins';
}

.item-category {
  font-size: 0.9rem;
  color: #6c757d;
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

.exhibition-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.now-on-view {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.exhibition-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.exhibition-details {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.exhibition-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.exhibition-text {
  max-width: 100%;
}
  </style>
  