import { createStore } from 'vuex';

export default createStore({
  state: {
    products: JSON.parse(localStorage.getItem('products')) || [],
    totalAmount: 0
  },
  mutations: {
    addProduct(state, product) {
      state.products.push(product);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    updateProduct(state, { index, product }) {
      state.products.splice(index, 1, product);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    calculateTotal(state) {
      state.totalAmount = state.products.reduce((total, product) => total + product.amount, 0);
    }
  }
});
