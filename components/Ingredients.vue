<style lang="scss">
.ingredient-img-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11rem;
    border: 1px dashed #8f8f8f;
    aspect-ratio: 1;
    z-index: 5;

    &:hover {
        border-color: #0066ff;
    }

    .ingredient-upload-area {
        position: relative;
        width: inherit;
        height: inherit;
        z-index: 5;
        transition: all 0.3s ease;

        p {
            position: absolute;
            width: inherit;
            height: inherit;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #ccc;
            text-align: center;
            pointer-events: none;
            z-index: 4;
            transition: all 0.3s ease;
        }

        &:hover {
            border-color: #ce1313;

            p {
                color: #696969;
            }
        }

        .ingredientImageUpload {
            position: relative;
            width: inherit;
            aspect-ratio: 1;
            opacity: 0;
            background-color: transparent;
            border: none;
            z-index: 2;
        }
    }
}

.bordered-all {
    border: 1px solid #ccc;
    width: 90%;
    padding: 1rem;
}

.ingredientadd {
    width: 90%;
}

@media screen and (max-width: 720px) {
    .bordered-all {
        width: 100%;
    }

    .ingredientadd {
        width: 90%;
    }
}
</style>

<template>
    <section class="border-all f-centered f-col gap-10">
        <h3 class="star text-center pad--10">Ingredients</h3>

        <div v-for="(ingredient, index) in ingredients" :key="`ingredient-${index}`" class="w-100 f-centered">
            <aside class="f-centered gap-10 pad-b--10 bordered-all">
                <div class="f-centered ingredient-img-container">
                    <span class="ingredient-upload-area" v-if="!ingredient.imageUrl">
                        <input type="file" :name="`ingredient_image_${index}`" accept=".jpg, .jpeg"
                            class="ingredientImageUpload" @change="handleImageUpload($event, index)" />
                        <p>Upload Image</p>
                    </span>
                    <div v-if="ingredient.loading" class="loader"></div>
                    <NuxtImg v-else-if="ingredient.imageUrl" class="w-100 scaling" :src="ingredient.imageUrl"
                        alt="Ingredient image" />
                </div>
                <div class="f f-col gap-10 w-100">
                    <label :for="`ingredient_name_en_${index}`">Ingredient Name (en)</label>
                    <input type="text" :name="`ingredient_name_en_${index}`" :id="`ingredient_name_en_${index}`"
                        placeholder="Giloy Powder - 25gm" v-model="ingredient.nameEn" />

                    <label :for="`ingredient_name_bn_${index}`">Ingredient Name (bn)</label>
                    <input type="text" :name="`ingredient_name_bn_${index}`" :id="`ingredient_name_bn_${index}`"
                        placeholder="গুলঞ্চ চূর্ণ - ২৫গ্রাম" v-model="ingredient.nameBn" />
                </div>
            </aside>
        </div>

        <div class="new-row-item ingredientadd" @click="addNewIngredient">
            <button type="button" class="create-row-button">
                <i class="m-plus"></i>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();
const accessToken = useCookie<string | null>('access');

// Define emits
const emit = defineEmits<{
    (e: 'update:ingredients', ingredients: string[][]): void
}>();

// Ingredient interface
interface Ingredient {
    imageUrl: string;
    nameEn: string;
    nameBn: string;
    loading: boolean;
}

const ingredients = ref<Ingredient[]>([
    {
        imageUrl: '',
        nameEn: '',
        nameBn: '',
        loading: false
    }
]);

// Handle image upload
const handleImageUpload = async (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('image', input.files[0]);
    ingredients.value[index].loading = true;

    try {
        const response = await useFetch('http://192.168.0.111:3000/api/image_add', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
            body: formData,
        });

        const imageResponse = response.data as { value: { id: number; image: string } };
        if (imageResponse?.value?.image) {
            ingredients.value[index].imageUrl = `http://192.168.0.111:3000${imageResponse.value.image}`;
            emitIngredients();
        }
    } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Image upload failed. Please try again.');
    } finally {
        ingredients.value[index].loading = false;
    }
};

// Add new ingredient
const addNewIngredient = () => {
    ingredients.value.push({
        imageUrl: '',
        nameEn: '',
        nameBn: '',
        loading: false
    });
    toast.success('New ingredient added!');
};

// Generate and emit ingredients data
const emitIngredients = () => {
    const ingredientsData = ingredients.value
        .filter(ing => ing.imageUrl && ing.nameEn && ing.nameBn) // Only include complete ingredients
        .map(ing => [ing.imageUrl, ing.nameEn, ing.nameBn]);
    emit('update:ingredients', ingredientsData);
};

// Watch for changes and emit
watch(ingredients, () => {
    emitIngredients();
}, { deep: true });
</script>