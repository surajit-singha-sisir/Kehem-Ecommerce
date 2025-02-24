<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';



// const id = router.param.id;

const router = useRouter();
const authStore = useAuthStore();

const credentials = ref({
    username: '',
    password: ''
});

const errorMessage = ref('');

const login = async () => {
    try {
        const response = await fetch('http://192.168.0.111:3000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials.value),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Login failed');
        }

        // Save token in Pinia store
        authStore.setToken(data.access);
        console.log(authStore.token);

        // Redirect to home page
        if (authStore.token === data.access) {
            
            router.push('/');
        }
    } catch (error) {
        errorMessage.value = error.message;
    }
};


</script>

<template>
    <section class="w-100 h-vh-100 f-centered f-col gap-10">
        <h1>LOGIN</h1>
        <form @submit.prevent="login" class="f-centered f-wrap gap-10 w--200">
            <input v-model="credentials.username" type="text" placeholder="Username" required>
            <input v-model="credentials.password" type="password" placeholder="Password" required>
            <button type="submit" class="btn btn-primary">Submit</button>
            <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        </form>
    </section>
</template>

<style scoped>
.error-text {
    color: red;
    font-size: 14px;
}
</style>
