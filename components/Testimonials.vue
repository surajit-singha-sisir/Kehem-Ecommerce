<style>
.gapped {
    padding: 3rem;
}

.btn {
    &.btn-rounded {
        border-radius: 50%;
        width: 2.5rem;
        aspect-ratio: 1;
        padding: 0;

        i {
            font-size: 1.2rem;
        }
    }
}

.testimonial-container {
    position: relative;
    padding: 2rem 0;
    margin: 0 auto;


    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .arrows {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }
    }

    .testimonial-slider {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        overflow: hidden;
        padding: 0;
        min-height: 20rem;
        max-height: 25rem;

        .testimonialX {
            position: absolute;
            top: 2rem;
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
            gap: 1rem;

            .details {
                position: relative;
                display: flex;
                border: 1px solid #ccc;
                border-radius: 0.3rem;
                padding: 2rem;
                flex-direction: column;

                .quote-left,
                .quote-right {
                    position: absolute;
                    background-color: #ffffff;
                    width: 3rem;
                    aspect-ratio: 1;

                    i {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2rem;
                        color: #888888;
                    }
                }

                .i-position {
                    top: -1.5rem;
                    left: 1.5rem;
                }

                .ib-position {
                    bottom: -1.5rem;
                    right: 1rem;
                }

                .testimonial {
                    position: relative;
                    font-size: 1.2rem;
                }

                .customer-info {
                    position: relative;
                    display: flex;
                    padding-top: 1rem;
                    margin-bottom: -1rem;
                    text-align: center;
                    flex-direction: column;
                    gap: 0.1rem;
                }

            }
        }
    }
}

.img-round {
    position: relative;
    min-width: 3rem;
    max-width: 6rem;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;

    img {
        min-width: 100%;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: 0.3s ease;

        &:hover {
            transform: scale(1.1);
            transition: 0.3s ease;
        }
    }
}




.slide-enter-active,
.slide-leave-active {
    transition: transform 0.6s ease-in-out, opacity 0.6s;
    position: absolute;
    width: 100%;
}

.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.right-enter-active,
.right-leave-active {
    transition: transform 0.6s ease-in-out, opacity 0.6s;
    position: absolute;
    width: 100%;
}

.right-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}




@media screen and (max-width: 720px) {
    .testimonial-slider {
        min-height: 35rem !important;
    }

    .testimonialX {
        flex-wrap: wrap;
        gap: 2rem;
    }
}
</style>

<template>
    <div class="testimonial-container res-container">
        <div class="gapped"></div>

        <div class="title">
            <h2>TESTIMONIAL</h2>
            <div class="arrows">
                <button @click="previous" class="btn btn-rounded"
                    :class="{ 'btn-primary': isPrevious, 'btn-secondary': !isPrevious }">
                    <i class="m-chevron-left"></i>
                </button>
                <button @click="next" class="btn btn-rounded"
                    :class="{ 'btn-primary': isNext, 'btn-secondary': !isNext }">
                    <i class="m-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="testimonial-slider">
            <transition :name="direction">
                <div v-if="testimonials" class="testimonialX" :key="currentIndex">
                    <aside class="img-round">
                        <NuxtImg :src="testimonials[currentIndex]?.image" />
                    </aside>
                    <aside class="details">
                        <span class="quote-left i-position"><i class="m-left-quote"></i></span>
                        <div class="testimonial">
                            {{ testimonials[currentIndex]?.testimonial }}
                        </div>
                        <div class="customer-info">
                            <b>{{ testimonials[currentIndex]?.name }}</b>
                            <p>{{ testimonials[currentIndex]?.designation }}</p>
                        </div>
                        <span class="quote-right ib-position"><i class="m-right-quote"></i></span>
                    </aside>
                </div>
                <div v-else>
                    <p>No testimonials available.</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Testimonial {
    id: number
    name: string
    designation: string
    testimonial: string
    image: string
}

const currentIndex = ref(0)
const isPrevious = ref(false)
const isNext = ref(true)
const autoPlayInterval = ref<NodeJS.Timeout | null>(null)
const direction = ref('right')

const { data: testimonials, error } = await useFetch<Testimonial[]>('http://192.168.0.111:3000/api/testimonial', {
    default: () => []
})

const startAutoPlay = () => {
    autoPlayInterval.value = setInterval(() => {
        next()
    }, 5000)
}

const stopAutoPlay = () => {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value)
    }
}

const next = () => {
    if (!testimonials.value || testimonials.value.length === 0) return

    stopAutoPlay()
    direction.value = 'right'
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
    updateButtonStates()
    startAutoPlay()
}

const previous = () => {
    if (!testimonials.value || testimonials.value.length === 0) return

    stopAutoPlay()
    direction.value = 'slide'
    currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
    updateButtonStates()
    startAutoPlay()
}

const updateButtonStates = () => {
    if (!testimonials.value || testimonials.value.length <= 1) {
        isPrevious.value = false
        isNext.value = false
        return
    }

    isPrevious.value = currentIndex.value > 0
    isNext.value = currentIndex.value < testimonials.value.length - 1
}

onMounted(() => {
    updateButtonStates()
    startAutoPlay()
})

onUnmounted(() => {
    stopAutoPlay()
})
</script>