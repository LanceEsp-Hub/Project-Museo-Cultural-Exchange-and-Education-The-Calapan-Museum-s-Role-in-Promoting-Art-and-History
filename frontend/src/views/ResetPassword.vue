<template>
  <div class="login-container">
    <div class="login-right">
      <div class="form-container">
        <h1>Reset <span class="highlight">Password</span></h1>
        <form @submit.prevent="resetPassword">
          <div class="form-group">
            <input
              type="password"
              v-model="newPassword"
              id="newPassword"
              class="form-control input-field"
              placeholder="New Password"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="confirmPassword"
              id="confirmPassword"
              class="form-control input-field"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="submit" class="btn">Reset Password</button>
        </form>
        <p v-if="message" :class="{'error': isError, 'success': !isError}" class="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      message: 'Resetting your password...',
      isError: false,
    };
  },
  async created() {
    const token = this.$route.query.token;
    if (!token) {
      this.message = 'Invalid or missing reset token.';
      this.isError = true;
      return;
    }

    // Initialize reset password logic
    this.message = '';
  },
  methods: {
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.message = 'Passwords do not match.';
        this.isError = true;
        return;
      }

      try {
        const token = this.$route.query.token;
        const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
          token,
          newPassword: this.newPassword, // Ensure the key matches your API
        });

        this.message = 'Your password has been successfully reset.';
        this.isError = false;

        // Optionally, redirect to the login page after a delay
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } catch (error) {
        this.message = error.response?.data?.message || 'Error resetting password. Please try again.';
        this.isError = true;
      }
    },
  },
};
</script>

<style scoped>
.input-field::placeholder {
  color: white;
}
.login-container {
  height: 100vh;
  background-image: radial-gradient(circle at center, #78c3fb, #7541ed, #ff0076);
  align-items: center;
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: center;
}

.login-right {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: #1e1e2f;
  border-radius: 12px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: linear-gradient(to right, #78c3fb, #7541ed, #ff0076);
}

.highlight {
  color: #ff0076;
}

input {
  width: 100%;
  padding: 0.8rem;
  background-color: #2c2c3f;
  border: none;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 1rem;
}

button {
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

button:hover {
  background-color: #7541ed;
}

.message {
  margin-top: 1rem;
  font-size: 14px;
  text-align: center;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
