<template>
  <div>


    <HeroSlider />
    <TrustedSection />
    <ProductList />

    <banner2 />
    <Testimonials />
    <Faq />
  </div>
</template>

<script setup lang="ts">


const testimonials = [
  {
    id: 1,
    name: 'Shamim Akter',
    text: 'I have been using Moonseed for a few weeks and it improved significantly. It’s an all-natural solution that truly works!',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'Md. Rafiqul Islam',
    text: 'Finally, a herbal supplement that actually delivers! My energy levels are better and overall wellness can use Moonseed. However, you',
    image: 'https://via.placeholder.com/50',
  },
];

// Dummy data for FAQs
const faqs = [
  { id: 1, question: 'What is Moonseed?', answer: 'Moonseed is a natural diabetic care product.' },
  { id: 2, question: 'Who can use Moonseed?', answer: 'Anyone looking for natural blood sugar management.' },
  { id: 3, question: 'Is Moonseed 100% natural?', answer: 'Yes, it is made from certified organic ingredients.' },
  { id: 4, question: 'How does Moonseed help with blood sugar levels?', answer: 'It supports healthy blood sugar levels naturally.' },
  { id: 5, question: 'How should I take Moonseed?', answer: 'Follow the dosage instructions provided.' },
  { id: 6, question: 'How long does it take to see results?', answer: 'Results may vary, typically within a few weeks.' },
  { id: 7, question: 'Does Moonseed have any side effects?', answer: 'No major side effects, consult a doctor if needed.' },
  { id: 8, question: 'Where can I buy Moonseed?', answer: 'Available on our website or authorized stores.' },
  { id: 9, question: 'Do you offer home delivery?', answer: 'Yes, we offer home delivery options.' },
];

</script>
