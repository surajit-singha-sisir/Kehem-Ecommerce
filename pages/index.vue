<script setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter } from '#app';

const auth = useAuthStore();
const router = useRouter();

if (!auth.isAuthenticated) {
  router.push('/login');  // Redirect to login if the user is not authenticated
}

</script>


<template>
    <section>
        <NavBar />
        <!-- MAIN STARTED -->
        <main class="main bg" id="main">

            <Main1 />
        </main>
    </section>
</template>

<!-- <script setup>
definePageMeta({
  middleware: 'authenticated'
});
</script> -->


<style lang="scss"></style>