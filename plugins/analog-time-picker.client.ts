import { defineNuxtPlugin } from '#app';
import AnalogTimePicker from '~/components/AnalogTimePicker.vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('AnalogTimePicker', AnalogTimePicker);
});

