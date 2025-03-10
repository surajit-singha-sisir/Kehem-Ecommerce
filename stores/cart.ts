import { defineStore } from 'pinia';

// Define the Product interface
interface Product {
  productId: number;
  productName: string;
  total_quantity: number;
  price: number;
  attributes: Record<string, [number, number]>[];
}

// Define the store
export const productCart = defineStore('cart', {
  // STATES
  state: () => {
    // Try to load the cart state from localStorage if it exists
    const savedCart = localStorage.getItem('cartJSON');
    return {
      // If there's data in localStorage, parse it; otherwise, use an empty cart
      cartJSON: savedCart ? JSON.parse(savedCart) : [
        {
          productId: 1,
          productName: 'Moonseed',
          total_quantity: 13,
          price: 500,
          attributes: [
            { 'red': [10, 500], 'green': [3, 500] },
          ],
        },
      ] as Product[],
    };
  },

  // ACTIONS
  actions: {
    addToCart(product: Product) {
      // Add product to the cart
      this.cartJSON.push(product);

      // After modifying the cart, save it to localStorage
      this.saveCartToLocalStorage();
    },

    // Function to remove a product from the cart by productId
    deleteFromCart(productId: number) {
      // Filter out the product with the given productId
      this.cartJSON = this.cartJSON.filter((product: Product) => product.productId !== productId);

      // After modifying the cart, save it to localStorage
      this.saveCartToLocalStorage();
    },

    // Function to update a product in the cart by productId
    updateProduct(productId: number, updatedProduct: Product) {
      // Find the index of the product to be updated
      const index = this.cartJSON.findIndex((product: Product) => product.productId === productId);
      if (index !== -1) {
        // Update the product at the found index with the updated product
        this.cartJSON[index] = updatedProduct;
      }

      // After modifying the cart, save it to localStorage
      this.saveCartToLocalStorage();
    },

    // Function to save the cart state to localStorage
    saveCartToLocalStorage() {
      localStorage.setItem('cartJSON', JSON.stringify(this.cartJSON));
    }
  },

  // GETTERS
  getters: {
    getCartJSON: (state) => state.cartJSON,
  },
});

// HMR support for hot module replacement (if needed)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(productCart, import.meta.hot));
}
