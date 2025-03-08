<template>
    <section class="product-container">
        <h2><i class="m-edit1"></i> Edit Product</h2>
        <!-- Header -->
        <div class="product-header">
            <p class="Black-900">Product Name</p>
            <h2>{{ data?.title || 'Loading...' }}</h2>
        </div>

        <!-- Loading State -->
        <div v-if="!data && !error" class="loading">
            <p>Loading...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error">
            <p>Error loading data: {{ error.message }}</p>
        </div>

        <!-- Product Details -->
        <div v-if="data">
            <!-- Filter Tabs -->
            <fieldset class="time-filter">
                <legend>Edit Product Info</legend>
                <div class="filtered">
                    <span
                        v-for="product in ['Title', 'Category', 'Price', 'Attributes', 'Stock', 'Description', 'Ingredients', 'Benefits', 'Dosage', 'FAQs', 'Tags', 'Images']"
                        :key="product" class="time-session" :class="{ active: activeProduct === product }"
                        @click="selectProduct(product)">
                        {{ product }}
                    </span>
                </div>
            </fieldset>

            <!-- Content -->
            <div class="product-content">
                <transition :name="transitionDirection" mode="out-in">
                    <div :key="activeProduct">
                        <!-- Title -->
                        <div v-if="activeProduct === 'Title'" class="card">
                            <div class="f f-col gap-05">
                                <h3>Title</h3>
                                <input type="text" v-model="title" name="title" id="title">
                            </div>
                            <span class="f-centered pad-tb--10">
                                <button @click="productUpdated()" type="button" class="btn btn-primary"><i
                                        class="m-save"></i> Save</button>
                            </span>
                        </div>

                        <!-- Category -->
                        <div v-if="activeProduct === 'Category'" class="card">
                            <h2>Category</h2>
                            <p>{{ data.category }}</p>
                        </div>

                        <!-- Price -->
                        <div v-if="activeProduct === 'Price'" class="card">
                            <h2>Pricing</h2>
                            <p><strong>Buy Price:</strong> ${{ data.buyPrice }}</p>
                            <p><strong>Sell Price:</strong> ${{ data.sellPrice }}</p>
                            <p><strong>Discount Price:</strong> ${{ data.discountPrice }}</p>
                        </div>

                        <!-- Stock -->
                        <div v-if="activeProduct === 'Stock'" class="card">
                            <h2>Stock</h2>
                            <p><strong>Stock:</strong> {{ data.stock }}</p>
                            <p><strong>Buy Price:</strong> ${{ data.buyPrice }}</p>
                            <p><strong>Sell Price:</strong> ${{ data.sellPrice }}</p>
                            <p><strong>Discount Price:</strong> ${{ data.discountPrice }}</p>
                        </div>

                        <!-- Attributes -->
                        <div v-if="activeProduct === 'Attributes'" class="card">
                            <h2>Variants</h2>
                            <div v-for="(colors, attrName) in data.attributes.Mandatory_attributes" :key="attrName">
                                <h3>{{ attrName }}</h3>
                                <div v-for="(values, color) in colors" :key="color" style="margin-left: 1rem;">
                                    <p>
                                        {{ color }} - Stock: <button class="variant-button">{{ values[0] }}</button>,
                                        Price: <button class="variant-button">{{ values[1] }}</button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div v-if="activeProduct === 'Description'" class="card">
                            <h2>Description</h2>
                            <div v-html="data.description"></div>
                        </div>

                        <!-- Ingredients -->
                        <div v-if="activeProduct === 'Ingredients'" class="card">
                            <h2>Ingredients</h2>
                            <ul style="list-style-type: disc; padding-left: 1.5rem;" v-html="data.ingredients"></ul>
                        </div>

                        <!-- Benefits -->
                        <div v-if="activeProduct === 'Benefits'" class="card">
                            <h2>Benefits</h2>
                            <ul style="list-style-type: disc; padding-left: 1.5rem;" v-html="data.benefits"></ul>
                        </div>

                        <!-- Dosage -->
                        <div v-if="activeProduct === 'Dosage'" class="card">
                            <h2>How to Prepare</h2>
                            <ul style="list-style-type: disc; padding-left: 1.5rem;" v-html="data.dosage"></ul>
                        </div>

                        <!-- FAQs -->
                        <div v-if="activeProduct === 'FAQs'" class="card">
                            <h2>FAQs</h2>
                            <div v-for="(faq, index) in data.faqs" :key="index" style="margin-bottom: 1rem;">
                                <p style="font-weight: 600;">{{ faq[0] }}</p>
                                <p>{{ faq[1] }}</p>
                            </div>
                        </div>

                        <!-- Tags -->
                        <div v-if="activeProduct === 'Tags'" class="card">
                            <h2>Tags</h2>
                            <div class="tags-container">
                                <span v-for="tag in data.tags" :key="tag" class="tag">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>

                        <!-- Images -->
                        <div v-if="activeProduct === 'Images'" class="card">
                            <h2>Images</h2>
                            <div class="image-gallery">
                                <img v-for="image in data.images" :key="image" :src="image" alt="Product Image" />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

interface Product {
    title: string;
    buyPrice: string;
    sellPrice: string;
    discountPrice: string;
    stock: number;
    description: string;
    benefits: string;
    dosage: string;
    category: string;
    attributes: {
        Mandatory_attributes: {
            [attributeName: string]: {
                [variantName: string]: [number, number];
            };
        };
        Optional_attributes: {
            [attributeName: string]: any;
        };
    };
    faqs: [string, string][];
    tags: string[];
    ingredients: [string, string, string][];
    images: string[];
}

const route = useRoute()
const toast = useToast()
const accessToken = useCookie('access')
const key = route.params.key
const { startRefreshing, stopRefreshing } = useAuth()

const activeProduct = ref('Title')
const transitionDirection = ref('slide-right')
const productList = ['Title', 'Category', 'Price', 'Stock', 'Description', 'Ingredients', 'Benefits', 'Dosage', 'FAQs', 'Tags', 'Attributes', 'Images']

const selectProduct = (product: string) => {
    const currentIndex = productList.indexOf(activeProduct.value)
    const newIndex = productList.indexOf(product)
    transitionDirection.value = newIndex > currentIndex ? 'slide-right' : 'slide-left'
    activeProduct.value = product
}

const { data, error } = await useFetch<Product>(`http://192.168.0.111:3000/api/product_update/${key}`, {
    headers: {
        Authorization: `Bearer ${accessToken.value ?? ''}`
    }
})

watch(error, (newError) => {
    if (newError) toast.error('Failed to load product data')
})

watch(data, (newData) => {
    if (newData) toast.success('Product data loaded successfully')
})

const originalTitle = ref(data.value?.title || '')
const title = ref(originalTitle.value)

const productUpdated = async () => {
    let body = {}

    switch (activeProduct.value) {
        case 'Title':
            if (title.value === originalTitle.value) {
                toast.info('No changes detected in the title')
                return
            }
            body = { title: title.value }
            break
        // Add more cases here if you want to allow editing other fields later
        case 'Attributes':
        case 'Images':
            toast.error('Editing Attributes and Images is not allowed')
            return
        default:
            toast.info('Editing this section is not implemented yet')
            return
    }

    try {
        const { data: updated, error: updateError } = await useFetch(`http://192.168.0.111:3000/api/product_update/${key}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (updateError.value) {
            toast.error(`Failed to update product: ${updateError.value.message}`)
        } else {
            toast.success('Product updated successfully')
            if (activeProduct.value === 'Title') originalTitle.value = title.value
        }
    } catch (err) {
        toast.error('An unexpected error occurred while updating the product')
    }
}

onMounted(() => startRefreshing())
onUnmounted(() => stopRefreshing())
</script>