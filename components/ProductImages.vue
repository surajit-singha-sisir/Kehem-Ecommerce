<template>
    <section class="e-productImage">
        <span class="text--m productImagesTitle">Product Images
            <span class="star">({{ previewImages.length }}/5)</span>
        </span>

        <div class="pad--20 m-tb--10 fileInputBox">
            <input type="file" id="dragAndDropFile" accept=".jpg, .jpeg" @change="handleFileUpload" ref="fileInput"
                :disabled="previewImages.length >= 5" />
            <p class="uploadOrDragImage">Upload or Drag Image</p>
        </div>

        <div class="dragable-image-container gap-10">
            <span v-for="(image, index) in previewImages" :key="index" class="preview-img-container"
                @dragover="handleDragOver" @drop="handleDrop($event, index)">

                <div v-if="image.loading" class="loader"></div>

                <img v-if="!image.loading" :src="image.src" :target-id="getId[index].id" class="draggable"
                    draggable="true" @dragstart="handleDragStart($event, index)" />
                <span class="delete-icon" @click="deleteImage(getId[index].id, index)" aria-label="Delete Image">
                    <i class="m-cross1"></i>
                </span>
            </span>
        </div>

    </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();
const accessToken = useCookie<string | null>('access');

interface ImageResponse {
    value: {
        id: number,
        image: string;
    };
}

const previewImages = ref<{ src: string; loading: boolean }[]>([]);
const getId = ref<{ id: number }[]>([]);
const productImages = ref<File[]>([]);

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target?.files;

    if (!files) return;

    const remainingSlots = 5 - previewImages.value.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
        for (let i = 0; i < filesToAdd.length; i++) {
            const file = filesToAdd[i];
            const blobUrl = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobUrl;

            previewImages.value.push({ src: blobUrl, loading: true });
            productImages.value.push(file);

            img.onload = async () => {
                toast.success("Image added");

                try {
                    const formData = new FormData();
                    formData.append('image', file);

                    const response = await useFetch('http://192.168.0.111:3000/api/image_add', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken.value ?? ''}`,
                        },
                        body: formData,
                    });

                    if (response && response.data) {
                        const imageResponse = response.data as ImageResponse;
                        console.log(imageResponse.value);

                        const imageUrl = `http://192.168.0.111:3000${imageResponse.value.image}`;
                        const lastIndex = previewImages.value.length - 1;
                        previewImages.value[lastIndex].src = imageUrl;
                        previewImages.value[lastIndex].loading = false;
                        getId.value[lastIndex] = { id: imageResponse.value.id };
                    }

                } catch (error) {
                    toast.error("Failed to upload image to the server");
                    console.error("Upload error:", error);
                }
            };

            img.onerror = () => {
                toast.error("Failed to load image");
            };
        }
    }

    if (files.length > remainingSlots) {
        toast.warning(`Allow max 5 images. Last ${files.length - remainingSlots} images not included`);
    }
};

const deleteImage = async (id: number, index: number) => {
    try {
        const url = `http://192.168.0.111:3000/api/image_delete/${id}`;

        const { data: response, status } = await useFetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
        });

        if (status.value === 'success') {
            toast.success("Image deleted successfully");
            previewImages.value.splice(index, 1);
            productImages.value.splice(index, 1);
            getId.value.splice(index, 1);
            console.log("Image removed from arrays", productImages.value);
        } else {
            toast.error("Failed to delete image from server");
            console.error("Delete error:", response);
        }
    } catch (error) {
        toast.error("Error deleting image");
        console.error("Error:", error);
    }
};


const handleDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer?.setData('index', String(index));
};

const handleDrop = (e: DragEvent, index: number) => {
    const fromIndex = Number(e.dataTransfer?.getData('index'));
    if (fromIndex !== index) {
        const movedItem = previewImages.value[fromIndex];
        previewImages.value.splice(fromIndex, 1);
        previewImages.value.splice(index, 0, movedItem);

        const movedFile = productImages.value[fromIndex];
        productImages.value.splice(fromIndex, 1);
        productImages.value.splice(index, 0, movedFile);
    }
};

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
};

onUnmounted(() => {
    previewImages.value.forEach((image) => {
        URL.revokeObjectURL(image.src);
    });
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
