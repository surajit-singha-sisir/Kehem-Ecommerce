<template>
  <section class="e-productImage">
    <span class="text--m productImagesTitle">
      Product Images <span class="star">({{ previewImages.length }}/5)</span>
    </span>

    <div class="pad--20 m-tb--10 fileInputBox">
      <input type="file" id="dragAndDropFile" accept=".jpg, .jpeg" @change="handleFileUpload" ref="fileInput"
        :disabled="previewImages.length >= 5" />
      <p class="uploadOrDragImage">Upload or Drag Image</p>
    </div>

    <div class="dragable-image-container gap-10">
      <span v-for="(image, index) in previewImages" :key="image.id || index" class="preview-img-container"
        @dragover.prevent @drop="handleDrop($event, index)">
        <div v-if="image.loading" class="loader"></div>
        <NuxtImg v-else :src="image.src" class="draggable" draggable="true"
          @dragstart="handleDragStart($event, index)" />
        <span class="delete-icon" @click="deleteImage(image.id, index)" aria-label="Delete Image">
          <i class="m-cross1"></i>
        </span>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';
import { useToast } from 'vue-toastification';

defineProps<{
  images: string[]; // Changed from modelValue to images
}>();

const emit = defineEmits<{
  (e: 'update:images', value: string[]): void; // Changed to update:images
}>();

const toast = useToast();
const accessToken = useCookie<string | null>('access');
const fileInput = ref<HTMLInputElement | null>(null);

interface PreviewImage {
  id?: number;
  src: string;
  loading: boolean;
}

const previewImages = ref<PreviewImage[]>([]);
const productImages = ref<File[]>([]);

const uploadImageToServer = async (file: File): Promise<PreviewImage> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const { data, error } = await useFetch<{ id: number; image: string }>(
      'http://192.168.0.111:3000/api/image_add',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
        body: formData,
      }
    );

    if (error.value) {
      throw new Error(`Fetch error: ${error.value.message}`);
    }

    if (!data.value || typeof data.value.id === 'undefined' || !data.value.image) {
      throw new Error('Invalid server response');
    }

    const { id, image } = data.value;
    const imageUrl = `http://192.168.0.111:3000${image}`;
    return { id, src: imageUrl, loading: false };
  } catch (error) {
    toast.error('Failed to upload image to the server');
    throw error;
  }
};

const handleFileUpload = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const remainingSlots = 5 - previewImages.value.length;
  const filesToAdd = Array.from(files).slice(0, remainingSlots);

  if (filesToAdd.length === 0) return;

  for (const file of filesToAdd) {
    const blobUrl = URL.createObjectURL(file);
    const newImage: PreviewImage = { src: blobUrl, loading: true };
    const index = previewImages.value.push(newImage) - 1;
    productImages.value.push(file);

    try {
      const uploadedImage = await uploadImageToServer(file);
      previewImages.value[index] = uploadedImage;
      toast.success('Image added');
      emitImageUrls();
    } catch {
      previewImages.value.splice(index, 1);
      productImages.value.pop();
    }
  }

  if (files.length > remainingSlots) {
    toast.warning(`Allow max 5 images. Last ${files.length - remainingSlots} images not included`);
  }

  if (fileInput.value) fileInput.value.value = '';
};

const deleteImage = async (id: number | undefined, index: number) => {
  if (!id) {
    previewImages.value.splice(index, 1);
    productImages.value.splice(index, 1);
    toast.success('Image removed');
    emitImageUrls();
    return;
  }

  try {
    const { status } = await useFetch(
      `http://192.168.0.111:3000/api/image_delete/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
      }
    );

    if (status.value === 'success') {
      previewImages.value.splice(index, 1);
      productImages.value.splice(index, 1);
      toast.success('Image deleted successfully');
      emitImageUrls();
    } else {
      toast.error('Failed to delete image from server');
    }
  } catch (error) {
    toast.error('Error deleting image');
  }
};

const handleDragStart = (e: DragEvent, index: number) => {
  e.dataTransfer?.setData('index', String(index));
};

const handleDrop = (e: DragEvent, index: number) => {
  e.preventDefault();
  const fromIndex = Number(e.dataTransfer?.getData('index'));
  if (fromIndex === index || isNaN(fromIndex)) return;

  [previewImages.value[fromIndex], previewImages.value[index]] = [
    previewImages.value[index],
    previewImages.value[fromIndex],
  ];
  [productImages.value[fromIndex], productImages.value[index]] = [
    productImages.value[index],
    productImages.value[fromIndex],
  ];
  emitImageUrls();
};

const emitImageUrls = () => {
  const imageUrls = previewImages.value.map(image => image.src);
  emit('update:images', imageUrls); // Changed to update:images
};

watch(
  previewImages,
  () => {
    emitImageUrls();
  },
  { deep: true }
);

onUnmounted(() => {
  previewImages.value.forEach((image) => URL.revokeObjectURL(image.src));
});
</script>

<style scoped>
.delete-icon {
  position: absolute;
  top: -0.4rem;
  right: -0.3rem;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  z-index: 5;
}

.delete-icon:hover {
  color: #ffffff;

  &::after {
    content: '';
    position: absolute;
    right: 0.3rem;
    top: 0.4rem;
    width: 1.3rem;
    aspect-ratio: 1;
    background-color: red;
    z-index: -1;
  }
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #007bff;
}

.loader {
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}

@keyframes l5 {
  0% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #000
  }

  33% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #0002
  }

  66% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #0002
  }

  100% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #000
  }
}
</style>
