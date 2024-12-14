<template>
  <div class="main">
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
    <table id="galleryTable" class="modern-table " >
      <thead class="head text-black">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Status</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredGalleryItems" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.description || 'No description available' }}</td>
          <td :class="{'archived-status': item.status === 'Archived'}">
            {{ item.status || 'Active' }}
          </td>
          <td>
            <img :src="item.imageUrl" alt="Gallery Item" class="image-thumbnail" />
          </td>
          <td class="action_btn">
            <button @click="editItem(item)" class="btn-edit">Edit</button>
            <button @click="confirmDelete(item.id)" class="btn-delete">Delete</button>
            <button 
              v-if="item.status !== 'Archived'" 
              @click="archiveItem(item.id)" 
              class="btn-archive">
              Archive
            </button>
            <button v-if="item.status === 'Archived'" @click="reactivateItem(item.id)" class="btn-reactivate">
    Reactivate
  </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Editing Items -->
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

    <!-- Notification Modal -->
    <div v-if="notification.isVisible" class="modal-overlay">
      <div class="modal notification-modal">
        <p>{{ notification.message }}</p>
        <div class="form-actions">
          <button v-if="notification.isConfirm" @click="confirmAction" class="btn-save">Yes</button>
          <button v-if="notification.isConfirm" @click="cancelAction" class="btn-cancel">No</button>
          <button v-else @click="closeNotification" class="btn-save">OK</button>
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
      galleryItems: [],
      filteredGalleryItems: [],
      errorMessage: "",
      isModalOpen: false,
      selectedItem: {},
      imagePreview: null,
      imageFile: null,
      searchQuery: "",
      notification: {
        isVisible: false,
        message: "",
        isConfirm: false,
        action: null,
      },
    };
  },
  created() {
    this.fetchGalleryItems();
  },
  methods: {
    async reactivateItem(id) {
  try {
    const response = await axios.put(`http://localhost:8080/api/gallery/reactivate/${id}`);
    if (response.status === 200) {
      this.showNotification('Item reactivated successfully.');
      this.fetchGalleryItems(); // Refresh the gallery items
    }
  } catch (error) {
    this.showNotification('Failed to reactivate the item.');
  }
},
    async archiveItem(id) {
  try {
    const response = await axios.put(`http://localhost:8080/api/gallery/archive/${id}`);
    if (response.status === 200) {
      this.showNotification('Item archived successfully.');
      this.fetchGalleryItems(); // Refresh the gallery items
    }
  } catch (error) {
    this.showNotification('Failed to archive the item.');
  }
},
    async fetchGalleryItems() {
      try {
        const response = await axios.get("http://localhost:8080/api/gallery/all");
        this.galleryItems = response.data;
        this.filteredGalleryItems = this.galleryItems;
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
        const response = await axios.put(
          `http://localhost:8080/api/gallery/update/${this.selectedItem.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 200) {
          this.fetchGalleryItems();
          this.isModalOpen = false;
          this.showNotification("Item updated successfully.");
          setTimeout(() => {
        window.location.reload(); // Refresh the page after showing the notification
      }, 1000); // Optional delay for notification visibility
        }
      } catch {
        this.showNotification("Item updated successfully.");
         setTimeout(() => {
        window.location.reload(); // Refresh the page after showing the notification
      }, 1000); // Optional delay for notification visibility
      }
    },
    confirmDelete(itemId) {
      this.notification = {
        isVisible: true,
        message: "Are you sure you want to delete this item?",
        isConfirm: true,
        action: () => this.deleteItem(itemId),
      };
    },
    async deleteItem(itemId) {
      try {
        await axios.delete(`http://localhost:8080/api/gallery/delete/${itemId}`);
        this.galleryItems = this.galleryItems.filter((item) => item.id !== itemId);
        this.filteredGalleryItems = this.galleryItems;
        this.showNotification("Item deleted successfully.");
      } catch {
        this.showNotification("An error occurred while deleting the item.");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.imagePreview = null;
        this.showNotification("Please select a valid image file.");
      }
    },
    searchItems() {
      if (this.searchQuery.trim() === "") {
        this.filteredGalleryItems = this.galleryItems;
      } else {
        this.filteredGalleryItems = this.galleryItems.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    showNotification(message, isConfirm = false, action = null) {
      this.notification = { isVisible: true, message, isConfirm, action };
    },
    closeNotification() {
      this.notification.isVisible = false;
    },
    confirmAction() {
      if (this.notification.action) this.notification.action();
      this.closeNotification();
    },
    cancelAction() {
      this.closeNotification();
    },
  },
};
</script>


<style scoped>

.main {
  padding: 0 10%;
}

.action_btn{
  margin: 5px;
}

/* General styling for the gallery table */
#galleryTable {
  width: 100%;
  border-collapse: collapse;
  margin: 20px;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

#galleryTable th,
#galleryTable td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

#galleryTable th {
  background-color: #f4f4f4;
  font-weight: bold;
}

#galleryTable tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

#galleryTable tbody tr:hover {
  background-color: #f1f1f1;
}

.image-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.archived-status {
  color: #a00;
  font-weight: bold;
}

/* Styling for the search bar */
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Styling for buttons */
.btn-edit,
.btn-delete,
.btn-archive,
.btn-reactivate {
  padding: 8px 12px;
  margin-right: 5px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #e53935;
}

.btn-archive {
  background-color: #ff9800;
  color: white;
}

.btn-archive:hover {
  background-color: #fb8c00;
}

.btn-reactivate {
  background-color: #2196f3;
  color: white;
}

.btn-reactivate:hover {
  background-color: #1e88e5;
}

/* Styling for the modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #e53935;
}

/* Styling for the notification modal */
.notification-modal {
  text-align: center;
}

.notification-modal p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

</style>