<template>
  <!--This is like your "Toy Car Makeover Table." One section to write a new name etc..-->
  <!-- The component markup -->
  <div class="edit-category">
    <!-- The form for editing a category. The 'submit' event is prevented and instead the 'submitForm' method is called -->
    <form @submit.prevent="submitForm" class="edit-category-form">
      <!-- Various input fields bound to category properties with error handling -->
      <input
        class="input-field"
        v-model="category.category_name"
        placeholder="category Name"
      />
      <p v-if="errors.category_name" class="error">{{ errors.category_name }}</p>
      <!-- Submit button -->
      <button type="submit" class="submit-button">Update category</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"; // Importing necessary functionalities from Vue 3 Composition API
import { useRoute, useRouter } from "vue-router"; // Importing routing functionalities
import axios from "@/axios"; // Importing axios for making HTTP requests
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  setup() {
    // new control center in Vue 3, replacing data, methods v2. runs first when the component is created.
    // Creating a reactive reference to the category object and error messages
    const category = ref({
      id: null,
      category_name: "",
    });
    const errors = ref({}); // it's like setting up empty boxes that will hold the toy car's details and any error messages.
    // Getting the current route instance and extracting category id from it
    const route = useRoute(); // knowing which toy car you're going to work on and where to place it after the makeover.
    category.value.id = route.params.id;
    // Getting the router instance
    const router = useRouter();

    // Defining input validation function
    const validateInput = () => {
      const errorMessages = {};
      if (!category.value.category_name) errorMessages.category_name = "Category name is required";
      return errorMessages;
    };

    // Defining form submission function
    const submitForm = async () => {
      // sends the updated toy car details back to the toy store (server).
      const errorMessages = validateInput();
      if (Object.keys(errorMessages).length > 0) {
        errors.value = errorMessages;
        return;
      }

      // Sending updated category data to the server
      try {
        await axios
          .put(`/categories/${category.value.id}`, category.value)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.message,
            });
            router.push("/category-list");
          })
          .catch((error) => {
            //console.error('There was an error!', error);
            Swal.fire({
              text: error.message,
              icon: "error",
            });
          });
      } catch (error) {
        console.error("An error occurred while updating the category:", error);
        if (error.response && error.response.status === 422) {
          // Handling server-side validation errors
          errors.value = error.response.data.errors;
        }
      }
    };

    // Fetching category data from the server when the component is mounted
    onMounted(async () => {
      // fetches the current details of the toy car when the component is first created.
      try {
        // "On mount" means as soon as the component is placed on the webpage it fetches these details.
        const response = await axios.get(`/categories/${category.value.id}`);
        category.value.category_name = response.data.category_name;
      } catch (error) {
        console.error("An error occurred while fetching the category:", error);
      }
    });

    // Exposing the reactive references and methods to be used within the template
    return { category, submitForm, errors };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.edit-category {
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
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e68a00;
}
</style>
