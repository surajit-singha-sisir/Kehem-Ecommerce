<template>
  <section class="pad-tb--20">
    <span class="text--m star">Dosages</span><br><br>
    <textarea class="summernote" name="dosage" id="dosages"></textarea>
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

// Use Nuxt's useHead to load external scripts and styles (remove if already defined globally)
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

// Reactive value for the Summernote content with a default text
const content = ref<string>(
  'This is the default dosage information for your product.'
)

// Initialize Summernote
onMounted(() => {
  const initializeSummernote = () => {
    if (window.$ && window.$.summernote) {
      const options: SummernoteOptions = {
        placeholder: 'Add Dosages',
        tabsize: 2,
        height: 200,
        toolbar: [
          ['font', ['bold', 'underline', 'clear']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['picture']],
        ] as ToolbarGroup[],
      }

      // Initialize Summernote
      window.$('#dosages').summernote(options)

      // Set the initial content (use props.modelValue if provided, else fallback to default)
      window.$('#dosages').summernote('code', props.modelValue || content.value)

      // Listen for changes and emit updates
      window.$('#dosages').on('summernote.change', (we: any, contents: string) => {
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
      window.$('#dosages').summernote('code', newValue || '')
      content.value = newValue || ''
    }
  }
)
</script>