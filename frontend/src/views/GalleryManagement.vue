<template>
  <div class="gallery-management container py-5">
    <h2 class="text-center mb-4">Gallery Management</h2>
    <form 
      @submit.prevent="addGalleryItem" 
      enctype="multipart/form-data" 
      class="p-4 border rounded bg-light shadow"
    >
      <!-- Gallery Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Gallery Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="gallery.name" 
          class="form-control" 
          required 
        />
      </div>
      <!-- Category -->
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <input 
          type="text" 
          id="category" 
          v-model="gallery.category" 
          class="form-control" 
          required 
        />
      </div>
      <!-- Description -->
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea 
          id="description" 
          v-model="gallery.description" 
          class="form-control" 
          rows="4"
        ></textarea>
      </div>
      <!-- Date -->
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input 
          type="date" 
          id="date" 
          v-model="gallery.date" 
          class="form-control" 
          required 
        />
      </div>
      <!-- Image -->
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input 
          type="file" 
          id="image" 
          class="form-control" 
          @change="handleFileUpload" 
          required 
        />
      </div>
      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-100">Add Gallery Item</button>
      </div>
    </form>
    <!-- Message -->
    <p 
      v-if="message" 
      class="mt-3 text-center alert" 
      :class="{ 'alert-success': message.includes('success'), 'alert-danger': message.includes('Error') }"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gallery: {
        name: '',
        category: '',
        description: '',
        date: '',
        image: '',
      },
      message: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.gallery.image = event.target.files[0]; // Handle file upload and store the file in the gallery object
    },
    async addGalleryItem() {
      try {
        const formData = new FormData(); // Create a FormData object for file upload
        formData.append('name', this.gallery.name);
        formData.append('category', this.gallery.category);
        formData.append('description', this.gallery.description);
        formData.append('date', this.gallery.date);
        formData.append('image', this.gallery.image); // Append the image file

        const response = await axios.post('/api/gallery', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the correct content type for form data
          },
        });

        // Check if the response has a message
        this.message = response.data.message ? response.data.message : 'Gallery item added successfully!';
      } catch (error) {
        this.message = 'Error while adding gallery item.';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/adminGalleryTable.css';  /* Using alias @ to point to the src folder */
</style>
