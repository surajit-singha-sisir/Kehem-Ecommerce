<template>
    <section class="shop" id="shop" role="region" aria-labelledby="shop-heading">
        <div class="inner-shop res-container">
            <!-- Main Heading -->
            <h1 id="shop-heading">Shop Organic Products</h1>

            <!-- Loading/Error States -->
            <div v-if="loading" class="loading">Loading products...</div>
            <div v-else-if="error" class="error">{{ error }}</div>

            <!-- PRODUCT LIST -->
            <div v-else class="products" role="list">
                <article v-for="product in products" :key="product.key" class="product" role="listitem">
                    <!-- IMAGE -->
                    <div class="image">
                        <NuxtImg :src="product.images" :alt="`Image of ${product.title}`" loading="lazy"
                            sizes="sm:100vw md:50vw lg:25vw"
                            :srcset="`${product.images}?w=200 200w, ${product.images}?w=400 400w`" />
                    </div>

                    <!-- PRODUCT NAME -->
                    <h2 class="product-name">
                        <NuxtLink :to="`/product/${product.key}`" class="inner-product-name"
                            :aria-label="`View details for ${product.title}`">{{ product.title }}
                        </NuxtLink>
                    </h2>

                    <!-- PRODUCT-INFO -->
                    <div class="product-info">
                        <aside class="text-info">
                            <div class="attribute-name" aria-label="Product category">
                                {{ product.category }}
                            </div>
                            <div class="pricing" aria-describedby="price-details">
                                <b>Tk {{ parseFloat(product.sellPrice).toFixed(2) }}</b>
                                <p id="price-details">Tk {{ parseFloat(product.discountPrice).toFixed(2) }}</p>
                            </div>
                            <div class="product-attributes">
                                <fieldset v-for="(value, key, index) in product.attributes" :key="key"
                                    class="f-start-center gap-05 f-wrap pad--10 w-fit bordered b-rad--03">
                                    <legend class="attribute-value pad--05 text-center"
                                        :id="`legend-${product.key}-${key}-${index}`">
                                        {{ key }}
                                    </legend>
                                    <div class="radio pad-lr--10 b-rad--02"
                                        :class="{ 'btn-primary': selectedAttributes[product.key]?.[key] === i, 'btn-nav-cold': selectedAttributes[product.key]?.[key] !== i }"
                                        v-for="(item, i) in value" :key="i">
                                        <input type="radio" :name="'radio-' + product.key + '-' + key + '-' + index"
                                            :id="'radio-' + product.key + '-' + key + '-' + i" :value="i"
                                            :aria-labelledby="`legend-${product.key}-${key}-${index}`"
                                            v-model="selectedAttributes[product.key][key]">
                                        <label :for="'radio-' + product.key + '-' + key + '-' + i">
                                            {{ i }}
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                        </aside>

                        <aside class="action-btn">
                            <!-- Cart Button States -->
                            <button v-if="!isInCart(product.key) && addingToCart !== product.key" type="button"
                                class="f-centered cart-btn w--60" @click="addToCart(product)"
                                :aria-label="`Add ${product.title} to cart`">
                                <span class="f-centered gap-05">
                                    <i class="m-plus2 text--12" aria-hidden="true"></i>
                                    <span class="text--sm">Cart</span>
                                </span>
                            </button>

                            <!-- Adding Animation -->
                            <button v-else-if="addingToCart === product.key" type="button"
                                class="f-centered cart-btn w--60" disabled aria-label="Adding to cart in progress">
                                <div class="wrapper w--12">
                                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
                                        aria-hidden="true">
                                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>
                                </div>
                            </button>

                            <!-- Checkout Button -->
                            <NuxtLink v-else to="/cart" class="f-centered cart-btn checkout-btn"
                                :aria-label="`View cart with ${product.title}`">
                                <span class="f gap-10">
                                    <i class="m-shopping-cart" aria-hidden="true"></i>
                                    <span>Carted</span>
                                </span>
                            </NuxtLink>
                        </aside>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useToast } from 'vue-toastification'
import { productCart } from '~/stores/cart'

interface Product {
    title: string
    sellPrice: string
    discountPrice: string
    category: string
    attributes: Record<string, Record<string, [number, number]>>
    images: string
    key: string
    total_quantity: number
}

const products = ref<Product[]>([])
const addingToCart = ref<string | null>(null)
const selectedAttributes = ref<Record<string, Record<string, string>>>({})
const cartStore = productCart()
const toast = useToast()
const loading = ref(true)
const error = ref<string | null>(null)

const cartItems = computed<Product[]>(() => cartStore.getCartJSON)
const isInCart = (productKey: string) => {
    return cartItems.value.some(item => item.key === productKey)
}

const fetchProducts = async () => {
    try {
        const response = await fetch('http://192.168.0.111:3000/api/shop')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        products.value = data.results
        products.value.forEach(product => {
            if (!selectedAttributes.value[product.key]) {
                selectedAttributes.value[product.key] = {}
                Object.keys(product.attributes).forEach(key => {
                    selectedAttributes.value[product.key][key] = ''
                })
            }
        })
    } catch (err) {
        error.value = 'Failed to load products. Please try again later.'
        console.error('Error fetching products:', err)
    } finally {
        loading.value = false
    }
}

const addToCart = async (product: Product) => {
    const attributes = selectedAttributes.value[product.key]
    const hasUnselectedAttribute = Object.values(attributes).some(value => !value)

    if (hasUnselectedAttribute) {
        toast.error('Please select a varient')
        return
    }

    addingToCart.value = product.key

    const selectedAttrs: Record<string, Record<string, [number, number]>> = {}
    Object.entries(attributes).forEach(([attrKey, selectedValue]) => {
        if (product.attributes[attrKey] && product.attributes[attrKey][selectedValue]) {
            selectedAttrs[attrKey] = {
                [selectedValue]: product.attributes[attrKey][selectedValue]
            }
        }
    })

    const cartProduct: Product = {
        key: product.key,
        title: product.title,
        category: product.category,
        sellPrice: product.sellPrice,
        discountPrice: product.discountPrice,
        attributes: selectedAttrs,
        images: product.images,
        total_quantity: 1
    }

    cartStore.addToCart(cartProduct)

    setTimeout(() => {
        addingToCart.value = null
    }, 2500)
}

const productSchema = computed(() => {
    return products.value.map(product => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images,
        description: `${product.title} - An organic product in the ${product.category} category.`,
        sku: product.key,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'BDT',
            price: parseFloat(product.discountPrice).toFixed(2),
            regularPrice: parseFloat(product.sellPrice).toFixed(2),
            availability: product.total_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `http://192.168.0.111:3000/product/${product.key}`
        },
        category: product.category,
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Organic',
                value: 'Yes'
            },
            ...Object.entries(product.attributes).map(([key, values]) => ({
                '@type': 'PropertyValue',
                name: key,
                value: Object.keys(values).join(', ')
            }))
        ]
    }))
})

const breadcrumbSchema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'http://192.168.0.111:3000/'
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Shop',
            item: 'http://192.168.0.111:3000/shop'
        }
    ]
}))

useHead({
    title: 'Organic Shop - Browse Our Products',
    meta: [
        { name: 'description', content: 'Browse our wide selection of organic products at discounted prices. Shop eco-friendly goods with fast delivery in Bangladesh.' },
        { name: 'keywords', content: 'organic products, eco-friendly, shop organic, discounted organic goods' },
        { name: 'robots', content: 'index, follow' }
    ],
    link: [
        { rel: 'canonical', href: 'http://192.168.0.111:3000/shop' },
        { rel: 'alternate', hreflang: 'en-bd', href: 'http://192.168.0.111:3000/shop' }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(productSchema.value)
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(breadcrumbSchema.value)
        }
    ]
})

onMounted(() => {
    fetchProducts()
})
</script>

<style scoped>
/* Optional: Add basic styles for loading/error states */
.loading,
.error {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

.error {
    color: #e74c3c;
}
</style>



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
