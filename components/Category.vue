<template>
    <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10">
        <legend class="thislegend star">Category</legend>

        <!-- CATEGORY VIEW -->
        <div class="combo-box" ref="comboBoxContainer">
            <div class="Combo-inputbox" :class="{ 'clicked': showDropdown }">
                <input v-model="inputValue" type="text" class="combo-input" placeholder="Search or select..."
                    @click="showDropdown = true" @keydown="handleKeydown" />
            </div>
            <ul v-if="showDropdown" class="new-combo-options">
                <li v-for="option in filteredOptions" :key="option" class="combo-option" @click="selectOption(option)">
                    {{ option }}
                </li>
                <li class="btn btn-primary w-100" @click="isAddCatClicked = !isAddCatClicked" ref="newAddCat">
                    <i class="m-plus2">New</i>
                </li>
            </ul>
            <!-- + ADD CATEGORY -->
            <aside :class="{ 'hide': !isAddCatClicked }"
                class="absolute lb-0 bg-White b-1 border-all f-centered f-col gap-10 z-10">
                <i @click="isAddCatClicked = !isAddCatClicked"
                    class="absolute tr-02 btn btn-fire btn-sm z-1 m-x1 btn-rounded"></i>
                <input type="text" class="m-t--15" v-model="newCatName" id="newCatName" placeholder="Category Name">
                <button type="button" @click="newCatNameBtn" class="btn btn-primary">Add Category</button>
            </aside>
        </div>

        <!-- SUB-CATEGORY -->
        <!-- <div class="option">
                        <select name="sub-category" id="sub-category">
                            <option value="false">-- Sub Cat --</option>
                        </select>
                    </div> -->
        <!-- SUB-SUB-CATEGORY -->
        <!-- <div class="option">
                        <select name="sub-sub-category" id="sub-sub-category">
                            <option value="false">-- Sub Sub --</option>
                        </select>
                    </div> -->
    </fieldset>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();
const accessToken = useCookie<string | null>('access');

// State Variables
const inputValue = ref<string>('');
const showDropdown = ref<boolean>(false);
const isAddCatClicked = ref<boolean>(false);
const isInputClicked = ref<boolean>(false);
const newCatName = ref<string>('');
const comboBoxContainer = ref<HTMLElement | null>(null);
const newAddCat = ref<HTMLElement | null>(null);
const options = ref<string[]>([]);

const filteredOptions = computed(() => {
    const query = inputValue.value.toLowerCase();
    return options.value.filter(option => option.toLowerCase().includes(query));
});


// GET SELECTED OPTION
const selectOption = (option: string): void => {
    inputValue.value = option;
    showDropdown.value = false;
    isInputClicked.value = true;
    console.log(option);

};


const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        inputValue.value = '';
        showDropdown.value = false;
    }
};

const closeDropdown = (event: MouseEvent): void => {
    if (comboBoxContainer.value && !comboBoxContainer.value.contains(event.target as Node)) {
        showDropdown.value = false;
        isInputClicked.value = true;
    }
    if (isAddCatClicked.value) {
        isAddCatClicked.value = true;
    }
};

// + CATEGORY
const newCatNameBtn = async (): Promise<void> => {
    // EMPTY NAME ERROR
    if (!newCatName.value.trim()) {
        toast.error('Please enter a category name');
        return;
    }
    // DUPLICATE ERROR
    for (const option of filteredOptions.value) {
        if (option.trim() == newCatName.value.trim()) {
            toast.error('Duplicate category name');
            return;
        }
    }

    // CATCH THE DATA
    try {
        await $fetch<{ message: string }>('http://192.168.0.111:3000/api/add_category', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
            body: {
                name: newCatName.value ?? '',
            },
        });


        toast.success(`You have added "${newCatName.value}"`);

        // RECALL UPDATED CATS
        getCats();

        // TURNED OFF ADD CAT DIALOG
        isAddCatClicked.value = !isAddCatClicked.value;
        newCatName.value = '';

    } catch {
        toast.error('There was encounted an error. Contact KEHEM IT');
    }
};


interface Category {
    name: string;
}
const getCats = async (): Promise<void> => {
    try {
        const { data: categories, error } = await useFetch<Category[]>('http://192.168.0.111:3000/api/categories', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
        });

        if (categories.value) {
            options.value = categories.value.map((category) => category.name);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        toast('Error fetching categories');
    }
};
// LOAD WITHOUT RELOAD
getCats();

onMounted(() => {
    document.addEventListener('click', closeDropdown);
    // LOAD ON RELOAD
    window.addEventListener('load', getCats);
    return () => {
        window.removeEventListener('load', getCats);
    };
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>
