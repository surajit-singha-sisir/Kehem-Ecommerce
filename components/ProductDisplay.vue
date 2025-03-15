<template>
    <section class="product-display" itemscope itemtype="https://schema.org/Product">
        <div class="inner-product-display res-container m-auto">
            <aside class="slider-container">
                <figure class="slider">
                    <NuxtImg :src="pageData?.images[0] || 'images/product-1.png'"
                        :alt="pageData?.title || 'Product Image'" sizes="sm:100vw md:50vw lg:33vw" quality="80"
                        loading="lazy" itemprop="image" />
                </figure>
                <div class="blob">
                    <NuxtImg src="images/blob.svg" alt="" loading="lazy" aria-hidden="true" />
                </div>
            </aside>
            <aside class="page-product-info">
                <h1 itemprop="name">{{ pageData?.title }}</h1>
                <div class="category-name">
                    <span itemprop="category">{{ pageData?.category }}</span>
                </div>
                <div class="pricing" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="BDT" />
                    <strong class="current-price" itemprop="price">{{ pageData?.discountPrice }}</strong>
                    <span class="old-price">{{ pageData?.sellPrice }}</span>
                    <meta itemprop="availability"
                        :content="pageData?.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'" />
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
                    <button type="button" class="buttons" :class="{ active: activeTab === 'Description' }"
                        @click="switchTab('Description')">
                        Description
                    </button>
                    <button type="button" class="buttons" :class="{ active: activeTab === 'Benefits' }"
                        @click="switchTab('Benefits')">
                        Benefits
                    </button>
                    <button type="button" class="buttons" :class="{ active: activeTab === 'Ingredients' }"
                        @click="switchTab('Ingredients')">
                        Ingredients
                    </button>
                    <button type="button" class="buttons" :class="{ active: activeTab === 'Dosage' }"
                        @click="switchTab('Dosage')">
                        Dosage
                    </button>
                    <button type="button" class="buttons" :class="{ active: activeTab === 'FAQ' }"
                        @click="switchTab('FAQ')">
                        FAQ
                    </button>
                </div>

                <div class="info-container">
                    <div v-if="activeTab === 'Description'" v-html="pageData?.description"></div>
                    <div v-if="activeTab === 'Benefits'" v-html="pageData?.benefits"></div>
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
                    <div v-if="activeTab === 'Dosage'" v-html="pageData?.dosage"></div>
                    <div v-if="activeTab === 'FAQ'">
                        <div v-for="item in pageData?.faqs" class="f-center-start gap-05 f-col pad-b--20">
                            <h3>{{ item[0] }}</h3>
                            <p class="text--11">{{ item[1] }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="related-products res-container">
                <h2>Related Products</h2>
                <div class="product-showcase">
                    <div class="image">
                        <NuxtImg src="images/product-1.png" alt="Moonseed" />
                    </div>
                    <div class="related-product-info">
                        <h1 class="product-name">Moonseed</h1>
                        <p class="category">Blood Care</p>
                        <div class="pricing">
                            <strong class="current-price">Tk 570</strong>
                            <span class="old-price">Tk 450</span>
                        </div>
                        <button type="button" class="btn btn-primary">
                            <span class="f-centered gap--05">
                                <i class="m-plus2"></i>
                                <p>Cart</p>
                            </span>
                        </button>
                    </div>
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

// State
const selectedAttributes = ref<Record<string, string>>({})
const activeTab = ref('Description')
const currentRouteKey = useRoute().params.key
const toast = useToast()
const cartStore = productCart()
const router = useRouter()

// Interface for API response
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
        if (existingProduct && pageData.value) {
            Object.entries(existingProduct.attributes).forEach(([attrKey, attrValues]) => {
                const selectedValue = Object.keys(attrValues)[0]


                if (pageData.value.attributes.Mandatory_attributes[attrKey]) {
                    selectedAttributes.value[attrKey] = selectedValue
                }

            })
        }
    }
})

// Switch tab
const switchTab = (tabName: string) => {
    activeTab.value = tabName
}

// Generate short description for SEO
const shortDescription = computed(() => {
    if (!pageData.value?.description) return 'Explore this organic product for a healthy lifestyle.'
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = pageData.value.description
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.length > 160 ? `${text.substring(0, 157)}...` : text
})

// Handle Buy Now with cart check and update
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

    // Filter selected mandatory attributes
    const selectedAttrs: Record<string, Record<string, [number, number]>> = {}
    Object.entries(selectedAttributes.value).forEach(([attrKey, selectedValue]) => {
        if (mandatoryAttrs[attrKey] && mandatoryAttrs[attrKey][selectedValue]) {
            selectedAttrs[attrKey] = {
                [selectedValue]: mandatoryAttrs[attrKey][selectedValue]
            }
        }
    })

    // Prepare cart product
    const cartProduct: CartProduct = {
        title: pageData.value.title,
        sellPrice: pageData.value.sellPrice,
        discountPrice: pageData.value.discountPrice,
        attributes: selectedAttrs,
        images: pageData.value.images[0],
        key: currentRouteKey,
        total_quantity: 1
    }

    // Check if product exists in cart
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

// SEO Configuration
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
                    availability: pageData.value?.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
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
                        item: 'http://192.168.0.111:3000/shop'
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


<style>
.product-display {
    position: relative;
    height: auto;
    margin-top: 10rem;
    margin-bottom: 10rem;
    z-index: 1;

    .inner-product-display {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 2rem;

        .slider-container {
            position: relative;
            width: 20rem;
            height: 18rem;
            display: flex;
            justify-content: center;
            z-index: 5;

            .slider {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 2.5rem;
                width: auto;
                height: 16rem;
                z-index: 5;

                img {
                    width: auto;
                    height: 100%;
                }

            }

            .blob {
                position: absolute;
                bottom: 0;
                width: 15rem;
                height: auto;
                z-index: 4;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .page-product-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            justify-content: flex-start;

            h1 {
                font-size: 2rem;
            }

            .category-name {
                border-radius: 1rem;
                border: 1px solid #ccc;
                padding: 0.2rem 0.8rem;
                width: max-content;
                text-align: center;
                font-size: 0.8rem;
                text-wrap: nowrap;
                transition: 0.2s ease;

                &:hover {
                    background-color: #3c79d4;
                    color: #fff;
                    transition: 0.2s ease;
                }
            }

            .pricing {
                display: flex;
                gap: 0.5rem;
                font-size: 1.2rem;

                .old-price {
                    text-decoration: line-through;
                }
            }
        }
    }
}

.product-details {
    position: relative;
    width: 100%;
    margin: 8rem 0;


    &::after {
        content: '';
        position: absolute;
        top: 2.6rem;
        width: 100%;
        border-bottom: 1px solid #ccc;
    }

    .inner-product-details {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .tabs {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            width: inherit;
            height: 2.6rem;
            z-index: 4;

            button {
                font-size: 0.9rem;
                z-index: 2;

                &.buttons {
                    display: flex;
                    padding: 0.8rem 1rem;
                    background-color: #f1eeee;
                    border: 1px solid #ccc;
                    border-bottom: transparent;
                    border-top-left-radius: 0.3rem;
                    border-top-right-radius: 0.3rem;
                    cursor: pointer;
                    z-index: 2;

                    &.active {
                        position: relative;
                        background-color: transparent;

                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: -1px;
                            width: 100%;
                            height: 1px;
                            background-color: #fff;

                        }
                    }
                }
            }
        }

        .info-container {
            position: relative;
            margin-top: 2rem;
        }
    }
}

.related-products {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 4rem auto;

    .product-showcase {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .image {
            display: block;
            width: 6rem;
            max-height: 12rem;

            img {
                width: 100%;
                max-height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .related-product-info {
            position: relative;
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem;


            .product-name {
                font-size: 1.3rem;
            }

            .category {
                font-size: 0.9rem;
            }

            .pricing {
                display: flex;
                gap: 0.5rem;
                font-size: 1.1rem;

                .old-price {
                    text-decoration: line-through;
                }
            }


            .product-attributes {
                position: relative;
                display: flex;
                gap: 0.5rem;

                .attribute {
                    position: relative;
                    display: block;
                    padding: 0.5rem;

                    .attribute-value {
                        padding: 0.5rem;
                    }
                }
            }
        }
    }

}

@media screen and (max-width: 768px) {
    .product-display {
        .inner-product-display {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
}
</style>
