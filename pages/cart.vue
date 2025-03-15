<template>
  <section class="res-container m-auto pad-t--10">
    <div class="f-between-center gap-10 pad-b--20">
      <h1>Shopping Cart</h1>
      <NuxtLink to="/#shop" class="continue-shopping">Continue Shopping ></NuxtLink>
    </div>
    <div class="g-res-3-col-container gap-10">
      <div class="span-2 f f-col gap-10">
        <div v-for="item in cartItems" :key="item.key" class="cart-item border all" :data-price="item.sellPrice">
          <img :src="item.images" :alt="item.title">
          <div class="f-center-start f-col gap-05 w-100">
            <div class="f-center-start f-col gap-03 text--09">
              <h3 class="text--11">{{ item.title }}</h3>
              <p>{{ item.category }}</p>
              <b>Tk {{ parseFloat(item.discountPrice).toFixed(2) }}/=</b>
            </div>

            <p>{{ getMainAttribute(item.attributes) }} | Varient: <b>{{
              Object.keys(Object.values(item.attributes)[0])[0] }}</b></p>

            <div class="f-start-center gap-10">
              <button class="btn btn-mass btn-sm" @click="decrementQuantity(item.key)"><i class="m-minus2"></i></button>
              <span class="text--11">{{ item.total_quantity || 1 }}</span>
              <button class="btn btn-mass btn-sm" @click="incrementQuantity(item.key)"><i class="m-plus2"></i></button>
              <span class="text--08">Quantity {{ item.total_quantity || 1 }} Pieces</span>
            </div>
          </div>
          <button class="btn btn-error bordered" @click="removeItem(item.key)"><i class="m-trash"></i></button>
        </div>
        <p v-if="!cartItems.length" class="empty-cart">Your cart is empty</p>
      </div>
      <div class="f-center-between f-col">
        <h2>Order Summary</h2>
        <div v-for="item in cartItems" :key="item.key" class="f-between-start gap-10 pad-tb--05 text--09 border bottom"
          :data-item="item.key">
          <div>
            <b class="d-block m-b--05">{{ item.title }}</b>
            <p><b>{{ item.total_quantity || 1 }}</b> (<b>{{ Object.keys(Object.values(item.attributes)[0])[0] }}</b>) x
              {{
                parseFloat(item.discountPrice).toFixed(2)
              }}</p>
          </div>
          <p>{{ ((item.total_quantity || 1) * parseFloat(item.discountPrice)).toFixed(2) }}/=</p>
        </div>
        <div class="f-between-center gap-10 pad-tb--05 text--09">
          <p>Delivery Fee ({{ totalItems }} items x {{ DELIVERY_FEE_PER_ITEM }})</p>
          <p>{{ deliveryFee.toFixed(2) }}/=</p>
        </div>
        <div class="f-between-center gap-10 border bottom top pad-tb--05">
          <b>TOTAL</b>
          <b class="total">Tk {{ total.toFixed(2) }}/=</b>
        </div>
        <p class="pad-tb--05 text--09"><b class="u">ডেলিভারি সময়:</b> সিলেটে ১ দিন এবং সিলেটের বাইরে ২ থেকে ৫ দিন</p>
        <div class="f-centered">
          <button class="btn btn-primary w--100 m-t--10" :disabled="!cartItems.length" @click="goToOrder">Order</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { productCart } from '~/stores/cart'
import { useToast } from "vue-toastification"
const toast = useToast()

interface Product {
  title: string;
  sellPrice: string;
  category: string;
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
  toast('You have deleted a cart item')
}

const route = useRouter();
const goToOrder = () => {
  route.push('/order')
}
</script>









<style>
.border {
  width: 100%;
  border: none;

  &.top {
    border-top: 1px solid #ccc;
  }

  &.bottom {
    border-bottom: 1px solid #ccc;
  }

  &.all {
    border: 1px solid #ccc;
  }
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
</style>
