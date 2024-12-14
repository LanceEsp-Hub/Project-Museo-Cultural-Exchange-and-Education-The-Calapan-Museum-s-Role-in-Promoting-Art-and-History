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
  <div class="login-container">
    <div class="login-right">
      
      <div class="form-container">
        
        <h1>
          Log<span class="highlight">in</span>
        </h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control input-field"
              placeholder="Email address"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control input-field"
              placeholder="Password"
              required
            />
            <router-link to="/request-reset" class="forgot-password-text">Forgot Password?</router-link>
          </div>
          <button type="submit" class="btn">Login</button>
          <router-link to="/register" class="forgot-password-text">Create Account?</router-link>

        </form>
        
        <!-- Add the back button here -->
        <router-link to="/" class="back-button">Back</router-link>


        
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          const { token, user } = response.data;
          const encryptedRole = CryptoJS.AES.encrypt(user.role, "asdasd").toString();
          const encryptedEmail = CryptoJS.AES.encrypt(user.email, "asdasd").toString();
          const encryptedName = CryptoJS.AES.encrypt(user.name, "asdasd").toString();
          const encryptedUserId = CryptoJS.AES.encrypt(user.userid.toString(), "asdasd").toString();

          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_role", encryptedRole);
          localStorage.setItem("user_email", encryptedEmail);
          localStorage.setItem("user_name", encryptedName);
          localStorage.setItem("user_id", encryptedUserId);

          if (user.profile_picture) {
            localStorage.setItem("profile_picture", response.data.user.profile_picture);
          }

          if (response.data.user.role === "user") {
            this.$router.push({ path: "/homepage", query: { userid: user.userid } });
          } else if (response.data.user.role === "admin") {
            this.$router.push({ path: "/admin-dashboard", query: { userid: user.userid } });
          }
        }
      } catch (error) {
        this.errorMessage = "Invalid email or password.";
      }
    },
  },
};
</script>

<style scoped>
.back-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  font-size: 16px;
  background-color: #78c3fb;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
}

.back-button:hover {
  background-color: #7541ed;
}
.login-container {
  height: 100vh;
  align-items: center;
  font-family: "Inter", sans-serif;
  background-image: url('@/assets/images/bgbook.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; 
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(circle at center, #78c3fb, #7541ed, #ff0076);
}

.daily-ui {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.login-right {
  position: absolute;          /* Set the position to absolute */
  top: 50%;                    /* Position it 50% from the top of the screen */
  left: 50%;                   /* Position it 50% from the left of the screen */
  transform: translate(-50%, -50%); /* Adjust the position to truly center it */
  width: 500px;                /* Set the width to a fixed value */
  height: 500px;               /* Set the height to a fixed value */
  background-color: #1e1e2f;
  border-radius: 12px 12px 12px 12px;
  color: #fff;
  display: flex;               /* Use flexbox for centering content */
  justify-content: center;     /* Center content horizontally */
  align-items: center;         /* Center content vertically */
}




.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally within the form-container */
  justify-content: center; /* Center content vertically */
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: linear-gradient(to right, #78c3fb, #7541ed, #ff0076);
}

.highlight {
  color: #ff0076;
}

form {
  width: 100%;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: #63636f;
  border: none;
  border-radius: 8px;
  color: #fff;
}

.btn {
  width: 100%;
  padding: 0.8rem;
  font-size: 16px;
  font-weight: bold;
  background-color: #78c3fb;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  background-color: #7541ed;
}

.forgot-password-text {
  display: inline-block;
  margin-top: 5px;
  font-size: 14px;
  color: #78c3fb;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.forgot-password-text:hover {
  color: #7541ed;
}

.error-message {
  margin-top: 1rem;
  color: #ff0076;
}
</style>
