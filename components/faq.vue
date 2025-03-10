<template>
    <section class="faq">
        <div class="faq-container">
            <div class="faq-header">Frequently Asked Question (FAQ)</div>
            <div class="faq-subheader">
                নীচে আমাদের প্রায়শই জিজ্ঞাসিত প্রশ্নগুলো দেওয়া হয়েছে, আপনি যদি আপনার প্রশ্নের উত্তর না পান তবে আমাদের সাথে যোগাযোগ করুন
            </div>

            <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
                <input type="checkbox" :id="'faq' + index" v-model="item.isChecked">
                <label class="faq-question" :for="'faq' + index">{{ item.question }}</label>
                <div class="faq-answer" v-show="item.isChecked">
                    {{ item.answer }}
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FAQItem {
    question: string;
    answer: string;
    isChecked: boolean;
}

// List of FAQ items
const faqItems = ref<FAQItem[]>([
    { question: 'What is Moon Seed?', answer: 'Moon Seed is a natural supplement designed to support blood sugar management and overall wellness.', isChecked: false },
    { question: 'Who can use Moon Seed?', answer: 'Anyone looking for natural blood sugar management and overall wellness can use Moon Seed. However, if you have any medical conditions, consult your doctor before use.', isChecked: false },
    { question: 'Is Moon Seed 100% natural?', answer: 'Yes, Moon Seed is made from 100% natural ingredients, carefully sourced for quality and effectiveness.', isChecked: false },
    { question: 'How does Moon Seed help with blood sugar levels?', answer: 'Moon Seed contains natural compounds that help regulate blood sugar levels by improving insulin sensitivity and supporting metabolic health.', isChecked: false },
    { question: 'How should I take Moon Seed?', answer: 'Follow the dosage instructions on the packaging or consult your healthcare provider for personalized advice.', isChecked: false },
    { question: 'How long does it take to see results?', answer: 'Results may vary, but most users notice improvements within a few weeks of consistent use.', isChecked: false },
    { question: 'Does Moon Seed have any side effects?', answer: 'Moon Seed is generally well-tolerated, but if you experience any adverse effects, discontinue use and consult a doctor.', isChecked: false },
    { question: 'How should I store Moon Seed?', answer: 'Store Moon Seed in a cool, dry place away from direct sunlight to maintain its potency.', isChecked: false },
    { question: 'Where can I buy Moon Seed?', answer: 'Moon Seed is available on our official website and select authorized retailers.', isChecked: false },
    { question: 'Do you offer home delivery?', answer: 'Yes, we offer home delivery to most locations. Check our website for shipping details.', isChecked: false },
]);

</script>

<style scoped>
.faq-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
}

.faq-header {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.faq-subheader {
    font-size: 14px;
    color: #006633;
    text-align: center;
    margin-bottom: 40px;
}

.faq-item {
    background: #f5f5f5;
    margin-bottom: 10px;
    position: relative;
}

.faq-question {
    padding: 20px 30px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    position: relative;
    display: flex;
    border-left: 4px solid #00cc66;
}

.faq-question::after {
    content: '+';
    position: absolute;
    right: 30px;
    font-size: 20px;
    color: #00cc66;
    transition: transform 0.5s ease-in-out;
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    padding: 0 20px;
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    background: #f5f5f5;
    transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item input[type="checkbox"] {
    display: none;
}

.faq-item input[type="checkbox"]:checked + .faq-question::after {
    content: '−';
}

.faq-item input[type="checkbox"]:checked ~ .faq-answer {
    max-height: 200px;
    padding: 15px 20px;
    border: 1px solid #c9c9c9;
}

.faq-item {
    transition: margin-bottom 0.3s ease-in-out;
}
</style>
