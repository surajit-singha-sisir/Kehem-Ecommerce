<template>
    <div>
        <h1>Order: {{ route.params.key }}</h1>

        <order />
    </div>
</template>

<script setup>
const route = useRoute();
console.log(route.params.key);
</script>