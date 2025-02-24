<template>
  <div ref="myDiv" @click="handleDivClick">
    MY DIV CXONTENT
    <!-- Your content -->
    <span class="hide">Hidden content</span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';


definePageMeta({
  middleware: 'authenticated'
});

export default {
  setup() {
    const myDiv = ref<HTMLElement | null>(null);

    const handleDivClick = (event: MouseEvent) => {
      event.stopPropagation();
      console.log("Clicked inside the div");
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (myDiv.value && !myDiv.value.contains(event.target as Node)) {
        console.log("Clicked outside the div");
        return true;
      }
      return false;
    };


    onMounted(() => {
      document.addEventListener('click', handleDocumentClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleDocumentClick);
    });

    return {
      myDiv,
      handleDivClick
    };
  }
};
</script>

<style scoped>
/* Your styles */
</style>
