<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated'
});

import { useCookie } from 'nuxt/app'

const accessToken = useCookie<string | null>('access');

const products = await $fetch<{ message: string }>('http://192.168.0.111:3000/api/home', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken.value ?? ''}`
  }
});



</script>



<template>
  <section>
    <NavBar />
    <!-- MAIN STARTED -->
    <main class="main bg" id="main">

      <Main1 />
      {{ products.message }}
    </main>
  </section>
</template>



<style lang="scss"></style>