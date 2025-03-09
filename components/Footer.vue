<script setup lang="ts">
// Dummy data
const links = ['Available Stores', 'Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Refund & Return Policy'];
const office = {
    name: 'Abraham Organic Office',
    address: '107, Khan Mansion (5th floor), Motijheel, Dhaka-1000',
    phone: '+8801700055288',
    email: 'abrahamorganic@gmail.com',
};
</script>

<template>
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
</template>

<style scoped>
.footer {
    background-color: #2e7d32;
    color: #ffffff;
    padding: 2rem 0;
    text-align: center;
}

.container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.footer-logo {
    margin-bottom: 1rem;
}

.footer-image {
    display: block;
    margin: 0 auto 0.5rem;
}

.footer-copyright {
    font-size: 0.875rem;
}

.footer-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.footer-list {
    list-style: none;
    padding: 0;
}

.footer-item {
    margin-bottom: 0.25rem;
}

.footer-link {
    color: #ffffff;
    text-decoration: none;
}

.footer-link:hover {
    text-decoration: underline;
}

.footer-text {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
}

.footer-social {
    margin-top: 0.5rem;
}

.social-icon {
    color: #ffffff;
    margin: 0 0.5rem;
    text-decoration: none;
}

.footer-developed {
    font-size: 0.75rem;
}

@media (min-width: 768px) {
    .footer-content {
        grid-template-columns: repeat(3, 1fr);
        text-align: left;
    }
}
</style>