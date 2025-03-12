<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-subheader">
      নীচে আমাদের প্রায়শই জিজ্ঞাসিত প্রশ্নগুলো দেওয়া হয়েছে, আপনি যদি আপনার প্রশ্নের উত্তর না পান তবে আমাদের সাথে
      যোগাযোগ করুন
    </div>
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <div class="faq-question" @click="toggleFAQ(index)">
        <span>{{ faq.question }}</span>
        <span class="toggle-icon">{{ activeIndex === index ? '-' : '+' }}</span>
      </div>
      <transition name="smooth-slide">
        <div v-if="activeIndex === index" class="faq-answer">
          {{ faq.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  { question: "What is Moon Seed?", answer: "Moon Seed is a natural supplement designed to support blood sugar management and overall wellness." },
  { question: "Who can use Moon Seed?", answer: "Anyone looking for natural blood sugar management and overall wellness can use Moon Seed. However, if you have any medical conditions, consult your doctor before use." },
  { question: "Is Moon Seed 100% natural?", answer: "Yes, Moon Seed is made from 100% natural ingredients, carefully sourced for quality and effectiveness." },
  { question: "How does Moon Seed help with blood sugar levels?", answer: "Moon Seed contains natural compounds that help regulate blood sugar levels by improving insulin sensitivity and supporting metabolic health." },
  { question: "How should I take Moon Seed?", answer: "Follow the dosage instructions on the packaging or consult your healthcare provider for personalized advice." },
  { question: "How long does it take to see results?", answer: "Results may vary, but most users notice improvements within a few weeks of consistent use." },
  { question: "Does Moon Seed have any side effects?", answer: "Moon Seed is generally well-tolerated, but if you experience any adverse effects, discontinue use and consult a doctor." },
  { question: "How should I store Moon Seed?", answer: "Store Moon Seed in a cool, dry place away from direct sunlight to maintain its potency." },
  { question: "Where can I buy Moon Seed?", answer: "Moon Seed is available on our official website and select authorized retailers." },
  { question: "Do you offer home delivery?", answer: "Yes, we offer home delivery to most locations. Check our website for shipping details." },
])

const activeIndex = ref(null)

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 20px;
}

.faq-subheader {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.faq-item {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  font-weight: bold;
  color: #388e3c;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background-color: #f1f8e9;
}

.toggle-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #388e3c;
}

.faq-answer {
  padding: 15px;
  color: #555;
  background-color: #fff;
  overflow: hidden;
}

.smooth-slide-enter-active,
.smooth-slide-leave-active {
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;
}

.smooth-slide-enter-from,
.smooth-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.smooth-slide-enter-to,
.smooth-slide-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>