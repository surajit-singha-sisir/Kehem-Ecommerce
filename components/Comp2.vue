<script setup lang="ts">
import { defineProps, watch, ref } from 'vue';

interface Props {
    getInput: string;
}

const props = defineProps < Props > ();
const updatedValue = ref(props.getInput);

// Watch for changes in getInput
watch(() => props.getInput, (newValue) => {
    updatedValue.value = newValue;
    console.log('Input changed in Comp2:', newValue);
});
</script>

<template>
    <p>Received Input: {{ updatedValue }}</p>
</template>
