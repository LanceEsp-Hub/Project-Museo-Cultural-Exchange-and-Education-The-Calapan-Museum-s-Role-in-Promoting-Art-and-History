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
  




  <div class="favorites-container py-5 mt-5">
    <h1 class="text-center mb-5">Your Favorites</h1>

     <!-- Search Bar -->
     <div class="search-bar py-3">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Search favorites..."
        @input="filterFavorites"
      />
    </div>

    <div class="text-center mb-4">
    <a href="/collection/:id" class="btn btn-primary GoBack-btn">
      GO BACK
    </a>
  </div>

    <div v-if="favorites.length === 0">
      <p class="text-center">You have no favorites yet. Start adding some!</p>
    </div>

    <div class="row justify-content-center">
  <div
  class="gallery-item col-12 col-md-6 col-lg-3 mb-4 d-flex flex-column align-items-center"
  v-for="item in filteredFavorites"
    :key="item.id"
  >
    <div class="position-relative shadow-sm rounded gallery-card">
      <!-- Image Section -->
      <img
        :src="`http://localhost:3000${item.image}`"
        alt="Gallery Item"
        class="img-fluid gallery-img rounded-top"
      />

      <!-- Form to remove the favorite -->
      <form @submit.prevent="handleRemoveFavorite(item.id)" class="favorite-form">
        <input type="hidden" :value="userId" name="userId" />
        <input type="hidden" :value="item.id" name="itemId" />
        <button type="submit" class="circle-button">-</button>
      </form>
    </div>

    <!-- Item Title -->
    <h5 class="mt-3 text-center">{{ item.name }}</h5>

    <!-- Item Category -->
    <p class="item-category text-center">Category: {{ item.category }}</p>

    <!-- Item Description -->
    <div class="description-container text-center mb-3">
      <p class="text-muted">{{ item.description }}</p>
    </div>
  </div>
</div>


  </div>

  <!-- Bootstrap Modal for Success -->
  <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Success</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Item has been successfully removed from your favorites!
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
        error: null,
      },
      favorites: [], // Store favorites
      userId: null, // To store the decrypted userId
      searchQuery: "", // Store search query
      showNavbarLinks: false, // Add the navbar toggle visibility property
    };
  },
  created() {
    // Decrypt the userId from localStorage
    const decryptedUserId = CryptoJS.AES.decrypt(
      localStorage.getItem("user_id"),
      "asdasd"
    ).toString(CryptoJS.enc.Utf8);
    this.userId = decryptedUserId;

    // Fetch profile picture and favorites after decrypting the userId
    this.fetchProfilePicture();
    this.fetchFavorites();
  },
  computed: {
    // Computed property to filter the favorites based on search query
    filteredFavorites() {
      return this.favorites.filter(item => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchText) ||
          item.category.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText)
        );
      });
    }
  },
  methods: {
    async fetchProfilePicture() {
      try {
        const profilePictureFileName = localStorage.getItem("profile_picture");
        if (profilePictureFileName) {
          const response = await axios.get(
            `http://localhost:3000/uploads/user/${profilePictureFileName}`,
            { responseType: "blob" }
          );
          this.profilePictureContainer = {
            imageUrl: URL.createObjectURL(response.data),
            error: null,
          };
        } else {
          this.profilePictureContainer.error = "Profile picture not found.";
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        this.profilePictureContainer.error = "Failed to load profile picture.";
      }
    },

    // Fetch favorites from the server
    async fetchFavorites() {
      try {
        const response = await axios.get("http://localhost:8080/api/favorites", {
          params: { userId: this.userId }, // Pass userId as query parameter
        });

        if (response.data.message) {
          // Handle the case where no favorites are found
          this.favorites = [];
          alert(response.data.message); // Show alert if no favorites
        } else {
          // Assign the favorites if any exist
          this.favorites = response.data;
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        alert("Failed to fetch favorites.");
      }
    },

    // Handle form submission to remove a favorite
    async handleRemoveFavorite(itemId) {
      try {
        const response = await axios.delete("http://localhost:8080/api/favorites", {
          data: { userId: this.userId, itemId: itemId },
        });

        if (response.status === 200) {
          // Successfully removed, update the favorites list
          this.favorites = this.favorites.filter((item) => item.id !== itemId);

          // Show success modal
          this.showSuccessModal();
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
        alert("Failed to remove item from favorites");
      }
    },

    // Show success modal when item is removed
    showSuccessModal() {
      const modal = new bootstrap.Modal(document.getElementById("successModal"));
      modal.show();
    },

    // Toggle navbar visibility
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },

    // Logout function
    logout() {
      const keysToRemove = [
        "auth_token",
        "user_name",
        "user_email",
        "profile_picture",
      ];
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      this.$router.push("/login");
    },

    // Navigation functions
    gotobook() {
      this.$router.push("/Booking");
    },

    gotoView() {
      this.$router.push("/bookrecord");
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
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
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

@media (max-width: 768px) {
  .gallery-img {
    height: 150px;
  }
}

.modal-content {
  background-color: #f8f9fa;
}

.modal-header {
  background-color: #007bff;
  color: white;
}

/* General Styles */
.favorites-container {
  position: relative; /* To position the pseudo-element */
  padding: 60px 20px; /* Slightly lower the content */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Ensure the pseudo-element doesn't spill out */
}

/* Add blurred background */
.favorites-container::before {
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

/* Styling for the search bar */
.search-bar {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

/* Styling for the input search box */
.search-bar input {
  max-width: 400px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s ease;
}

.search-bar:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
  border-color: #007bff;
}

.GoBack-btn {
  border-radius: 20px;
  padding: 10px 20px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: #fff;
  font-weight: bold;
  transition: transform 0.2s ease, background 0.3s ease;
}

.GoBack-btn:hover {
  background: linear-gradient(45deg, #0056b3, #007bff);
  transform: scale(1.05);
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

/* Make DataTable Mobile Responsive */
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
