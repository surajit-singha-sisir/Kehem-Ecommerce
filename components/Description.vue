<template>
  <section class="summernote">
    <span class="text--m star">Description</span><br><br>
    <textarea class="summernote" name="description" id="summernote" required></textarea>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

declare global {
  interface Window {
    $: any
    jQuery: any
  }
}

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
      integrity: "sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n",
      crossorigin: "anonymous",
      defer: true,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js",
      defer: true,
    },
  ],
})

type ToolbarGroup = [string, string[]]

interface SummernoteOptions {
  placeholder: string
  tabsize: number
  height: number
  toolbar: ToolbarGroup[]
}

const content = ref<string>('')

onMounted(() => {
  const initializeSummernote = () => {
    if (window.$ && window.$.summernote) {
      const options: SummernoteOptions = {
        placeholder: 'Describe your product',
        tabsize: 2,
        height: 200,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['picture']],
        ] as ToolbarGroup[],
      }

      window.$('#summernote').summernote(options)

      const initialContent = props.modelValue || content.value
      window.$('#summernote').summernote('code', initialContent)
      content.value = initialContent

      window.$('#summernote').on('summernote.change', (we: any, contents: string) => {
        content.value = contents
        emit('update:modelValue', contents)
      })
    } else {
      setTimeout(initializeSummernote, 100)
    }
  }

  initializeSummernote()
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== content.value && window.$ && window.$.summernote) {
      window.$('#summernote').summernote('code', newValue || '')
      content.value = newValue || ''
    }
  }
)

onUnmounted(() => {
  if (window.$ && window.$.summernote) {
    window.$('#summernote').summernote('destroy')
  }
})
</script>
