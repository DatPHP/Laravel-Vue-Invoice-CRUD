// Importing required modules and components
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex store
import router from './router.js'; // Vue router

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import 'vuetify/styles' // Import Vuetify's CSS styles
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './index.css'
import '../node_modules/flowbite-vue/dist/index.css'


// Create Vuetify instance
// const vuetify = createVuetify({
//     components,
//     directives,
//   })
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myTheme',
        themes: {
        myTheme: {
            dark: false,
            colors: {
            primary: '#1976D2', // Customize primary color
            secondary: '#424242', // Customize secondary color
            },
        },
        },
    },
})

// Creating a Vue application instance
const app = createApp(App)

// Registering Vuex store and Vue Router with the application
app.use(store)
app.use(router)
app.use(vuetify) // Use Vuetify as a plugin
app.use(VueSweetalert2)

// Mounting the application to an HTML element with id 'app'
app.mount('#app')
