<template>
    <section class="pad-tb--20">
        <span class="text--m star">Dosages</span><br><br>
        <textarea class="summernote" name="dosage" id="dosages"></textarea>
    </section>
</template>
<script setup>


onMounted(() => {
    $('#dosages').summernote({

        placeholder: 'Add Dosages',
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