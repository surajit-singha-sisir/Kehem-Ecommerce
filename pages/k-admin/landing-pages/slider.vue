<style scoped>
.radio label {
    &::before {
        width: 1.5rem;
    }

    &::after {
        width: 1rem !important;
    }
}
</style>

<template>
    <section class="w-100 f-center-start f-col gap-10">
        <h2>Select Product</h2>
        <input type="text" name="searchProduct" id="searchProduct" placeholder="Search Product">
        <div class="list-all-products w-100 pad-tb--10 f-center gap-10 f-wrap">
            <div v-for="item in products" :key="item.key"
                class="relative w--90 product f-centered f-col border-all pad--10 b-rad--05 b-Silver">
                <div class="radio absolute tr-00 min-w-00i">
                    <input v-model="selectedKey" type="radio" name="radio" :id="item.key" :value="item.key"
                        @change="handleProductSelection">
                    <label :for="item.key"></label>
                </div>
                <div class="h--50">
                    <NuxtImg class="h-100" :src="item.images" />
                </div>
                <h4 class="text-dotted-3">{{ item.title }}</h4>
            </div>
        </div>

        <section v-if="isSelected" class="w-100">
            <div class="f-start-center f-col gap-10 w-100">
                <h3>All Hero Sliders</h3>
                <div class="pad--10 w-100 f-center bordered dashed">
                    <span v-if="isHeroAvailable" class="f-start-center gap-20 w-100 pad--10 f-wrap">
                        <div v-for="(slider, index) in heroSliders" :key="slider.id" class="hero-slider-old">
                            <NuxtImg :src="slider.image" />
                            <h3>{{ slider.headline }}</h3>
                            <p>{{ slider.sub_headline }}</p>
                            <i @click="deleteRequest(index)" class="m-cross1 rounded"></i>
                        </div>
                    </span>
                    <span v-else>
                        <h2>No data available...</h2>
                    </span>
                </div>
            </div>

            <aside class="w-100 f-center-start f-col gap-10">
                <div class="f-center-start w-100 gap-05 f-col">
                    <label for="title">Title</label>
                    <input v-model="title" type="text" name="title" id="title" placeholder="Type the hero title">
                </div>
                <div class="f-center-start w-100 gap-05 f-col">
                    <label for="subtitle">Subtitle</label>
                    <input v-model="subtitle" type="text" name="subtitle" id="subtitle"
                        placeholder="Type the hero subtitle">
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

                <button @click.prevent="uploadNewHero" type="submit" class="btn btn-primary w--100 m-auto"
                    :disabled="isLoading">
                    Submit
                </button>
            </aside>
        </section>
    </section>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { useCookie } from '#app';

const { startRefreshing, stopRefreshing } = useAuth();
const toast = useToast();
const accessToken = useCookie<string | null>('access');

const selectedKey = ref('');
const isSelected = ref(false);

interface ProductList {
    key: string;
    title: string;
    images: string;
}

interface HeroSlider {
    id: number;
    headline: string;
    sub_headline: string;
    image: string;
}

interface UploadedImage {
    url: string;
    id?: number;
}

const products = ref<ProductList[]>([]);
const heroSliders = ref<HeroSlider[]>([]);
const uploadedImages = ref<UploadedImage[]>([]);
const isUploaded = ref(false);
const isLoading = ref(false);
const title = ref('');
const subtitle = ref('');

const isHeroAvailable = computed(() => heroSliders.value.length > 0);

// Fetch all products
const fetchProductList = async () => {
    isLoading.value = true;
    try {
        const { data, error } = await useFetch<ProductList[]>('http://192.168.0.111:3000/api/productlist', {
            method: 'GET',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
            },
        });

        if (data.value) {
            products.value = data.value;
        }

        if (error.value) {
            console.error('Fetch Error:', error.value);
            toast.error('Failed to fetch product list: ' + error.value.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error fetching product list');
    } finally {
        isLoading.value = false;
    }
};

// Fetch hero sliders for selected product
const fetchHeroSliders = async () => {
    if (!selectedKey.value) return;

    isLoading.value = true;
    try {
        const { data, error } = await useFetch<HeroSlider[]>(`http://192.168.0.111:3000/api/product_banner/${selectedKey.value}`, {
            method: 'GET',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
            },
        });

        if (error.value) {
            console.error('Fetch Error:', error.value);
            toast.error('Failed to fetch hero sliders: ' + error.value.message);
            return;
        }

        heroSliders.value = data.value || [];
    } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error fetching hero sliders');
    } finally {
        isLoading.value = false;
    }
};

// Handle product selection
const handleProductSelection = () => {
    if (selectedKey.value) {
        isSelected.value = true;
        fetchHeroSliders();
    } else {
        isSelected.value = false;
        heroSliders.value = [];
    }
};

// Image upload handler
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

// Delete hero slider
const deleteRequest = async (index: number) => {
    const slider = heroSliders.value[index];

    isLoading.value = true;
    try {
        const { status, error } = await useFetch(
            `http://192.168.0.111:3000/api/product_banner/${selectedKey.value}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                },
                body: {
                    banner_id: slider.id
                }
            }
        );

        if (status.value === 'success') {
            heroSliders.value.splice(index, 1);
            toast.success('Hero slider deleted successfully');
        } else {
            console.error('Delete Error:', error.value);
            toast.error('Failed to delete hero slider from server');
        }
    } catch (error) {
        console.error('Delete error:', error);
        toast.error('Error deleting hero slider');
    } finally {
        isLoading.value = false;
    }
};

// Upload new hero slider
const uploadNewHero = async () => {
    if (uploadedImages.value.length === 0) {
        toast.error('Please upload an image before submitting');
        return;
    }

    const payload = {
        headline: title.value || 'Default Title',
        sub_headline: subtitle.value || 'Default Subtitle',
        image: uploadedImages.value[0].url,
    };

    isLoading.value = true;

    try {
        const { data, error } = await useFetch(`http://192.168.0.111:3000/api/product_banner/${selectedKey.value}`, {
            method: 'POST',
            headers: {
                Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (error.value) {
            console.error('Submit Error:', error.value);
            toast.error('Failed to submit hero data: ' + error.value.message);
            return;
        }

        toast.success('Hero data submitted successfully');
        title.value = '';
        subtitle.value = '';
        uploadedImages.value = [];
        isUploaded.value = false;
        await fetchHeroSliders();
    } catch (error) {
        console.error('Submit error:', error);
        toast.error('Error submitting hero data');
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await fetchProductList();
    startRefreshing();
});

onUnmounted(() => {
    stopRefreshing();
});
</script>