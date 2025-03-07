<script setup lang="ts">
interface Credentials {
    username: string;
    password: string;
}

const credentials = reactive<Credentials>({
    username: '',
    password: ''
});
const errorMessage = ref<string | null>(null);
const { updateLastActivity } = useAuth();

const login = async () => {
    try {
        errorMessage.value = null;
        const response = await $fetch<{ access: string; refresh: string }>('http://192.168.0.111:3000/api/token/', {
            method: 'POST',
            body: credentials
        });

        if (!response || !response.access || !response.refresh) {
            throw new Error('Invalid response from server');
        }

        const accessToken = useCookie<string | null>('access', { path: '/', secure: true, sameSite: 'strict', maxAge: 60 * 15 });
        const refreshToken = useCookie<string | null>('refresh', { path: '/', secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 30 });

        accessToken.value = response.access;
        refreshToken.value = response.refresh;
        updateLastActivity(); // Set initial activity timestamp

        await navigateTo('/k-admin/dashboard');
    } catch (error) {
        errorMessage.value = 'Invalid username or password. Please try again.';
    }
};
</script>

<template>
    <NuxtLoadingIndicator />
    <section class="w-100 h-vh-100 f-centered f-col gap-10">
        <h1>LOGIN</h1>
        <p v-if="errorMessage" class="Red">{{ errorMessage }}</p>
        <form @submit.prevent="login" class="f-centered f-wrap gap-10 w--200">
            <input v-model="credentials.username" type="text" placeholder="Username" required />
            <input v-model="credentials.password" type="password" placeholder="Password" required />
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </section>
</template>

<style scoped>
.error-text {
    color: red;
    font-size: 14px;
}
</style>