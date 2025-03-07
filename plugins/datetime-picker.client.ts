import { defineNuxtPlugin } from '#app';
import DateTimePicker from '@/components/DateTimePicker.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DateTimePicker', DateTimePicker);
});