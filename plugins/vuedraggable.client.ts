// plugins/vuedraggable.client.ts
import { defineNuxtPlugin } from '#app';
import draggable from 'vuedraggable';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('draggable', draggable);
});
