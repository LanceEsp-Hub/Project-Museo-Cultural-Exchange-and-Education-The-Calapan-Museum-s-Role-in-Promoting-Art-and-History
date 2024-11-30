<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Create Event</h1>
  
      <!-- Event Creation Form -->
      <form @submit.prevent="createEvent" enctype="multipart/form-data" class="p-4 bg-light rounded shadow-sm">
        <div class="form-group mb-3">
          <label for="title" class="form-label">Event Title</label>
          <input
            v-model="event.title"
            type="text"
            id="title"
            class="form-control"
            placeholder="Enter event title"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="description" class="form-label">Event Description</label>
          <textarea
            v-model="event.description"
            id="description"
            rows="3"
            class="form-control"
            placeholder="Enter event description"
            required
          ></textarea>
        </div>
        <div class="form-group mb-3">
          <label for="event_date" class="form-label">Event Date</label>
          <input
            v-model="event.event_date"
            type="date"
            id="event_date"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="image" class="form-label">Event Image</label>
          <input type="file" id="image" class="form-control" @change="handleImageUpload" />
          <p v-if="imagePreview" class="mt-2">Preview:</p>
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Image Preview"
            class="img-thumbnail mt-2"
            style="max-height: 300px; object-fit: contain;"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Create Event</button>
      </form>
  
      <!-- Bootstrap Modal -->
      <div
        class="modal fade"
        id="successModal"
        tabindex="-1"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="successModalLabel">Success</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Event created successfully!</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">
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
        event: {
          title: "",
          description: "",
          event_date: "",
          image_url: null,
        },
        imagePreview: null,
        imageFile: null,
      };
    },
    methods: {
      // Handle image file upload
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
  
      // Create event function
      async createEvent() {
        try {
          // Validate required fields
          if (!this.event.title || !this.event.description || !this.event.event_date) {
            alert("Please fill in all fields.");
            return;
          }
  
          const formData = new FormData();
          formData.append("title", this.event.title);
          formData.append("description", this.event.description);
          formData.append("event_date", this.event.event_date);
  
          // If an image was selected, append it to the form data
          if (this.imageFile) {
            formData.append("events", this.imageFile);
          }
  
          // Make API request to create event
          const response = await axios.post("http://localhost:8080/api/events", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          if (response.status === 201) {
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById("successModal"));
            modal.show();
  
            // Reset form
            this.event = { title: "", description: "", event_date: "", image_url: null };
            this.imagePreview = null;
            this.imageFile = null;
          }
        } catch (error) {
          alert("Error creating event. Please try again.");
          console.error("Error creating event:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  .img-thumbnail {
    display: block;
    margin: auto;
  }
  </style>
  