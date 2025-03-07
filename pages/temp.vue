<template>
  <div class="container">
    <h1>Select a Time</h1>
    <AnalogTimePicker v-model="selectedTime" />
    <p>Selected Time: {{ selectedTime ? selectedTime.toLocaleTimeString() : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedTime = ref<Date | null>(null);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 24px;
  color: #1e3a8a;
  margin-bottom: 20px;
}

p {
  margin-top: 20px;
  font-size: 16px;
  color: #27272a;
}
</style>