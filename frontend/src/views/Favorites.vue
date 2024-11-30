<template>
  <div class="favorites-container py-5">
    <h1 class="text-center mb-5">Your Favorites</h1>

    <div v-if="favorites.length === 0">
      <p class="text-center">You have no favorites yet. Start adding some!</p>
    </div>

    <div v-else class="row">
      <div
        class="gallery-item col-6 col-md-3"
        v-for="item in favorites"
        :key="item.id"
      >
        <div class="position-relative">
          <img
            :src="`http://localhost:3000${item.image}`"
            alt="Gallery Item"
            class="img-fluid gallery-img"
          />
          <h5 class="mt-3">{{ item.name }}</h5>
          <p class="item-category">Category: {{ item.category }}</p>
          <div class="description-container">
            <p class="text-muted">{{ item.description }}</p>
          </div>

          <!-- Form to remove favorite -->
          <form @submit.prevent="handleRemoveFavorite(item.id)">
            <input type="hidden" :value="userId" name="userId" />
            <input type="hidden" :value="item.id" name="itemId" />
            <button type="submit" class="circle-button">-</button>
          </form>
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
      favorites: [], // Store favorites
      userId: null, // To store the decrypted userId
    };
  },
  created() {
    // Decrypt the userId from localStorage
    const decryptedUserId = CryptoJS.AES.decrypt(
      localStorage.getItem("user_id"),
      "asdasd"
    ).toString(CryptoJS.enc.Utf8);
    this.userId = decryptedUserId;

    // Fetch favorites after decrypting the userId
    this.fetchFavorites();
  },
  methods: {
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
          this.favorites = this.favorites.filter(item => item.id !== itemId);

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
      const modal = new bootstrap.Modal(document.getElementById('successModal'));
      modal.show();
    }
  },
};
</script>


<style>
/* Styles for your Favorites.vue page */
.favorites-container {
  max-width: 100%;
  padding: 0 15px;
}

.row {
  justify-content: center;
}

.gallery-item {
  margin: 15px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.position-relative {
  position: relative;
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

/* Optional: Custom styling for modal or buttons */
.circle-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 20px;
  font-size: 20px;
}

.modal-content {
  background-color: #f8f9fa;
}

.modal-header {
  background-color: #007bff;
  color: white;
}
</style>
