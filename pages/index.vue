<template>
    <section>
        <NavBar />
        <!-- MAIN STARTED -->
        <main class="main bg" id="main">

            <Main1 />
        </main>
    </section>
</template>

<script setup>
definePageMeta({
  middleware: 'authenticated'
});
</script>


<style lang="scss"></style>