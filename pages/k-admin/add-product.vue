<template>
    <section class="w-100">
        <button class="btn btn-warning m--10" @click="goBack">Go Back</button>
        <button class="btn btn-happy m--10" @click="goForward">Go Forward</button> <br>
        <!-- ADD PRODUCT START -->
        <form @submit.prevent="addProduct" id="addProductForm" class="product add-product gap-10"
            enctype="multipart/form-data">


            <!-- LEFT COLUMN -->
            <aside class="relative">

                <!-- PRODUCT TITLE -->
                <section class="relative f-res f-col gap-10 v-space">
                    <label for="product-title" class="star" id="product-title">Product Title</label>
                    <input type="text" name="product-title" id="product-title"
                        placeholder="Type the title of the product">
                </section>

                <!-- CATEGORY CHOICE-->
                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10">
                    <legend class="thislegend star">Category</legend>

                    <!-- CATEGORY VIEW -->
                    <div class="combo-box" ref="comboBoxContainer">
                        <div class="Combo-inputbox" :class="{ 'clicked': showDropdown }">
                            <input v-model="inputValue" type="text" class="combo-input"
                                placeholder="Search or select..." @click="showDropdown = true"
                                @keydown="handleKeydown" />
                        </div>

                        <ul v-if="showDropdown" class="new-combo-options">
                            <li v-for="option in filteredOptions" :key="option" class="combo-option"
                                @click="selectOption(option)">
                                {{ option }}
                            </li>
                            <li class="btn btn-primary w-100" @click="isAddCatClicked = !isAddCatClicked">
                                <i class="m-plus2">New</i>
                            </li>
                        </ul>

                        <!-- ADD CATEGORY -->
                        <aside :class="{ 'hide': !isAddCatClicked }"
                            class="absolute lb-0 bg-White b-1 border-all f-centered f-col gap-10 z-10">
                            <i @click="isAddCatClicked = !isAddCatClicked"
                                class="absolute tr-02 btn btn-fire btn-sm z-1 m-x1 btn-rounded"></i>
                            <input type="text" class="m-t--15" v-model="newCatName" id="newCatName"
                                placeholder="Category Name">
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

                <!-- PRICE -->
                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10" id="productPrices">
                    <legend class="thislegend star">Product Pricing</legend>

                    <!-- Buy Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="buyPrice" placeholder="Buy Price"
                            v-model="productBuyPrice">
                    </div>
                    <!-- Sell Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="sellPrice" placeholder="Sell Price"
                            v-model="productSellPrice">
                    </div>
                    <!-- Discount Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="discountPrice" placeholder="Discount Price"
                            v-model="productDiscountPrice">
                    </div>

                    <!-- UNIT -->
                    <div class="option">
                        <select class="bg-Currency currency" v-model="productPricingCurrency" name="priceUnit" disabled>
                            <option value="taka" target-currency="৳">৳ Taka</option>
                            <option value="dollar" target-currency="$">$ Dollar</option>
                            <option value="rupee" target-currency="₹">₹ Rupee</option>
                            <option value="euro" target-currency="€">€ Euro</option>
                            <option value="pound" target-currency="£">£ Pound</option>
                            <option value="yuan" target-currency="¥">¥ Yuan</option>
                        </select>
                    </div>
                </fieldset>

                <!-- STOCK -->
                <section class="w-100 f f-just-center b-e pad--10 bg-3" id="productStock">
                    <div class="f-res f-align-items-center f-just-center gap-10 w-80">
                        <span class="f-0 text--m star">Stock</span>
                        <div class="select-option-1">
                            <input class="min-w--20" name="stock" type="number" id="addProductTotalStock"
                                placeholder="Total Quantity">
                            <div class="option">
                                <select name="stockUnit" id="addProductStockUnit" v-model="addProductStockUnit"
                                    disabled>
                                    <option value="Piece">Piece</option>
                                    <option value="Packet">Packet</option>
                                    <option value="Box">Box</option>
                                    <option value="Carton">Carton</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ATTRIBUTES -->
                <fieldset class="attributes w-100 f f-col f-just-center b-e pad--10 bg-3 m-tb--10">
                    <legend>Atributes</legend>

                    <!-- SELECT ATTRIBUTE -->
                    <div class="pad--10 b-b-e m-b--10">

                        <!-- CATEGORY VIEW -->
                        <div class="combo-box" ref="comboBoxContainer">
                            <div class="Combo-inputbox" :class="{ 'clicked': showDropdown }">
                                <input v-model="inputValue" type="text" class="combo-input"
                                    placeholder="Search or select..." @click="showDropdown = true"
                                    @keydown="handleKeydown" />
                            </div>

                            <ul v-if="showDropdown" class="new-combo-options">
                                <li v-for="option in filteredOptions" :key="option" class="combo-option"
                                    @click="selectOption(option)">
                                    {{ option }}
                                </li>
                                <li class="btn btn-primary w-100" @click="isAddCatClicked = !isAddCatClicked">
                                    <i class="m-plus2">New</i>
                                </li>
                            </ul>

                            <!-- ATTRIBUTES COMBOBOX -->
                            <aside :class="{ 'hide': !isAddCatClicked }"
                                class="absolute lb-0 bg-White b-1 border-all f-centered f-col gap-10 z-10">
                                <i @click="isAddCatClicked = !isAddCatClicked"
                                    class="absolute tr-02 btn btn-fire btn-sm z-1 m-x1 btn-rounded"></i>
                                <input type="text" class="m-t--15" v-model="newCatName" id="newCatName"
                                    placeholder="Category Name">
                                <button type="button" @click="newCatNameBtn" class="btn btn-primary">Add
                                    Category</button>
                            </aside>
                        </div>

                        <!-- ATTRIBUTE VALUES -->
                        <div class="b-e pad--10 f f-just-between f-align-items-center gap-10">
                            <section class="f f-wrap gap-10" id="attributeValues">

                            </section>
                            <div class="relative w-100">
                                <button id="addAttributeBtn" type="button"
                                    class="pad-tb--03 pad-lr--08 plus b-none bg-hov-Purple cur-pointer text--m">+</button>

                                <!-- ADD VALUE -->
                                <div id="newValueAssigning"
                                    class="absolute hide b-e bg-2 f f-col gap-10 w--150 pad--10">
                                    <!-- COMBOBOX -->
                                    <div class="combo-box">
                                        <div class="Combo-inputbox">
                                            <input type="text" id="newValueAssigningInput" class="combo-input"
                                                data-target="" placeholder="-- Atributes --" data-combo-id="combo3">
                                            <ul class="combo-options" id="newValueAssigningOptions"
                                                style="display: none;">
                                                <li class="no-data" style="display: none;">No data found!</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- INPUT VALUE -->
                                    <div class="text-input">
                                        <input type="text" id="attributeValueOption" placeholder="Variable Name">
                                    </div>
                                    <!-- SUBMIT BUTTON -->
                                    <button id="addNewAttributeValue">Submit</button>
                                </div>
                            </div>
                        </div>

                        <!-- ATTRIBUTE VALUES DETAILS -->
                        <section class="b-e pad--10 m-t--10 hide" id="attributeSection">
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
                        </section>

                    </div>
                </fieldset>

                <!-- TEXT EDITOR -->
                <section class="summernote">
                    <span class="text--m star">Description</span><br><br>
                    <textarea class="summernote" name="summerNote" id="summernote"></textarea>
                    <!-- <script>
                        $('#summernote').summernote({
                            placeholder: '1. Introduction <br><br> 2. Describe your product<br><br> <i>Add your product Images and Text Sizes to get Notice</i>',
                            tabsize: 2,
                            height: 200,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                // ['color', ['color']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture', 'video']],
                                ['view', ['codeview']]
                            ]
                        });
                    </script> -->
                </section>

                <!-- TAGS -->
                <section class="e-tags" id="e-tags">
                    <span class="text--m star">Tags</span>
                    <ul class="e-tag-list">
                        <!-- DYNAMICLLY ADD DATA -->
                        <!-- <li>
                            <p>Bottle</p>
                            <i class="m-m-cross"></i>
                        </li> -->
                    </ul>
                    <!-- INPUT BOX -->
                    <input type="text" class="e-addTagInput" placeholder="Add a new tag">
                </section>

                <!-- FAQ -->
                <section class="e-faqs" id="faqContainer">
                    <span class="text--m star">Frequently Ask Questions (FAQ)</span>
                    <div class="e-faqInputs" id="e-faqInputs">
                        <!-- INPUT BOXS -->
                        <input type="text" class="e-questionInput" id="e-questionInput" placeholder="Question">
                        <textarea name="" id="e-answerInput" class="e-answerInput" placeholder="Answer"></textarea>
                        <!-- ADD BUTTON -->
                        <button class="btn btn-primary w--100 m-auto" id="faqAddBtn">Add</button>
                    </div>
                    <div class="e-faq-preview hide" id="e-faq-preview">
                        <!-- PREVIEW -->
                        <span class="text--m b darkBlue">FAQ Preview</span>
                        <div class="e-faq-preview-box">
                            <!-- DYNAMICLLY ADD DATA -->
                        </div>
                    </div>
                </section>

            </aside>

            <!-- RIGHT COLUMN -->
            <aside class="addProductRightColumn">

                <!-- PRODUCT IMAGES -->
                <section class="e-productImage">
                    <span class="text--m productImagesTitle">Product Images <span class=" star">(0/5)</span></span>

                    <div class="pad--20 m-tb--10 fileInputBox">
                        <input type="file" name="" id="dragAndDropFile" accept=".jpg, .jpeg" multiple>
                        <p class="uploadOrDragImage">Upload or Drag Image</p>
                    </div>


                    <!-- PREVIEW IMAGES -->
                    <div class="dragable-image-container gap-10 hide">
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                    </div>
                </section>
            </aside>
            <!-- SUBMIT FORM -->
            <section class="submitForm">
                <input type="submit" value="Submit" class="btn btn-primary w--200">
            </section>
        </form>
        <!-- ADD PRODUCT END -->
    </section>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();
const accessToken = useCookie<string | null>('access');
const buyPriceInput = ref('');

const categoryOptions = <HTMLElement | null>(null);
const addProduct = () => {

}

// ADD CATEGORY
const isAddCatClicked = ref(false);

const newCatName = ref('');
const newCatNameBtn = async () => {

    if (!newCatName.value.trim()) {
        toast('Please enter a category name')
        return
    }


    try {
        await $fetch<{ message: string }>('http://192.168.0.111:3000/api/add_category', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`
            },
            body: {
                "name": newCatName.value ?? '',
            }
        });

        toast.success(`You have added  "${newCatName.value}"`)
    } catch {
        toast('Your Category Name is duplicate or Error on Server')
    }
}



// BACK AND FORWARD
const goBack = () => {
    window.history.back();
};

const goForward = () => {
    window.history.forward();
};




// GET CATEGORY
interface Category {
    name: string;
}

const options = ref<string[]>([]); // FOREIGN
const getCats = async () => {
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
// COMPILE ON TIME
getCats();

onMounted(() => {

    // COMPILE AFTER RELOAD
    window.addEventListener('load', getCats);
    return () => {
        window.removeEventListener('load', getCats);
    };
})


const inputValue = ref<string>('');
const isInputClicked = ref<boolean>(false);
const showDropdown = ref<boolean>(false);
// OPTIONS VARIABLE INHERIT

const comboBoxContainer = ref<HTMLElement | null>(null);

const filteredOptions = computed(() => {
    const query = inputValue.value.toLowerCase();
    return options.value.filter(option =>
        option.toLowerCase().includes(query)
    );
});

const selectOption = (option: string): void => {
    inputValue.value = option;
    showDropdown.value = false;
    isInputClicked.value = true;

    console.log(inputValue.value);

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
        isAddCatClicked.value = true
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});




const productBuyPrice = ref('')
const productSellPrice = ref('')
const productDiscountPrice = ref('')
const productPricingCurrency = ref('taka')
const addProductStockUnit = ref('Piece')




</script>
