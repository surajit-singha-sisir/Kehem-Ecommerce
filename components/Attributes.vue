<style>
.checkbox {
    max-width: max-content;
    min-width: 5rem;
}

.checkbox input[type=checkbox]:checked+label::after {
    background: none;
}

.checkbox input[type=checkbox]:checked+label::before {
    content: '\f2e6';
    font-size: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0750af;
    color: #fff;
    font-family: 'mastorsIcons' !important;
}

.addAttrValCross {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -1.6rem;
    right: 0;
}
</style>

<template>
    <section>
        <!-- ATTRIBUTES VIEW -->
        <aside class="combo-box" ref="comboBoxContainer">
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
            <div :class="{ 'hide': !isAddCatClicked }"
                class="absolute lb-0 bg-White b-1 border-all f-centered f-col gap-10 z-10">
                <i @click="isAddCatClicked = !isAddCatClicked"
                    class="absolute tr-02 btn btn-fire btn-sm z-1 m-x1 btn-rounded"></i>
                <input type="text" class="m-t--15" v-model="newCatName" id="newCatName" placeholder="Category Name">
                <button type="button" @click="newAttNameBtn" class="btn btn-primary">Add Category</button>
            </div>
        </aside>


        <!-- ATTRIBUTE VALUE -->
        <div class="pad--10 b-b-e m-b--10" ref="attributeContainer" :class="{ 'hide': !isSelected }">

            <!-- ATTRIBUTE VALUES -->
            <div class="b-e pad--10 f f-just-between f-align-items-center gap-10">
                <section class="f f-wrap gap-10" JSONref="attributeValues">


                    <!-- LOOP CHECKBOXES -->
                    <div class="checkbox" v-for="item in attributeJSONValues" :key="item.name">
                        <input type="checkbox" :id="item.name" :v-model="item.name">
                        <label :for="item.name">{{ item.name }}</label>
                    </div>



                </section>
                <div class="relative w-100">
                    <button id="addAttributeBtn" type="button"
                        class="pad-tb--03 pad-lr--08 plus b-none bg-hov-Purple cur-pointer text--m"
                        @click="isPlusClicked = !isPlusClicked">+</button>

                    <!-- ADD VALUE -->
                    <div class="absolute b-e bg-2 f f-col gap-10 w--150 pad--10" v-if="isPlusClicked">
                        <i @click="isPlusClicked = !isPlusClicked"
                            class="addAttrValCross btn btn-fire btn-sm z-1 m-x1"></i>
                        <!-- SELECT OPTION -->
                        <div class="option">
                            <select name="newAttrVal" id="newAttrVal" v-model="selectedAttr">
                                <option value="selected" selected disabled>-- Select Category --</option>
                                <option v-for="option in filteredOptions" :key="option" :value="option"
                                    class="combo-option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <!-- INPUT VALUE -->
                        <div class="text-input">
                            <input type="text" v-model="newAttrName" placeholder="Variable Name">
                        </div>
                        <!-- SUBMIT BUTTON -->
                        <button class="btn btn-primary" type="submit" @click="newAttrValClick">Submit</button>
                    </div>
                </div>
            </div>

            <!-- ATTRIBUTE VALUES DETAILS -->
            <aside class="b-e pad--10 m-t--10 hide" id="attributeSection">
                <table class="attributeTable">
                    <thead>
                        <tr>
                            <th id="attributeCat">Size</th>
                            <th>Stock(Qty)</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </aside>
        </div>
    </section>
</template>




<script setup lang="ts">

// ATTRIBUTE VALUES
const attributeContainer = ref<HTMLElement | null>(null);
const isSelected = ref(false);
const isPlusClicked = ref(false);

const selectedAttr = ref('');
const newAttrName = ref('');



// + ATTRIBUTE VALUES
const newAttrValClick = async (): Promise<void> => {
    // EMPTY NAME ERROR
    if (!newAttrName.value.trim()) {
        toast.error('Please enter an attribute value name');
        return;
    }

    // DUPLICATE ERROR
    for (const option of attributeJSONValues.value) {
        if (option.name.trim() === newAttrName.value.trim()) {
            toast.error('Duplicate Attribute value');
            return;
        }
    }

    try {
        await $fetch('http://192.168.0.111:3000/api/add_attrval', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`
            },
            body: {
                attr: selectedAttr.value ?? '', // Selected attribute name
                val: newAttrName.value ?? ''   // New attribute value
            }
        });

        toast.success(`You have successfully added "${newAttrName.value}"`);

        // Refresh attributes
        await getAttrs();

        // Update attributeJSONValues dynamically
        const selected = allAttrs.value.find(attr => attr.name === selectedAttr.value);
        if (selected) {
            attributeJSONValues.value = Object.values(selected.attr_values).map(value => ({
                name: value
            }));
        }

        // Reset input fields
        selectedAttr.value = '';
        newAttrName.value = '';
        isPlusClicked.value = !isPlusClicked.value;

    } catch (error) {
        toast.error("Something went wrong!");
    }
};















import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();
const accessToken = useCookie<string | null>('access');

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
    if (!inputValue.value) {
        isSelected.value = false;
    }
    return options.value.filter(option => option.toLowerCase().includes(query));
});

// GET SELECTED OPTION
let allAttrs = ref<Attribute[]>([]);
let attributeJSONValues = ref<AttrValues[]>([]); // TEMPLATE


interface AttrValues {
    name: string
}
const selectOption = (option: string): void => {
    inputValue.value = option;
    showDropdown.value = false;
    isInputClicked.value = true;
    isSelected.value = true;

    const names = allAttrs.value;
    names.forEach(name => {
        if (name.name === option) {
            console.log(name.attr_values);
            attributeJSONValues.value = Object.values(name.attr_values).map(value => ({
                name: value
            }));
        }
    });
};


const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        inputValue.value = '';
        isSelected.value = false;
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

// + VALUE
const newAttNameBtn = async (): Promise<void> => {
    // EMPTY NAME ERROR
    if (!newCatName.value.trim()) {
        toast.error('Please enter a Attribute name');
        return;
    }
    // DUPLICATE ERROR
    for (const option of filteredOptions.value) {
        if (option.trim() == newCatName.value.trim()) {
            toast.error('Duplicate Attribute name');
            return;
        }
    }

    // CATCH THE DATA
    try {
        await $fetch<{ message: string }>('http://192.168.0.111:3000/api/add_attribute', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
            body: {
                name: newCatName.value ?? '',
            },
        });


        toast.success(`You have added "${newCatName.value}"`);

        // RECALL UPDATED ATTR
        getAttrs();

        // TURNED OFF ADD CAT DIALOG
        isAddCatClicked.value = !isAddCatClicked.value;
        newCatName.value = '';
        isSelected.value = false;

    } catch {
        toast.error('There was encounted an error. Contact KEHEM IT');
    }
};


interface Attribute {
    name: string;
    attr_values: string
}
const getAttrs = async (): Promise<void> => {
    try {
        const { data: attributes } = await useFetch<Attribute[]>('http://192.168.0.111:3000/api/attributes', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`,
            },
        });

        if (attributes.value) {
            allAttrs.value = attributes.value;
            options.value = attributes.value.map((attr) => attr.name);
        }

    } catch (error) {
        console.error('Error fetching attributes:', error);
        toast('Error fetching attributes');
    }
};

// LOAD WITHOUT RELOAD
getAttrs();





















onMounted(() => {
    document.addEventListener('click', closeDropdown);
    // LOAD ON RELOAD
    window.addEventListener('load', getAttrs);
    return () => {
        window.removeEventListener('load', getAttrs);
    };
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>
