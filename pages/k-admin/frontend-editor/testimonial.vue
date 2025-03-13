<template>
    <section class="w-100 f-center-start f-col gap-10">
        <div class="f-start-center f-col gap-10 w-100">
            <h3>TESTIMONIALS</h3>
            <div v-if="isTestimonialAvailable" class="pad--10 w-100 f-center bordered dashed gap-10">
                <div v-for="(testimonial, index) in testimonials" :key="testimonial.id" class="testimonial">
                    <i @click="deleteRequest(index)" class="m-cross1 crossed"></i>
                    <div class="img-round w--50">
                        <NuxtImg :src="testimonial.image" />
                    </div>
                    <p>{{ testimonial.testimonial }}</p>
                    <h3>{{ testimonial.name }}</h3>
                    <span>{{ testimonial.designation }}</span>
                </div>
            </div>
            <span v-else>
                <h2>No data available...</h2>
            </span>
        </div>

        <aside class="w-100 f-center-start f-col gap-10">
            <div class="f-center-start w-100 gap-05 f-col">
                <label for="name">Customer Name</label>
                <input v-model="name" type="text" name="name" id="name" placeholder="Type the customer name">
            </div>
            <div class="f-center-start w-100 gap-05 f-col">
                <label for="designation">Designation</label>
                <input v-model="designation" type="text" name="designation" id="designation"
                    placeholder="Type the customer designation">
            </div>
            <div class="f-center-start w-100 gap-05 f-col">
                <label for="testimonial">Testimonial</label>
                <textarea v-model="testimonial" class="textarea" type="text" name="testimonial" id="testimonial"
                    placeholder="Type the customer testimonial"></textarea>
            </div>

            <div v-if="isUploaded" class="w-100 h-auto f-center gap-15">
                <div v-for="(image, index) in uploadedImages" :key="index" class="hero-slider-old">
                    <NuxtImg :src="image.url" />
                    <i @click="uploadedImages.splice(index, 1); if (uploadedImages.length === 0) isUploaded = false;"
                        class="m-cross1 rounded"></i>
                </div>
            </div>

            <div class="f-center-start w-100 gap-05 f-col">
                <label for="banner">Upload Banner</label>
                <span class="bordered relative dashed hovered w-100">
                    <p class="abs-center">Click to upload image</p>
                    <input @change="uploadToServer" class="o-o w-100 pad--10" type="file" accept=".jpg,.png"
                        name="banner" id="banner" :disabled="uploadedImages.length >= 1">
                </span>
            </div>

            <button @click.prevent="uploadNewTestimonial" type="submit" class="btn btn-primary w--100 m-auto"
                :disabled="isLoading">
                Submit
            </button>
        </aside>
    </section>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { useCookie } from '#app';

const { startRefreshing, stopRefreshing } = useAuth();
const toast = useToast();
const accessToken = useCookie<string | null>('access');

interface Testimonial {
    id: number;
    name: string;
    designation: string;
    testimonial: string;
    image: string;
}

interface UploadedImage {
    url: string;
    id?: number;
}

const testimonials = ref<Testimonial[]>([]);
const uploadedImages = ref<UploadedImage[]>([]);
const isUploaded = ref(false);
const isLoading = ref(false);
const name = ref('');
const designation = ref('');
const testimonial = ref('');

const isTestimonialAvailable = computed(() => testimonials.value.length > 0);

onMounted(async () => {
    await fetchTestimonials();
    startRefreshing();
});

onUnmounted(() => {
    stopRefreshing();
});

const fetchTestimonials = async () => {
    isLoading.value = true;
    try {
        const { data, error } = await useFetch<Testimonial[]>('http://192.168.0.111:3000/api/testimonial', {
            method: 'GET',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
            },
        });

        if (error.value) {
            console.error('Fetch Error:', error.value);
            toast.error('Failed to fetch testimonials: ' + error.value.message);
            return;
        }

        testimonials.value = data.value || [];
    } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error fetching testimonials');
    } finally {
        isLoading.value = false;
    }
};

const uploadToServer = async (event: Event) => {
    if (uploadedImages.value.length >= 1) {
        toast.error('Only one image can be uploaded');
        return;
    }

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
        toast.error('Please select an image to upload');
        return;
    }

    const formData = new FormData();
    formData.append('image', input.files[0]);

    isLoading.value = true;

    try {
        const { data, error } = await useFetch('http://192.168.0.111:3000/api/image_add', {
            method: 'POST',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
            },
            body: formData,
        });

        if (error.value) {
            console.error('Upload Error:', error.value);
            toast.error('Image upload failed: ' + error.value.message);
            return;
        }

        const imageResponse = data.value as { id: number; image: string };
        if (imageResponse?.image) {
            const imageUrl = `http://192.168.0.111:3000${imageResponse.image}`;
            uploadedImages.value.push({ url: imageUrl, id: imageResponse.id });
            isUploaded.value = true;
            toast.success('Image uploaded successfully');
        }
    } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Image upload failed. Please try again.');
    } finally {
        isLoading.value = false;
        input.value = '';
    }
};

const deleteRequest = async (index: number) => {
    const testimonial = testimonials.value[index];

    isLoading.value = true;
    try {
        const { status, error } = await useFetch(
            `http://192.168.0.111:3000/api/testimonial_action/${testimonial.id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                },
            }
        );

        if (status.value === 'success') {
            testimonials.value.splice(index, 1);
            toast.success('Testimonial deleted successfully');
        } else {
            console.error('Delete Error:', error.value);
            toast.error('Failed to delete testimonial from server');
        }
    } catch (error) {
        console.error('Delete error:', error);
        toast.error('Error deleting testimonial');
    } finally {
        isLoading.value = false;
    }
};

const uploadNewTestimonial = async () => {
    if (uploadedImages.value.length === 0) {
        toast.error('Please upload an image before submitting');
        return;
    }

    const payload = {
        name: name.value || 'Default Name',
        designation: designation.value || 'Default Designation',
        testimonial: testimonial.value || 'Default Testimonial',
        image: uploadedImages.value[0].url,
    };

    isLoading.value = true;

    try {
        const { data, error } = await useFetch('http://192.168.0.111:3000/api/testimonial_action', {
            method: 'POST',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (error.value) {
            console.error('Submit Error:', error.value);
            toast.error('Failed to submit testimonial: ' + error.value.message);
            return;
        }

        toast.success('Testimonial submitted successfully');
        name.value = '';
        designation.value = '';
        testimonial.value = '';
        uploadedImages.value = [];
        isUploaded.value = false;
        await fetchTestimonials();
    } catch (error) {
        console.error('Submit error:', error);
        toast.error('Error submitting testimonial');
    } finally {
        isLoading.value = false;
    }
};
</script>












<style>
.add-testimonial {
    position: relative;
    padding: 1rem;
    border: 1px solid #ccc;
    width: 100%;
    border-radius: 0.5rem;
}



.testimonial {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    max-width: 20rem;
    padding: 1rem;
}

.crossed {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    z-index: 5;

    &::after {
        content: '';
        position: absolute;
        width: 1.5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffd768;
        z-index: -1;
    }
}

.img-round {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: 0.3s ease;

        &:hover {
            transform: scale(1.1);
            transition: 0.3s ease;
        }
    }
}

textarea.textarea {
    resize: vertical;
    min-height: 5rem;
    max-height: 10rem;
    border: 1px solid #dddddd;
    border-radius: 0.3rem;
    width: 100%;
    padding: 1rem;

    &:focus-within {
        outline: none;
        box-shadow: 0 0 2px 2px #d7f2ff;
    }
}
</style>