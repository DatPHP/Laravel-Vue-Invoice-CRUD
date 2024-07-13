<template>
  <!-- Form for adding a category -->
  <!-- @submit.prevent="submitForm" prevents the default form submission and calls the 'submitForm' method instead -->
  <form @submit.prevent="submitForm" class="add-category-form">
    <!-- Input for the category name -->
    <!-- v-model="name" binds the input to the 'name' data property -->
    <input class="input-field" v-model="category_name" placeholder="Category Name" />
    <!-- Error message for the category name -->
    <!-- Displayed if 'errors.name' is truthy -->
    <p v-if="errors.category_name" class="error">{{ errors.category_name }}</p>

    <!-- Button for submitting the form -->
    <button type="submit" class="submit-button">Add category</button>
  </form>
</template>
<script>
// Importing the axios instance
import axios from "@/axios";
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  // Component data
  data() {
    // its like a empty toybox It's setting up empty spaces (or boxes) for things like the category's name etc...
    return {
      // category details
      category_name: "",
      // Validation errors
      errors: {},
    };
  },
  methods: {
    // special toy tools or magic wands that let us do things with our toys.
    // Validate the input fields
    validateInput() {
      // Errors object
      const errors = {};
      // Validate the category name
      if (!this.category_name) errors.category_name = "Category name is required";
      return errors;
    },
    // Handle form submission
    async submitForm() {
      // is like the magic toy phone. It might do something that takes time.
      // Validate the input fields
      const errors = this.validateInput();
      // If there are validation errors, update the 'errors' data property and stop execution
      if (Object.keys(errors).length > 0) {
        // is like counting how many sections in the toy box have toys in them.
        // .length > 0 is checking if there's at least one toy in the toy box.
        this.errors = errors; // Put those toys (or errors) in a special display area
        return; // Stop doing anything else and just look at those toys
      }

      try {
        // Send a POST request to the API to add the
        const formData = new FormData();
        formData.append("category_name", this.category_name);
        // await axios.post('/categories', formData);
        await axios
          .post(`/categories`, formData)
          .then(({ data }) => {
            Swal.fire({
              icon: "success",
              text: data.message,
            });
            // If the request is successful, redirect to the category list
            this.$router.push("/category-list");
            //navigate("/category")
          })
          .catch(({ response }) => {
            Swal.fire({
              text: response.data.message,
              icon: "error",
            });
          });
      } catch (error) {
        // If an error occurs, log it to the console
        console.error("An error occurred while adding the category:", error);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.add-category-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.input-field {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
