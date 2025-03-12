<template>
    <div>
        <h1>Order: {{ route.params.key }}</h1>
    </div>
</template>

<script setup>
const route = useRoute();
console.log(route.params.key); // Logs the value of "key" from the URL
</script>