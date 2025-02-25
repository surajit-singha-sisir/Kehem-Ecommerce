<template>
    <div>
        <header class="w-100 h--55 fixed pos-top-center bg z-5 b-b-e bg-top">
            <div class="f f-just-between w-95 pad--10 m-auto">
                <NuxtLink to="/" class="text--15 b f-center btn-nav-primary pad-lr--10">
                    KEHEM IT
                </NuxtLink>
                <div class="f f-just-center f-align-items-center g-10">
                    <div class="f f-col f-align-items-end">
                        <p>Surajit Singha Sisir</p>
                        <span class="f b-e bg-admin pad-lr--08 pad-tb--01 White text-center b-rad--05 w-min">
                            <p>Admin</p>
                        </span>
                    </div>
                    <div class="d-block w--30 c-pointer relative" ref="profileRef">
                        <span class="b-1 b-Gray bg-hov-Silver h--25 w--25 b-rad-50 f-center" @click="userMenu">
                            <i class="m-user3"></i>
                        </span>
                        <div class="profile-det" id="profile-det" v-if="isUserMenu">
                            <span class="f f-col">
                                <NuxtLink to="/">My Profile</NuxtLink>
                                <NuxtLink to="/" @click="logout">Logout</NuxtLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- NAVBAR -->
        <nav class="fixed pos-t--55 pos-top-left bg leftnav h-100 bg z-5" id="enavigator">
            <!-- COMPANY LOGO -->
            <div class="relative">
                <!-- COMPANY NAME -->
                <NuxtLink to="/"
                    class="f gap-05 h--30 bg-hov-e b-b-e f-just-center f-align-items-center pad--05 ov-hidden"
                    id="companylogo">
                    <span class="h--15"><img class="img-h-res" src="/images/logo-dark.svg" alt=""></span>
                    <span id="companyname" class="f b text-center text--m pad-lr--08 pad-tb--01">Abraham Organic</span>
                </NuxtLink>
                <!-- ARROW -->
                <div class="arrowpos" title="Click to Expand or Zip the Menubar" @click="arrowpos">
                    <i :class="{ 'm-chevron-left': isChevron, 'm-chevron-right': isChevron == false }"></i>
                </div>

            </div>

            <!-- SEARCH -->
            <div class="searchcat">
                <input type="text" placeholder="Search" title="Click 'Esc' to clean search">
            </div>

            <!-- MENU ITEMS -->
            <section class="ecom-navs" id="ecom-navs">
                <!-- DASHBOARD -->
                <ul class="nosubcat">
                    <li>
                        <NuxtLink to="/">
                            <span class="ecat">
                                <div class="nosubcaticon w--12">
                                    <img class="img-w-res" src="/icons/home.svg" alt="">
                                </div>
                                <p>Dashboard</p>
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
                <!-- Orders -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/order.svg" alt="">
                            </div>
                            <p>Orders</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Order</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Create Order</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Order Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Sales -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/sales.svg" alt="">
                            </div>
                            <p>Sales</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Sales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Sales</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Office Sales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Office Sales</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Personal Sales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Personal Sales</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Dummy Sales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Dummy Sales</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Wholesales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Wholesales</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Sales Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Sales Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Products -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/products.svg" alt="">
                            </div>
                            <p>Products</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Products -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Products</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Products -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Product</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Product Reviews -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Product Reviews</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Product Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Products Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <!-- Product Suppliers -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/products.svg" alt="">
                            </div>
                            <p>Product Suppliers</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Product Suppliers -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Product Suppliers</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Supplier -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Supplier</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Supplier Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Supplier Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Category -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/products.svg" alt="">
                            </div>
                            <p>Category</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Category -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Category</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Sub Cateogry -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Sub Cateogry</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Sub Sub Category -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Sub Sub Category</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Category Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Category Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Brands -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/brands.svg" alt="">
                            </div>
                            <p>Brands</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Brand -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Brand</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Brand -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Brand</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Brand Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Brand Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Accounts -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/accounts.svg" alt="">
                            </div>
                            <p>Accounts</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Accounts -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Manage Accounts</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Account -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Account</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Account Reports -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Account Reports</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Website Settings -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/website-settings.svg" alt="">
                            </div>
                            <p>Website Settings</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Header -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Header</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Slider -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Slider</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Footer -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Footer</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Appearance -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Appearance</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Pages -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/pages.svg" alt="">
                            </div>
                            <p>Pages</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Page Manager -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Page Manager</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Page -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Page</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Landing Page Manager -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Landing Page Manager</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Landing Page -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Landing Page</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Configurations -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/settings.svg" alt="">
                            </div>
                            <p>Configurations</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Facebook Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Facebook Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Google Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Google Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- SMS API Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>SMS API Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Invoice Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Invoice Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Social Credential -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Social Credential</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Payment Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Payment Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Delivery & Courier -->
                <div class="esubcats">
                    <span class="ecatnoclick">
                        <div class="maincatname">
                            <div class="w--12">
                                <img class="img-w-res" src="/icons/delivery.svg" alt="">
                            </div>
                            <p>Delivery & Courier</p>
                        </div>
                        <div class="icon w--10 m-r--10 chevron">
                            <i class="m-chevron-down"></i>
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Courier Manager -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Courier Manager</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Add Courier -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Add Courier</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Courier API Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Courier API Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Delivery Charge Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Delivery Charge Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Delivery City Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Delivery City Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <!-- Delivery Sub City Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <i class="m-chevron-right"></i>
                                    </div>
                                    <p>Delivery Sub City Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </section>
        </nav>
        <main class="main bg" id="main">
            <slot />
        </main>
        <footer class="d-fixed">
            <p>KEHEM IT</p>
        </footer>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// definePageMeta({
//     middleware: 'authenticated'
// });



const isUserMenu = ref(false);
const profileRef = ref<HTMLElement | null>(null);

const userMenu = (event: MouseEvent) => {
    event.stopPropagation();
    isUserMenu.value = !isUserMenu.value;
};

const handleDocumentClick = (event: MouseEvent) => {
    // PROFILE
    if (profileRef.value && !profileRef.value.contains(event.target as Node)) {
        isUserMenu.value = false;
    }
};


async function logout() {
    const accessToken = useCookie('access', { path: '/' });
    const refreshToken = useCookie('refresh', { path: '/' });

    // Clear cookie values
    accessToken.value = null;
    refreshToken.value = null;

    // await clearSession();
    await navigateTo('/k-admin/login');
}




















const isChevron = ref(false);

const arrowpos = (event: MouseEvent) => {
    const x = event.currentTarget as HTMLElement;

    isChevron.value = !isChevron.value;

    const icon = x.querySelector("i");

    if (icon) {
        icon.classList.add('m-chevron-right')
        icon.classList.toggle('m-chevron-left')
    }

    const zipunzip = () => {
        const navwidth = document.getElementById("enavigator");
        if (navwidth) {
            navwidth.classList.toggle("navwidth");
        }

        const hideMenuText = () => {
            const logo = document.getElementById("companylogo");
            if (logo) {
                const companyName = logo.querySelector("#companyname");
                companyName?.classList.toggle("hideImp");
            }

            const nosubcat = document.querySelectorAll(".nosubcat p");
            nosubcat.forEach((p) => p.classList.toggle("hide"));

            const nosubcaticon = document.querySelectorAll(".nosubcat .ecat");
            nosubcaticon.forEach((m) => m.classList.toggle("nosubcaticon"));

            const menu = document.querySelectorAll(".maincatname p");
            menu.forEach((p) => p.classList.toggle("hide"));

            const chevron = document.querySelectorAll(".ecatnoclick .chevron");
            chevron.forEach((c) => c.classList.toggle("hide"));

            const mecatnoclick = document.querySelectorAll(".esubcats .ecatnoclick .maincatname");
            mecatnoclick.forEach((m) => m.classList.toggle("mecatnoclick"));

            const catIconInc = document.querySelectorAll(".esubcats .ecatnoclick .maincatname div:nth-child(1)");
            catIconInc.forEach((m) => m.classList.toggle("caticonInc"));

            const subcats = document.querySelectorAll(".esubcats ul");
            subcats.forEach((subcats) => subcats.classList.toggle("hide"));
        };

        hideMenuText();
    };

    zipunzip();

    const main = () => {
        const main = document.getElementById("main");
        if (main) {
            main.classList.toggle("mainexp");
        }
    };

    main();
};












onMounted(() => {
    document.addEventListener('click', handleDocumentClick);

    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "F1") {
            e.preventDefault();
            const arrowElement = document.querySelector(".arrowpos") as HTMLElement;

            if (arrowElement) {
                arrowElement.click();
            }
        }
    });



    const searchInput = document.querySelector(".searchcat input") as HTMLInputElement;
    const navItems = document.querySelectorAll("#ecom-navs li");
    const subCategories = document.querySelectorAll("#ecom-navs .esubcats");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        navItems.forEach((item) => {
            const text = item.textContent!.toLowerCase();
            const parent = item.closest(".esubcats");

            if (item instanceof HTMLElement) {
                if (text.includes(searchTerm)) {
                    item.style.display = "";
                    if (parent && parent instanceof HTMLElement) {
                        parent.style.display = "";
                    }
                } else {
                    item.style.display = "none";
                }
            }
        });

        subCategories.forEach((subCat) => {
            if (subCat instanceof HTMLElement) {
                const visibleItems = subCat.querySelectorAll('li:not([style*="display: none"])');
                subCat.style.display = visibleItems.length > 0 ? "" : "none";
            }
        });

    });

    searchInput.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            searchInput.value = "";
            navItems.forEach((item) => {
                if (item instanceof HTMLElement) {
                    item.style.display = ""
                }
            });
            subCategories.forEach((subCat) => {
                if (subCat instanceof HTMLElement) {
                    subCat.style.display = ""
                }
            });
        }
    });


    const toggleButtons = document.querySelectorAll(".ecatnoclick");
    const allSubmenus = document.querySelectorAll(".ulsubcates");
    const chevronIcons = document.querySelectorAll(".chevron");

    toggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const submenu = button.nextElementSibling as HTMLElement;
            const chevron = button.querySelector(".chevron") as HTMLElement;
            const isExpanded =
                submenu.style.maxHeight && submenu.style.maxHeight !== "0px";

            allSubmenus.forEach((menu) => {
                if (menu instanceof HTMLElement) {
                    menu.style.transition = "max-height 0.3s ease";
                    menu.style.maxHeight = "0";
                }
            });
            chevronIcons.forEach((icon) => {
                icon.classList.remove("chevronrotate");
            });

            if (!isExpanded) {
                submenu.style.transition = "max-height 0.3s ease";
                submenu.style.maxHeight = submenu.scrollHeight + "px";
                chevron.classList.add("chevronrotate");
            }
        });
    });

    allSubmenus.forEach((submenu) => {
        if (submenu instanceof HTMLElement) {
            submenu.style.maxHeight = "0";
            submenu.style.overflow = "hidden";
            submenu.style.transition = "max-height 0.3s ease"; /* Added */
        }
    });
    chevronIcons.forEach((icon) => {
        icon.classList.add("chevron");
    });
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick);
});
</script>
