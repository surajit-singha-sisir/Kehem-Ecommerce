<template>
    <section class="w-100">
        <button class="btn btn-warning m--10" @click="goBack">Go Back</button>
        <button class="btn btn-happy m--10" @click="goForward">Go Forward</button> <br>
        <!-- ADD PRODUCT START -->
        <form @submit.prevent="addProduct" method="post" id="addProductForm" class="product add-product gap-10"
            enctype="multipart/form-data">


            <!-- LEFT COLUMN -->
            <aside class="relative">

                <!-- PRODUCT TITLE -->
                <section class="relative f-res f-col gap-10 v-space">
                    <label for="product-title" class="star" id="product-title">Product Title</label>
                    <input type="text" name="title" id="product-title" placeholder="Type the title of the product"
                        required>
                </section>

                <Category :POSTCat="category" @update:POSTCat="updateCategory" />

                <!-- PRICE -->
                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10" id="productPrices">
                    <legend class="thislegend star">Product Pricing</legend>

                    <!-- Buy Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="buyPrice" placeholder="Buy Price"
                            v-model.number="buyPrice">
                    </div>
                    <!-- Sell Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="sellPrice" placeholder="Sell Price"
                            v-model.number="sellPrice">
                    </div>
                    <!-- Discount Price -->
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="discountPrice" placeholder="Discount Price"
                            v-model.number="discountPrice">
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
                            <input class="min-w--20" name="stock" v-model.number="totalStock" type="number"
                                id="addProductTotalStock" placeholder="Total Quantity">
                            <div class="option">
                                <select name="stockUnit" id="addProductStockUnit" v-model.trim="addProductStockUnit"
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
                    <!-- <Attributes :stock="totalStock" :buyPrice="buyPrice" :sellPrice="sellPrice"
                        :discountPrice="discountPrice" :productCurrency="productPricingCurrency"
                        @sendGenerateJSON="attributes" /> -->
                    <Attributes :stock="totalStock" :buyPrice="buyPrice" :sellPrice="sellPrice"
                        :discountPrice="discountPrice" :productCurrency="productPricingCurrency"
                        @sendGenerateJSON="attributes" />

                </fieldset>

                <!-- DESCRIPTION -->
                <SummerNote />
                <!-- BENEFITS -->
                <Benefits />
                <!-- DOSAGES -->
                <Dosages />
                <!-- Ingredients -->
                <Ingredients v-model:ingredients="ingredientsData" />

                <!-- FAQ -->
                <section class="e-faqs" id="faqContainer">
                    <span class="text--m star">Frequently Ask Questions (FAQ)</span>
                    <div class="e-faqInputs" id="e-faqInputs">
                        <!-- INPUT BOXES -->
                        <input type="text" v-model="faqInputTitle" class="e-questionInput" id="e-questionInput"
                            placeholder="Question" />
                        <textarea id="e-answerInput" class="e-answerInput" v-model="faqInputDescription"
                            placeholder="Answer"></textarea>
                        <!-- ADD BUTTON -->
                        <button class="btn btn-primary w--100 m-auto" type="button" @click="faqAddBtn">Add</button>
                    </div>
                    <div class="e-faq-preview" :class="{ 'hide': !isAddFaqClicked }">
                        <!-- PREVIEW -->
                        <span class="text--m b darkBlue">FAQ Preview</span>
                        <div class="e-faq-preview-box">
                            <!-- FAQ LIST -->
                            <span v-for="(faq, index) in faqList" :key="index" class="added-faq"
                                :class="faq.animationClass">
                                <i class="e-faq-counter">{{ index + 1 }}</i>
                                <div class="e-faq-content">
                                    <h4 class="added-question">{{ faq.title }}</h4>
                                    <p class="added-answer">{{ faq.description }}</p>
                                </div>
                                <i class="m-compose" title="Edit FAQ" @click="editFaq(index)"></i>
                                <i class="m-bin" title="Delete FAQ" @click="deleteFaq(index)"></i>
                            </span>
                        </div>
                    </div>
                </section>


                <!-- TAGS -->
                <section class="e-tags" ref="tagContainer">
                    <span class="text--m star">Tags</span>
                    <ul class="e-tag-list" ref="eTagList">
                        <!--  ref="eTagList" => JSON  -->

                        <!-- <li>
                            <p>Bottle</p>
                            <i class="m-m-cross"></i>
                        </li> -->

                    </ul>
                    <!-- INPUT BOX -->
                    <input type="text" v-model="inputBox" @keydown="inputKeyboardTrigger" class="e-addTagInput"
                        placeholder="Add a new tag" />
                </section>


            </aside>
            <ProductImages v-model:images="productImageUrls" />





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
import type { Ref } from 'vue';
import { _descriptors } from "chart.js/helpers";

const toast = useToast();
const accessToken = useCookie<string | null>('access');

// REFS
const buyPriceInput = ref('');
const category = ref('');
const totalStock = ref<number>(0);
const buyPrice = ref<number>(0);
const sellPrice = ref<number>(0);
const discountPrice = ref<number>(0);
const productPricingCurrency = ref('taka');
const addProductStockUnit = ref('Piece');
const inputBox = ref<string>('');
const eTagList = ref<HTMLElement | null>(null);
let generateJSONFunc = ref<(() => any) | null>(null);
const ingredientsData = ref<string[][]>([]);
const productImageUrls = ref<string[]>([]);


// NAVIGATION
const goBack = () => window.history.back();
const goForward = () => window.history.forward();

// CATEGORY
const updateCategory = (newCategory: string) => {
    category.value = newCategory;
    console.log(newCategory);
};

// ATTRIBUTES
const attributes = (json: any) => {
    generateJSONFunc.value = () => json;
};






// TAG MANAGEMENT
const tagChecker = (tag: string, list: HTMLElement | null): boolean =>
    list ? Array.from(list.children).some(li => li.textContent === tag) : false;

const hasSpecialChars = (tag: string): boolean => /[^a-zA-Z0-9 ]/.test(tag);

const inputKeyboardTrigger = (event: KeyboardEvent): void => {
    if (!['Tab', 'Enter', ','].includes(event.key)) return;

    event.preventDefault();
    const tagValue = inputBox.value.trim();
    if (!tagValue) return;

    if (tagChecker(tagValue, eTagList.value)) {
        toast.error('Tag already exists');
        return;
    }

    if (hasSpecialChars(tagValue)) {
        toast.error('Tag contains special characters');
        return;
    }

    if (tagValue.length < 3) {
        toast.error('Tag must be at least 3 characters long');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `<p>${tagValue}</p><i class="m-m-cross"></i>`;
    eTagList.value?.appendChild(li);

    // Delete handler
    li.querySelector('i')?.addEventListener('click', () => li.remove());

    // Edit handler
    const tagText = li.querySelector('p');
    li.addEventListener('dblclick', () => {
        if (!tagText) return;
        tagText.contentEditable = 'true';
        tagText.focus();

        const finishEditing = () => {
            tagText.contentEditable = 'false';
            const newTag = tagText.textContent?.trim();
            if (newTag) tagText.textContent = newTag;
        };

        tagText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            }
        });
        tagText.addEventListener('blur', finishEditing, { once: true });
    });

    inputBox.value = '';
};

// FAQ MANAGEMENT
interface FAQ {
    title: string;
    description: string;
    animationClass: string;
}

const faqInputTitle = ref<string>('');
const faqInputDescription = ref<string>('');
const isAddFaqClicked = ref(false);
const faqList = ref<FAQ[]>([]);
const currentEditIndex = ref<number | null>(null);

const validateFAQ = (): boolean => {
    const titleLen = faqInputTitle.value.length;
    const descLen = faqInputDescription.value.length;

    if (!titleLen || titleLen < 10 || titleLen > 100) {
        toast.error('Question must be between 10 and 100 characters.');
        return false;
    }

    if (!descLen || descLen < 20 || descLen > 200) {
        toast.error('Answer must be between 20 and 200 characters.');
        return false;
    }

    if (faqList.value.some(faq => faq.title.toLowerCase() === faqInputTitle.value.toLowerCase())) {
        toast.error('This question already exists.');
        return false;
    }

    return true;
};

const faqAddBtn = () => {
    isAddFaqClicked.value = true;
    if (!validateFAQ()) return;

    const newFAQ: FAQ = {
        title: faqInputTitle.value,
        description: faqInputDescription.value,
        animationClass: currentEditIndex.value !== null ? 'bounce-edit' : 'bounce-add',
    };

    if (currentEditIndex.value !== null) {
        faqList.value[currentEditIndex.value] = newFAQ;
        currentEditIndex.value = null;
    } else {
        faqList.value.push(newFAQ);
    }

    faqInputTitle.value = '';
    faqInputDescription.value = '';
    toast.success('You have added a new FAQ');


};

const editFaq = (index: number) => {
    const faq = faqList.value[index];
    faqInputTitle.value = faq.title;
    faqInputDescription.value = faq.description;
    currentEditIndex.value = index;
    faq.animationClass = 'bounce-edit';
};

const deleteFaq = (index: number) => {
    faqList.value[index].animationClass = 'bounce-delete';
    setTimeout(() => {
        faqList.value.splice(index, 1);
        if (!faqList.value.length) isAddFaqClicked.value = false;
    }, 500);
};








const addProduct = async () => {
    const form = document.querySelector('#addProductForm') as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    formData.append('category', category.value);

    if (generateJSONFunc.value) {
        formData.append('attributes', JSON.stringify(generateJSONFunc.value()));
    }

    const faqsArray = faqList.value.map(faq => [faq.title, faq.description]);
    formData.append('faqs', JSON.stringify(faqsArray));

    if (eTagList.value) {
        const tagsArray = Array.from(eTagList.value.children)
            .map(li => li.querySelector('p')?.textContent?.trim() || '')
            .filter(tag => tag !== '');
        formData.append('tags', JSON.stringify(tagsArray));
    }

    if (ingredientsData.value.length > 0) {
        formData.append('ingredients', JSON.stringify(ingredientsData.value));
    }

    if (productImageUrls.value.length > 0) {
        formData.append('images', JSON.stringify(productImageUrls.value));
    }

    if (process.env.NODE_ENV === 'development') {
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }

    try {
        const response = await fetch('http://192.168.0.111:3000/api/product_create', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Product created successfully:', result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};
</script>