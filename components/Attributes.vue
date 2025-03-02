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

.attribute-selected-item {
    border: 1px solid #ccc;
    padding: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    i.m-cross1 {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 1rem;
        /* color: #fff; */
        aspect-ratio: 1;
        cursor: pointer;
        z-index: 5;
        transition: all 0.3s ease;

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px solid #ff1c73;
            width: 1.5rem;
            aspect-ratio: 1;
            z-index: -1;
            transition: all 0.3s ease;
        }

        &:hover::after {
            background-color: #ff1c73;
            transition: all 0.3s ease;
        }

        &:hover {
            color: #fff;
        }
    }

    .checkbox label {
        padding: 0;
    }

    .checkbox input[type=checkbox]:checked+label::before,
    .checkbox input[type=checkbox]:checked+label::after {
        display: none;
    }
}














.last-dragged {
    background-color: #3cb5da;
    animation: bounce 0.4s ease;
    transition: background-color 1s ease;
}




.draggable-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
}

.draggable-item {
    display: flex;
    align-items: center;
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

.border-rounded {
    border-radius: 50%;
    color: #fff;
    background-color: #007bff;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        background-color: #ff1c73;
    }
}




.new-row-item {
    position: relative;
    padding: 0.1rem !important;

    .create-row-button {
        position: absolute;
        right: -1.5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
        outline: none;
        border: none;
        color: #fff;
        cursor: pointer;
        z-index: 6;

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1.6rem;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: #007bff;
            z-index: -1;
        }

        &:hover {
            &::after {
                background-color: #0750af;
            }

            .last-Tr-entry {
                background-color: #0750af;
            }
        }
    }
}

.last-Tr-entry:hover {
    background-color: #007bff !important;
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
                <section class="f f-wrap gap-10 f-flex-xxxl">
                    <div class="checkbox" v-for="item in attributeJSONValues" :key="item.name">
                        <input type="checkbox" :id="item.name" :value="item.name" v-model="selectedValues"
                            :checked="selectedValues.includes(item.name)" />
                        <label :for="item.name">{{ item.name }}</label>
                    </div>
                </section>

                <div class="relative">
                    <button id="addAttributeBtn" type="button"
                        class="pad-tb--03 pad-lr--08 plus b-none bg-hov-Purple cur-pointer text--m"
                        @click="isPlusClicked = !isPlusClicked">+</button>

                    <!-- ADD VALUE -->
                    <div class="absolute b-e bg-2 f f-col gap-10 w--150 pad--10 pos-right-center r--30"
                        v-if="isPlusClicked">
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
            <aside class="b-e pad--10 m-t--10">

































                <!-- OPTIONAL ATTRIBUTE -->
                <h4 class="m-b--10">Your Optional Attribute List</h4>

                <draggable v-model="section1Items" :group="'items'" item-key="id" class="draggable-list"
                    @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element, index }">
                        <div v-if="element.value.length >= 1" class="draggable-item"
                            :class="{ 'last-dragged': lastDraggedId === element.id }">
                            <div class="f-center-start gap-10 w-100">
                                <span class="attribute-selected-item">
                                    <span>::</span>
                                    <div class="f-centered gap-03">
                                        <span class="attribute-name b Blue-900">{{ element.name }}</span>
                                        <i class="m-chevron-right"></i>
                                        <span class="attribute-values b Cyan-800">{{ element.value.join(", ") }}</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </template>
                </draggable>






                <!-- MENDATORY ATTRIBUTE -->
                <h4 class="m-tb--10">Your Mendatory Attribute List <span class="Red">(max: 2)</span></h4>

                <draggable v-model="section2Items" :group="'items'" item-key="id" class="draggable-list"
                    @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element }">
                        <div ref="section2Container" class="draggable-item"
                            :class="{ 'last-dragged': lastDraggedId === element.id }">
                            <div class="f-center-start gap-10 w-100">
                                <span class="attribute-selected-item">
                                    <span>::</span>
                                    <div class="f-centered gap-03">
                                        <span class="attribute-name b Blue-900">{{ element.name }}</span>
                                        <i class="m-chevron-right"></i>
                                        <span class="attribute-values b Cyan-800">{{ element.value.join(", ")
                                            }}</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </template>
                </draggable>























                <!-- Table (Single Attribute)-->
                <table ref="section2Table" class="attributeTable" v-if="section2Items.length === 1">
                    <thead>
                        <tr>
                            <th colspan="3" class="text--12 Brown bg-Khaki ">"{{ section2Items[0].name }}"</th>
                        </tr>
                        <tr>
                            <th>Values</th>
                            <th>Stock</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in section2Items[0].value" :key="index">
                            <td class="b">{{ item }}</td>
                            <td>
                                <input type="number" v-model="singleValueStock" name="attributeValue" min="1"
                                    placeholder="Stock">
                            </td>
                            <td>
                                <button class="btn" style="cursor: not-allowed;">
                                    {{ foreignKeys.sellPrice > (foreignKeys.discountPrice > 0 ?
                                        foreignKeys.discountPrice :
                                        foreignKeys.sellPrice) ? foreignKeys.discountPrice
                                        :
                                        foreignKeys.sellPrice }}
                                    taka</button>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <!-- <tr v-for="(value, index) in attributeValues" :key="index">
                            <td><span class="f-centered gap-10">
                                    <p>{{ value }}</p>
                                    <i v-if="multipleValues" class="m-plus2 border-rounded"></i>
                                </span></td>
                            <td>
                                <input type="number" v-model="tableQuantities[index]" class="tableQty"
                                    name="attributeValue" min="1" placeholder="Stock">
                            </td>
                            <td>
                                <button class="btn1">{{ foreignKeys.sellPrice }} taka</button>
                            </td>
                        </tr> -->

                <!-- Table (Double Attribute)-->
                <!-- <table ref="section2Table" class="attributeTable" v-if="section2Items.length === 2">
                    <thead>
                        <tr>
                            <th colspan="3" class="text--12 Brown bg-Khaki ">"{{ section2Items[0].name }}" + "{{
                                section2Items[1].name
                                }}"</th>
                        </tr>
                        <tr>
                            <th>Values</th>
                            <th>Stock</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in section2Items[1].value" :key="index">




                            <td class="b">{{ item }}</td>




                            <td>
                                <input type="number" v-model="singleValueStock" name="attributeValue" min="1"
                                    placeholder="Stock">
                            </td>
                            <td>
                                <button class="btn" style="cursor: not-allowed;">
                                    {{ foreignKeys.sellPrice > (foreignKeys.discountPrice > 0 ?
                                        foreignKeys.discountPrice :
                                        foreignKeys.sellPrice) ? foreignKeys.discountPrice
                                        :
                                        foreignKeys.sellPrice }}
                                    taka</button>
                            </td>
                        </tr>
                    </tbody>
                </table> -->



                <!-- 2 ATTRIBUTE VALUES -->
                <table ref="section2Table" class="attributeTable" v-if="section2Items.length === 2">
                    <thead>
                        <tr>
                            <th colspan="3" class="text--12 Brown bg-Khaki ">
                                "{{ section2Items[0].name }}" +
                                "{{ section2Items[1].name }}"
                            </th>
                        </tr>
                        <tr>
                            <th>Values</th>
                            <th>Stock</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>


                        <!-- TR STARTS -->
                        <tr class="attribute-value-tr324">
                            <td class="b relative">
                                <div class="attribute-value-insert">
                                    <!-- VALUES -->
                                    <span class="placeholder linker-line"
                                        :class="{ 'attribute-value-assigned': isValueSelectedNow }"
                                        @click="firstAttrValue">
                                        <span class="attribute-assigned-name"> {{ section2Items[0].name }}</span>
                                        <p>{{ newSelected }}</p>

                                        <div class="show-available-values-outer" v-if="isFirstAttrValueClicked"
                                            :class="{ 'hide': !isFirstAttrValueClicked }">
                                            <span>"{{ section2Items[0].name }}" Values</span>
                                            <ul class="show-available-values" @click="getValueSelection">
                                                <li v-for="item in section2Items[0].value" :key="item">{{ item }}</li>
                                            </ul>
                                        </div>

                                    </span>
                                    <i class="m-plus-alt"></i>
                                    <span class="placeholder"
                                        :class="{ 'attribute-value-assigned': isValueSelectedNow }"
                                        @click="secondAttrValue">
                                        <span class="attribute-assigned-name"> {{ section2Items[1].name }}</span>
                                        <p>{{ newSelected2 }}</p>

                                        <div class="show-available-values-outer"
                                            :class="{ 'hide': !isSecondAttrValueClicked }">
                                            <span>"{{ section2Items[1].name }}" Values</span>
                                            <ul class="show-available-values" @click="getValueSelection2">
                                                <li v-for="item in section2Items[1].value" :key="item">{{ item }}</li>
                                            </ul>
                                        </div>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <input type="number" v-model="singleValueStock" name="attributeValue" min="1"
                                    placeholder="Stock">
                            </td>
                            <td>
                                <button class="btn btn-disabled">100 taka</button>
                            </td>
                        </tr>




                        <tr class="last-Tr-entry">
                            <!-- NEW ROW -->
                            <td colspan="3" class="new-row-item">
                                <button @click="createNewTr" type="button" class="create-row-button" v-if="isLastTr"><i
                                        class="m-plus"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>




































            </aside>
        </div>
    </section>
</template>




<script setup lang="ts">
import draggable from 'vuedraggable';



const isFirstAttrValueClicked = ref(false);
const isSecondAttrValueClicked = ref(false);
const isValueSelectedNow = ref(false);
const isLastTr = ref(true);

const firstAttrValue = () => {
    isFirstAttrValueClicked.value = !isFirstAttrValueClicked.value;
}

const secondAttrValue = () => {
    isSecondAttrValueClicked.value = !isSecondAttrValueClicked.value;
}

const newSelected = ref<string>('');
const newSelected2 = ref<string>('');
const getValueSelection = (event: Event) => {
    const currentClicked = event.target as HTMLElement;
    if (currentClicked) {
        newSelected.value = currentClicked.textContent || '';
    }
}
const getValueSelection2 = (event: Event) => {
    const currentClicked = event.target as HTMLElement;
    if (currentClicked) {
        newSelected2.value = currentClicked.textContent || '';
    }
}


interface Props {
    buyPrice: number,
    sellPrice: number,
    discountPrice: number,
    productCurrency: string,
    stock: number,
}
const foreignKeys = defineProps<Props>();



// STOCK MAINTAINS

const section2Items = ref<Item[]>([]);
const section2Container = ref<HTMLElement | null>(null);
const section2Table = ref<HTMLElement | null>(null);
const singleValueStock = ref('');
watch(([section2Items, foreignKeys]), () => {

});




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
import { Value } from 'sass';
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



















const selectedValues = ref<string[]>([]);
const currectAttr = ref<string>();

let arrayList: Record<string, string[]> = {};

watch([selectedValues, currectAttr], ([newValue, currentName]) => {
    if (currentName) {
        arrayList[currentName] = [...newValue];
        section1Items.value = Object.keys(arrayList).map((key, index) => ({
            id: index + 1,
            name: key,
            value: arrayList[key],
        }));
    }
});

watch(currectAttr, () => {
    selectedValues.value = [];
});

const section1Items = ref<Item[]>([]);

interface Item {
    id: number;
    name: string;
    value: string[];
}

const dragging = ref(false);
const lastDraggedId = ref<number | null>(null);

const onDragStart = (event: any) => {
    lastDraggedId.value = event.item.__draggable_context.element.id;
};

const onDragEnd = () => {
    dragging.value = false;
    setTimeout(() => {
        lastDraggedId.value = null;
    }, 500);
};





























const selectOption = (option: string): void => {
    inputValue.value = option;
    showDropdown.value = false;
    isInputClicked.value = true;
    isSelected.value = true;

    const names = allAttrs.value;
    names.forEach(name => {
        if (name.name === option) {
            currectAttr.value = name.name;
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
