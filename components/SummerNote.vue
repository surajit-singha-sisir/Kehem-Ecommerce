<template>
  <section class="summernote">
    <span class="text--m star">Description</span><br><br>
    <textarea class="summernote" name="description" id="summernote"></textarea>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// Define props and assign them to a variable
const props = defineProps<{
  modelValue?: string // For v-model support
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void // Emit for v-model
}>()

// Declare global jQuery types
declare global {
  interface Window {
    $: any
    jQuery: any
  }
}

// Use Nuxt's useHead to load external scripts and styles
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

// Define Summernote toolbar tuple type
type ToolbarGroup = [string, string[]]

// Define Summernote options interface
interface SummernoteOptions {
  placeholder: string
  tabsize: number
  height: number
  toolbar: ToolbarGroup[]
}

// Reactive value for the Summernote content
const content = ref<string>(
  'This is the default text that will appear in the Summernote editor.'
)

// Initialize Summernote
onMounted(() => {
  const initializeSummernote = () => {
    if (window.$ && window.$.summernote) {
      const options: SummernoteOptions = {
        placeholder: '1. Introduction <br><br> 2. Describe your product<br><br> <i>Add your product Images and Text Sizes to get Notice ',
        tabsize: 2,
        height: 200,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['picture']],
        ] as ToolbarGroup[],
      }

      // Initialize Summernote
      window.$('#summernote').summernote(options)

      // Set the initial content (use props.modelValue if provided, else fallback to default)
      window.$('#summernote').summernote('code', props.modelValue || content.value)

      // Listen for changes and emit updates
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

// Sync external modelValue changes with Summernote
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== content.value && window.$ && window.$.summernote) {
      window.$('#summernote').summernote('code', newValue || '')
      content.value = newValue || ''
    }
  }
)
</script>