<template>
    <section class="summernote">
        <span class="text--m star">Description</span><br><br>
        <textarea class="summernote" name="summerNote" id="summernote"></textarea>
    </section>
</template>
<script setup>

useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css",
        },
    ],
    script: [
        {
            src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
            integrity:
                "sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n",
            crossorigin: "anonymous",
            defer: true,
        },
        {
            src: "https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js",
            defer: true,
        },
    ],
});

onMounted(() => {
    $('#summernote').summernote({

        placeholder: '1. Introduction <br><br> 2. Describe your product<br><br> <i>Add your product Images and Text Sizes to get Notice ',
        tabsize: 2,
        height: 200,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            // ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['table', ['table']],
            ['insert', ['picture']],
            // ['view', ['codeview']]
        ]
    });
})
</script>