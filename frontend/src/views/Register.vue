<template>
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the Oriental Mindoro Heritage Museum's collections. Book your visit and discover history, culture, and art.">
    <meta name="keywords" content="Museum, Oriental Mindoro, Heritage, Artifacts, Booking, Collections">
    <meta name="author" content="Oriental Mindoro Heritage Museum">
    <meta property="og:title" content="Oriental Mindoro Heritage Museum">
    <meta property="og:description" content="Discover the rich cultural heritage of Oriental Mindoro.">
       <!-- SEO Meta Tags -->
       <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />
    <!-- SEO Meta Tags -->
    <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />

    <!-- Open Graph Meta Tags for Social Sharing -->
    <meta property="og:title" content="Oriental Mindoro Heritage Museum" />
    <meta property="og:description" content="Discover the rich culture and history of Oriental Mindoro at our heritage museum." />
    <meta property="og:image" content="/path-to-your-image.jpg" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Oriental Mindoro Heritage Museum" />
    <meta name="twitter:description" content="Explore the culture and history of Oriental Mindoro at the Heritage Museum." />
<div class="bg">
    <div class="register">
      <div class="register-container">
        <div class="register-form-container">
          <h1>
            Register <span class="highlight">Now</span>
          </h1>
          <form @submit.prevent="registerUser">
            <input type="text" v-model="first_name" placeholder="First Name" required />
            <input type="text" v-model="middle_name" placeholder="Middle Name" />
            <input type="text" v-model="last_name" placeholder="Last Name" required />
            <input type="date" v-model="birthdate" placeholder="Birthdate" required />
            <select v-model="gender" required>
              <option value="" disabled selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" v-model="phone_number" placeholder="Phone Number" />
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
          </form>
        </div>
  
        <div class="address-container">
          <form @submit.prevent="registerUser">
            <h3>Address</h3>
            <input type="text" v-model="country" placeholder="Country" required />
            <input type="text" v-model="region" placeholder="Region" required />
            <input type="text" v-model="province" placeholder="Province" required />
            <input type="text" v-model="city" placeholder="City" required />
            <input type="text" v-model="barangay" placeholder="Barangay" required />
            <input type="text" v-model="street_address" placeholder="Street Address" required />
            <input type="text" v-model="zip_code" placeholder="Zip Code" required />
            <button type="submit" class="btn">Register</button>
            <router-link to="/" class="back-button">Back</router-link>
          </form>
        </div>
      </div>
  
      <p v-if="message" class="error-message">{{ message }}</p>
  
      <!-- Modal for success message -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content">
          <h2>User Registered</h2>
          <p>Please check your email for the verification link.</p>
          <button @click="closeModal">Close</button>
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
        first_name: "",
        middle_name: "",
        last_name: "",
        birthdate: "",
        gender: "",
        phone_number: "",
        email: "",
        password: "",
        country: "Philippines",
        region: "",
        province: "",
        city: "",
        barangay: "",
        street_address: "",
        zip_code: "",
        message: "",
        showModal: false, // controls the visibility of the modal
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post("http://localhost:3000/api/auth/register", {
            first_name: this.first_name,
            middle_name: this.middle_name,
            last_name: this.last_name,
            birthdate: this.birthdate,
            gender: this.gender,
            phone_number: this.phone_number,
            email: this.email,
            password: this.password,
            country: this.country,
            region: this.region,
            province: this.province,
            city: this.city,
            barangay: this.barangay,
            street_address: this.street_address,
            zip_code: this.zip_code,
          });
          this.showModal = true;
        } catch (error) {
          this.message = error.response.data || "Registration failed";
        }
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };
  </script>
  
  <style scoped>

  .bg {
    background: url('~@/assets/images/bgregister.jpg') no-repeat;
    background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Ensures the image doesn't repeat */
  height: 100vh; /* Makes the background image fill the full viewport height */
  }
  .register {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Inter", sans-serif;

  }
  
  .register-container {
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1100px;
    gap: 20px;
  }
  
  .register-form-container, .address-container {
    width: 48%;
    border-radius: 15px;
    padding: 25px;
  }
  
  h1, h3 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input, select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 100%;
  }
  
  button {
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    color: white;
    background-color: #007bff;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .back-button {
    text-align: center;
    margin-top: 15px;
    font-size: 16px;
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  
  .back-button:hover {
    color: #0056b3;
  }
  
  .error-message {
    margin-top: 20px;
    text-align: center;
    color: red;
    font-weight: bold;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-content button {
    padding: 10px 20px;
    margin-top: 15px;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .modal-content button:hover {
    background-color: #0056b3;
  }
  </style>
  