<template>
    <section class="head-nav-bar">
        <header class="header border-bottom">
            <nav class="nav res-container m-auto">
                <!-- HAMBURGER -->
                <div class="hamburger" @click="toggleNavbar">
                    <div class="inner-hamburger">
                        <div class="first-line line-rounded" :class="{ 'first-lined': isToggledNav }"></div>
                        <div class="second-line line-rounded" :class="{ 'second-lined': isToggledNav }"></div>
                        <div class="third-line line-rounded" :class="{ 'third-lined': isToggledNav }"></div>
                    </div>
                </div>
                <!-- LOGO -->
                <div class="logo-centered">
                    <NuxtLink to="/" class="logo">
                        <NuxtImg src="/images/logo-white.svg" alt="Logo" />
                        <p><b>ABRAHAM</b> ORGANIC</p>
                    </NuxtLink>
                </div>

                <!-- NAV ITEMS -->
                <div class="nav-items">
                    <div class="inner-nav-items">
                        <span class="gap-10 f-centered" v-for="(item, index) in navBars" :key="item">
                            <template v-if="item === 'CART'">
                                <span class="cart-icon" @click="openCart">
                                    <NuxtLink to="/cart" class="nav-items-link">
                                        <i class="m-shopping-cart"></i>
                                        <p>{{ item }}</p>
                                    </NuxtLink>
                                    <p class="cart-counter">{{ cartCount }}</p>
                                </span>
                            </template>

                            <!-- Default HTML for other items -->
                            <template v-else>
                                <NuxtLink to="#" class="nav-items-link">{{ item }}</NuxtLink>
                            </template>
                        </span>
                    </div>
                </div>
            </nav>
        </header>

        <!-- NAV ITEMS RESPONSIVE -->
        <div class="bg-dark" :class="{ 'navToggleAnimStart': isToggledNav || isDarkBgClicked || isLinkClicked }"
            @click="darkBGClick"></div>
        <div class="nav-items-responsive" :class="{ 'navToggleAnimStart': isToggledNav || isLinkClicked }">
            <div class="inner-nav-items">
                <div class="border-bottom w-100" v-for="(item, index) in navBars" :key="index" @click="LinkClicked">
                    <span class="gap-10 f-centered">
                        <i class="m-chevron-right"></i>
                        <NuxtLink :to="item === 'CART' ? '/cart' : item === 'SHOP' ? '/' : '#'"
                            :class="{ 'nav-items-link': item !== 'CART', 'nav-items-link f-center gap-06': item === 'CART' }">
                            <template v-if="item === 'CART'">
                                <span class="cart-icon cart-icon2" @click="openCart">
                                    <NuxtLink to="/cart" class="nav-items-link">
                                        <i class="m-shopping-cart"></i>
                                        <p>{{ item }}</p>
                                    </NuxtLink>
                                    <p class="cart-counter">{{ cartCount }}</p>
                                </span>
                            </template>
                            <template v-else>
                                {{ item }}
                            </template>
                        </NuxtLink>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Access the cart store
const cartStore = productCart();
// Use storeToRefs to maintain reactivity
const { getCartJSON } = storeToRefs(cartStore);

// Compute cart count
const cartCount = computed(() => getCartJSON.value.length);

const isDarkBgClicked = ref(false);
const darkBGClick = () => {
    isToggledNav.value = false;
    isDarkBgClicked.value = false;
    isLinkClicked.value = false;
}
const isToggledNav = ref(false);
const toggleNavbar = () => {
    isToggledNav.value = !isToggledNav.value;
    isLinkClicked.value = !isLinkClicked.value;
}

const isLinkClicked = ref(false);
const LinkClicked = () => {
    isLinkClicked.value = false;
}

const navBars: string[] = ['SHOP', 'TESTIMONIAL', 'ABOUT US', 'CONTACT', 'CART'];

// Optional: Add cart opening function if needed
const openCart = () => {
    // Add your cart opening logic here if needed
};
</script>