// plugins/history.ts
export default defineNuxtPlugin((nuxtApp) => {
    const goBack = () => {
        window.history.back();
    };

    const goForward = () => {
        window.history.forward();
    };

    // Provide the methods globally
    nuxtApp.provide('goBack', goBack);
    nuxtApp.provide('goForward', goForward);
});
