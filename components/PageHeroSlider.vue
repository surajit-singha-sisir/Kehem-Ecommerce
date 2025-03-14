<template>
    <section class="hero-section">
        <div class="slider-container">
            <transition-group name="slide" tag="div" class="slides-wrapper">
                <div v-for="(slide, index) in sliders" :key="slide.id" class="slide"
                    :class="{ active: currentSlide === index }">
                    <NuxtImg :src="slide.banner" :alt="slide.title" class="slide-image" :placeholder="[1200, 600, 10]"
                        loading="lazy" format="webp" />
                    <div class="slide-content">
                        <h1>{{ slide.title }}</h1>
                        <p>{{ slide.sub_title || slide.description }}</p>
                        <NuxtLink to="#all-products" class="btn btn-rain" @click="handleCta(slide.ctaLink)">
                            {{ slide.ctaText || 'See all' }}
                        </NuxtLink>
                    </div>
                </div>
            </transition-group>

            <!-- Navigation dots -->
            <div class="slider-nav">
                <button v-for="(_, index) in sliders" :key="`dot-${index}`" :class="{ active: currentSlide === index }"
                    @click="goToSlide(index)" :aria-label="`Go to slide ${index + 1}`" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
const toast = useToast()

const router = useRouter()
const currentSlide = ref(0)
const intervalId = ref<number | null>(null)

interface Slide {
    id: number
    title: string
    sub_title?: string
    description?: string
    banner: string
    ctaText?: string
    ctaLink?: string
    sort_value?: number
}

// Remove static slides array since we're using API data
const { data: sliders, error } = await useFetch<Slide[]>('http://192.168.0.111:3000/api/banner', {
    method: 'GET'
})

const startAutoSlide = () => {
    if (sliders.value?.length) {
        intervalId.value = window.setInterval(() => {
            nextSlide()
        }, 5000)
    }
}

const stopAutoSlide = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
    }
}

const nextSlide = () => {
    if (sliders.value?.length) {
        currentSlide.value = (currentSlide.value + 1) % sliders.value.length
    }
}

const prevSlide = () => {
    if (sliders.value?.length) {
        currentSlide.value = (currentSlide.value - 1 + sliders.value.length) % sliders.value.length
    }
}

const goToSlide = (index: number) => {
    stopAutoSlide()
    currentSlide.value = index
    startAutoSlide()
}

const handleCta = (link: string | undefined) => {
    if (link) {
        router.push(link)
    } else {
        toast.warning("No link available for this slide")
    }
}

onMounted(() => {
    if (error.value) {
        toast.error("Failed to load slides")
    } else if (!sliders.value?.length) {
        toast.warning("No slides available")
    }
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
    height: 85vh;
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
    left: 10%;
    transform: translateY(-50%);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    h1 {
        font-size: 3rem;
    }

    p {
        font-size: 1.5rem;
        padding-bottom: 1rem;
    }
}

.slider-nav {
    position: absolute;
    bottom: 3rem;
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