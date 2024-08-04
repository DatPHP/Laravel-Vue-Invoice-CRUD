<template>
  <!-- Container for the login form -->
  <div class="form-container">
    <!-- Define the form for user login -->
    <!--When the form is submitted, it triggers the login method, but the .prevent modifier ensures 
    the default browser behavior (i.e., page refresh) of form submission is prevented. -->
    <form @submit.prevent="login" class="login-form">
      <!-- Input field for the user's email address -->
      <input type="email" v-model="email" placeholder="Email" required />
     <div v-if="errors.message" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p>{{ errors.message }}</p>
      </div>
      <!-- Input field for the user's password -->
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <!-- Login button to submit the form -->
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// Import axios instance for HTTP requests
import axios from "@/axios";
import { ref } from "vue";

export default {
  data() {
    return {
      // Initialize form input data
      email: "",
      password: "",
      errors : ""
    };
  },
  methods: {
    // Asynchronous method to handle the login process
    async login() {
      try {
        // Send user credentials to the server for validation
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        // Check for the authentication token in the server response
        if (response.data.token) {
          // Store the token in local storage for session management
          localStorage.setItem("token", response.data.token);

          // Update the store's state to reflect user's logged-in status
          this.$store.commit("LOGIN");

          // Navigate to the home page after successful login
          this.$router.push("/");
        }
      } catch (error) {
        // Log any errors encountered during the login process
        console.error("An error occurred:", error);
        this.errors = error.response.data;
        // console.error(error.data.errors.message);
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the outer form container */
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styling for the login form layout and appearance */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Shared styling for input fields and login button inside the form */
.login-form input,
.login-form button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

/* Specific styling for the login button */
.login-form button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
