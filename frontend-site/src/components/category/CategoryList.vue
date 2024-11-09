<template>
  <!--This is like your shelf where you display your toy cars. -->
  <!-- Category list container -->

  <div class="category-list">
    <div class="flex justify-end pb-10">
      <div>
        <v-btn variant="outlined">
          <router-link to="/add-category"> Create Category </router-link>
        </v-btn>
      </div>
    </div>
    <div
      class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
    >
      <div class="overflow-scroll">
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p
                  class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
                >
                  Name
                </p>
              </th>
              <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p
                  class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
                >
                  Action
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td class="p-4 border-b border-blue-gray-50">
                <div class="flex items-center gap-3">
                  <img
                    src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg"
                    alt="Spotify"
                    class="relative inline-block h-12 w-12 !rounded-full border border-blue-gray-50 bg-blue-gray-50/50 object-contain object-center p-1"
                  />
                  <p
                    class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
                  >
                    {{ category.category_name }}
                  </p>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="action-links">
                  <!-- Link to edit the category -->
                  <!-- Use Vue Router's 'router-link' component to create a navigation link -->
                  <!-- Use Vue's 'v-bind' directive (shorthand ':') to bind the 'to' prop with route data -->

                  <fwb-button
                    color="yellow"
                    pill
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <router-link
                      class="edit-link"
                      :to="{
                        name: 'EditCategory',
                        params: { id: category.id },
                      }"
                    >
                      <span
                        class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          class="w-4 h-4"
                        >
                          <path
                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                          ></path>
                        </svg>
                      </span>
                    </router-link>
                  </fwb-button>

                  <!-- Link to view category details -->
                  <router-link
                    class="details-link"
                    :to="{
                      name: 'CategoryDetails',
                      params: { id: category.id },
                    }"
                    >View Details</router-link
                  >

                  <!-- Button to delete the category -->
                  <!-- Use Vue's 'v-on' directive (shorthand '@') to bind the click event with the 'deleteCategory' method -->
                  <!-- is a magic button. When you press it, the toy car disappears (gets deleted). -->
                  <button
                    class="delete-button"
                    @click="deleteCategory(category.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//  This is like telling your magic remote where to get new toy cars or find out which ones you have.
import axios from "@/axios"; // Import the axios instance

export default {
  // Component data
  data() {
    return {
      // Initialize categories as an empty array
      // This is your toy box. Right now, it's empty (categories: []), but you'll fill it up with toy cars.
      categories: [],
    };
  },
  methods: {
    // These are special commands you can give to your magic remote.
    // Method to delete a category
    async deleteCategory(id) {
      // tells the remote to remove a specific toy car from your toy box. If the car is removed successfully, it also disappears from the shelf.
      try {
        // Make a DELETE request to the API
        await axios.delete(`/categories/${id}`);

        // If the request is successful, filter the deleted category out of the categories array
        //   If the toy car's sticker number is NOT "5", the magic remote keeps it. But if it finds the toy car with sticker number "5", it takes it out of the toy box.
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
      } catch (error) {
        // If an error occurs, log it to the console
        console.error("An error occurred while deleting the category:", error);
      }
    },
  },
  // Lifecycle hook that is called after the instance has been created
  async created() {
    // This is a special moment when you first turn on your magic remote. As soon as you switch it on, it immediately goes to the toy store (through the magic portal) and brings back all the toy cars to put in your toy box. Then, you can display them on your shelf.
    try {
      // When the component is created, fetch the categories from the API
      const response = await axios.get("/categories");
      // Update the categories array with the data from the API
      this.categories = response.data;
    } catch (error) {
      // If an error occurs, log it to the console
      console.error("An error occurred while fetching the categories:", error);
    }
  },
};
</script>

<style scoped>
.category-list {
  max-width: 1250px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.action-links {
  display: flex;
  align-items: center;
}

.edit-link,
.details-link,
.delete-button {
  margin: 0 8px;
  font-size: 0.9em;
}

.edit-link,
.details-link {
  text-decoration: none;
  color: #337ab7;
}

.delete-button {
  padding: 5px 10px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.delete-button:hover {
  background-color: #d32f2f;
  cursor: pointer;
}
</style>

<script setup>
import { FwbButton } from "flowbite-vue";
</script>
