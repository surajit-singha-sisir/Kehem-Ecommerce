import { defineStore } from 'pinia';

interface Product {
  title: string;
  sellPrice: string;
  discountPrice: string;
  attributes: Record<string, Record<string, [number, number]>>;
  images: string;
  category: string;
  key: string;
  total_quantity?: number;
}

export const productCart = defineStore('cart', {
  state: () => {
    const savedCart = localStorage.getItem('cartJSON');
    return {
      cartJSON: savedCart ? JSON.parse(savedCart) : [
        {
          title: 'Moonseed - Organic',
          sellPrice: '32.00',
          discountPrice: '343.00',
          category: 'Organic',
          attributes: {
            Weight: {
              '100mg': [23, 232],
              '200mg': [0, 0],
              '150mg': [0, 0]
            }
          },
          images: 'http://192.168.0.111:3000/media/product/image/Photoleap_03_02_2025_21_21_10_1h6Jn.jpg',
          key: 'Prw6keZ',
          total_quantity: 1
        }
      ] as Product[],
    };
  },

  actions: {
    addToCart(product: Product) {
      this.cartJSON.push(product);
      this.saveCartToLocalStorage();
    },

    deleteFromCart(key: string) {
      this.cartJSON = this.cartJSON.filter((product: Product) => product.key !== key);
      this.saveCartToLocalStorage();
    },

    updateProduct(key: string, updatedProduct: Product) {
      const index = this.cartJSON.findIndex((product: Product) => product.key === key);
      if (index !== -1) {
        this.cartJSON[index] = updatedProduct;
        this.saveCartToLocalStorage();
      }
    },

    saveCartToLocalStorage() {
      localStorage.setItem('cartJSON', JSON.stringify(this.cartJSON));
    },

    // Added clearCart function
    clearCart() {
      this.cartJSON = []; // Reset the cart to an empty array
      this.saveCartToLocalStorage(); // Update localStorage to reflect the empty cart
    },
  },

  getters: {
    getCartJSON: (state) => state.cartJSON,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(productCart, import.meta.hot));
}