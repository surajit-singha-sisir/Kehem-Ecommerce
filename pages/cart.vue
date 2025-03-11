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
        <label for="attributeValue">Attribute Value:</label>
        <input
          type="number"
          id="attributeValue"
          v-model="newAttribute.value"
          placeholder="e.g. 10"
          required
        />
      </div>

      <button type="button" @click="addAttribute">Add Attribute</button>

      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update Product' : 'Add Product' }}</button>
    </form>

    <div>
      <h3>Current Cart</h3>
      <div v-for="product in cartJSON" :key="product.productId">
        <p>{{ product.productName }} - {{ product.total_quantity }} - ${{ product.price }}</p>
        <button @click="deleteFromCart(product.productId)">Delete</button>
        <button @click="editProduct(product)">Edit</button>
      </div>
    </div>
  </section>
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
