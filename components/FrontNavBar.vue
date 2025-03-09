<template>
    <nav class="navbar">
        <div class="logo">
            <div class="w--30">
                <NuxtImg src="images/logo-white.svg"></NuxtImg>
            </div>
        </div>
        <ul class="nav-links" :class="{ active: isMenuOpen }">
            <li v-for="item in navItems" :key="item" class="nav-item">
                <NuxtLink :to="`#${item.toLowerCase()}`" class="nav-link">{{ item }}</NuxtLink>
            </li>
        </ul>
        <div class="cart">
            <NuxtLink to="#cart" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
            </NuxtLink>
            <span class="cart-count">5</span>
        </div>
        <div class="hamburger" @click="toggleMenu">
            <i class="fas fa-bars"></i>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define navigation items
const navItems = ['SHOP', 'TESTIMONIAL', 'ABOUT US', 'CONTACTS'] as const;

// Reactive state for menu toggle
const isMenuOpen = ref(false);

// Toggle menu function
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Optional: Close menu when a link is clicked (for mobile usability)
const handleLinkClick = () => {
    if (isMenuOpen.value) {
        isMenuOpen.value = false;
    }
};
</script>

<style scoped>
/* Reset default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e0f2f1;
    padding: 1rem 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.logo .placeholder-logo {
    width: 40px;
    height: 40px;
    background-color: #333;
    border-radius: 50%;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
    transition: all 0.3s ease;
}

.nav-item .nav-link {
    text-decoration: none;
    color: #00695c;
    font-weight: bold;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #004d40;
}

.cart {
    position: relative;
}

.cart-icon {
    text-decoration: none;
    color: #333;
    font-size: 1.5rem;
}

.cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #66bb6a;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
}

.hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .nav-links {
        display: none;
        width: 100%;
        position: absolute;
        top: 60px;
        left: 0;
        background-color: #e0f2f1;
        flex-direction: column;
        padding: 1rem;
        text-align: center;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-item {
        margin: 1rem 0;
    }

    .cart {
        margin-left: auto;
    }
}
</style>