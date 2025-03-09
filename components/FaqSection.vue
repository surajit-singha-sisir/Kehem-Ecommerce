<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    faqs: { id: number; question: string; answer: string }[];
}>();

const activeFaq = ref<number | null>(null);

const toggleFaq = (id: number) => {
    activeFaq.value = activeFaq.value === id ? null : id;
};
</script>

<template>
    <section class="faq-section">
        <div class="container">
            <h2 class="section-title">Frequently Ask Question (FAQ)</h2>
            <div class="faq-list">
                <div v-for="faq in faqs" :key="faq.id" class="faq-item">
                    <button @click="toggleFaq(faq.id)" class="faq-question">
                        {{ faq.question }}
                        <span>{{ activeFaq === faq.id ? '-' : '+' }}</span>
                    </button>
                    <div v-if="activeFaq === faq.id" class="faq-answer">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.faq-section {
    padding: 2rem 0;
    background-color: #f5f5f5;
}

.faq-list {
    max-width: 600px;
    margin: 0 auto;
}

.faq-item {
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem 0;
}

.faq-question {
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

.faq-answer {
    margin-top: 0.5rem;
    color: #666666;
    padding: 0 0.5rem;
}
</style>