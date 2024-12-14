<template>
  <div class="container mt-4">
    <h1 class="text-center">Visit Bookings</h1>
    <div class="text-end mb-3">
      <button class="btn btn-primary" @click="downloadPDF">Download PDF Report</button>
    </div>
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th style="width: 10%;">User ID</th>
          <th style="width: 15%;">Organization</th>
          <th style="width: 10%;">Visit Date</th>
          <th style="width: 10%;">Booking Time</th>
          <th style="width: 10%;">Guests</th>
          <th style="width: 10%;">Status</th>
          <th style="width: 15%;">Rejection Reason</th>
          <th style="width: 15%;">Cancellation Reason</th>
          <th style="width: 15%;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.booking_id">
          <td>{{ booking.user_id }}</td>
          <td>{{ booking.organization || 'Individual' }}</td>
          <td>{{ formatDate(booking.visit_date) }}</td>
          <td>{{ booking.booking_time }}</td>
          <td>{{ booking.number_of_guests }}</td>
          <td>{{ booking.booking_status }}</td>
          <td>{{ booking.rejection_reason || 'N/A' }}</td>
          <td>{{ booking.cancellation_reason || 'N/A' }}</td>
          <td>
            <template v-if="booking.booking_status !== 'decline'">
              <button
                class="btn btn-success btn-sm me-2"
                @click="updateStatus(booking.booking_id, 'accepted')"
              >
                Accept
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="openRejectModal(booking.booking_id)"
              >
                Reject
              </button>
            </template>
            <span v-else class="text-muted">No actions available</span>
          </td>
        </tr>
        <tr v-if="bookings.length === 0">
          <td colspan="9" class="text-center">No bookings available</td>
        </tr>
      </tbody>
    </table>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Rejection Reason</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeRejectModal"></button>
          </div>
          <div class="modal-body">
            <label for="rejectionReason">Enter reason for rejection:</label>
            <textarea
              v-model="rejectionReason"
              id="rejectionReason"
              class="form-control"
              rows="4"
              placeholder="Provide your reason here..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeRejectModal">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="submitRejection">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      bookings: [], // Array to store all booking data
      showRejectModal: false, // Controls modal visibility
      rejectionReason: '', // Stores the rejection reason
      selectedBookingId: null, // ID of the booking being rejected
    };
  },
  methods: {
    // Fetch bookings from the API
    fetchBookings() {
      axios
        .get('http://localhost:3000/api/auth/bookings')
        .then((response) => {
          this.bookings = response.data;
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    },

    // Format the date to "YYYY-MM-DD"
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },

    // Open the rejection modal and set the selected booking ID
    openRejectModal(id) {
      this.selectedBookingId = id;
      this.showRejectModal = true;
    },

    // Close the rejection modal
    closeRejectModal() {
      this.showRejectModal = false;
      this.rejectionReason = '';
    },

    // Update booking status
    updateStatus(id, status) {
      if (status === 'decline') {
        this.openRejectModal(id); // Open the modal when declining
      } else {
        this.confirmStatusUpdate(id, status); // Otherwise, update directly
      }
    },

    // Confirm status update for accepted or pending status
    confirmStatusUpdate(id, status) {
      axios
        .put(`http://localhost:3000/api/auth/bookings/${id}`, { booking_status: status })
        .then(() => {
          this.fetchBookings();
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    },

    // Submit rejection reason
    submitRejection() {
      if (!this.rejectionReason.trim()) {
        alert('Please provide a reason for rejection.');
        return;
      }

      axios
        .put(`http://localhost:3000/api/auth/bookings/${this.selectedBookingId}`, {
          booking_status: 'decline',
          rejection_reason: this.rejectionReason,
        })
        .then(() => {
          this.showRejectModal = false;
          this.rejectionReason = '';
          this.fetchBookings();
        })
        .catch((error) => {
          console.error('Error submitting rejection:', error);
        });
    },

    // Download PDF Report
    downloadPDF() {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text('Booking Report', 14, 16);

      // Add table headers
      const headers = [
        [
          'User ID',
          'Organization',
          'Visit Date',
          'Booking Time',
          'Guests',
          'Status',
          'Rejection Reason',
          'Cancellation Reason',
        ],
      ];

      // Add table rows
      const rows = this.bookings.map((booking) => [
        booking.user_id,
        booking.organization || 'Individual',
        this.formatDate(booking.visit_date),
        booking.booking_time,
        booking.number_of_guests,
        booking.booking_status,
        booking.rejection_reason || 'N/A',
        booking.cancellation_reason || 'N/A',
      ]);

      // Create the table
      doc.autoTable({
        head: headers,
        body: rows,
        startY: 22,
      });

      // Save the PDF
      doc.save('Booking_Report.pdf');
    },
  },
  mounted() {
    this.fetchBookings(); // Fetch bookings on component mount
  },
};
</script>

<style scoped>
/* General Container Styling */
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Header Styling */
h1 {
  font-size: 28px;
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Table Styling */
.table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
}

.table thead th {
  text-align: center;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.table tbody td {
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 13px;
  color: #555;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tbody tr:hover {
  background-color: #e0f7fa;
}

/* Button Styling */
.btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

/* Modal Styling */
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  max-width: 500px;
  margin: auto;
}

.modal-content {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
}

textarea {
  resize: none;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

/* Utility Styling */
.text-end {
  text-align: right;
}

.text-muted {
  color: #6c757d;
  font-size: 13px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .table {
    font-size: 12px;
  }

  .btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  h1 {
    font-size: 22px;
  }
}
</style>
