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

        <div v-for="(ingredient, index) in ingredients" :key="index">
            <aside class="f-centered gap-10 pad-b--10 bordered-all">
                <div class="f-centered ingredient-img-container">
                    <span class="ingredient-upload-area" v-if="!ingredient.isFile">
                        <input type="file" :name="'image_' + index" accept=".jpg, .jpeg" class="ingredientImageUpload"
                            @change="handleImageUpload(index)" />
                        <p>Upload Image</p>
                    </span>
                    <!-- Preview -->
                    <NuxtImg v-if="ingredient.isFile" class="w-100 scaling" :src="ingredient.ingredientImg" alt="" />
                </div>
                <div class="f f-col gap-10 w-100">
                    <label :for="'name_en_' + index">Ingredient Name (en)</label>
                    <input type="text" :name="'name_en_' + index" :id="'name_en_' + index"
                        placeholder="Giloy Powder - 25gm" v-model="ingredient.name_en" />

                    <label :for="'name_bn_' + index">Ingredient Name (bn)</label>
                    <input type="text" :name="'name_bn_' + index" :id="'name_bn_' + index"
                        placeholder="গুলঞ্চ চূর্ণ - ২৫গ্রাম" v-model="ingredient.name_bn" />
                </div>
            </aside>
        </div>

        <!-- ADD Button -->
        <div class="new-row-item ingredientadd" @click="newIngredientAdd">
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

const ingredients = ref<any[]>([
    {
        name_en: '',
        name_bn: '',
        ingredientImg: '',
        isFile: false
    }
]);

interface ImageResponse {
    value: {
        id: number;
        image: string;
    };
}

const handleImageUpload = async (index: number) => {
    const inputElement = document.querySelector(`input[name='image_${index}']`) as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
        const formData = new FormData();
        formData.append('image', inputElement.files[0]);

        try {
            const response = await useFetch('http://192.168.0.111:3000/api/image_add', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken.value ?? ''}`,
                },
                body: formData,
            });

            if (response && response.data) {
                const imageResponse = response.data as ImageResponse;
                const imageUrl = `http://192.168.0.111:3000${imageResponse.value.image}`;
                ingredients.value[index].ingredientImg = imageUrl;
                ingredients.value[index].isFile = true;
            }

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed. Please try again.');
        }
    }
};

const newIngredientAdd = () => {
    ingredients.value.push({
        name_en: '',
        name_bn: '',
        ingredientImg: '',
        isFile: false
    });

    toast.success('New Ingredient added successfully!');
};

const generateJSON = () => {
    const json: Record<string, { image: string, name_en: string, name_bn: string }> = {};

    ingredients.value.forEach((ingredient, index) => {
        if (ingredient.isFile && ingredient.name_en && ingredient.name_bn) {
            const key = `ingredient-${index + 1}`;
            json[key] = {
                image: ingredient.ingredientImg,
                name_en: ingredient.name_en,
                name_bn: ingredient.name_bn
            };
        }
    });

    return json;
};

watch(ingredients, () => {
    const json = generateJSON();
    console.log("Generated JSON:", JSON.stringify(json, null, 2));
}, { deep: true });

</script>
