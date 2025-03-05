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
        <div class="pad--10 b-b-e m-b--10" :class="{ 'hide': !isSelected }">
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
                        <div class="option">
                            <select name="newAttrVal" id="newAttrVal" v-model="selectedAttr">
                                <option value="selected" selected disabled>-- Select Category --</option>
                                <option v-for="option in filteredOptions" :key="option" :value="option"
                                    class="combo-option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div class="text-input">
                            <input type="text" v-model="newAttrName" placeholder="Variable Name">
                        </div>
                        <button class="btn btn-primary" type="button" @click="newAttrValClick">Submit</button>
                    </div>
                </div>
            </div>

            <!-- ATTRIBUTE VALUES DETAILS -->
            <aside class="b-e pad--10 m-t--10">
                <!-- OPTIONAL ATTRIBUTE -->
                <h4 class="m-b--10">Your Optional Attribute List</h4>
                <draggable v-model="section1Items" :group="'items'" item-key="id" class="draggable-list"
                    @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element }">
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

                <!-- MANDATORY ATTRIBUTE -->
                <h4 class="m-tb--10">Your Mandatory Attribute List <span class="Red">(max: 2)</span></h4>
                <draggable v-model="section2Items" :group="'items'" item-key="id" class="draggable-list"
                    @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element }">
                        <div class="draggable-item" :class="{ 'last-dragged': lastDraggedId === element.id }">
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

                <!-- Single Attribute Table -->
                <table class="attributeTable" v-if="section2Items.length === 1">
                    <thead>
                        <tr>
                            <th colspan="3" class="text--12 Brown bg-Khaki">"{{ section2Items[0].name }}"</th>
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
                                <input type="number" v-model.number="singleAttributeStocks[index]" name="attributeStock"
                                    min="0" placeholder="Stock" @change="validateStock">
                            </td>
                            <td>
                                <input type="number" v-model.number="singleAttributeAmount[index]" name="attributeAmount"
                                    min="0" :placeholder="defaultPrice.toString()" @change="updateAttributes">
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Two Attributes Table -->
                <table class="attributeTable" v-if="section2Items.length === 2">
                    <thead>
                        <tr>
                            <th colspan="3" class="text--12 Brown bg-Khaki">
                                "{{ section2Items[0].name }}" + "{{ section2Items[1].name }}"
                            </th>
                        </tr>
                        <tr>
                            <th>Values</th>
                            <th>Stock</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in rows" :key="index">
                            <td class="b relative">
                                <div class="attribute-value-insert">
                                    <span class="placeholder linker-line"
                                        :class="{ 'attribute-value-assigned': row.newSelected }"
                                        @click="toggleAttrValue(index, 0)">
                                        <span class="attribute-assigned-name">{{ section2Items[0].name }}</span>
                                        <p>{{ row.newSelected || 'Select...' }}</p>
                                        <div class="show-available-values-outer" v-if="row.isFirstAttrValueClicked">
                                            <span>"{{ section2Items[0].name }}" Values</span>
                                            <ul class="show-available-values"
                                                @click="getValueSelection(index, 0, $event)">
                                                <li v-for="item in section2Items[0].value" :key="item">{{ item }}</li>
                                            </ul>
                                        </div>
                                    </span>
                                    <i class="m-plus-alt"></i>
                                    <span class="placeholder" :class="{ 'attribute-value-assigned': row.newSelected2 }"
                                        @click="toggleAttrValue(index, 1)">
                                        <span class="attribute-assigned-name">{{ section2Items[1].name }}</span>
                                        <p>{{ row.newSelected2 || 'Select...' }}</p>
                                        <div class="show-available-values-outer" v-if="row.isSecondAttrValueClicked">
                                            <span>"{{ section2Items[1].name }}" Values</span>
                                            <ul class="show-available-values"
                                                @click="getValueSelection(index, 1, $event)">
                                                <li v-for="item in section2Items[1].value" :key="item">{{ item }}</li>
                                            </ul>
                                        </div>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <input type="number" v-model.number="row.singleValueStock" name="attributeValue" min="0"
                                    placeholder="Stock" @change="validateStock">
                            </td>
                            <td>
                                <input type="number" v-model.number="row.singleValueAmount" name="attributeAmount"
                                    min="0" :placeholder="defaultPrice.toString()" @change="updateAttributes">
                            </td>
                        </tr>
                        <tr class="last-Tr-entry">
                            <td colspan="3" class="new-row-item">
                                <button @click="createNewTr" type="button" class="create-row-button">
                                    <i class="m-plus"></i>
                                </button>
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();
const accessToken = useCookie<string | null>('access');

interface Item {
    id: number;
    name: string;
    value: string[];
}

interface Props {
    buyPrice: number;
    sellPrice: number;
    discountPrice: number;
    productCurrency: string;
    stock: number;
}

const foreignKeys = defineProps<Props>();
const emit = defineEmits(['sendGenerateJSON']);

// Price handling
const defaultPrice = computed(() => {
    return foreignKeys.sellPrice > (foreignKeys.discountPrice || foreignKeys.sellPrice)
        ? foreignKeys.discountPrice
        : foreignKeys.sellPrice;
});
const currentPrice = ref<number>(defaultPrice.value);

// Reactive variables
const inputValue = ref<string>('');
const showDropdown = ref<boolean>(false);
const isAddCatClicked = ref<boolean>(false);
const newCatName = ref<string>('');
const comboBoxContainer = ref<HTMLElement | null>(null);
const newAddCat = ref<HTMLElement | null>(null);
const options = ref<string[]>([]);
const isSelected = ref(false);
const isPlusClicked = ref<boolean>(false);
const selectedAttr = ref('');
const newAttrName = ref('');
const selectedValues = ref<string[]>([]);
const currectAttr = ref<string>();
const section1Items = ref<Item[]>([]);
const section2Items = ref<Item[]>([]);
const dragging = ref(false);
const lastDraggedId = ref<number | null>(null);
const singleAttributeStocks = ref<number[]>([]);
const singleAttributeAmount = ref<number[]>([]);

// Rows for multiple attributes
const rows = ref<{
    isFirstAttrValueClicked: boolean;
    isSecondAttrValueClicked: boolean;
    isValueSelectedNow: boolean;
    newSelected: string;
    newSelected2: string;
    singleValueStock: number;
    singleValueAmount: number;
}[]>([]);

// Initialize first row with currentPrice as default
const initRow = () => ({
    isFirstAttrValueClicked: false,
    isSecondAttrValueClicked: false,
    isValueSelectedNow: false,
    newSelected: '',
    newSelected2: '',
    singleValueStock: 0,
    singleValueAmount: currentPrice.value
});

rows.value = [initRow()];
const isLastTr = ref(true);

// Stock validation function
const validateStock = () => {
    let totalStock = 0;
    if (section2Items.value.length === 1) {
        totalStock = singleAttributeStocks.value.reduce((sum, stock) => sum + (stock || 0), 0);
    } else if (section2Items.value.length === 2) {
        totalStock = rows.value.reduce((sum, row) => sum + (row.singleValueStock || 0), 0);
    }

    if (totalStock !== foreignKeys.stock) {
        toast.error(`Total stock (${totalStock}) must equal ${foreignKeys.stock}`);
        return false;
    } else {
        toast.success(`Stock matches: ${totalStock}`);
        return true;
    }
};

// Emit updated JSON whenever attributes change
const updateAttributes = () => {
    const json = generateJSON();
    emit('sendGenerateJSON', json); // Emit the JSON object directly
};

const filteredOptions = computed(() => {
    const query = inputValue.value.toLowerCase();
    if (!inputValue.value) isSelected.value = true;
    return options.value.filter(option => option.toLowerCase().includes(query));
});

const toggleAttrValue = (index: number, attrIndex: number) => {
    if (attrIndex === 0) {
        rows.value[index].isFirstAttrValueClicked = !rows.value[index].isFirstAttrValueClicked;
    } else {
        rows.value[index].isSecondAttrValueClicked = !rows.value[index].isSecondAttrValueClicked;
    }
};

const getValueSelection = (index: number, attrIndex: number, event: Event) => {
    const currentClicked = event.target as HTMLElement;
    if (currentClicked) {
        if (attrIndex === 0) {
            rows.value[index].newSelected = currentClicked.textContent || '';
            rows.value[index].isValueSelectedNow = true;
            rows.value[index].isFirstAttrValueClicked = false;
        } else {
            rows.value[index].newSelected2 = currentClicked.textContent || '';
            rows.value[index].isValueSelectedNow = true;
            rows.value[index].isSecondAttrValueClicked = false;
        }
        updateAttributes();
    }
};

const createNewTr = () => {
    rows.value.push(initRow());
    updateAttributes();
};

// Updated watch to initialize with currentPrice and emit
watch(section2Items, (newItems) => {
    if (newItems.length === 1) {
        singleAttributeStocks.value = new Array(newItems[0].value.length).fill(0);
        singleAttributeAmount.value = new Array(newItems[0].value.length).fill(currentPrice.value);
    } else if (newItems.length === 2) {
        rows.value = [initRow()];
    }
    updateAttributes();
}, { deep: true });

let allAttrs = ref<Attribute[]>([]);
let attributeJSONValues = ref<AttrValues[]>([]);

interface Attribute {
    name: string;
    attr_values: string;
}

interface AttrValues {
    name: string;
}

const selectOption = (option: string): void => {
    inputValue.value = option;
    showDropdown.value = false;
    isSelected.value = true;
    const names = allAttrs.value;
    names.forEach(name => {
        if (name.name === option) {
            currectAttr.value = name.name;
            attributeJSONValues.value = Object.values(name.attr_values).map(value => ({ name: value }));
        }
    });
    updateAttributes();
};

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        inputValue.value = '';
        isSelected.value = true;
        showDropdown.value = false;
    }
};

const closeDropdown = (event: MouseEvent): void => {
    if (comboBoxContainer.value && !comboBoxContainer.value.contains(event.target as Node)) {
        showDropdown.value = false;
    }
};

const newAttNameBtn = async (): Promise<void> => {
    if (!newCatName.value.trim()) {
        toast.error('Please enter a Attribute name');
        return;
    }
    for (const option of filteredOptions.value) {
        if (option.trim() === newCatName.value.trim()) {
            toast.error('Duplicate Attribute name');
            return;
        }
    }
    try {
        await $fetch('http://192.168.0.111:3000/api/add_attribute', {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
            body: { name: newCatName.value },
        });
        toast.success(`You have added "${newCatName.value}"`);
        getAttrs();
        isAddCatClicked.value = false;
        newCatName.value = '';
        isSelected.value = true;
        updateAttributes();
    } catch {
        toast.error('There was an error. Contact KEHEM IT');
    }
};

const newAttrValClick = async (): Promise<void> => {
    if (!newAttrName.value.trim()) {
        toast.error('Please enter an attribute value name');
        return;
    }
    for (const option of attributeJSONValues.value) {
        if (option.name.trim() === newAttrName.value.trim()) {
            toast.error('Duplicate Attribute value');
            return;
        }
    }
    try {
        await $fetch('http://192.168.0.111:3000/api/add_attrval', {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
            body: { attr: selectedAttr.value, val: newAttrName.value },
        });
        toast.success(`You have successfully added "${newAttrName.value}"`);
        await getAttrs();
        const selected = allAttrs.value.find(attr => attr.name === selectedAttr.value);
        if (selected) {
            attributeJSONValues.value = Object.values(selected.attr_values).map(value => ({ name: value }));
        }
        selectedAttr.value = '';
        newAttrName.value = '';
        isPlusClicked.value = false;
        updateAttributes();
    } catch {
        toast.error("Something went wrong!");
    }
};

const getAttrs = async (): Promise<void> => {
    try {
        const { data: attributes } = await useFetch<Attribute[]>('http://192.168.0.111:3000/api/attributes', {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
        });
        if (attributes.value) {
            allAttrs.value = attributes.value;
            options.value = attributes.value.map((attr) => attr.name);
        }
        updateAttributes(); // Emit after fetching attributes
    } catch (error) {
        console.error('Error fetching attributes:', error);
        toast('Error fetching attributes');
    }
};
getAttrs();
let arrayList: Record<string, string[]> = {};

watch([selectedValues, currectAttr], ([newValue, currentName]) => {
    if (currentName) {
        arrayList[currentName] = [...newValue];
        section1Items.value = Object.keys(arrayList).map((key, index) => ({
            id: index + 1,
            name: key,
            value: arrayList[key],
        }));
        updateAttributes();
    }
});

watch([currectAttr, currentPrice], ([newAttr, newPrice], [oldAttr, oldPrice]) => {
    selectedValues.value = [];
    console.log(currentPrice.value);
    updateAttributes();
});

const onDragStart = (event: any) => {
    lastDraggedId.value = event.item.__draggable_context.element.id;
};

const onDragEnd = () => {
    dragging.value = false;
    setTimeout(() => lastDraggedId.value = null, 500);
    updateAttributes();
};

const generateJSON = () => {
    const attributes: Record<string, Record<string, [number, number]>> = {};

    // Optional attributes
    section1Items.value.forEach((item) => {
        if (item?.name && item?.value?.length) {
            const valueMap: Record<string, [number, number]> = {};
            item.value.forEach((val) => {
                valueMap[val] = [0, 0];
            });
            attributes[item.name] = valueMap;
        }
    });

    // Mandatory attributes
    section2Items.value.forEach((item) => {
        if (item?.name && item?.value?.length) {
            const valueMap: Record<string, [number, number]> = {};
            if (section2Items.value.length === 1) {
                item.value.forEach((value, i) => {
                    const stock = singleAttributeStocks.value[i] || 0;
                    const amount = singleAttributeAmount.value[i] || currentPrice.value;
                    valueMap[value] = [stock, amount];
                });
            } else if (section2Items.value.length === 2) {
                rows.value.forEach((row) => {
                    if (row.newSelected && row.newSelected2) {
                        const key = `${row.newSelected}-${row.newSelected2}`;
                        const stock = row.singleValueStock || 0;
                        const amount = row.singleValueAmount || currentPrice.value;
                        valueMap[key] = [stock, amount];
                    }
                });
            }
            attributes[item.name] = valueMap;
        }
    });

    return { "attributes": attributes };
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
    getAttrs();
    updateAttributes(); // Initial emit
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>