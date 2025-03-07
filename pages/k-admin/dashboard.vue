<script setup lang="ts">
import { useCookie } from 'nuxt/app'

const accessToken = useCookie<string | null>('access');


const goBack = () => {
    window.history.back();
};

const goForward = () => {
    window.history.forward();
};
// const products = await $fetch<{ message: string }>('http://192.168.0.111:3000/api/home', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${accessToken.value ?? ''}`
//   }
// });

</script>



<template>
    <section>
        <button class="btn btn-warning m--10" @click="goBack">Go Back</button>
        <button class="btn btn-happy m--10" @click="goForward">Go Forward</button> <br>
        <NuxtLink to="/k-admin/products/add-product/" class="btn btn-primary m--10">Add Product</NuxtLink>
    </section>
</template>



<style lang="scss"></style>