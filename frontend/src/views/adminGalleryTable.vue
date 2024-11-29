<template>
  <div>
    <h1>Gallery Items</h1>

    <!-- Display an error message if there is one -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="searchItems" 
        placeholder="Search by Name or Category" 
        class="search-input"
      />
    </div>

    <!-- Table to display gallery items -->
    <table id="galleryTable" class="modern-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredGalleryItems" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.description || 'No description available' }}</td>
          <td>
            <img :src="item.imageUrl" alt="Gallery Item" class="image-thumbnail" />
          </td>
          <td>
            <button @click="editItem(item)" class="btn-edit">Edit</button>
            <button @click="deleteItem(item.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Overlay and Content -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h2>Edit Gallery Item</h2>
        <form @submit.prevent="updateItem" enctype="multipart/form-data">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="selectedItem.name" type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <input v-model="selectedItem.category" type="text" id="category" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="selectedItem.description" id="description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input type="file" id="image" @change="handleImageUpload" />
            <p v-if="imagePreview">Preview:</p>
            <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" class="image-preview" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Save</button>
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      galleryItems: [],  // All gallery items
      filteredGalleryItems: [],  // Filtered gallery items based on search
      errorMessage: "",
      isModalOpen: false,
      selectedItem: {},
      imagePreview: null,
      imageFile: null,
      searchQuery: "",  // Search query for filtering
    };
  },
  created() {
    this.fetchGalleryItems();
  },
  methods: {
    async fetchGalleryItems() {
      try {
        const response = await axios.get("http://localhost:8080/api/gallery/all");
        this.galleryItems = response.data;
        this.filteredGalleryItems = this.galleryItems;  // Initialize with all items
      } catch (error) {
        this.errorMessage =
          error.response ? error.response.data.message : "An error occurred while fetching gallery items.";
      }
    },

    editItem(item) {
      this.selectedItem = { ...item };
      this.isModalOpen = true;
      this.imagePreview = item.imageUrl;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async updateItem() {
      try {
        if (!this.selectedItem.name || !this.selectedItem.category || !this.selectedItem.description) {
          alert("Please fill in all fields.");
          return;
        }

        const formData = new FormData();
        formData.append("name", this.selectedItem.name);
        formData.append("category", this.selectedItem.category);
        formData.append("description", this.selectedItem.description);

        if (this.imageFile) {
          formData.append("image", this.imageFile);
        }

        if (!this.selectedItem.id) {
          alert("Item ID is missing.");
          return;
        }

        const response = await axios.put(
          `http://localhost:8080/api/gallery/update/${this.selectedItem.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          this.fetchGalleryItems();
          this.isModalOpen = false;
          alert("Item updated successfully");
        } else {
          alert("Error updating item. Please try again.");
        }
      } catch (error) {
        console.error("Error during update:", error);
        alert("Error updating item. Please try again.");
      }
    },

    async deleteItem(itemId) {
      if (confirm("Are you sure you want to delete this item?")) {
        await axios.delete(`http://localhost:8080/api/gallery/delete/${itemId}`);
        this.galleryItems = this.galleryItems.filter(item => item.id !== itemId);
        this.filteredGalleryItems = this.galleryItems;  // Update filtered list
        alert("Item deleted successfully");
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.imagePreview = null;
        alert("Please select a valid image file.");
      }
    },

    searchItems() {
      if (this.searchQuery.trim() === "") {
        this.filteredGalleryItems = this.galleryItems;
      } else {
        this.filteredGalleryItems = this.galleryItems.filter(item =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th, .modern-table td {
  padding: 8px;
  text-align: left;
}

.modern-table th {
  background-color: #f4f4f4;
}

.image-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.image-preview {
  max-width: 200px;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>
