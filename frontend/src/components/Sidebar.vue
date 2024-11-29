<template>
  <aside :id="sidebarId" :class="{ expand: sidebarExpanded }">
    <div class="d-flex align-items-center justify-content-between">
      <button class="toggle-btn" type="button" @click="toggleSidebar">
        <i class="lni lni-grid-alt"></i>
      </button>
      <div class="sidebar-logo">
        <a href="#"></a>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="sidebar-item">
        <a href="#" class="sidebar-link" @click="loadPage('/admin-dashboard')">
          <i class="lni lni-agenda"></i>
          <span>Dashboard</span>
        </a>
      </li>
      
            <li class="sidebar-item">
        <a href="#" class="sidebar-link" @click="toggleManagementDropdown">
          <i class="lni lni-protection"></i>
          <span>Collection Management</span>
        </a>
        <ul v-if="isManagementOpen" class="sidebar-dropdown list-unstyled">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" @click="loadPage('/admin/gallery')">VIEW COLLECTION</a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" @click="loadPage('/gallery-management')">ADD COLLECTION</a>
          </li>
        </ul>
      </li>

      <!-- Sidebar Item for Event and News Management -->
      <li class="sidebar-item">
        <a href="#" class="sidebar-link" @click="toggleManagementDropdown">
          <i class="lni lni-protection"></i>
          <span>Event and News Management</span>
        </a>
        <ul v-if="isManagementOpen" class="sidebar-dropdown list-unstyled">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" @click="loadPage('/events')">View Event and News</a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" @click="loadPage('/create-event')">Create Event</a>
          </li>
        </ul>
      </li>

        <!-- New Sidebar Item for View Reviews -->
    <li class="sidebar-item">
      <a href="#" class="sidebar-link" @click="loadPage('/view-reviews')">
        <i class="lni lni-comments"></i>
        <span>View Reviews</span>
      </a>
    </li>


      
      <!-- <li class="sidebar-item">
        <a href="#" class="sidebar-link" @click="loadPage('/AdminAcc')">
          <i class="lni lni-cog"></i>
          <span>Account Settings</span>
        </a>
      </li> -->
    </ul>

    <div class="sidebar-footer">
      <button class="sidebar-link" @click="logout">
        <i class="lni lni-exit"></i> Logout
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sidebarExpanded: false, // Controls the expanded state of the sidebar
      isManagementOpen: false, // Controls the dropdown visibility
    };
  },
  computed: {
    sidebarId() {
      return 'sidebar'; // You can customize this if needed
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded; // Toggle sidebar expanded state
    },
    toggleManagementDropdown() {
      this.isManagementOpen = !this.isManagementOpen; // Toggle dropdown visibility
    },
    loadPage(page) {
      this.$emit('load-page', page); // Emit event to parent for page load
    },
    logout() {
      this.$emit('logout'); // Emit event to parent for logout
    },
  },
};
</script>

<style scoped>
/* Add styles for sidebar expansion if needed */
.expand {
  width: 250px; /* Adjust width for expanded sidebar */
  /* You can add other styles for the expanded state */
}

/* Additional styles for the sidebar */
#sidebar {
  width: 60px; /* Initial width of the sidebar */
  transition: width 0.3s ease; /* Smooth transition for expanding */
}
</style>
