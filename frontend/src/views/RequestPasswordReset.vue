<template>
  <div class="reset-password-request">
    <div class="reset-password-container">
      <div class="form-container">
        <h2 v-if="!tokenVerified">
          Request <span class="highlight">Password Reset</span>
        </h2>

        <!-- Reset Password Request Form -->
        <form v-if="!tokenVerified" @submit.prevent="requestPasswordReset">
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              class="form-control input-field"
              placeholder="Email address"
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn">Send Reset Link</button>
          </div>
        </form>

        <!-- Token Verification Status -->
        <p v-if="message" :class="{'error': isError, 'success': !isError}">{{ message }}</p>

        <!-- Reset Password Confirmation (for token verification) -->
        <div v-if="tokenVerified">
          <h3>Enter New Password</h3>
          <form @submit.prevent="resetPassword">
            <div class="form-group">
              <input
                type="password"
                v-model="newPassword"
                class="form-control input-field"
                placeholder="New Password"
                required
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        message: '',
        isError: false,
        tokenVerified: false,  // To track token verification status
        newPassword: '',
      };
    },
    async created() {
      const token = this.$route.query.token;
      if (token) {
        try {
          // Verify reset token
          const response = await axios.get(`http://localhost:3000/api/auth/verify-reset-password?token=${token}`);
          this.tokenVerified = true;
          this.message = response.data;
          this.isError = false;
        } catch (error) {
          this.message = 'Invalid or expired reset password link';
          this.isError = true;
        }
      }
    },
    methods: {
      async requestPasswordReset() {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/request-reset-password', {
            email: this.email, // Ensure this matches what the backend expects
          });
          this.message = 'Password reset link has been sent to your email.';
          this.isError = false;
        } catch (error) {
          console.error(error);  // Log error for debugging
          this.message = 'Account does not exist';
          this.isError = true;
        }
      },
      async resetPassword() {
        const token = this.$route.query.token;
        try {
          // Reset password with the new one
          const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
            token,
            newPassword: this.newPassword,
          });
          this.message = response.data;
          this.isError = false;
        } catch (error) {
          this.message = 'Account does not exist';
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
.reset-password-request {
  height: 100vh;
  background: url('~@/assets/images/bg_museum.jpg') no-repeat center center;
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Ensures the image doesn't repeat */
  height: 100vh; /* Makes the background image fill the full viewport height */
}

.reset-password-container {
  width: 100%;
  max-width: 500px;
  background-color: #1e1e2f;
  border-radius: 12px;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2,
h3 {
  font-size: 2rem;
  font-weight: bold;
  color: linear-gradient(to right, #78c3fb, #7541ed, #ff0076);
  text-align: center;
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
  background-color: #2c2c3f;
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

.error {
  margin-top: 1rem;
  color: #ff0076;
}

.success {
  margin-top: 1rem;
  color: #78c3fb;
}

.form-group {
  width: 100%;
  margin-bottom: 1rem;
}

.error-message {
  margin-top: 1rem;
  color: #ff0076;
}
</style>
