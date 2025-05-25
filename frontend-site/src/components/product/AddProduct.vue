<template>
  <!-- Form for adding a product -->
  <!-- @submit.prevent="submitForm" prevents the default form submission and calls the 'submitForm' method instead -->
  <form @submit.prevent="submitForm" class="add-product-form">
    <!-- Input for the product name -->
    <!-- v-model="name" binds the input to the 'name' data property -->
    <input class="input-field" v-model="name" placeholder="Product Name" />
    <!-- Error message for the product name -->
    <!-- Displayed if 'errors.name' is truthy -->
    <p v-if="errors.name" class="error">{{ errors.name }}</p>
    <!-- Input for the product description -->
    <!-- v-model="description" binds the input to the 'description' data property -->
    <!-- <input class="input-field"  placeholder="Product Description" /> -->
    <label
      for="category_id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select an option</label
    >
    <select
      id="category_id"
      v-model="category_id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="" selected>Choose a category</option>
      <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.category_name }}</option>
    </select>
    <!-- Error message for the product description -->
    <!-- Displayed if 'errors.description' is truthy -->
    <p v-if="errors.category_id" class="error">{{ errors.category_id }}</p>
    <label
      for="unit"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select an option</label
    >
    <select
      id="unit"
      v-model="unit"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="" selected>Choose a unit</option>
      <option value="kg">kg</option>
      <option value="pcs">pcs</option>
      <option value="pack">pack</option>
      <option value="item">item</option>
    </select>
    <!-- Error message for the product description -->
    <!-- Displayed if 'errors.description' is truthy -->
    <p v-if="errors.unit" class="error">{{ errors.unit }}</p>
    <!-- Input for the product price -->
    <!-- v-model="price" binds the input to the 'price' data property -->
    <input class="input-field" v-model="price" placeholder="Product Price" />
    <!-- Error message for the product price -->
    <!-- Displayed if 'errors.price' is truthy -->
    <p v-if="errors.price" class="error">{{ errors.price }}</p>
    
    <input accept="image/*" type="file" @change="previewFiles($event)" />
    <img
      alt=""
      :src="newImage || 'https://www.namepros.com/attachments/empty-png.89209/'"
    />

    <!-- Button for submitting the form -->
    <button type="submit" class="submit-button">Add Product</button>
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
    // its like a empty toybox It's setting up empty spaces (or boxes) for things like the product's name etc...
    return {
      // Product details
      name: "",
      category_id: "",
      unit: "",
      price: "",
      // Validation errors
      errors: {},
      categories:[],
      newImage: "",
      image: "",
    };
  },
  mounted() {
    this.categoryList();
  },
  methods: {
    async categoryList() {
    // This is a special moment when you first turn on your magic remote. As soon as you switch it on, it immediately goes to the toy store (through the magic portal) and brings back all the toy cars to put in your toy box. Then, you can display them on your shelf.
    try {
      // When the component is created, fetch the categories from the API
      const response = await axios.get("/categories");
      // Update the categories array with the data from the API
     // this.categories = response.data;

      this.categories = response.data.map(item => ({
          id: item.id,
          category_name: item.category_name
        }));

    } catch (error) {
      // If an error occurs, log it to the console
      console.error("An error occurred while fetching the categories:", error);
    }
  },

    // special toy tools or magic wands that let us do things with our toys.
    // Validate the input fields
    validateInput() {
      // Errors object
      const errors = {};
      // Validate the product name
      if (!this.name) errors.name = "Name is required";
      // Validate the product description
      if (!this.category_id || this.category_id == "")
        errors.category_id = "Category is required";
      if (!this.unit || this.unit == "") errors.unit = "Unit is required";
      // Validate the product price
      if (!this.price || isNaN(this.price))
        errors.price = "Price is required and must be a number";
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
        formData.append("name", this.name);
        formData.append("category_id", this.category_id);
        formData.append("unit", this.unit);
        formData.append("price", this.price);
        formData.append('image', this.image);
        // await axios.post('/products', formData);
        await axios
          .post(`/products`, formData)
          .then(({ data }) => {
            Swal.fire({
              icon: "success",
              text: data.message,
            });
            // If the request is successful, redirect to the product list
            this.$router.push("/");
            //navigate("/product")
          })
          .catch(({ response }) => {
            Swal.fire({
              text: response.data.message,
              icon: "error",
            });
          });
      } catch (error) {
        // If an error occurs, log it to the console
        console.error("An error occurred while adding the product:", error);
      }
    },

    //upload image 
    async previewFiles(event) {
     // console.log('Hello Henry');
     
      const file = event.target.files[0];
      this.image = file;
     
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
      
    }

  },
};
</script>

<style scoped>
.error {
  color: red;
}
.add-product-form {
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
