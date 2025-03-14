<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-subheader">
      নীচে আমাদের প্রায়শই জিজ্ঞাসিত প্রশ্নগুলো দেওয়া হয়েছে, আপনি যদি আপনার প্রশ্নের উত্তর না পান তবে আমাদের সাথে
      যোগাযোগ করুন
    </div>
    <div v-if="isLoading" class="loading">Loading FAQs...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else v-for="(faq, index) in faqs" :key="faq.id" class="faq-item">
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
import { ref, onMounted } from 'vue'
const faqs = ref([]);
const activeIndex = ref(null);
const isLoading = ref(false);
const error = ref(null);

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const fetchFAQs = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const { data, status, error: fetchError } = await useFetch(
      'http://192.168.0.111:3000/api/faqs',
      {
        method: 'GET',
      }
    );

    if (status.value === 'success' && data.value) {
      faqs.value = data.value;
    } else {
      throw new Error(fetchError.value?.message || 'Failed to fetch FAQs');
    }
  } catch (err) {
    error.value = 'Error loading FAQs. Please try again later.';
    console.error('FAQ fetch error:', err);
    toast.error('Failed to load FAQs');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchFAQs();
});
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