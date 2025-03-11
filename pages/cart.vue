<template>
  <section class="container">
    <div class="header">
      <h1>Shopping Cart</h1>
      <a href="#" class="continue-shopping">Continue Shopping ></a>
    </div>
    <div class="main-content">
      <!-- Shopping Cart Items -->
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item" :data-price="item.price">
          <img :src="item.image" :alt="item.name">
          <div class="item-details">
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <p class="price">Tk {{ item.price.toFixed(2) }}/=</p>
            </div>
            <div class="quantity">
              <button class="decrement" @click="decrementQuantity(index)">-</button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button class="increment" @click="incrementQuantity(index)">+</button>
              <span class="quantity-text">Quantity {{ item.quantity }} Pieces</span>
            </div>
          </div>
          <button class="remove-item" @click="removeItem(index)">🗑️</button>
        </div>
      </div>
      <!-- Order Summary -->
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div v-for="(item, index) in cartItems" :key="index" class="summary-item" :data-item="item.id">
          <p>{{ item.name }} ({{ item.quantity }} x {{ item.price }})</p>
          <p class="subtotal">Tk {{ (item.quantity * item.price).toFixed(2) }}/=</p>
        </div>
        <div class="summary-item delivery-fee">
          <p>Delivery Fee ({{ totalItems }} items x {{ DELIVERY_FEE_PER_ITEM }})</p>
          <p>Tk {{ deliveryFee.toFixed(2) }}/=</p>
        </div>
        <div class="summary-total">
          <p>TOTAL</p>
          <p class="total">Tk {{ total.toFixed(2) }}/=</p>
        </div>
        <p class="delivery-note">ডেলিভারি সময়: সিলেটে ১ দিন এবং সিলেটের বাইরে ২ থেকে ৫ দিন</p>
        <button class="checkout-btn">Checkout</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the item interface
interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

// Initial cart items
const cartItems = ref<CartItem[]>([
  {
    id: 'moonseed',
    name: 'Moonseed',
    description: 'Diabetic Care',
    price: 390.00,
    quantity: 3,
    image: '/moonseed.jpg' // Replace with actual image path
  },
  {
    id: 'adger-harbal',
    name: 'Adger Harbal',
    description: 'Diabetic Care',
    price: 790.00,
    quantity: 1,
    image: '/adger-harbal.jpg' // Replace with actual image path
  }
])

// Constants
const DELIVERY_FEE_PER_ITEM = 120

// Computed properties
const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))
const deliveryFee = computed(() => totalItems.value * DELIVERY_FEE_PER_ITEM)
const total = computed(() => cartItems.value.reduce((sum, item) => sum + (item.quantity * item.price), 0) + deliveryFee.value)

// Functions to handle quantity changes
const decrementQuantity = (index: number) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
  }
}

const incrementQuantity = (index: number) => {
  cartItems.value[index].quantity++
}

const removeItem = (index: number) => {
  cartItems.value.splice(index, 1)
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.continue-shopping {
  text-decoration: none;
  color: #4a90e2;
  font-size: 14px;
  font-weight: 500;
}

.main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
}

.item-details h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.item-details p {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.price {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  width: 28px;
  height: 28px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.2s ease;
}

.quantity button:hover {
  background-color: #e5e7eb;
}

.quantity .quantity-value {
  font-size: 14px;
  color: #374151;
  width: 24px;
  text-align: center;
}

.quantity .quantity-text {
  font-size: 12px;
  color: #6b7280;
}

.remove-item {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #ef4444;
  transition: color 0.2s ease;
}

.remove-item:hover {
  color: #dc2626;
}

.order-summary {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.order-summary h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.summary-item, .summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  color: #374151;
}

.summary-total {
  font-weight: 600;
  font-size: 14px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  margin-top: 12px;
}

.delivery-note {
  font-size: 11px;
  color: #16a085;
  margin: 15px 0;
  line-height: 1.4;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #1e3a8a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.checkout-btn:hover {
  background-color: #1e40af;
}
</style>

<!-- pages/cart.vue -->
<!-- <template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <img :src="item.image" alt="item.name" />
          <span>{{ item.name }}</span>
          <span>{{ item.price | currency }}</span>
          <span>Quantity: {{ item.quantity }}</span>
          <button @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
      <div>
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Price: {{ totalPrice | currency }}</p>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const cartItems = cartStore.cartItems
const totalItems = cartStore.totalItems
const totalPrice = cartStore.totalPrice

// Remove item from the cart
function removeFromCart(productId) {
  cartStore.removeFromCart(productId)
}
</script> -->
