<!-- <script setup lang="ts">
// Dummy data
const links = ['Available Stores', 'Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Refund & Return Policy'];
const office = {
    name: 'Abraham Organic Office',
    address: '107, Khan Mansion (5th floor), Motijheel, Dhaka-1000',
    phone: '+8801700055288',
    email: 'abrahamorganic@gmail.com',
};
</script> -->

<!-- <template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="https://via.placeholder.com/100" alt="Logo" class="footer-image" />
                    <p class="footer-copyright">© 2025 Abraham Organic</p>
                </div>
                <div class="footer-links">
                    <h3 class="footer-title">LINKS</h3>
                    <ul class="footer-list">
                        <li v-for="link in links" :key="link" class="footer-item">
                            <a href="#" class="footer-link">{{ link }}</a>
                        </li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3 class="footer-title">{{ office.name }}</h3>
                    <p class="footer-text">{{ office.address }}</p>
                    <p class="footer-text">{{ office.phone }}</p>
                    <p class="footer-text">{{ office.email }}</p>
                    <div class="footer-social">
                        <a href="#" class="social-icon">Facebook</a>
                        <a href="#" class="social-icon">Twitter</a>
                        <a href="#" class="social-icon">Instagram</a>
                    </div>
                </div>
            </div>
            <p class="footer-developed">Developed by KHEM-IT</p>
        </div>
    </footer>
</template> -->
<template>
    <footer class="footer">
        <div class="inner-footer res-container">
            <div class="socials f-centered gap-15 pad-t--30">
                <NuxtLink to="/" class="iconLink"><i class="m-facebook rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-twitter rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-instagram rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-whatsapp rounded branded"></i></NuxtLink>
            </div>

            <section class="g-res-3-col-container gap-10">
                <aside class="f-centered f-col gap-05">
                    <NuxtImg class="w--50" src="images/logo-white.svg" />
                    <span class="brand-white">ABRAHAM ORGANIC</span>
                </aside>
                <aside class="brand-white footer-aside">
                    <h3>Links</h3>
                    <span class="hr"></span>
                    <NuxtLink to="/">Available Stores</NuxtLink>
                    <NuxtLink to="/">Terms of Service</NuxtLink>
                    <NuxtLink to="/">Privacy Policy</NuxtLink>
                    <NuxtLink to="/">Shipping Policy</NuxtLink>
                    <NuxtLink to="/">Return & Refund Policy</NuxtLink>
                </aside>
                <aside class="brand-white footer-aside">
                    <h3>Office</h3>
                    <span class="hr"></span>
                    <address class="f-start-center gap-10">
                        <i class="m-location"></i>
                        <p>5, Khan Mansion(5th Floor), Kulaura - 3150, Sylhet, Bangladesh</p>
                    </address>
                    <div class="f-start-center gap-10">
                        <i class="m-phone"></i>
                        <NuxtLink to="tel:+8801700905268">+8801700-905268</NuxtLink>
                    </div>
                    <div class="f-start-center gap-10">
                        <i class="m-mail6"></i>
                        <NuxtLink to="mailto:abrahamorganic@gmail.com">abrahamorganic@gmail.com</NuxtLink>
                    </div>
                </aside>
            </section>
        </div>

        <div class="credit">
            <div class="res-container m-auto f-center gap-05 f-wrap">
                <span class="f-centered gap-05">
                    <p>&copy; 2025</p>
                    <NuxtLink to="/">Abraham Organic |</NuxtLink>
                </span>
                <span class="f-centered gap-05">
                    <p>Developed by</p>
                    <NuxtLink to="https://kehem.com/">KEHEM IT</NuxtLink>
                </span>
            </div>
        </div>
    </footer>
</template>