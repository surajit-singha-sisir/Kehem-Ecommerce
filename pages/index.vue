<template>
  <main class="">


    <HeroSlider />









    <!-- Trusted Section -->
    <!-- <section class="trusted-section">
      <div class="container">
        <h2 class="section-title">Trusted by over 10,000 Customers</h2>
        <p class="section-subtitle">Worldwide sales since 2000 | 4.8 Rating | 10K+ year sales</p>
      </div>
    </section> -->

    <!-- Shop Section -->
    <!-- <section class="shop-section">
      <div class="container">
        <h2 class="section-title">SHOP</h2>
        <ProductGrid :products="products" />
      </div>
    </section> -->
    <benefit />
  <order />
    <banner2 />
    <Faq />
    <!-- Features Section -->
    <!-- <section class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <img src="https://via.placeholder.com/50" alt="Certified Organic" class="feature-icon" />
            <h3 class="feature-title">Certified Organic Ingredients</h3>
          </div>
          <div class="feature-item">
            <img src="https://via.placeholder.com/50" alt="Clinically Verified" class="feature-icon" />
            <h3 class="feature-title">Clinically Verified Bio-Active Benefits</h3>
          </div>
          <div class="feature-item">
            <img src="https://via.placeholder.com/50" alt="100% Natural" class="feature-icon" />
            <h3 class="feature-title">100% Natural & Safe</h3>
          </div>
          <div class="feature-item">
            <img src="https://via.placeholder.com/50" alt="Holistic Health" class="feature-icon" />
            <h3 class="feature-title">Holistic Health Support</h3>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Testimonial Section -->
    <!-- <TestimonialSection :testimonials="testimonials" /> -->

    <!-- FAQ Section -->
    <!-- <FaqSection :faqs="faqs" /> -->

    <!-- Footer -->
    <Footer />
  </main>
</template>

<script setup lang="ts">

// const products = [
//   { id: 1, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
//   { id: 2, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
//   { id: 3, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
//   { id: 4, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
//   { id: 5, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
//   { id: 6, name: 'Moonseed', price: 'Tk 300 - Tk 500', image: 'https://via.placeholder.com/150' },
// ];

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


<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #333333;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 0;
}

.trusted-section {
  background-color: #2e7d32;
  color: #ffffff;
  padding: 2rem 0;
}

.shop-section {
  padding: 2rem 0;
  text-align: center;
}

.features-section {
  padding: 2rem 0;
  background-color: #f5f5f5;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.feature-item {
  text-align: center;
}

.feature-icon {
  display: block;
  margin: 0 auto 0.5rem;
}

.feature-title {
  font-size: 1rem;
  font-weight: bold;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>