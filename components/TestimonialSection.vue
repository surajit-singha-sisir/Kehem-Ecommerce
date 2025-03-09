<script setup lang="ts">
defineProps<{
    testimonials: { id: number; name: string; text: string; image: string }[];
}>();
</script>

<template>
    <section class="testimonial-section">
        <h2 class="section-title">TESTIMONIAL</h2>
        <div class="testimonial-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-item">
                <img :src="testimonial.image" alt="Testimonial" class="testimonial-image" />
                <p class="testimonial-text">{{ testimonial.text }}</p>
                <h4 class="testimonial-name">{{ testimonial.name }}</h4>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonial-section {
    padding: 2rem 0;
    text-align: center;
    background-color: #ffffff;
}

.testimonial-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
}

.testimonial-item {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.testimonial-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
}

.testimonial-text {
    font-style: italic;
    color: #666666;
}

.testimonial-name {
    font-weight: bold;
    margin-top: 0.5rem;
}

@media (min-width: 768px) {
    .testimonial-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>