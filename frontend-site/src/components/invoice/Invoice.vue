<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Invoice</h1>
      <label class="block mb-4">
        Customer:
        <input v-model="customerName" placeholder="Enter customer name" class="border p-2 rounded w-full"/>
      </label>
      <button @click="openProductModal" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Product</button>
  
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 border">No</th>
            <th class="py-2 border">Category</th>
            <th class="py-2 border">Fruit</th>
            <th class="py-2 border">Unit</th>
            <th class="py-2 border">Price</th>
            <th class="py-2 border">Quantity</th>
            <th class="py-2 border">Amount</th>
            <th class="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index" class="text-center">
            <td class="py-2 border">{{ index + 1 }}</td>
            <td class="py-2 border">{{ product.category }}</td>
            <td class="py-2 border">{{ product.name }}</td>
            <td class="py-2 border">{{ product.unit }}</td>
            <td class="py-2 border">{{ product.price }}</td>
            <td class="py-2 border"><input v-model.number="product.quantity" @input="updateAmount(index)" type="number" min="1" class="border p-2 rounded w-full"/></td>
            <td class="py-2 border">{{ product.amount }}</td>
            <td class="py-2 border">
              <button @click="editProduct(index)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button @click="deleteProduct(index)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="py-2 border text-right">Total</td>
            <td colspan="2" class="py-2 border">{{ totalAmount }}</td>
          </tr>
        </tfoot>
      </table>
  
      <ProductModal v-if="isProductModalOpen" @close="isProductModalOpen = false" @save="saveProduct" :product="editProductData"/>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  import ProductModal from './ProductModal.vue';
  
  export default {
    components: {
      ProductModal
    },
    data() {
      return {
        customerName: '',
        isProductModalOpen: false,
        editIndex: null,
        editProductData: null
      };
    },
    computed: {
      ...mapState(['products', 'totalAmount'])
    },
    methods: {
      ...mapMutations(['addProduct', 'updateProduct', 'deleteProduct', 'calculateTotal']),
      openProductModal() {
        this.editIndex = null;
        this.editProductData = null;
        this.isProductModalOpen = true;
      },
      saveProduct(product) {

        console.log(product);
       
        if (this.editIndex !== null) {
          this.updateProduct({ index: this.editIndex, product });
        } else {

          
           this.addProduct(product);
        }
        this.calculateTotal();
      
        this.isProductModalOpen = false;
      },
      editProduct(index) {
        this.editIndex = index;
        this.editProductData = { ...this.products[index] };
        this.isProductModalOpen = true;
      },
      deleteProduct(index) {
        this.deleteProduct(index);
        this.calculateTotal();
      },
      updateAmount(index) {
        this.products[index].amount = this.products[index].price * this.products[index].quantity;
        this.calculateTotal();
      }
    },
    mounted() {
      this.calculateTotal();
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  