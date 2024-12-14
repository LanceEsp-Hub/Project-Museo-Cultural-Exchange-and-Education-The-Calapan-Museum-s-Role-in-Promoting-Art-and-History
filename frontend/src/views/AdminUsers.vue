<template>
    <div class="container mt-5">
      <h2>User Accounts</h2>
      
      <!-- Search Input -->
      
      
      <!-- Users Table -->
      <table id="usersTable" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.User_id">
            <td>{{ user.User_id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.middle_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ formatDate(user.birthdate) }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td>{{ formatDate(user.updated_at) }}</td>
            <td>
              <button @click="openEditModal(user)" class="btn btn-primary btn-sm">Edit</button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="10" class="text-center">No users found</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loading-spinner">
        <i class="fa fa-spinner fa-spin"></i> Loading...
      </div>
    
      <!-- Edit Modal -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Edit User</h2>
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="first_name">First Name</label>
              <input v-model="selectedUser.first_name" type="text" id="first_name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="middle_name">Middle Name</label>
              <input v-model="selectedUser.middle_name" type="text" id="middle_name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input v-model="selectedUser.last_name" type="text" id="last_name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="birthdate">Birthdate</label>
              <input v-model="selectedUser.birthdate" type="date" id="birthdate" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select v-model="selectedUser.gender" class="form-control" id="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="phone_number">Phone Number</label>
              <input v-model="selectedUser.phone_number" type="tel" id="phone_number" class="form-control" required />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Save</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    
      <!-- Success Notification Modal -->
      <div v-if="isSuccessModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Success!</h2>
          <p>The user has been updated successfully.</p>
          <button @click="closeSuccessModal" class="btn btn-success">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        searchQuery: '',
        isModalOpen: false,
        isSuccessModalOpen: false,
        selectedUser: null,
        isLoading: false,
      };
    },
    computed: {
        filteredUsers() {
    const query = this.searchQuery.toLowerCase();
    return this.users.filter((user) => {
      return (
        (user.first_name && user.first_name.toLowerCase().includes(query)) ||
        (user.middle_name && user.middle_name.toLowerCase().includes(query)) ||
        (user.last_name && user.last_name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
      );
    });
  },
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        this.isLoading = true;
        try {
          const response = await axios.get('http://localhost:3000/api/admin/users');
          this.users = response.data.users;
          this.$nextTick(() => {
            // Initialize DataTable after the users are fetched
            $('#usersTable').DataTable();
          });
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      openEditModal(user) {
        this.selectedUser = { ...user };
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.selectedUser = null;
      },
      async updateUser() {
        try {
          const response = await axios.put(
            `http://localhost:3000/api/admin/users/${this.selectedUser.User_id}`,
            this.selectedUser
          );
          const index = this.users.findIndex(user => user.User_id === this.selectedUser.User_id);
          if (index !== -1) {
            this.users[index] = { ...this.selectedUser };
          }
          this.closeModal();
          this.openSuccessModal();
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update the user. Please try again.');
        }
      },
      openSuccessModal() {
        this.isSuccessModalOpen = true;
        setTimeout(() => {
          this.closeSuccessModal();
        }, 3000);
      },
      closeSuccessModal() {
        this.isSuccessModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure modal is on top of other content */
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px; /* Smaller width for the modal */
  max-width: 100%; /* Ensure modal doesn't overflow */
  z-index: 10000; /* Ensure modal content is above overlay */
  box-sizing: border-box; /* Include padding in width */
  display: block; /* Force block-level behavior */
}
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .loading-spinner {
    text-align: center;
    font-size: 1.5rem;
    padding: 20px;
  }
  </style>
  