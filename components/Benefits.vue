<template>
    <section class="pad-tb--20">
        <span class="text--m star">Benefits</span><br><br>
        <textarea class="summernote" name="summerNote" id="benefits"></textarea>
    </section>
</template>
<script setup>


onMounted(() => {
    $('#benefits').summernote({

        placeholder: 'Add Product Benefits',
        tabsize: 2,
        height: 200,
        toolbar: [
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['picture']],
        ]
    });
})
</script>