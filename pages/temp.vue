<template>
  <div class="input-group">
    <div class="input-group-prepend" :class="{ 'hide-prepend': buyPriceInput }">
      <div class="input-group-text">Main Price</div>
    </div>
    <input type="text" class="input-field" v-model="buyPriceInput" />
  </div>
</template>

<!-- <script setup lang="ts">
import { ref, watch } from 'vue';

const inputValue = ref('');
const prependVisible = ref(true);

// The style will be reactive based on focus state
const prependStyle = computed(() => ({
  opacity: prependVisible.value ? '1' : '0',
  visibility: prependVisible.value ? 'visible' : 'hidden',
  display: prependVisible.value ? 'flex' : 'none',
}));

const handleFocus = () => {
  prependVisible.value = false;  // Hide @ symbol when focused
};

const handleBlur = () => {
  if (!inputValue.value) {
    prependVisible.value = true;  // Show @ symbol if the input is empty
  }
};

// Optionally, watch the input value to trigger the visibility of the prepend
watch(inputValue, (newValue) => {
  if (!newValue) {
    prependVisible.value = true;  // Show @ symbol if input is empty
  }
});
</script> -->

<script setup lang="ts">
const buyPriceInput = ref('');

</script>
<style scoped>
.input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  transition: all 0.3s ease;

  .input-group-prepend {
    position: relative;
    display: flex;
    width: auto;
    align-items: center;
    padding: 12px 20px;
    overflow: hidden;
    transition: all 0.3s ease;

    .input-group-text {
      position: relative;
      width: 100%;
      text-wrap: nowrap;
      font-size: 16px;
      color: #333;
    }
  }

  .input-field {
    flex: 1;
    padding: 12px 20px;
    font-size: 16px;
    color: #333;
    width: 100%;
    border: none;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border: none;
      box-shadow: none;
      transition: all 0.3s ease;
    }

    &:hover {
      border: none;
      outline: none;
    }
  }

  &:focus-within .input-group-prepend {
    background-color: #e0e0e0;
    height: 100%;
    transition: all 0.3s ease;
  }

  .hide-prepend {
    position: absolute;
    transform: translateX(-100%);
    width: 0px !important;
    overflow: hidden;
  }
}
</style>