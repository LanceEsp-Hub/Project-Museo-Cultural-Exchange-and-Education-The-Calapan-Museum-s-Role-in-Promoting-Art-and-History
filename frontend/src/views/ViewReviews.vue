<template>
    <div class="container mt-5">
      <h2>Reviews</h2>
      <!-- Search Input -->
      <input 
        type="text" 
        v-model="searchQuery" 
        class="form-control mb-3" 
        placeholder="Search by name, email, or comments"
      />
      
      <!-- Reviews Table -->
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review, index) in filteredReviews" :key="index">
            <td>{{ review.name }}</td>
            <td>{{ review.email }}</td>
            <td>{{ review.comments }}</td>
          </tr>
          <tr v-if="filteredReviews.length === 0">
            <td colspan="3" class="text-center">No reviews found</td>
          </tr>
        </tbody>
      </table>
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
    max-width: 1200px;
  }
  </style>
  