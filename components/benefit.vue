<template>
  <section class="container">
    <h1 class="title">BENEFITS</h1>
    <div class="benefits-grid">
      <div v-for="benefit in benefits" :key="benefit.id" class="benefit-card" :class="`card-${benefit.id}`">
        <div class="text-content">
          <h2>{{ benefit.title }}</h2>
          <p>{{ benefit.description }}</p>
        </div>
        <img :src="benefit.image" :alt="`${benefit.title} Icon`" class="benefit-icon" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

interface Benefit {
  id: number;
  title: string;
  description: string;
  image: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Maintains Blood Sugar',
    description: 'Helps regulate blood sugar levels naturally with a blend of organic and herbal ingredients. Supports glucose metabolism and improves insulin response for better balance. Promotes health and well-being.',
    image: 'https://media.istockphoto.com/id/491965869/photo/woman-doing-blood-sugar-test.jpg?s=612x612&w=0&k=20&c=gC9xmTjGtB7M9HbCv1_bRkMOsR_dmcycDEH5ioDEp8Q=',
  },
  {
    id: 2,
    title: 'Supports Heart Health',
    description: 'Helps improve blood circulation, regulate cholesterol and blood pressure, and support overall cardiovascular function. Rich in antioxidants and anti-inflammatory compounds, it reduces oxidative stress for a stronger, healthier heart.',
    image: 'https://ihurtdoc.com/wp-content/uploads/2021/12/How-Chiropractic-Care-Can-Support-Cardiovascular-Health.jpg',
  },
  {
    id: 3,
    title: '100% Herbal Ingredients',
    description: 'Made from pure, organic herbs, free from artificial chemicals, preservatives, or additives. Each ingredient is carefully chosen for its natural healing properties, offering a safe and effective holistic wellness solution.',
    image: 'https://img.freepik.com/free-vector/pure-natural-ingredients-green-label-with-leaves_1017-33237.jpg',
  },
  {
    id: 4,
    title: 'No Side Effects',
    description: 'Crafted with plant-based, chemical-free ingredients, making it safe for daily use. Works to support blood sugar balance, heart health, and metabolism without harmful effects.',
    image: 'https://pankajakasthuri.in/cdn/shop/files/PK_WEBSITE_PRODUCT_1_47f12778-479c-45c5-8539-ded593f6f1a1.webp?v=1729860627',
  },
];
</script>

<style scoped>
.container {
  width: 100%;
  text-align: center;
  padding: 1.2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-transform: uppercase;
  padding: 2rem;
  padding-top: 5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.benefit-card {
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 300px;
}

.text-content {
  flex: 1;
  text-align: left;
}

.benefit-card h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.benefit-card p {
  font-size: 1rem;
  line-height: 1.5;
}

.benefit-icon {
  width: 80px;
  height: 80px;
  margin-left: 20px;
}

/* Gradient backgrounds for each card */
.card-1 {
  background: linear-gradient(135deg, #5a1a2b 0%, #8b3a4b 100%);
}

.card-2 {
  background: linear-gradient(135deg, #1a2b5a 0%, #3a4b8b 100%);
}

.card-3 {
  background: linear-gradient(135deg, #2b5a1a 0%, #4b8b3a 100%);
}

.card-4 {
  background: linear-gradient(135deg, #4a1a5a 0%, #7a3a8b 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    min-height: 200px;
    padding: 20px;
  }

  .benefit-card h2 {
    font-size: 1.3rem;
  }

  .benefit-card p {
    font-size: 0.9rem;
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
    margin-left: 15px;
  }
}
</style>