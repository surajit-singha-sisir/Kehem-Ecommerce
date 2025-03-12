<template>
  <section class="container">
    <div class="header">
      <h1>Shopping Cart</h1>
      <NuxtLink to="/#shop" class="continue-shopping">Continue Shopping ></NuxtLink>
    </div>
    <div class="main-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.key" class="cart-item" :data-price="item.sellPrice">
          <img :src="item.images" :alt="item.title">
          <div class="item-details">
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ getMainAttribute(item.attributes) }}</p>
              <p class="price">Tk {{ parseFloat(item.discountPrice).toFixed(2) }}/=</p>
            </div>
            <div class="quantity">
              <button class="decrement" @click="decrementQuantity(item.key)">-</button>
              <span class="quantity-value">{{ item.total_quantity || 1 }}</span>
              <button class="increment" @click="incrementQuantity(item.key)">+</button>
              <span class="quantity-text">Quantity {{ item.total_quantity || 1 }} Pieces</span>
            </div>
          </div>
          <button class="remove-item" @click="removeItem(item.key)"><i class="m-trash"></i></button>
        </div>
        <p v-if="!cartItems.length" class="empty-cart">Your cart is empty</p>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div v-for="item in cartItems" :key="item.key" class="summary-item" :data-item="item.key">
          <p>{{ item.title }} ({{ item.total_quantity || 1 }} x {{ parseFloat(item.discountPrice).toFixed(2) }})</p>
          <p class="subtotal">Tk {{ ((item.total_quantity || 1) * parseFloat(item.discountPrice)).toFixed(2) }}/=</p>
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
        <button class="checkout-btn" :disabled="!cartItems.length">Checkout</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { productCart } from '~/stores/cart'

// Define the Product interface (same as in store)
interface Product {
  title: string;
  sellPrice: string;
  discountPrice: string;
  attributes: Record<string, Record<string, [number, number]>>;
  images: string;
  key: string;
  total_quantity?: number;
}

const cartStore = productCart()
const cartItems = computed<Product[]>(() => cartStore.getCartJSON)

const DELIVERY_FEE_PER_ITEM = 120

const totalItems = computed(() => {
  return cartItems.value.reduce((sum: number, item: Product) => {
    return sum + (item.total_quantity || 1)
  }, 0)
})

const deliveryFee = computed(() => totalItems.value * DELIVERY_FEE_PER_ITEM)

const total = computed(() => {
  return cartItems.value.reduce((sum: number, item: Product) => {
    return sum + ((item.total_quantity || 1) * parseFloat(item.discountPrice))
  }, 0) + deliveryFee.value
})

const getMainAttribute = (attributes: Record<string, Record<string, [number, number]>>): string => {
  const firstAttr = Object.keys(attributes)[0]
  return firstAttr || 'Product'
}

const decrementQuantity = (key: string) => {
  const item = cartItems.value.find(item => item.key === key)
  if (!item) return

  const currentQuantity = item.total_quantity || 1
  if (currentQuantity > 1) {
    const updatedProduct: Product = { ...item, total_quantity: currentQuantity - 1 }
    cartStore.updateProduct(key, updatedProduct)
  } else {
    cartStore.deleteFromCart(key)
  }
}

const incrementQuantity = (key: string) => {
  const item = cartItems.value.find(item => item.key === key)
  if (!item) return

  const currentQuantity = item.total_quantity || 1
  const updatedProduct: Product = {
    ...item,
    total_quantity: currentQuantity + 1
  }
  cartStore.updateProduct(key, updatedProduct)
}

const removeItem = (key: string) => {
  cartStore.deleteFromCart(key)
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

.summary-item,
.summary-total {
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
