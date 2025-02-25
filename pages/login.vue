<script setup lang="ts">
import { useFetch } from '#app'
import { useCookie } from 'nuxt/app'
import { reactive } from 'vue'

interface Credentials {
    username: string
    password: string
}

const credentials = reactive<Credentials>({
    username: '',
    password: ''
})

const login = async () => {
    try {
        const response = await $fetch<{ access: string; refresh: string }>('http://192.168.0.111:3000/api/token/', {
            method: 'POST',
            body: credentials
        })

        if (!response) {
            throw new Error('Invalid response from server')
        }

        const accessToken = useCookie<string>('access', { path: '/', secure: true, sameSite: 'strict' })
        const refreshToken = useCookie<string>('refresh', { path: '/', secure: true, sameSite: 'strict' })

        accessToken.value = response.access
        refreshToken.value = response.refresh

        await navigateTo('/')
    } catch (error) {
        alert('Login failed. Please check your credentials.')
    }
}
</script>

<template>
    <section class="w-100 h-vh-100 f-centered f-col gap-10">
        <h1>LOGIN</h1>
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
