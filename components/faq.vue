<template>
    <section class="faq">
      <div class="faq-container">
        <div class="faq-header">Frequently Asked Question (FAQ)</div>
        <div class="faq-subheader">
          নীচে আমাদের প্রায়শই জিজ্ঞাসিত প্রশ্নগুলো দেওয়া হয়েছে, আপনি যদি আপনার প্রশ্নের উত্তর না পান তবে আমাদের সাথে যোগাযোগ করুন
        </div>
  
        <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
          <label class="faq-question" @click="toggleFaq(index)">
            {{ item.question }}
            <span class="faq-icon">{{ activeIndex === index ? '−' : '+' }}</span>
          </label>
          
          <!-- Transition for smooth opening and closing -->
          <Transition name="slide-fade">
            <div v-if="activeIndex === index" class="faq-answer">
              {{ item.answer }}
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // FAQ Data
  const faqItems = ref([
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
  ]);
  
  // Track active question
  const activeIndex = ref<number | null>(null);
  
  // Toggle function for opening and closing FAQ
  const toggleFaq = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };
  </script>
  
  <style scoped>
  .faq {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
  }
  
  .faq-container {
    max-width: 800px;
    width: 100%;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 4px solid #00cc66;
  }
  
  .faq-icon {
    font-size: 20px;
    color: #00cc66;
    transition: transform 0.3s ease-in-out;
  }
  
  .faq-answer {
    padding: 15px 30px;
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    background: #f5f5f5;
    border: 1px solid #c9c9c9;
  }
  
  /* Vue Transition for Smooth Opening and Closing */
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: max-height 0.5s ease-out, opacity 0.5s ease;
    overflow: hidden;
  }
  
  .slide-fade-enter-from, .slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
  }
  
  .slide-fade-enter-to, .slide-fade-leave-from {
    max-height: 150px; /* Adjust based on content */
    opacity: 1;
  }


  /* Make width 95% on small screens */
@media (max-width: 768px) {
  .faq-container {
    width: 95%;
  }
}
  </style>
  