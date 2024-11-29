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
  
  <div class="profile container py-4">
    <h2 class="text-center mb-4">User Profile</h2>

    <!-- Show error message if image fails to load -->
    <div v-if="imageError" class="alert alert-danger">
      <p class="error-message">{{ imageError }}</p>
    </div>

    <!-- Profile Picture Container -->
    <div
      v-if="profilePictureContainer"
      class="profile-picture-container text-center mb-3"
    >
      <img
        v-if="profilePictureContainer && profilePictureContainer.imageUrl"
        :src="profilePictureContainer.imageUrl"
        alt="Profile Picture"
        class="profile-image rounded-circle border shadow"
      />
    </div>

    <div v-if="user">
      <form
        @submit.prevent="updateUserProfile"
        class="p-4 shadow bg-white rounded"
      >
        <!-- Other profile fields -->
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
          <label class="form-label">Gender:</label>
          <select v-model="user.gender" class="form-select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone Number:</label>
          <input
            type="text"
            v-model="user.phone_number"
            class="form-control"
          />
        </div>

        <!-- Profile Picture Section -->
        <div class="mb-3">
          <label class="form-label">Profile Picture:</label>
          <input
            type="file"
            @change="onImageChange"
            name="profile_picture"
            class="form-control"
          />
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showNavbarLinks: false,
      user: null,
      profilePictureContainer: null, // To store profile picture data (URL and error messages)
      profileImage: null, // The actual file to be uploaded
      imageError: null, // To store error message if profile image fails to load
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    // Fetch user profile from backend
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        this.user = data;

        // Check if profile_picture exists and set the image URL
        if (this.user.profile_picture) {
          // Fetch the image URL using Axios
          const imageResponse = await axios.get(
            `http://localhost:3000/uploads/user/${this.user.profile_picture}`,
            { responseType: "blob" }
          );
          // Convert the blob to a URL and set it as imageUrl in the container
          this.profilePictureContainer = {
            imageUrl: URL.createObjectURL(imageResponse.data),
            error: null,
          };
        } else {
          // Set an error message in the container if the profile picture is not found
          this.profilePictureContainer = {
            imageUrl: null,
            error: "Profile picture not found.",
          };
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.profilePictureContainer = {
          imageUrl: null,
          error: "Failed to load profile picture.",
        };
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
    toggleNavbarLinks() {
         this.showNavbarLinks = !this.showNavbarLinks;
      },
      gotobook() {
      this.$router.push('/Booking');
    },
    gotoView(){
      this.$router.push('/bookrecord');
    },

    // Update the user profile (including image if provided)
    async updateUserProfile() {
      // Ask for confirmation before proceeding with the update
      const confirmUpdate = confirm("Do you want to update your profile?");
      if (!confirmUpdate) {
        // If the user cancels, exit the function without making changes
        return;
      }

      try {
        const token = localStorage.getItem("auth_token");
        const formData = new FormData();
        formData.append("first_name", this.user.first_name);
        formData.append("middle_name", this.user.middle_name);
        formData.append("last_name", this.user.last_name);
        formData.append("birthdate", this.user.birthdate);
        formData.append("gender", this.user.gender);
        formData.append("phone_number", this.user.phone_number);

        // Check if a new profile image is selected
        if (this.profileImage) {
          formData.append("profile_picture", this.profileImage);
        } else if (this.user.profile_picture) {
          // If no new image is uploaded, retain the current profile picture filename
          formData.append("profile_picture", this.user.profile_picture);
        }

        const response = await fetch(
          "http://localhost:3000/api/auth/profileupdate",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const updatedData = await response.json();
        alert(updatedData.message); // Notify user of success

        // Save updated profile picture filename in localStorage
        localStorage.setItem(
          "user_name",
          `${this.user.first_name} ${this.user.middle_name} ${this.user.last_name}`
        ); // Save full name
        localStorage.setItem("user_email", this.user.email); // Save email
        if (this.profileImage) {
          // Save the updated profile picture filename
          localStorage.setItem("profile_picture", this.user.profile_picture);
        }

        // Clear session data and redirect to the login page

        this.$router.push("/homepage");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    },

    // Handle the image file selection and preview
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          // Preview the new image in the profile picture container
          this.profilePictureContainer = {
            imageUrl: e.target.result,
            error: null,
          };
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
}
form div {
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
}
.profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.profile-picture-container {
  margin-bottom: 20px;
}
.error-message {
  color: red;
  font-weight: bold;
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
</style>
