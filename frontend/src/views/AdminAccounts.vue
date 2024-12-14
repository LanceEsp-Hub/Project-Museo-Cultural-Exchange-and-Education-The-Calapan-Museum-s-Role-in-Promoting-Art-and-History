<template>
    
  <div class="container mt-5">
      
    <h2>Accounts</h2>
    
    <!-- Search Input -->
    <input 
      type="text" 
      v-model="searchQuery" 
      class="form-control mb-3" 
      placeholder="Search by role or email"
    />
    
    <!-- Accounts Table -->
    <table id="accountsTable" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Acc ID</th>
          <th>Role</th>
          <th>Email</th>
          <th>Is Verified</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in filteredAccounts" :key="account.acc_id">
          <td>{{ account.acc_id }}</td>
          <td>{{ account.role }}</td>
          <td>{{ account.email }}</td>
          <td>{{ account.is_verified ? '1' : '0' }}</td>
          <td>{{ formatDate(account.created_at) }}</td>
          <td>{{ formatDate(account.updated_at) }}</td>
          <td>
            <button @click="openEditModal(account)" class="btn btn-primary btn-sm">Edit</button>
          </td>
        </tr>
        <tr v-if="filteredAccounts.length === 0">
          <td colspan="7" class="text-center">No accounts found</td>
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
        <h2>Edit Account</h2>
        <form @submit.prevent="updateAccount">
          <div class="form-group">
            <label for="role">Role</label>
            <input v-model="selectedAccount.role" type="text" id="role" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="selectedAccount.email" type="email" id="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="is_verified">Is Verified</label>
            <select v-model="selectedAccount.is_verified" class="form-control" id="is_verified">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
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
        <p>The account has been updated successfully.</p>
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
      accounts: [], // Accounts data from the backend
      searchQuery: '', // Search query
      isModalOpen: false, // Control the edit modal visibility
      isSuccessModalOpen: false, // Control the success notification modal visibility
      selectedAccount: null, // Store the selected account for editing
      isLoading: false, // Loading state
    };
  },
  computed: {
    filteredAccounts() {
      const query = this.searchQuery.toLowerCase();
      return this.accounts.filter((account) => {
        return (
          account.role.toLowerCase().includes(query) ||
          account.email.toLowerCase().includes(query)
        );
      });
    },
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    async fetchAccounts() {
  this.isLoading = true;
  try {
    const response = await axios.get('http://localhost:3000/api/admin/accounts');
    this.accounts = response.data.accounts;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('API endpoint not found:', error.response.data);
      alert('Accounts endpoint is unavailable. Please check the server.');
    } else {
      console.error('Error fetching accounts:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  } finally {
    this.isLoading = false;
  }
},
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    openEditModal(account) {
      this.selectedAccount = { ...account };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedAccount = null;
    },
    async updateAccount() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/admin/accounts/${this.selectedAccount.acc_id}`,
          this.selectedAccount
        );
        const index = this.accounts.findIndex(account => account.acc_id === this.selectedAccount.acc_id);
        if (index !== -1) {
          this.accounts[index] = { ...this.selectedAccount };
        }
        this.closeModal();
        this.openSuccessModal();
      } catch (error) {
        console.error('Error updating account:', error);
        alert('Failed to update the account. Please try again.');
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