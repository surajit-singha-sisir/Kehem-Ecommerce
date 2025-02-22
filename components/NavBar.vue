<template>
    <header>
        <!-- TOP BAR -->
        <aside class="w-100 h--55 fixed pos-top-center bg z-5 b-b-e bg-top">
            <div class="f f-just-between w-95 pad--10 m-auto">
                <NuxtLink to="/" class="text--20">
                    KEHEM IT
                </NuxtLink>
                <div class="f f-just-center f-align-items-center g-10">
                    <div class="f f-col f-align-items-end">
                        <p>Surajit Singha Sisir</p>
                        <span class="f b-e bg-admin pad-lr--08 pad-tb--01 White text-center b-rad--05 w-min">
                            <p>Admin</p>
                        </span>
                    </div>
                    <div class="d-block w--30 c-pointer relative" onclick="userProfile(this)">
                        <img class="img-w-res" src="/icons/user-icon.svg" alt="">
                        <div class="profile-det hide" id="profile-det">
                            <span class="f f-col">
                                <NuxtLink to="/">My Profile</NuxtLink>
                                <NuxtLink to="/">Logout</NuxtLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        
        <!-- NAVBAR -->
        <nav class="fixed pos-t--55 pos-top-left bg leftnav h-100 bg z-5" id="enavigator">
            <!-- COMPANY LOGO -->
            <div class="relative">
                <!-- COMPANY NAME -->
                <NuxtLink to="/" class="f gap-05 h--30 bg-hov-e b-b-e f-just-center f-align-items-center pad--05 ov-hidden"
                    id="companylogo">
                    <span class="h--15"><img class="img-h-res" src="/images/logo-dark.svg" alt=""></span>
                    <span id="companyname" class="f b text-center text--l pad-lr--08 pad-tb--01">Abraham Organic</span>
                </NuxtLink>
                <!-- ARROW -->
                <div class="arrowpos" title="Click to Expand or Zip the Menubar" onclick="arrowpos(this)">
                    <i class="m-chevron-right"></i>
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
                    <li><NuxtLink to="/">
                            <span class="ecat">
                                <div class="nosubcaticon w--12">
                                    <img class="img-w-res" src="/icons/home.svg" alt="">
                                </div>
                                <p>Dashboard</p>
                            </span>
                        </NuxtLink></li>
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
                                    </div>
                                    <p>Manage Order</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
                                    </div>
                                    <p>Create Order</p>
                                </span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Sales -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Products -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Product Suppliers -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Category -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Brand -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Manage Accounts -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Header -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Page Manager -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Facebook Setup -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                            <img class="img-w-res" src="/icons/chevron.svg" alt="">
                        </div>
                    </span>
                    <!-- SUB CATS -->
                    <ul class="ulsubcates">
                        <!-- Courier Manager -->
                        <li>
                            <NuxtLink to="/">
                                <span class="ecat">
                                    <div class="icon w--08">
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
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
                                        <img class="img-w-res" src="/icons/arrow.svg" alt="">
                                    </div>
                                    <p>Delivery Sub City Setup</p>
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

            </section>
        </nav>
        <!-- NAVBAR END -->
    </header>
</template>