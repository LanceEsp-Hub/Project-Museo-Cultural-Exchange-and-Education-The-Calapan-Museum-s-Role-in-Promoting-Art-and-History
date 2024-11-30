<template>
  <div class="gallery-container py-5">
    <h1 class="text-center mb-5">Gallery</h1>

    <!-- Search Input -->
    <div class="text-center mb-4">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Search by name or category..."
      />
    </div>

    <div class="text-center mb-4">
      <a href="/favorites" class="btn btn-primary">
        View Favorites
      </a>
    </div>

    <div class="row">
      <div
        class="gallery-item col-6 col-md-3"
        v-for="item in filteredGalleryItems"
        :key="item.id"
      >
        <div class="position-relative">
          <img
            :src="`http://localhost:3000${item.image}`"
            alt="Gallery Item"
            class="img-fluid gallery-img"
          />
          <!-- Form for submitting the favorite -->
          <form @submit.prevent="handleFormSubmit(item.id)">
            <input type="hidden" :value="userId" name="userId" />
            <input type="hidden" :value="item.id" name="itemId" />
            <button type="submit" class="circle-button">+</button>
          </form>
        </div>
        <h5 class="mt-3">{{ item.name }}</h5>
        <p class="item-category">Category: {{ item.category }}</p>
        <div class="description-container">
          <p class="text-muted">{{ item.description }}</p>
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

  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      galleryItems: [], // Store fetched gallery items here
      userId: null, // Replace with the decrypted user ID
      successMessage: "", // Message to display in the modal
      searchQuery: "" // Search query for filtering
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
  },
  mounted() {
    this.decryptUserId(); // Decrypt the user ID on component mount
    this.fetchGalleryItems(); // Fetch gallery items
  },
};
</script>

<style>
/* Add your existing styles here */

/* Additional styling for search input */
.search-input {
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.search-input input {
  width: 100%;
}
</style>
