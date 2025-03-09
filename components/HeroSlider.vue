<!-- components/HeroSection.vue -->
<template>
    <section class="hero-section">
        <div class="slider-container">
            <transition-group name="slide" tag="div" class="slides-wrapper">
                <div v-for="(slide, index) in slides" :key="slide.id" class="slide"
                    :class="{ active: currentSlide === index }">
                    <NuxtImg :src="slide.image" :alt="slide.title" class="slide-image" :placeholder="[1200, 600, 10]"
                        loading="lazy" format="webp" />
                    <div class="slide-content">
                        <h1>{{ slide.title }}</h1>
                        <p>{{ slide.description }}</p>
                        <button class="btn btn-rain" @click="handleCta(slide.ctaLink)">
                            {{ slide.ctaText }}
                        </button>
                    </div>
                </div>
            </transition-group>

            <!-- Navigation dots -->
            <div class="slider-nav">
                <button v-for="(_, index) in slides" :key="`dot-${index}`" :class="{ active: currentSlide === index }"
                    @click="goToSlide(index)" :aria-label="`Go to slide ${index + 1}`" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Slide {
    id: number
    title: string
    description: string
    image: string
    ctaText: string
    ctaLink: string
}

const router = useRouter()
const currentSlide = ref(0)
const intervalId = ref<number | null>(null)

const slides: Slide[] = [
    {
        id: 1,
        title: 'সুস্থ জীবন, সুন্দর পৃথিবী',
        description: '100% Natural Diabetic Care',
        image: '/images/main-slider.jpg',
        ctaText: 'Get Started',
        ctaLink: '/products/moon-seed'
    },
    {
        id: 2,
        title: 'ডায়াবেটিক কেয়ার',
        description: '100% Natural Ingredients',
        image: '/images/slider-2.png',
        ctaText: 'Learn More',
        ctaLink: '/products/moon-seed'
    },
    {
        id: 3,
        title: 'Discover More',
        description: 'Experience the next level of innovation',
        image: '/images/slider-3.png',
        ctaText: 'Learn More',
        ctaLink: '/products/moon-seed'
    }
]

const startAutoSlide = () => {
    intervalId.value = window.setInterval(() => {
        nextSlide()
    }, 5000)
}

const stopAutoSlide = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
    }
}

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
    currentSlide.value =
        (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
    stopAutoSlide()
    currentSlide.value = index
    startAutoSlide()
}

const handleCta = (link: string) => {
    router.push(link)
}

onMounted(() => {
    startAutoSlide()
})

onBeforeUnmount(() => {
    stopAutoSlide()
})
</script>

<style lang="scss">
.hero-section {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
}

.slider-container {
    height: 100%;
    position: relative;
}

.slides-wrapper {
    height: 100%;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;

    &.active {
        opacity: 1;
    }
}

.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.slider-nav {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;

    button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
            background: white;
            transform: scale(1.2);
        }
    }
}

// Slide transition
.slide {

    &-enter-active,
    &-leave-active {
        transition: all 0.5s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
}
</style>