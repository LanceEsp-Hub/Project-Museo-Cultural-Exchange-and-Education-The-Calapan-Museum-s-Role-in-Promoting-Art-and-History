<template>
  <div class="main">
    <h1>Event List</h1>

    <!-- Display user information -->
    <!-- <p>Welcome, {{ userName }} ({{ userEmail }})</p> -->

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
          <th>Status</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ event.description }}</td>
          <td>{{ new Date(event.event_date).toISOString().split('T')[0] }}</td>
          <td>{{ event.status }}</td>
          <td>
            <img
              v-if="event.image_url"
              :src="'http://localhost:3000' + event.image_url"
              alt="Event Image"
              class="event-image"
              style="height: 100px; width: 100px;"
            />
            <span v-else>No Image</span>
          </td>
          <td>
            <button class="btn-edit" @click="editEvent(event)">Edit</button>
            <button class="btn-delete" @click="confirmDeleteEvent(event.id)">Delete</button>
            <button v-if="event.status === 'active'" @click="archiveEvent(event.id)" class="btn-archive">
    Archive
  </button>
  <button v-else @click="reactivateEvent(event.id)" class="btn-reactivate">
    Reactivate
  </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Event Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h2>Edit Event</h2>
        <label for="title">Title:</label>
        <input type="text" v-model="selectedEvent.title" id="title" />

        <label for="description">Description:</label>
        <textarea v-model="selectedEvent.description" id="description"></textarea>

        <label for="event_date">Date:</label>
        <input type="date" v-model="selectedEvent.event_date" id="event_date" />

        <label for="image">Image:</label>
        <input type="file" @change="handleImageUpload" id="image" />

        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image Preview" />
        </div>

        <button @click="updateEvent">Save Changes</button>
        <button @click="closeModal">Cancel</button>
        
      </div>
    </div>

    <!-- Notification Modal -->
    <div v-if="isNotificationModalOpen" class="notification-overlay">
      <div class="notification-modal">
        <p>{{ notificationMessage }}</p>
        <button @click="closeNotificationModal">OK</button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="notification-overlay">
      <div class="notification-modal">
        <p>Are you sure you want to delete this event?</p>
        <button @click="deleteEvent">Yes</button>
        <button @click="closeDeleteModal">No</button>
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
      isNotificationModalOpen: false, // To control notification modal visibility
      notificationMessage: "", // Message to display in the notification modal
      isDeleteModalOpen: false, // To control the delete confirmation modal visibility
      eventToDelete: null, // Store the event id to delete
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
    this.refreshEvents();
  },
  methods: {
    async archiveEvent(eventId) {
  try {
    const response = await axios.put(`http://localhost:8080/api/events/archive/${eventId}`);
    if (response.status === 200) {
      this.showNotification("Event archived successfully.");
      this.refreshEvents();
    }
  } catch (error) {
    console.error("Error archiving event:", error);
    this.showNotification("Failed to archive the event.");
  }
},

async reactivateEvent(eventId) {
  try {
    const response = await axios.put(`http://localhost:8080/api/events/reactivate/${eventId}`);
    if (response.status === 200) {
      this.showNotification("Event reactivated successfully.");
      this.refreshEvents();
    }
  } catch (error) {
    console.error("Error reactivating event:", error);
    this.showNotification("Failed to reactivate the event.");
  }
},
    async refreshEvents() {
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
      this.imagePreview = event.image_url ? `http://localhost:3000/${event.image_url}` : null;
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

        // Check if there is an updated image
        if (this.selectedEvent.image) {
          // Append the new image file
          formData.append('events', this.selectedEvent.image);
        }

        // Ensure eventId is set from the selected event
        const eventId = this.selectedEvent.id;

        // Send the PUT request with formData
        const response = await axios.put(`/api/events/${eventId}`, formData);
        console.log('Event updated successfully:', response);

        // Refresh events and close modal
        await this.refreshEvents();
        this.closeModal();
        this.showNotification("Event updated successfully");
      } catch (error) {
        console.error("Error updating event:", error);
        alert("Failed to update the event. Please try again.");
      }
    },

    confirmDeleteEvent(eventId) {
      this.eventToDelete = eventId; // Store the event ID to be deleted
      this.isDeleteModalOpen = true; // Open the delete confirmation modal
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false; // Close the delete confirmation modal
      this.eventToDelete = null; // Clear the stored event ID
    },

    async deleteEvent() {
      if (this.eventToDelete) {
        try {
          await axios.delete(`http://localhost:8080/api/events/${this.eventToDelete}`);
          await this.refreshEvents(); // Refresh the events after deletion
          this.showNotification("Event deleted successfully");
          this.closeDeleteModal();
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
      this.selectedEvent.image = event.target.files[0];
    },

    showNotification(message) {
      this.notificationMessage = message;
      this.isNotificationModalOpen = true;
    },

    closeNotificationModal() {
      this.isNotificationModalOpen = false;
    },
  },
};
</script>

<style scoped>

.main{
  padding:50px 10%;
}
/* General styling for the event list */
#eventList {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

#eventList th,
#eventList td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

#eventList th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  font-size: 0.9rem;
}

#eventList tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

#eventList tbody tr:hover {
  background-color: #f1f5f9;
  transition: background-color 0.3s ease;
}

.image-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.archived-status {
  color: #d9534f;
  font-weight: bold;
}

/* Styling for the search bar */
.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Modern button styling */
.btn {
  padding: 8px 16px;
  margin-right: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
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
  padding: 25px;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  color: #333;
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
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
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

.notification-modal button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-modal button:hover {
  background-color: #45a049;
}

</style>