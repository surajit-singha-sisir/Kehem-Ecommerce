<template>
    <main>
        <NuxtLoadingIndicator />
        <TopBar />
        <FrontNavBar />

        <slot />
    </main>
</template>

<script setup>
useHead({
    title: 'KEHEM Ecommerce - Shop Online',
    meta: [
        { charset: 'UTF-8' }, // Already in global, but can be repeated if needed
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, // Already in global
        { name: 'description', content: 'Explore the best online shopping experience with KEHEM Ecommerce.' },
        { name: 'keywords', content: 'KEHEM, ecommerce, online shopping, products' },
        { name: 'author', content: 'Surajit Singha Sisir, Anirban Singha, KEHEM IT' },
        { name: 'theme-color', content: '#ffffff' },

        // Open Graph Meta Tags
        { property: 'og:title', content: 'KEHEM Ecommerce - Shop Online' },
        { property: 'og:description', content: 'Explore the best online shopping experience with KEHEM Ecommerce.' },
        { property: 'og:image', content: 'https://kehem-ecommerce.vercel.app/frontend-image.jpg' }, // Update with a frontend-specific image
        { property: 'og:url', content: 'https://kehem-ecommerce.vercel.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@kehem-ecommerce' },
        { name: 'twitter:title', content: 'KEHEM Ecommerce - Shop Online' },
        { name: 'twitter:description', content: 'Explore the best online shopping experience with KEHEM Ecommerce.' },
        { name: 'twitter:image', content: 'https://kehem-ecommerce.vercel.app/frontend-image.jpg' }, // Update with a frontend-specific image

        // Developer and Team Info (optional, can be same or adjusted)
        { name: 'developer', content: 'Surajit Singha Sisir, Anirban Singha' },
        { name: 'developer-team', content: 'Kehem IT' },
        { name: 'dev-platform', content: 'Vue, Django, CDN' },
        { name: 'developer-website', content: 'https://kehem.com' },
    ],
    link: [
        { rel: 'stylesheet', href: '/sass/frontend/kehem-e-frontend.css' }
    ]
})
</script>