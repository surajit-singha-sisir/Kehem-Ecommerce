<template>
  <div>
    <section class="section-1">
      <h2>Section 1</h2>
      <draggable v-model="section1Items" :group="'items'" item-key="id" class="draggable-list" @start="onDragStart"
        @end="onDragEnd" @change="onChange" :ghost-class="'ghost'" :chosen-class="'chosen'">
        <template #item="{ element }">
          <div class="draggable-item"
            :class="{ 'last-dragged': lastDraggedId === element.id }">
            <div class="drag-handle">
              <span>::</span>
            </div>
            <span>{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </section>

    <section class="section-2">
      <h2>Section 2</h2>
      <draggable v-model="section2Items" :group="'items'" item-key="id" class="draggable-list" @start="onDragStart"
        @end="onDragEnd" @change="onChange" :ghost-class="'ghost'" :chosen-class="'chosen'">
        <template #item="{ element }">
          <div class="draggable-item"
            :class="{ 'last-dragged': lastDraggedId === element.id }">
            <div class="drag-handle">
              <span>::</span>
            </div>
            <span>{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </section>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';

interface Item {
  id: number;
  name: string;
}

const section1Items = ref<Item[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
]);

const section2Items = ref<Item[]>([
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
]);

const dragging = ref(false);
const lastDraggedId = ref<number | null>(null); // Store last dragged item ID

const onDragStart = (event: any) => {
  dragging.value = true;
  lastDraggedId.value = event.item.__draggable_context.element.id; // Store the ID of the dragged item
};

const onDragEnd = () => {
  dragging.value = false;

  // Keep the highlight for 1 second
  setTimeout(() => {
    lastDraggedId.value = null;
  }, 1000);
};

const onChange = (event: any) => {
  console.log('Items reordered', event);
};
</script>


<style scoped>

.draggable-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #d93232;
  border-radius: 5px;
  cursor: grab;
  transition: all 0.3s ease;
}

.last-dragged {
  background-color: #ffeb3b; /* Highlight yellow */
  border-color: #ff9800; /* Orange border */
  transition: background-color 1s ease, border-color 1s ease;
}




.section-1,
.section-2 {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.draggable-list {
  list-style: none;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
}

.draggable-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: grab;
  transition: all 0.3s ease;
}

.drag-handle {
  margin-right: 10px;
  cursor: grab;
  user-select: none;
  transition: all 0.3s ease;
}

.drag-handle:hover {
  color: #007bff;
  transition: all 0.3s ease;
}

.ghost {
  background-color: #007bff;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.chosen {
  background-color: #bfbfbf;
  transition: all 0.3s ease;
}

.draggable-item:nth-child(n + 1) {
  transition: all 0.3s ease;
}
</style>
