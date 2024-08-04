<template>
  <!-- Category details container -->
  <!-- Use Vue's 'v-if' directive to render this container only if 'category' is truthy -->
  <!--This is like a magic switch. If we have a toy car (category details), the stand lights up and shows the toy. If not, it stays empty.-->
  <div v-if="category" class="category-details">
    <!-- Display the category name -->
    <h2 class="category-title">{{ category.category_name }}</h2>
  </div>
</template>

<script>
import axios from "@/axios"; // Import the axios instance

export default {
  // Component data
  data() {
    return {
      // Initialize category as null
      category: null, // This means our box is empty to start with
      // it's empty because we haven't picked which toy car we want to display.
    };
  },
  // Lifecycle hook that is called after the instance has been mounted
  async mounted() {
    // the component being ready and visible in the browser for the first time.then
    // we immediately fetch and display the category details.(after that component can update and re-render as many times as needed based on data changes or other interactions.)
    // Get the category ID from the route params
    const categoryId = this.$route.params.id; // This is like a magic number that tells us which toy car we want. Maybe it's toy car number 5 or number 10
    try {
      // Make a GET request to the API to fetch the category data
      const response = await axios.get(`/categories/${categoryId}`); // our magic remote goes to the toy store and asks, 'Hey, can you tell me about toy car number 5?
      // Update the category data with the data from the API
      this.category = response.data; // Once the toy store tells us about the toy car, we put that toy car in our special 'category' box. Now, our display stand lights up and shows off the toy car!"
    } catch (error) {
      // If an error occurs, log it to the console
      console.error("An error occurred while fetching the category:", error);
    }
  },
};
</script>

<style scoped>
.category-details {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.category-title {
  margin-bottom: 20px;
  font-size: 2em;
}
</style>
