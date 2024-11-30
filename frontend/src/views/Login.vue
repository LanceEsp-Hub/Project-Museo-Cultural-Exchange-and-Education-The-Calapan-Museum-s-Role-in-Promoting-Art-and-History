<template>
  <div class="login-container">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          class="form-control input-field" 
          placeholder="Enter your email" 
          required 
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          class="form-control input-field" 
          placeholder="Enter your password" 
          required 
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Login</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          const { token, user } = response.data;
          const encryptedRole = CryptoJS.AES.encrypt(user.role, 'asdasd').toString();
          const encryptedEmail = CryptoJS.AES.encrypt(user.email, 'asdasd').toString();
          const encryptedName = CryptoJS.AES.encrypt(user.name, 'asdasd').toString();
          const encryptedUserId = CryptoJS.AES.encrypt(user.userid.toString(), 'asdasd').toString();

          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', encryptedRole);
          localStorage.setItem('user_email', encryptedEmail);
          localStorage.setItem('user_name', encryptedName);
          localStorage.setItem('user_id', encryptedUserId);

          if (user.profile_picture) {
            localStorage.setItem('profile_picture', response.data.user.profile_picture);
          }

          if (response.data.user.role === 'user') {
            this.$router.push({ path: '/homepage', query: { token } });
          } else if (response.data.user.role === 'admin') {
            this.$router.push({ path: '/admin-dashboard', query: { token } });
          }
        }
      } catch (error) {
        this.errorMessage = 'Invalid email or password.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 380px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

.alert {
  font-size: 14px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1rem;
  border-radius: 4px;
}
</style>
