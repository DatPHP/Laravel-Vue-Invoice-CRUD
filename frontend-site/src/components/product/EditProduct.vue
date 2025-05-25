<template>
  <!--This is like your "Toy Car Makeover Table." One section to write a new name etc..-->
  <!-- The component markup -->
  <div class="edit-product">
    <!-- The form for editing a product. The 'submit' event is prevented and instead the 'submitForm' method is called -->
    <form @submit.prevent="submitForm" class="edit-product-form">
      <!-- Various input fields bound to product properties with error handling -->
      <input
        class="input-field"
        v-model="product.name"
        placeholder="Product Name"
      />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>

      <!-- <input class="input-field" v-model="product.category_id" placeholder="Product category_id" />
        <p v-if="errors.category_id" class="error">{{ errors.category_id }}</p> -->

      <label
        for="category_id"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select an option</label
      >
      <select
        id="category_id"
        v-model="product.category_id"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" selected>Choose a category</option>
        <option  
                v-for="item in categories" :key="item.id" :value="item.id"
        >{{ item.category_name }}</option>
      </select>

      <p v-if="errors.category_id" class="error">{{ errors.category_id }}</p>

      <label
        for="unit"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select an option</label
      >
      <select
        id="unit"
        v-model="product.unit"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose a unit</option>
        <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
      </select>

      <!-- Error message for the product description -->
      <!-- Displayed if 'errors.description' is truthy -->
      <p v-if="errors.unit" class="error">{{ errors.unit }}</p>

      <input
        class="input-field"
        v-model="product.price"
        placeholder="Product Price"
      />
      <p v-if="errors.price" class="error">{{ errors.price }}</p>

     
      <!-- <input accept="image/*" type="file" @change="previewFiles($event)" /> -->

      <input accept="image/*" type="file" @change="onFileChange">
     
      
      <img v-if="!product.image && !imagePreview"
        alt=""
        :src="'https://www.namepros.com/attachments/empty-png.89209/'"
      />

      <img v-if="imagePreview" :src="imagePreview" alt="Image Preview">

      

      <img v-if="!imagePreview && product.image"
       :src="`http://localhost:8000/storage/product/image/${product.image}`"
        alt="Product Image">


      <!-- Submit button -->
      <button type="submit" class="submit-button">Update Product</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue"; // Importing necessary functionalities from Vue 3 Composition API
import { useRoute, useRouter } from "vue-router"; // Importing routing functionalities
import axios from "@/axios"; // Importing axios for making HTTP requests
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  setup() {
    // new control center in Vue 3, replacing data, methods v2. runs first when the component is created.
    // Creating a reactive reference to the product object and error messages
    const product = ref({
      id: null,
      name: "",
      category_id: "",
      price: "",
      unit: "",
      image:null
    });

    const categories = ref([]);
    const imagePreview = ref(null);
    const newProduct = reactive({
        image: null,
    });

    const units = ref(['item', 'kg', 'pcs', 'pack']);

    const categoryList = async () => {
      // This is a special moment when you first turn on your magic remote. As soon as you switch it on, it immediately goes to the toy store (through the magic portal) and brings back all the toy cars to put in your toy box. Then, you can display them on your shelf.
      try {
        // When the component is created, fetch the categories from the API
        const response = await axios.get("/categories");
        // Update the categories array with the data from the API
      // this.categories = response.data;

        categories.value = response.data.map(item => ({
            id: item.id,
            category_name: item.category_name
          }));

      } catch (error) {
        // If an error occurs, log it to the console
        console.error("An error occurred while fetching the categories:", error);
      }
    }


    const onFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
              newProduct.image = file;
              // set image by new image  
              product.value.image = file;

              imagePreview.value = URL.createObjectURL(file);
          }
    };


    const errors = ref({}); // it's like setting up empty boxes that will hold the toy car's details and any error messages.
    // Getting the current route instance and extracting product id from it
    const route = useRoute(); // knowing which toy car you're going to work on and where to place it after the makeover.
    product.value.id = route.params.id;
    // Getting the router instance
    const router = useRouter();

    // Defining input validation function
    const validateInput = () => {
      const errorMessages = {};
      if (!product.value.name) errorMessages.name = "Name is required";

      if (!product.value.category_id)
        errorMessages.category_id = "Category is required";

      if (!product.value.price || isNaN(product.value.price))
        errorMessages.price = "Price is required and must be a number";

      if (!product.value.unit) errorMessages.unit = "Unit is required";

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

      const formData = new FormData();
      formData.append('name', product.value.name);
      formData.append('unit', product.value.unit);
      formData.append('price', product.value.price);
      formData.append('category_id', product.value.category_id);
      if (newProduct.image) {
          formData.append('image', newProduct.image);
      }
      formData.append('_method', 'PUT');

      // Sending updated product data to the server
      try {
        await axios.post(`/products/${product.value.id}`, formData)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.message,
            });
            router.push("/");
          })
          .catch((error) => {
            //console.error('There was an error!', error);
            Swal.fire({
              text: error.message,
              icon: "error",
            });
          });
      } catch (error) {
        console.error("An error occurred while updating the product:", error);
        if (error.response && error.response.status === 422) {
          // Handling server-side validation errors
          errors.value = error.response.data.errors;
        }
      }
    };

    // Fetching product data from the server when the component is mounted
    onMounted(async () => {
      // fetches the current details of the toy car when the component is first created.
      try {
        // "On mount" means as soon as the component is placed on the webpage it fetches these details.
        const response = await axios.get(`/products/${product.value.id}`);
        product.value.name = response.data.name;
        product.value.category_id = response.data.category_id;
        product.value.price = response.data.price;
        product.value.unit = response.data.unit;
        product.value.image = response.data.image;
      } catch (error) {
        console.error("An error occurred while fetching the product:", error);
      }
        
    });

    // Exposing the reactive references and methods to be used within the template
    return { 
      product,
      imagePreview,
      categories,
      units,
      errors,
      validateInput,
      submitForm,
      onFileChange,
      categoryList ,
    };
  },
  mounted() {
    this.categoryList();
  }

};
</script>

<style scoped>
.error {
  color: red;
}
.edit-product {
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
