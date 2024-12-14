<template>
  <div class="wrapper d-flex">
    <!-- Sidebar Component -->
    <Sidebar 
      @toggle-sidebar="toggleSidebar" 
      @load-page="loadPage"
      @logout="logout"
    />
    <!-- Main Content Area -->
    <div class="main flex-fill" id="container">
      <main class="content px-3 py-4">
        <div class="container-fluid">
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3 class="fw-bold fs-4">Admin Dashboard</h3>
              <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ userName }}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><a class="dropdown-item" href="#">My Profile</a></li>
                  <li><a class="dropdown-item" href="#">Settings</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><button @click="logout" class="btn btn-danger">Logout</button></li>
                </ul>
              </div>
            </div>

            <!-- Displaying User Information in 2 Rows, 2 Columns -->
            <div class="row row-cols-1 row-cols-md-2 mb-4">
              <div class="col mb-4" v-for="(card, index) in stats" :key="index">
                <div class="card border-0 shadow">
                  <div class="card-body py-4">
                    <h5 class="mb-2 fw-bold">{{ card.title }}</h5>
                    <p class="mb-2 fw-bold" :id="card.id">{{ card.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chart Containers: 2 Columns -->
            <div class="row mb-4">
              <!-- Left Chart Container -->
              <div class="col-md-8 mb-4">
                <div class="card border-0 shadow">
                  <div class="card-body">
                    <h5 class="card-title">Visit Bookings by Date</h5>
                    <canvas id="visitBookingsChart" width="400" height="140"></canvas>
                  </div>
                </div>
              </div>

              <!-- Right Chart Container -->
              <div class="col-md-4 mb-4">
                <div class="card border-0 shadow">
                  <div class="card-body text-center">
                    <h5 class="card-title mb-4">Statuses</h5>
                    <div class="chart-container" style="position: relative; width: 100%; height: 300px;">
                      <canvas id="CountAllStatus"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import Chart from 'chart.js/auto';
import CryptoJS from 'crypto-js';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      stats: [], // Array for dynamically displaying stats cards
      userName: '',
      userEmail: '',
      visitBookingsData: [], // Array to hold visit bookings data
      statusCounts: [],  // Array to store status counts for doughnut chart
    };
  },
  created() {
    // Decrypt user name from localStorage and set email
    const decryptedName = CryptoJS.AES.decrypt(
      localStorage.getItem('user_name'),
      'asdasd'
    ).toString(CryptoJS.enc.Utf8);
    this.userName = decryptedName;
    this.userEmail = localStorage.getItem('user_email');
  },
  methods: {
    loadPage(page) {
      document.getElementById('container').innerHTML = `<object type="text/html" data="${page}" style="width:100%; height:100vh;"></object>`;
    },

    // Fetch booking status counts for the doughnut chart
    fetchBookingStatusCounts() {
      axios.get('/api/admin/booking-status-counts')
        .then(response => {
          this.statusCounts = response.data[0]; // Access the first array within the response
          console.log("Booking Status Counts:", this.statusCounts);  // Log the fetched data
          this.initializeCharts(); // Call the chart initialization method
        })
        .catch(error => {
          console.error("Error fetching booking status counts:", error);
        });
    },

    // Fetch visit bookings
    async fetchVisitBookings() {
      try {
        const response = await axios.get('/api/admin/visit-bookings-by-date');
        this.visitBookingsData = response.data.bookings;
        console.log("Fetched Visit Bookings:", this.visitBookingsData);

        // Fetch booking status counts for the doughnut chart
        await this.fetchBookingStatusCounts();
        this.initializeCharts(); // Initialize the charts after fetching data
      } catch (error) {
        console.error('Error fetching visit bookings:', error);
      }
    },

    // Fetch stats data for dashboard cards
    async fetchStats() {
      try {
        const [loginsResponse, usersResponse, bookingsResponse, galleryResponse] = await Promise.all([
          axios.get('/api/admin/total-visits'),
          axios.get('/api/admin/total-users'),
          axios.get('/api/admin/total-accepted-bookings'),
          axios.get('/api/admin/total-gallery-items'),
        ]);

        this.stats = [
          {
            title: 'TOTAL VISITS',
            value: loginsResponse.data.stats[0]?.value || 0,
            id: 'TotalVisits',
          },
          {
            title: 'TOTAL USERS',
            value: usersResponse.data.stats[0]?.value || 0,
            id: 'TotalUsers',
          },
          {
            title: 'ACCEPTED VISIT',
            value: bookingsResponse.data.stats[0]?.value || 0,
            id: 'TotalAcceptedBookings',
          },
          {
            title: 'TOTAL COLLECTION ITEMS',
            value: galleryResponse.data.stats[0]?.value || 0,
            id: 'TotalGalleryItems',
          },
        ];
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },

    // Initialize the charts with the fetched data
    initializeCharts() {
  // Destroy the existing chart (if any) on the visitBookingsChart canvas
  const visitBookingsChartCanvas = document.getElementById('visitBookingsChart');
  if (visitBookingsChartCanvas.chart) {
    visitBookingsChartCanvas.chart.destroy();
  }

  // Line chart for Visit Bookings
  const ctxVisitBookings = visitBookingsChartCanvas.getContext('2d');

  // Extract unique dates and count accepted bookings
  const labels = [
    ...new Set(
      this.visitBookingsData
        .map(booking => {
          const parsedDate = new Date(booking.visit_date);
          return parsedDate.toString() !== 'Invalid Date'
            ? parsedDate.toLocaleDateString()
            : null;
        })
        .filter(label => label !== null)
    ),
  ];

  const data = labels.map(label =>
    this.visitBookingsData.filter(
      booking =>
        new Date(booking.visit_date).toLocaleDateString() === label &&
        booking.booking_status === 'accepted'
    ).length
  );

  // Initialize the line chart
  const visitBookingsChart = new Chart(ctxVisitBookings, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Accepted Visit Bookings',
          data: data,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
  });

  // Assign chart to the canvas for future destruction
  visitBookingsChartCanvas.chart = visitBookingsChart;

  // Destroy the existing chart (if any) on the doughnut chart canvas
  const doughnutChartCanvas = document.getElementById('CountAllStatus');
  if (doughnutChartCanvas.chart) {
    doughnutChartCanvas.chart.destroy();
  }

  // Doughnut Chart for Booking Status
  const ctxDoughnut = doughnutChartCanvas.getContext('2d');

  // Prepare data for the doughnut chart from statusCounts
  const statusLabels = ['Pending', 'Accepted', 'Decline', 'Cancelled'];
  const statusColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'];

  // Create the data for the doughnut chart
  const dataForDoughnut = statusLabels.map(status => {
    const countObj = this.statusCounts.find(
      statusCount => statusCount.booking_status.toLowerCase() === status.toLowerCase()
    );
    return countObj ? countObj.count : 0;
  });

  // Initialize the doughnut chart
  const doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
      labels: statusLabels,
      datasets: [
        {
          data: dataForDoughnut,
          backgroundColor: statusColors,
        },
          ],
        },
      });
      doughnutChartCanvas.chart = doughnutChart;

    },

    // Logout function to clear session data
    logout() {
      // Clear user session and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      this.$router.push('/login'); // Redirect to login page
    },
  },

  mounted() {
    this.fetchVisitBookings(); // Fetch visit bookings data
    this.fetchStats(); // Fetch stats for dashboard cards
  },
};
</script>


<style scoped>






@import '@/assets/css/adminstyle.css';


</style>
