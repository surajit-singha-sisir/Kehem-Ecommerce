<script setup lang="ts">
import { useToast } from 'vue-toastification'

const toast = useToast()

const showToast = () => {
  toast.success('Category added successfully!')
}
</script>

<template>
  <button @click="showToast">Show Toast</button>
</template>
