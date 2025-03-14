<template>
    <section class="product-display" itemscope itemtype="https://schema.org/Product">
        <div class="inner-product-display res-container m-auto">
            <aside class="slider-container">
                <figure class="slider">
                    <NuxtImg src="images/product-1.png" alt="Moonseed Organic Seed Blend"
                        sizes="sm:100vw md:50vw lg:33vw" quality="80" loading="lazy" />
                </figure>
                <div class="blob">
                    <NuxtImg src="images/blob.svg" alt="" loading="lazy" />
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
                    <meta itemprop="availability" content="https://schema.org/InStock" />
                    <meta itemprop="priceValidUntil" content="2025-12-31" />
                </div>
                <div class="product-attributes">
                    <fieldset class="f-start-center gap-05 f-wrap pad--10 w-fit bordered b-rad--03"
                        v-for="(attrValues, attrKey, index) in pageData?.attributes.Mandatory_attributes" :key="index">
                        <legend class="attribute-value pad--05 text-center">
                            {{ attrKey }}
                        </legend>
                        <div class="radio pad-lr--10 b-rad--02" v-for="(value, valueKey, valueIndex) in attrValues"
                            :key="valueIndex"
                            :class="{ 'btn-primary': isAttrSelected, 'btn-nav-cold': !isAttrSelected }">
                            <input type="radio" :name="'radio-' + attrKey" :id="'radio-' + attrKey + '-' + valueIndex"
                                :value="valueKey">
                            <label :for="'radio-' + attrKey + '-' + valueIndex">
                                {{ valueKey }}
                            </label>
                        </div>
                    </fieldset>

                </div>
                <button type="button" class="btn btn-primary w--80 buy-now" aria-label="Buy Moonseed Organic Seed Blend"
                    @click="handleBuyNow">
                    Buy Now !
                </button>
                <p class="short-description text-dotted-3" itemprop="description" v-html="descriptionData">
                </p>
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
                    <div v-if="activeTab === 'Description'" v-html="pageData?.description">

                    </div>
                    <div v-if="activeTab === 'Benefits'" v-html="pageData?.benefits">
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
                    <div v-if="activeTab === 'Dosage'" v-html="pageData?.dosage">
                    </div>
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
                    <!-- PRODUCT IMAGE -->
                    <div class="image">
                        <NuxtImg src="images/product-1.png" />
                    </div>
                    <!-- PRODUCT INFO -->
                    <div class="related-product-info">
                        <!-- PRODUCT NAME -->
                        <h1 class="product-name">Moonseed</h1>
                        <!-- CATEGORY -->
                        <p class="category">Blood Care</p>
                        <!-- PRICING -->
                        <div class="pricing">
                            <strong class="current-price" itemprop="price">Tk 570</strong>
                            <span class="old-price">Tk 450</span>
                        </div>
                        <!-- ADD TO CART -->
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

const isAttrSelected = ref(false);
const currentRouteKey = useRoute().params.key;
const activeTab = ref('Ingredients') // Set default active tab

// Function to handle tab switching
const switchTab = (tabName: string) => {
    activeTab.value = tabName
}

interface PageData {
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
            [key: string]: {  // Dynamic key for attribute type (e.g., "Color")
                [key: string]: [number, number];  // Dynamic key for attribute value (e.g., "Red") with [stock, price]
            };
        };
        Optional_attributes: {
            [key: string]: string[];  // Dynamic key for optional attributes (e.g., "Organic", "Weight") with string array values
        };
    };
    faqs: [string, string][]; // Array of [question, answer] tuples
    tags: string[];
    ingredients: [string, string, string][]; // [imageUrl, englishName, localName]
    images: string[];
    sold: any[]; // Empty array in the example, could be typed more specifically if needed
}


const { data: pageData, error } = await useFetch<PageData>(`http://192.168.0.111:3000/api/landing_page/${currentRouteKey}`);

const descriptionData = pageData.value?.description;

console.log(descriptionData);



interface Price {
    current: string
    old: string
}

const price: Price = {
    current: 'Tk 100',
    old: 'Tk 150',
}

const description: string =
    'Moonseed Organic Seed Blend offers a nutritious mix of premium organic seeds, perfect for health-conscious individuals seeking natural superfoods.'
useHead({
    title: 'Moonseed Organic Seed Blend - Buy Now at Tk 100',
    meta: [
        {
            name: 'description',
            content:
                'Shop Moonseed Organic Seed Blend for only Tk 100. Premium organic seeds for a healthy lifestyle. Buy now!',
        },
        {
            name: 'keywords',
            content: 'organic seeds, Moonseed, superfoods, healthy living',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://yourdomain.com/product/moonseed', // Replace with your actual URL
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: 'Moonseed Organic Seed Blend',
                image: 'https://yourdomain.com/images/product-1.png', // Replace with your actual domain
                description:
                    'Moonseed Organic Seed Blend offers a nutritious mix of premium organic seeds...',
                sku: 'MOONSEED-001',
                brand: {
                    '@type': 'Brand',
                    name: 'Your Brand', // Replace with your brand name
                },
                offers: {
                    '@type': 'Offer',
                    url: 'https://yourdomain.com/product/moonseed', // Replace with your actual URL
                    priceCurrency: 'BDT',
                    price: '100',
                    priceValidUntil: '2025-12-31',
                    availability: 'https://schema.org/InStock',
                },
            }),
        },
    ],
})

// Methods
const handleBuyNow = (): void => {
    // Add your buy now logic here (e.g., add to cart, redirect to checkout)
    console.log('Buy Now clicked!')
}
</script>



<style>
.ingredients-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
}

.ingredient-item {
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #fff;
}

.ingredient-image {
    width: 100%;
    max-width: 150px;
    /* Adjust based on your image size */
    height: auto;
}

.ingredient-name {
    margin: 5px 0 0;
    font-size: 14px;
    font-weight: bold;
}

.ingredient-local-name {
    margin: 0;
    font-size: 12px;
    color: #666;
}




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
