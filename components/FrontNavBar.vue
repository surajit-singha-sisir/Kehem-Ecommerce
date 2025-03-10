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
                        <span class="gap-10 f-centered">
                            <NuxtLink to="#" class="nav-items-link">SHOP</NuxtLink>
                        </span>
                        <span class="gap-10 f-centered">
                            <NuxtLink to="#" class="nav-items-link">TESTIMONIAL</NuxtLink>
                        </span>
                        <span class="gap-10 f-centered">
                            <NuxtLink to="#" class="nav-items-link">ABOUT US</NuxtLink>
                        </span>
                        <span class="gap-10 f-centered">
                            <NuxtLink to="#" class="nav-items-link">CONTACT</NuxtLink>
                        </span>
                        <span class="gap-10 f-centered">
                            <NuxtLink to="#" class="nav-items-link"><i class="m-shopping-cart"></i></NuxtLink>
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
                <div class="border-bottom w-100" @click="LinkClicked">
                    <span class="gap-10 f-centered"><i class="m-chevron-right"></i>
                        <NuxtLink to="/">SHOP</NuxtLink>
                    </span>
                </div>
                <div class="border-bottom w-100" @click="LinkClicked">
                    <span class="gap-10 f-centered"><i class="m-chevron-right"></i>
                        <NuxtLink to="#" class="nav-items-link">TESTIMONIAL</NuxtLink>
                    </span>
                </div>
                <div class="border-bottom w-100" @click="LinkClicked">
                    <span class="gap-10 f-centered"><i class="m-chevron-right"></i>
                        <NuxtLink to="#" class="nav-items-link">ABOUT US</NuxtLink>
                    </span>
                </div>
                <div class="border-bottom w-100" @click="LinkClicked">
                    <span class="gap-10 f-centered"><i class="m-chevron-right"></i>
                        <NuxtLink to="#" class="nav-items-link">CONTACT</NuxtLink>
                    </span>
                </div>
                <div class="border-bottom w-100" @click="LinkClicked">
                    <span class="gap-10 f-centered"><i class="m-chevron-right"></i>
                        <NuxtLink to="#" class="nav-items-link f-center gap-06"><i class="m-shopping-cart"></i>
                            Cart</NuxtLink>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

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

</script>