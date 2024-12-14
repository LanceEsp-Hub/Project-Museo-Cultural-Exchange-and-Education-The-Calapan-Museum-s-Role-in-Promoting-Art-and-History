<template>
  <div class="container mt-5 mb-5">
    <h2 class="text-center mb-4">User Reviews</h2>
    
    <!-- Search Input -->
    <div class="search-container mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        class="form-control" 
        placeholder="Search by name, email, or comments"
      />
    </div>
    
    <!-- Reviews Table -->
    <div class="table-container">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Comments</th>
            <th>Ratings</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review, index) in filteredReviews" :key="index">
            <td>{{ review.name }}</td>
            <td>{{ review.email }}</td>
            <td>{{ review.comments }}</td>
            <td>⭐{{ review.rating }}</td>
          </tr>
          <tr v-if="filteredReviews.length === 0">
            <td colspan="4" class="text-center">No reviews found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviews: [],  // This will hold the review data
      searchQuery: '',  // This will bind to the search input
    };
  },
  computed: {
    // Computed property to filter reviews based on the search query
    filteredReviews() {
      const query = this.searchQuery.toLowerCase();
      return this.reviews.filter((review) => {
        return (
          review.name.toLowerCase().includes(query) ||
          review.email.toLowerCase().includes(query) ||
          review.comments.toLowerCase().includes(query)
        );
      });
    }
  },
  mounted() {
    // Fetch reviews from the API when the component is mounted
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/reviews');  // Add 'http://' to the URL
        this.reviews = response.data;  // Assuming the API returns an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

input.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

.table {
  width: 100%;
  table-layout: fixed; /* Enables fixed column widths */
  border-collapse: collapse;
  background-color: white;
}

.table thead th {
  background-color: #007bff;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  border: 1px solid #ddd;
}

.table tbody td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
  word-wrap: break-word; /* Ensures text wraps if it's too long */
  white-space: normal; /* Prevents horizontal overflow */
}

/* Fixed column widths */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 20%; /* Name */
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 20%; /* Email */
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 40%; /* Comments */
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 20%; /* Ratings */
}

/* No reviews row styling */
.table tbody tr td[colspan] {
  text-align: center;
  color: #999;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  h2 {
    font-size: 18px;
  }

  input.form-control {
    font-size: 14px;
  }

  .table {
    font-size: 14px;
  }
}
</style>

