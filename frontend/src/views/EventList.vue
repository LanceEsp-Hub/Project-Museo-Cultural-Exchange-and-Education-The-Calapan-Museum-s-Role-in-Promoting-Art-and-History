<template>
    <div>
      <h1>Event List</h1>
  
      <!-- Display user information -->
      <p>Welcome, {{ userName }} ({{ userEmail }})</p>
  
      <!-- Error message -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
  
      <!-- Data Table -->
      <table id="events-table" class="display">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.title }}</td>
            <td>{{ event.description }}</td>
            <td>{{ event.event_date }}</td>
            <td>
              <img
                v-if="event.image_url"
                :src="'http://localhost:3000' + event.image_url"
                alt="Event Image"
                class="event-image"
              />
              <span v-else>No Image</span>
            </td>
            <td>
              <button class="btn-edit" @click="editEvent(event)">Edit</button>
              <button class="btn-delete" @click="deleteEvent(event.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal for editing an event -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Edit Event</h2>
          <form @submit.prevent="updateEvent">
            <div class="form-group">
              <label for="title">Title</label>
              <input v-model="selectedEvent.title" type="text" id="title" required />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="selectedEvent.description" id="description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input v-model="selectedEvent.event_date" type="date" id="date" required />
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
  import CryptoJS from "crypto-js";
  
  export default {
    data() {
      return {
        events: [],
        errorMessage: "",
        isModalOpen: false,
        selectedEvent: {},
        imagePreview: null,
        imageFile: null,
        userName: "",
        userEmail: "",
      };
    },
    created() {
      // Decrypt user data and fetch events
      try {
        const encryptedName = localStorage.getItem("user_name");
        if (encryptedName) {
          this.userName = CryptoJS.AES.decrypt(encryptedName, "asdasd").toString(CryptoJS.enc.Utf8);
        }
        this.userEmail = localStorage.getItem("user_email") || "Email not available";
      } catch (error) {
        console.error("Error decrypting user data:", error);
      }
      this.fetchEvents();
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await axios.get("http://localhost:8080/api/events");
          this.events = response.data;
          this.$nextTick(() => {
            this.initializeDataTable();
          });
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "An error occurred while fetching events.";
        }
      },
  
      initializeDataTable() {
        if ($.fn.dataTable.isDataTable("#events-table")) {
          $("#events-table").DataTable().destroy();
        }
        $("#events-table").DataTable({
          paging: true,
          searching: true,
          ordering: true,
          info: true,
        });
      },
  
      editEvent(event) {
        this.selectedEvent = { ...event };
        this.imagePreview = event.image_url ? `http://localhost:3000${event.image_url}` : null;
        this.isModalOpen = true;
      },
  
      closeModal() {
        this.isModalOpen = false;
        this.selectedEvent = {};
        this.imagePreview = null;
      },
  
      async updateEvent() {
        try {
          const formData = new FormData();
          formData.append("title", this.selectedEvent.title);
          formData.append("description", this.selectedEvent.description);
          formData.append("event_date", this.selectedEvent.event_date);
          if (this.imageFile) {
            formData.append("image", this.imageFile);
          }
  
          await axios.put(
            `http://localhost:8080/api/events/${this.selectedEvent.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          this.fetchEvents();
          this.closeModal();
          alert("Event updated successfully");
        } catch (error) {
          console.error("Error updating event:", error);
          alert("Failed to update the event. Please try again.");
        }
      },
  
      async deleteEvent(eventId) {
        if (confirm("Are you sure you want to delete this event?")) {
          try {
            await axios.delete(`http://localhost:8080/api/events/${eventId}`);
            this.fetchEvents();
            alert("Event deleted successfully");
          } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete the event. Please try again.");
          }
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
    },
  };
  </script>
  
  <style scoped>
  /* Table Styling */
  .event-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .event-table th,
  .event-table td {
    padding: 12px 20px;
    border: 1px solid #ddd;
  }
  
  .event-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .event-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .event-image {
    width: 100px;
    height: auto;
    border-radius: 4px;
  }
  
  .image-preview {
    width: 150px;
    height: auto;
    margin-top: 10px;
  }
  
  .search-input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 14px;
    width: 100%;
    max-width: 300px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  </style>
  