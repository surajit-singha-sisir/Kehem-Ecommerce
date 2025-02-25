<script setup lang="ts">
// definePageMeta({
//   middleware: 'authenticated',
// });


import { useCookie } from 'nuxt/app'

const accessToken = useCookie<string | null>('access');

// const products = await $fetch<{ message: string }>('http://192.168.0.111:3000/api/home', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${accessToken.value ?? ''}`
//   }
// });

</script>



<template>
    <section>
        <NuxtLink to="/k-admin/add-product/" class="btn btn-primary">Add Product</NuxtLink>
    </section>
</template>



<style lang="scss"></style>