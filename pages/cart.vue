<!-- pages/cart.vue -->
<template>
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
</script>
