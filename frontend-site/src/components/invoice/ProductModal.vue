<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Product' : 'Add Product' }}</h2>
        <label class="block mb-4">
          Category:
          <select v-model="product.category" class="border p-2 rounded w-full">
            <option>Apple</option>
            <option>Banana</option>
            <option>Orange</option>
          </select>
        </label>
        <label class="block mb-4">
          Fruit:
          <input v-model="product.name" placeholder="Enter fruit name" class="border p-2 rounded w-full"/>
        </label>
        <label class="block mb-4">
          Unit:
          <input v-model="product.unit" placeholder="Enter unit" class="border p-2 rounded w-full"/>
        </label>
        <label class="block mb-4">
          Price:
          <input v-model.price="product.price" type="number" min="0" class="border p-2 rounded w-full"/>
        </label>
        <label class="block mb-4">
          Quantity:
          <input v-model.quantity="product.quantity" type="number" min="1" class="border p-2 rounded w-full"/>
        </label>
        <div class="flex justify-end">
          <button @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="saveProduct" class="bg-blue-500 text-white px-4 py-2 rounded">{{ editMode ? 'Update' : 'Add' }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['product'],
    data() {
      return {
        editMode: false,
        product: {
          category: 'Apple',
          name: '',
          unit: '',
          price: 0,
          quantity: 1,
          amount: 0
        }
      };
    },
    created() {
      if (this.product) {
        this.editMode = true;
        this.product = { ...this.product };
      }
    },
    methods: {
      async saveProduct() {
        if (!this.product) return;
        
        this.product.amount = this.product.price * this.product.quantity;

        console.log(this.product);

        this.$emit('save', this.product);
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  