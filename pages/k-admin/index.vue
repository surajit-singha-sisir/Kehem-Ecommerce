<template></template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: () => {
    const router = useRouter();
    return router.push('/k-admin/dashboard');
  }
});
</script>
