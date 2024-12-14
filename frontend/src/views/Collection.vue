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

  <div class="gallery-container py-5 mt-5">
  <h1 class="text-center mb-5">Gallery</h1>

  <!-- Search Input -->
  <div class="text-center mb-4">
    <input
      type="text"
      v-model="searchQuery"
      class="form-control search-input"
      placeholder="Search by name or category..."
    />
  </div>

  <div class="text-center mb-4">
    <a href="/favorites" class="btn btn-primary favorites-btn">
      View Favorites
    </a>
  </div>

  <div class="row justify-content-center">
    <div
      class="gallery-item col-12 col-md-6 col-lg-3 mb-4 d-flex flex-column align-items-center"
      v-for="item in filteredGalleryItems"
      :key="item.id"
    >
      <div class="position-relative shadow-sm rounded gallery-card">
        <img
          :src="`http://localhost:3000${item.image}`"
          alt="Gallery Item"
          class="img-fluid gallery-img rounded-top"
        />
        <!-- Form for submitting the favorite -->
        <form @submit.prevent="handleFormSubmit(item.id)" class="favorite-form">
          <input type="hidden" :value="userId" name="userId" />
          <input type="hidden" :value="item.id" name="itemId" />
          <button type="submit" class="circle-button">❤</button>
        </form>
      </div>
      <h5 class="mt-3 text-center">{{ item.name }}</h5>
      <p class="item-category text-center">Category: {{ item.category }}</p>
      <div class="description-container text-center mb-3">
        <p class="text-muted ">{{ item.description }}</p>
      </div>
    </div>
  </div>
</div>


    <!-- Bootstrap Modal for success -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Added to favorites successfully!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Item is already in your favorites.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

 
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      profilePictureContainer: {
        imageUrl: null,
        error: null
      },
      galleryItems: [], // Store fetched gallery items here
      userId: null, // Replace with the decrypted user ID
      successMessage: "", // Message to display in the modal
      searchQuery: "", // Search query for filtering
      showNavbarLinks: false // Controls visibility of the navbar links
    };
  },
  computed: {
    filteredGalleryItems() {
      // Return filtered items based on search query
      return this.galleryItems.filter(item => {
        const query = this.searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });
    }
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
    async fetchGalleryItems() {
      try {
        const response = await axios.get("http://localhost:8080/api/collection");
        this.galleryItems = response.data; // Ensure API includes email, username, and id
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    },

    async handleFormSubmit(itemId) {
      try {
        const formData = new FormData(event.target); // Capture form data
        const data = {
          userId: formData.get("userId"),
          itemId: formData.get("itemId"),
        };

        const response = await axios.post("http://localhost:8080/api/favorites/add-to-favorites", data);

        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById("successModal"));
        successModal.show();
      } catch (error) {
        console.error("Error adding to favorites:", error.response ? error.response.data.message : error.message);

        // Show error modal for duplicate or other issues
        const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
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

    decryptUserId() {
      try {
        const encryptedUserId = localStorage.getItem("user_id");
        if (encryptedUserId) {
          const decryptedUserId = CryptoJS.AES.decrypt(
            encryptedUserId,
            "asdasd"
          ).toString(CryptoJS.enc.Utf8);
          this.userId = parseInt(decryptedUserId, 10);
        } else {
          console.warn("No encrypted user ID found in localStorage.");
        }
      } catch (error) {
        console.error("Error decrypting user ID:", error);
      }
    },

    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks; // Toggle the visibility
    },

    logout() {
      const keysToRemove = ['auth_token', 'user_name', 'user_email', 'profile_picture'];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.$router.push('/login');
    },
  },
  mounted() {
    this.decryptUserId(); // Decrypt the user ID on component mount
    this.fetchGalleryItems(); // Fetch gallery items
    this.fetchProfilePicture();
  },
  created() {

    this.insertStructuredData();
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


/* Additional styling for search input */
.search-input {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.search-input input {
  width: 100%;
}

/* General Styles *//* General Styles */
.gallery-container {
  position: relative; /* To position the pseudo-element */
  padding: 60px 20px; /* Slightly lower the content */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Ensure the pseudo-element doesn't spill out */
}

/* Add blurred background */
.gallery-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bggallery.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px); /* Apply blur to the background image */
  z-index: -1; /* Place it behind the content */
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #333;
}

.search-input {
  max-width: 400px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s ease;
}

.search-input:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
  border-color: #007bff;
}

.favorites-btn {
  border-radius: 20px;
  padding: 10px 20px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: #fff;
  font-weight: bold;
  transition: transform 0.2s ease, background 0.3s ease;
}

.favorites-btn:hover {
  background: linear-gradient(45deg, #0056b3, #007bff);
  transform: scale(1.05);
}
/* Updated Gallery Item Styling */
.gallery-item {
  margin: 15px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.gallery-card {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.gallery-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.item-category {
  font-size: 0.9rem;
  color: #6c757d;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #6c757d;
}

/* Favorite Button Styling */
.favorite-form {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
}

.circle-button {
  background-color: #ff6b6b;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease, transform 0.2s ease;
}

.circle-button:hover {
  background-color: #ff3b3b;
  transform: scale(1.1);
}

h5 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #333;
}

.item-category {
  font-size: 0.9rem;
  color: #555;
}

.description-container p {
  font-size: 0.85rem;
  color: #777;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .gallery-img {
    height: 150px;
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
