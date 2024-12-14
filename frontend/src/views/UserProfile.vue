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

 <!-- Profile Page -->
 <div class="profile container py-4 mt-5">

<!-- Show error message if image fails to load -->
<div v-if="imageError" class="alert alert-danger">
  <p class="error-message">{{ imageError }}</p>
</div>



<div v-if="user">

  
  
  <form
    @submit.prevent="updateUserProfile"
    class="profile-form p-4 shadow bg-white rounded"
  >
    <h2 class="text-start mb-4">User Profile</h2>

    <!-- Profile Picture Container -->
<div
  v-if="profilePictureContainer && profilePictureContainer.imageUrl"
  class="profile-picture-container text-center mb-3"
>
  <img
    :src="profilePictureContainer.imageUrl"
    alt="Profile Picture"
    class="profile-image rounded-circle border shadow"
  />
</div>

    <!-- 2-Column Layout -->
    <div class="row">
      <!-- Column 1 -->
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">First Name:</label>
          <input
            type="text"
            v-model="user.first_name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Middle Name:</label>
          <input
            type="text"
            v-model="user.middle_name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Phone Number:</label>
          <input
            type="text"
            v-model="user.phone_number"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Gender:</label>
          <select v-model="user.gender" class="form-select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <!-- Column 2 -->
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Last Name:</label>
          <input
            type="text"
            v-model="user.last_name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Birthday:</label>
          <input
            type="date"
            v-model="user.birthdate"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Profile Picture:</label>
          <input
            type="file"
            @change="onImageChange"
            name="profile_picture"
            class="form-control"
          />
          <div class="text-center mt-5">
            <router-link to="/request-reset" class="change-password-link">
              Change Password
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary w-100">
      Save Changes
    </button>
  </form>
</div>

<div v-else>
  <p class="text-center">Loading user profile...</p>
</div>
</div>

  <!-- Modal for confirmation -->
  <div
    v-if="showModal"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
    style="display: block;"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmationModalLabel">Confirm Profile Update</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to update your profile?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="submitProfileUpdate">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
  <div
    v-if="showSuccessModal"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="successModalLabel"
    aria-hidden="true"
    style="display: block;"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Profile Updated</h5>
          <button type="button" class="btn-close" @click="closeSuccessModal"></button>
        </div>
        <div class="modal-body">
          Your profile has been updated successfully.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeSuccessModal">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showNavbarLinks: false,
      user: null,
      profilePictureContainer: {
        imageUrl: null,
        error: null,
      },
      profileImage: null,
      imageError: null,
      showModal: false, // Controls the visibility of the confirmation modal
      showSuccessModal: false, // Controls the visibility of the success modal
    };
  },
  created() {
    this.fetchUserProfile();
    this.insertStructuredData();

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
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        this.user = data;

        if (this.user.profile_picture) {
          const imageResponse = await axios.get(
            `http://localhost:3000/uploads/user/${this.user.profile_picture}`,
            { responseType: "blob" }
          );
          this.profilePictureContainer.imageUrl = URL.createObjectURL(
            imageResponse.data
          );
        } else {
          this.profilePictureContainer.error = "Profile picture not found.";
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.profilePictureContainer.error = "Failed to load profile picture.";
      }
    },
    toggleNavbarLinks() {
      this.showNavbarLinks = !this.showNavbarLinks;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    async updateUserProfile() {
      this.showModal = true; // Show confirmation modal
    },
    closeModal() {
      this.showModal = false;
    },
    async submitProfileUpdate() {
      const token = localStorage.getItem("auth_token");
      const formData = new FormData();
      Object.keys(this.user).forEach((key) =>
        formData.append(key, this.user[key])
      );

      if (this.profileImage) formData.append("profile_picture", this.profileImage);

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/profileupdate",
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Failed to update profile");

        const updatedData = await response.json();
        this.showModal = false; // Close confirmation modal
        this.showSuccessModal = true; // Show success modal
        
        this.user = {
      first_name: '',
      middle_name: '',
      last_name: '',
      birthdate: '',
      gender: 'Male',
      phone_number: '',
    };
    this.profileImage = null; // Reset the profile image

        this.$router.push("/Profile");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = file;
        const reader = new FileReader();
        reader.onload = (e) =>
          (this.profilePictureContainer.imageUrl = e.target.result);
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>


<style scoped>


.bg {
  background-image: url('@/assets/images/bgbook.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Ensures the image doesn't repeat */
  height: 100vh; /* Makes the background image fill the full viewport height */
  margin-top: 50px;
  overflow-y: hidden;
}

/* Modal Custom Styles */
.modal-backdrop.show {
  opacity: 0.5;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
}

.modal-header {
  border-bottom: none;
}



/* Profile Page Styling */
.profile {
  max-width: 800px;
  margin: 0 auto;
}

/* Form container */
.profile-form {
  max-height: 650px; /* Reduced height for a more compact form */
  overflow-y: auto; /* Allows scrolling if the content overflows */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Form Fields */
.form-label {
  font-weight: 600;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

.form-select {
  border-radius: 8px;
  padding: 10px;
}

/* Profile Image */
.profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}

.profile-picture-container {
  margin-bottom: 20px;
}

/* Error Message */
.error-message {
  color: red;
  font-weight: bold;
}

/* Modern Button */
button {
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-weight: 600;
}

button:hover {
  background-color: #0056b3;
  transition: background-color 0.3s;
}

/* Change Password Link */
.change-password-link {
  font-size: 14px;
  color: #007bff; /* Bright blue color for the link */
  text-decoration: none;
  font-weight: 600; /* Slightly bolder text for better visibility */
  padding: 4px 0; /* Small padding to make it clickable */
  transition: all 0.3s ease; /* Smooth transition effect */
}

.change-password-link:hover {
  color: #0056b3; /* Darker blue on hover */
  text-decoration: underline;
  background-color: rgba(0, 123, 255, 0.1); /* Light background color on hover */
  border-radius: 4px; /* Rounded corners on hover */
  padding-left: 5px; /* Slight left padding on hover for better effect */
}


/* Mobile Responsiveness */
@media (max-width: 576px) {
  .profile-form {
    padding: 15px;
  }

  .profile-image {
    width: 90px;
    height: 90px;
  }

  .form-control,
  .form-select {
    font-size: 13px;
  }

  .btn {
    font-size: 14px;
  }

  .change-password-link {
    font-size: 14px;
  }

  /* Stack columns on small screens */
  .row {
    flex-direction: column;
  }

  .col-md-6 {
    max-width: 100%;
  }
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
