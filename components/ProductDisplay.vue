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
                <h1 itemprop="name">Moonseed - Diabetic Care</h1>
                <div class="category-name">
                    <span itemprop="category">Organic Seeds</span>
                </div>
                <div class="pricing" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="BDT" />
                    <strong class="current-price" itemprop="price">{{ price.current }}</strong>
                    <span class="old-price">{{ price.old }}</span>
                    <meta itemprop="availability" content="https://schema.org/InStock" />
                    <meta itemprop="priceValidUntil" content="2025-12-31" />
                </div>
                <button type="button" class="btn btn-primary w--80 buy-now" aria-label="Buy Moonseed Organic Seed Blend"
                    @click="handleBuyNow">
                    Buy Now !
                </button>
                <p class="short-description" itemprop="description">
                    {{ description }}
                </p>
                <nav>
                    <NuxtLink to="/#shop" rel="related">
                        Explore More Organic Products
                    </NuxtLink>
                </nav>
            </aside>
        </div>

        <div class="product-details">
            <div class="inner-product-details res-container m-auto">
                <div class="tabs">
                    <button type="button" class="buttons">Description</button>
                    <button type="button" class="buttons">Benefits</button>
                    <button type="button" class="buttons active">Ingredients</button>
                    <button type="button" class="buttons">Dosage</button>
                    <button type="button" class="buttons">FAQ</button>
                </div>


                <div class="info-container">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum nostrum id corporis!
                    Recusandae, itaque, libero debitis laboriosam asperiores obcaecati minus qui enim hic, eaque quia
                    fugit explicabo molestias nam?
                </div>


                <div class="related-products">
                    <h2>Related Products</h2>
                    <div class="product-showcase">
                        <div class="image">
                            <NuxtImg src="images/product-1.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Import Nuxt composables
import { useHead } from '@unhead/vue'

// Define product data with TypeScript types
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

// SEO Meta Tags and Schema
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
    margin: 4rem 0;



}

@media screen and (max-width: 768px) {
    .product-display {
        .inner-product-display {
            flex-wrap: wrap;
            justify-content: center;

            .slider-container {}
        }
    }
}
</style>