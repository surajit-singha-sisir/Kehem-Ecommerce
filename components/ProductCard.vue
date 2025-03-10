<!-- components/ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="product.image" alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.price | currency }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: Object,
})

const cartStore = useCartStore()

// Method to add the product to the cart
function addToCart(product) {
  cartStore.addToCart(product)
}
</script>
