<template>
    <section class="shop" id="shop">
        <div class="inner-shop res-container">
            <h1>SHOP</h1>

            <!-- PRODUCT -->
            <div class="products">
                <div v-for="product in products" :key="product.key" class="product">
                    <!-- IMAGE -->
                    <div class="image">
                        <NuxtImg :src="product.images" :alt="product.title" />
                    </div>
                    <div class="product-name">
                        <NuxtLink :to="`/product/${product.key}`" class="inner-product-name">{{ product.title }}
                        </NuxtLink>
                    </div>
                    <!-- PRODUCT-INFO -->
                    <div class="product-info">
                        <aside class="text-info">
                            <div class="attribute-name"> Varient :
                                {{ getMainAttribute(product.attributes) }}
                            </div>
                            <div class="pricing">
                                <b>Tk {{ parseFloat(product.sellPrice).toFixed(2) }}</b>
                                <p>Tk {{ parseFloat(product.discountPrice).toFixed(2) }}</p>
                            </div>
                        </aside>

                        <aside class="action-btn">
                            <!-- Cart Button States -->
                            <button v-if="!isInCart(product.key) && addingToCart !== product.key" type="button"
                                class="f-centered cart-btn w--60" @click="addToCart(product)">
                                <span class="f-centered gap-05">
                                    <i class="m-plus2 text--12"></i>
                                    <p class="text--sm">Cart</p>
                                </span>
                            </button>

                            <!-- Adding Animation -->
                            <button v-else-if="addingToCart === product.key" type="button"
                                class="f-centered cart-btn w--60" disabled>
                                <div class="wrapper w--12">
                                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>
                                </div>
                            </button>

                            <!-- Checkout Button -->
                            <NuxtLink v-else to="/cart" class="f-centered cart-btn checkout-btn">
                                <span class="f gap-10">
                                    <i class="m-shopping-cart"></i>
                                    <p>Carted</p>
                                </span>
                            </NuxtLink>

                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss">
.product-name {
    .inner-product-name {
        color: #3858e9;
        font-size: 1.2rem;
        font-weight: bold;
        text-wrap: wrap;

        &:hover {
            text-decoration: underline;
            text-underline-offset: 5px;
            text-underline-position: below;
        }
    }
}
</style>







<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { productCart } from '~/stores/cart'

interface Product {
    title: string
    sellPrice: string
    discountPrice: string
    attributes: Record<string, Record<string, [number, number]>>
    images: string
    key: string
    total_quantity?: number
}

const products = ref<Product[]>([])
const addingToCart = ref<string | null>(null)
const ordering = ref<string | null>(null)
const cartStore = productCart()
const router = useRouter()

const cartItems = computed<Product[]>(() => cartStore.getCartJSON)
const isInCart = (productKey: string) => {
    return cartItems.value.some(item => item.key === productKey)
}

const fetchProducts = async () => {
    try {
        const response = await fetch('http://192.168.0.111:3000/api/shop')
        const data = await response.json()
        products.value = data.results
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

const getMainAttribute = (attributes: Product['attributes']): string => {
    const firstAttr = Object.keys(attributes)[0]
    return firstAttr || 'Product'
}

const addToCart = async (product: Product) => {
    addingToCart.value = product.key

    const cartProduct: Product = {
        key: product.key,
        title: product.title,
        sellPrice: product.sellPrice,
        discountPrice: product.discountPrice,
        attributes: product.attributes,
        images: product.images,
        total_quantity: 1
    }

    cartStore.addToCart(cartProduct)

    setTimeout(() => {
        addingToCart.value = null
    }, 2500)
}

const handleOrder = async (productKey: string) => {
    ordering.value = productKey
    setTimeout(() => {
        ordering.value = null
        router.push(`/product/${productKey}`)
    }, 1000)
}

onMounted(() => {
    fetchProducts()
})
</script>
