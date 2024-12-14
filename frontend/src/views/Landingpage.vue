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
              <a class="nav-link text-white" href="#" @click="showModal('login')">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click="showModal('login')">Collections</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click="showModal('login')">Booking</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" @click="showModal('login')">Profile</a>
            </li>
            <!-- Login Button -->
            <li class="nav-item">
              <a class="nav-link text-white btn btn-primary mx-2" href="/login">Login</a>
            </li>
            <!-- Register Button -->
            <li class="nav-item">
              <a class="nav-link text-white btn btn-success" href="/register">Register</a>
            </li>
        </ul>
      </div>
    </nav>
  </div>

  <!-- Hero Section -->
  <section class="hero-section d-flex align-items-center justify-content-center">
    <div class="hero-content">
      <h1>Welcome to Mindoro Heritage Museum</h1>
      <div class="play-button" @click="showModal('login')">
        <i class="bi bi-play-circle-fill fs-1"></i>
      </div>
    </div>
  </section>

  <!-- Introduction Section -->
  <section class="intro-section mt-3">
    <h2>Experience history and culture at your fingertips</h2>
    <div class="divider"></div>
    <p>
      The Oriental Mindoro Heritage Museum (OMHM), Calapan, exhibits the province's rich culture and history. Its construction was spearheaded by Governor Bonz Dolor and funded through the General Appropriations Act of 2020 by the National Government. The museum opened its doors to the public during the 71st Founding Anniversary Celebration of the province on November 15, 2021.
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
              Since the Oriental Mindoro Heritage Museum, Calapan, functions as the repository and custodian of varying representations of legacy, it houses cultural artifacts, historical records, evidence of abundant biodiversity, and remarkably collected memorabilia throughout the province. Inside the museum, visitors will see displays of old things used by native Mangyan for their livelihood and household.
            </p>
            <a href="#" class="btn btn-primary book-button-unique" @click="showModal('createAccount')">Book a Visit</a>
          </div>
          <!-- Image Content -->
          <div class="col-md-5 explore-image-content-unique">
            <img src="@/assets/images/bg1.jpg" alt="Museum Interior" class="img-fluid explore-image-unique" />
          </div>
        </div>
      </div>
    </section>
  </div>



  <footer class="footer-section-unique">
    <!-- Footer Content -->
  </footer>

  <!-- Modals -->
  <div class="modal fade" id="notificationModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="notificationModalLabel">Notification</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ modalMessage }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
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
            <button class="btn btn-primary btn-sm" @click="showModal('createAccount')">Submit</button>
          </form>
        </div>
    </div>
  </div>
</footer>`
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  name: "Landingpage",
  data() {
    return {
      showNavbarLinks: false,
      modalMessage: "",
      recentCollections: [],
      activeIndex: 0,
      profilePictureContainer: { imageUrl: null, error: null },
    };
  },
  methods: {
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },
    showModal(type) {
      if (type === "login") {
        this.modalMessage = "Please log in or create an account to access this feature.";
      } else if (type === "createAccount") {
        this.modalMessage = "Please log in or create an account to book a visit.";
      }
      const modal = new bootstrap.Modal(document.getElementById("notificationModal"));
      modal.show();
    },
    moveCarousel(direction) {
      this.activeIndex += direction;
      if (this.activeIndex < 0) {
        this.activeIndex = this.recentCollections.length - 1;
      } else if (this.activeIndex >= this.recentCollections.length) {
        this.activeIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
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


.homepage-container {
  text-align: center;
  padding: 20px;
}

 
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



/* Hero Section */
.hero-section {
  background: url('~@/assets/images/bg_museum.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  text-align: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Hero Content */
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  z-index: 1; /* Ensure it stays above background */
  transition: opacity 0.5s ease-in-out; /* Smooth fade-out effect */
}

.hero-content.fade-out {
  opacity: 0; /* Fade-out effect */
}

/* Play Button */
.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 128, 0, 0.8);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 20px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 1;
}

.play-button:hover {
  background-color: rgba(0, 128, 0, 1);
  transform: scale(1.1);
}

/* Transition Effect */
.hero-section.fade-out {
  animation: fadeOutEffect 1s forwards; /* Fades out section */
}

@keyframes fadeOutEffect {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
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
    width: 35%;
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


.now-on-view {
font-size: 2.5rem;
font-weight: 500;
margin-bottom: 2rem;
text-align: left;
}

.event-card {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.exhibition-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.exhibition-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.exhibition-details p {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.exhibition-description p {
  font-size: 1rem;
  color: #555;
}
/* Carousel Container */
.carousel-container {
  position: relative;
  width: 100%; /* Full width of the parent container-fluid */
  height: 300px; /* Slightly larger height */
  margin: 0 auto; /* Center the content within container-fluid */
  overflow: hidden; /* Hide overflow for clean edges */
  background-color: #000; /* Black background */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Carousel Images */
.carousel-image {
  width: 150px; /* Image size */
  height: 150px; /* Keep the image square */
  object-fit: cover; /* Maintain aspect ratio */
  border-radius: 50%; /* Circular images */
  margin: 0 20px; /* Space between images */
  transition: transform 0.5s ease-in-out;
}

/* Active Image Styling */
.carousel-image.active {
  transform: scale(1.2); /* Enlarge the active image slightly */
  border: 3px solid #fff; /* Highlight active image */
}

/* Carousel Arrows */
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 15px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
}

.carousel-button.left {
  left: 20px; /* Space from the left */
}

.carousel-button.right {
  right: 20px; /* Space from the right */
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Carousel */
.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  justify-content: center;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .carousel-container {
    height: 250px; /* Adjust for smaller screens */
  }
  .carousel-image {
    width: 120px; /* Smaller images on mobile */
    height: 120px;
  }
  .carousel-button {
    font-size: 2rem;
    padding: 10px;
  }
}


</style>
