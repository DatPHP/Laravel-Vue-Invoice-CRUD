<template>
  <!-- Wrap all elements within a single root element -->
  <div id="app">
    <!-- Importing and using Navbar component -->
    <Navbar />
    <!-- Insertion point for views based on the current route -->
    <router-view />
  </div>
</template>

<script>
// Importing Navbar component
import Navbar from "./components/Navbar.vue";

export default {
  // Registering Navbar component
  components: {
    Navbar,
  },
  // Name of the root component
  name: "App",
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 10px;
}
</style>
