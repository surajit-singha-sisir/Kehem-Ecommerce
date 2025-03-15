<style></style>

<template>
    <section class="product-display" itemscope itemtype="https://schema.org/Product">
        <div class="inner-product-display res-container m-auto">
            <aside class="slider-container">
                <div class="image-zoom-wrapper">
                    <figure class="slider">
                        <NuxtImg :src="selectedImage || pageData?.images[0] || 'images/product-1.png'"
                            :alt="pageData?.title || 'Product Image'" sizes="sm:100vw md:50vw lg:33vw" quality="80"
                            loading="lazy" itemprop="image" class="slider-image" @mouseover="showZoom"
                            @mousemove="moveZoom" @mouseleave="hideZoom" />
                    </figure>
                    <div class="zoom-container">
                        <div class="zoom-view" ref="zoomViewRef"></div>
                    </div>
                </div>
                <div class="blob f-start-center gap-05 w-100">
                    <div class="rectangle" v-for="item in pageData?.images" :key="item" @click="selectImage(item)">
                        <NuxtImg :src="item" />
                    </div>
                </div>
            </aside>

            <aside class="page-product-info">
                <h1 itemprop="name">{{ pageData?.title }}</h1>
                <div class="category-name">
                    <span itemprop="category">{{ pageData?.category }}</span>
                </div>
                <div class="pricing" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="BDT" />
                    <strong class="current-price" itemprop="price">Tk {{ pageData?.discountPrice }}</strong>
                    <span class="old-price">Tk {{ pageData?.sellPrice }}</span>
                    <meta itemprop="availability"
                        :content="pageData && pageData.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'" />
                    <meta itemprop="priceValidUntil" content="2025-12-31" />
                </div>
                <div class="product-attributes">
                    <fieldset v-for="(attrValues, attrKey, index) in pageData?.attributes.Mandatory_attributes"
                        :key="index" class="f-start-center gap-05 f-wrap pad--10 w-fit bordered b-rad--03">
                        <legend class="attribute-value pad--05 text-center">
                            {{ attrKey }}
                        </legend>
                        <div class="radio pad-lr--10 b-rad--02" v-for="(value, valueKey, valueIndex) in attrValues"
                            :key="valueIndex"
                            :class="{ 'btn-primary': selectedAttributes[attrKey] === valueKey, 'btn-nav-cold': selectedAttributes[attrKey] !== valueKey }">
                            <input type="radio" :name="'radio-' + attrKey" :id="'radio-' + attrKey + '-' + valueIndex"
                                :value="valueKey" v-model="selectedAttributes[attrKey]" />
                            <label :for="'radio-' + attrKey + '-' + valueIndex">
                                {{ valueKey }}
                            </label>
                        </div>
                    </fieldset>
                </div>

                <button type="button" class="btn btn-primary w--80 buy-now"
                    :aria-label="`Buy ${pageData?.title || 'Product'}`" @click="handleBuyNow">
                    Buy Now!
                </button>
                <p class="short-description text-dotted-3" itemprop="description" v-html="shortDescription"></p>
                <nav>
                    <NuxtLink to="/#related-products" rel="related">
                        Explore More Organic Products
                    </NuxtLink>
                </nav>
            </aside>
        </div>

        <div class="product-details" id="all-products">
            <div class="inner-product-details res-container m-auto">
                <div class="tabs">
                    <button type="button" class="buttons f-centered gap-05"
                        :class="{ active: activeTab === 'Description' }" @click="switchTab('Description')">
                        <i class="m-info3"></i> <span>Description</span>
                    </button>
                    <button type="button" class="buttons f-centered gap-05"
                        :class="{ active: activeTab === 'Benefits' }" @click="switchTab('Benefits')">
                        <i class="m-chart-alt"></i> <span>Benefits</span>

                    </button>
                    <button type="button" class="buttons f-centered gap-05"
                        :class="{ active: activeTab === 'Ingredients' }" @click="switchTab('Ingredients')">
                        <i class="m-lab"></i> <span>Ingredients</span>
                    </button>
                    <button type="button" class="buttons f-centered gap-05" :class="{ active: activeTab === 'Dosage' }"
                        @click="switchTab('Dosage')">
                        <i class="m-drop"></i> <span>Dosage</span>
                    </button>
                    <button type="button" class="buttons f-centered gap-05" :class="{ active: activeTab === 'FAQ' }"
                        @click="switchTab('FAQ')">
                        <i class="m-question1"></i> <span>FAQ</span>
                    </button>
                </div>

                <div class="info-container">
                    <div v-if="activeTab === 'Description'">
                        <h2>Description</h2><br>
                        <div v-html="pageData?.description"></div>
                    </div>
                    <div v-if="activeTab === 'Benefits'">
                        <h2>Benefits</h2><br>
                        <div v-html="pageData?.benefits"></div>
                    </div>
                    <div v-if="activeTab === 'Ingredients'" class="g-res-4-col-container gap-10">
                        <div v-for="(ingredient, index) in pageData?.ingredients" :key="index"
                            class="f-center gap-10 f-col border-all b-rad--05 b-Silver pad--05">
                            <div class="h--80">
                                <NuxtImg :src="ingredient[0]" :alt="ingredient[1]" class="h-100" />
                            </div>
                            <div class="f-center-start f-col gap-02">
                                <p class="text--sm">{{ ingredient[1] }}</p>
                                <p class="text--sm">{{ ingredient[2] }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeTab === 'Dosage'">
                        <h2>Dosages</h2><br>
                        <div v-html="pageData?.dosage"></div>
                    </div>
                    <div v-if="activeTab === 'FAQ'">
                        <h2>Frequently Asked Question (FAQ)</h2><br>
                        <div v-for="item in pageData?.faqs" class="f-center-start gap-05 f-col pad-b--20">
                            <h3>{{ item[0] }}</h3>
                            <p class="text--11">{{ item[1] }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="related-products res-container">
                <h2>Related Products</h2>
                <div class="product-showcase" v-for="(item, index) in relatedCategory" :key="item.key">
                    <div class="image">
                        <NuxtImg :src="item.images" :alt="item.title" />
                    </div>
                    <div class="related-product-info">
                        <NuxtLink :to="`/product/${item.key}`">
                            <h1 class="product-name">{{ item.title }}</h1>
                        </NuxtLink>
                        <p class="category">{{ currentCategory }}</p>
                        <div class="pricing">
                            <strong class="current-price">Tk {{ item.discountPrice }}</strong>
                            <span class="old-price">Tk {{ item.sellPrice }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="!relatedCategory || relatedCategory.length === 0">
                    <p>No products available</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { productCart } from '~/stores/cart'





const selectedImage = ref<string | null>(null)
const zoomViewRef = ref<HTMLElement | null>(null)

const selectImage = (image: string): void => {
    selectedImage.value = image
    updateZoomBackground(image)
}

const showZoom = (event: MouseEvent): void => {
    const target = event.currentTarget as HTMLImageElement
    const zoomContainer = target.closest('.image-zoom-wrapper')?.querySelector('.zoom-container') as HTMLElement | null
    if (zoomContainer) {
        zoomContainer.style.visibility = 'visible'
        updateZoomBackground(selectedImage.value || target.src)
    }
}

const hideZoom = (event: MouseEvent): void => {
    const target = event.currentTarget as HTMLImageElement
    const zoomContainer = target.closest('.image-zoom-wrapper')?.querySelector('.zoom-container') as HTMLElement | null
    if (zoomContainer) {
        zoomContainer.style.visibility = 'hidden'
    }
}

const moveZoom = (event: MouseEvent): void => {
    const img = event.target as HTMLImageElement
    const rect = img.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const zoomWidth = 300
    const zoomHeight = 300
    const bgSize = img.width * 2

    const bgX = (x / img.width) * bgSize - (zoomWidth / 2)
    const bgY = (y / img.height) * bgSize - (zoomHeight / 2)

    if (zoomViewRef.value) {
        zoomViewRef.value.style.backgroundPosition = `-${bgX}px -${bgY}px`
    }
}

const updateZoomBackground = (imageSrc: string): void => {
    if (zoomViewRef.value) {
        zoomViewRef.value.style.backgroundImage = `url(${imageSrc})`
    }
}





// State
const selectedAttributes = ref<Record<string, string>>({})
const activeTab = ref('Description')
const route = useRoute()
const currentRouteKey = Array.isArray(route.params.key) ? route.params.key[0] : route.params.key
const toast = useToast()
const cartStore = productCart()
const router = useRouter()

interface PageData {
    title: string
    buyPrice: string
    sellPrice: string
    discountPrice: string
    stock: number
    description: string
    benefits: string
    dosage: string
    category: string
    attributes: {
        Mandatory_attributes: Record<string, Record<string, [number, number]>>
        Optional_attributes: Record<string, string[]>
    }
    faqs: [string, string][]
    tags: string[]
    ingredients: [string, string, string][]
    images: string[]
    sold: any[]
}

interface CartProduct {
    title: string
    sellPrice: string
    discountPrice: string
    attributes: Record<string, Record<string, [number, number]>>
    images: string
    key: string
    total_quantity?: number
}

const { data: pageData, error } = await useFetch<PageData>(`http://192.168.0.111:3000/api/landing_page/${currentRouteKey}`)

onMounted(() => {
    if (pageData.value?.attributes?.Mandatory_attributes) {
        Object.keys(pageData.value.attributes.Mandatory_attributes).forEach(attrKey => {
            selectedAttributes.value[attrKey] = ''
        })

        const existingProduct = cartStore.getCartJSON.find(
            (item: CartProduct) => item.key === currentRouteKey
        ) as CartProduct | undefined

        if (existingProduct && pageData.value?.attributes?.Mandatory_attributes) {
            Object.entries(existingProduct.attributes).forEach(([attrKey, attrValues]) => {
                const selectedValue = Object.keys(attrValues)[0]
                if (pageData.value?.attributes?.Mandatory_attributes?.[attrKey]) {
                    selectedAttributes.value[attrKey] = selectedValue
                }
            })
        }
    }
})


interface RelatedCats {
    title: string
    images: string
    key: string
    sellPrice: string
    discountPrice: string
}
const currentCategory = pageData.value?.category || 'default';
const { data: relatedCategory } = await useFetch<RelatedCats[]>(`http://192.168.0.111:3000/api/cat_product/${currentCategory}`)




const switchTab = (tabName: string) => {
    activeTab.value = tabName
}

const shortDescription = computed(() => {
    if (!pageData.value?.description) return 'Explore this organic product for a healthy lifestyle.'
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = pageData.value.description
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.length > 160 ? `${text.substring(0, 157)}...` : text
})

const handleBuyNow = () => {
    if (!pageData.value) {
        toast.error('Product data not loaded.')
        return
    }

    const mandatoryAttrs = pageData.value.attributes.Mandatory_attributes
    const hasUnselectedAttribute = Object.keys(mandatoryAttrs).some(
        attrKey => !selectedAttributes.value[attrKey]
    )

    if (hasUnselectedAttribute) {
        toast.error('Please select all mandatory attributes.')
        return
    }

    const selectedAttrs: Record<string, Record<string, [number, number]>> = {}
    Object.entries(selectedAttributes.value).forEach(([attrKey, selectedValue]) => {
        if (mandatoryAttrs[attrKey] && mandatoryAttrs[attrKey][selectedValue]) {
            selectedAttrs[attrKey] = {
                [selectedValue]: mandatoryAttrs[attrKey][selectedValue]
            }
        }
    })

    const cartProduct: CartProduct = {
        title: pageData.value.title,
        sellPrice: pageData.value.sellPrice,
        discountPrice: pageData.value.discountPrice,
        attributes: selectedAttrs,
        images: pageData.value.images[0],
        key: currentRouteKey,
        total_quantity: 1
    }
    const existingProductIndex = cartStore.getCartJSON.findIndex(
        (item: CartProduct) => item.key === currentRouteKey
    )

    if (existingProductIndex !== -1) {
        const existingProduct = cartStore.getCartJSON[existingProductIndex] as CartProduct
        const attributesChanged = JSON.stringify(existingProduct.attributes) !== JSON.stringify(selectedAttrs)

        if (attributesChanged) {
            cartStore.updateProduct(currentRouteKey, cartProduct)
            toast.success(`${pageData.value.title} updated in cart with new attributes!`)
        } else {
            toast.info(`${pageData.value.title} is already in your cart.`)
        }
    } else {
        cartStore.addToCart(cartProduct)
        toast.success(`${pageData.value.title} added to cart!`)
    }

    router.push('/cart')
}

// SEO
useHead({
    title: computed(() => `${pageData.value?.title || 'Product'} - Buy Now at Tk ${pageData.value?.discountPrice || ''}`),
    meta: [
        {
            name: 'description',
            content: computed(() => shortDescription.value)
        },
        {
            name: 'keywords',
            content: computed(() =>
                `${pageData.value?.title || 'product'}, ${pageData.value?.category || 'health'}, ${pageData.value?.tags?.join(', ') || 'organic, natural'}`
            )
        },
        {
            name: 'robots',
            content: 'index, follow'
        }
    ],
    link: [
        {
            rel: 'canonical',
            href: computed(() => `http://192.168.0.111:3000/product/${currentRouteKey}`)
        },
        {
            rel: 'alternate',
            hreflang: 'en-bd',
            href: computed(() => `http://192.168.0.111:3000/product/${currentRouteKey}`)
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: computed(() => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: pageData.value?.title || 'Product',
                image: pageData.value?.images || ['http://192.168.0.111:3000/images/product-1.png'],
                description: shortDescription.value,
                sku: currentRouteKey,
                brand: {
                    '@type': 'Brand',
                    name: 'Your Brand'
                },
                offers: {
                    '@type': 'Offer',
                    url: `http://192.168.0.111:3000/product/${currentRouteKey}`,
                    priceCurrency: 'BDT',
                    price: pageData.value?.discountPrice || '0',
                    priceValidUntil: '2025-12-31',
                    availability: pageData.value && pageData.value.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' // Fix 6: Add null check
                },
                category: pageData.value?.category || 'Health',
                additionalProperty: [
                    ...Object.entries(pageData.value?.attributes.Mandatory_attributes || {}).map(([key, values]) => ({
                        '@type': 'PropertyValue',
                        name: key,
                        value: Object.keys(values).join(', ')
                    })),
                    ...Object.entries(pageData.value?.attributes.Optional_attributes || {}).map(([key, values]) => ({
                        '@type': 'PropertyValue',
                        name: key,
                        value: values.join(', ')
                    }))
                ]
            }))
        },
        {
            type: 'application/ld+json',
            innerHTML: computed(() => JSON.stringify({
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
                        item: 'http://192.168.0.111:3000/#shop'
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: pageData.value?.title || 'Product',
                        item: `http://192.168.0.111:3000/product/${currentRouteKey}`
                    }
                ]
            }))
        }
    ]
})
</script>
