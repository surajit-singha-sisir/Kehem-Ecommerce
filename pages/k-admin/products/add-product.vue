<template>
    <section class="w-100">
        <form @submit.prevent="addProduct" method="post" id="addProductForm" class="product add-product gap-10"
            enctype="multipart/form-data">
            <aside class="relative">
                <section class="relative f-res f-col gap-10 v-space">
                    <label for="product-title" class="star" id="product-title">Product Title</label>
                    <input type="text" name="title" id="product-title" placeholder="Type the title of the product"
                        v-model="productTitle" required>
                </section>

                <Category :POSTCat="category" @update:POSTCat="updateCategory" />

                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10" id="productPrices">
                    <legend class="thislegend star">Product Pricing</legend>
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="buyPrice" placeholder="Buy Price"
                            v-model.number="buyPrice">
                    </div>
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="sellPrice" placeholder="Sell Price"
                            v-model.number="sellPrice">
                    </div>
                    <div class="text-input" id="text-input">
                        <input type="number" class="inputbox" name="discountPrice" placeholder="Discount Price"
                            v-model.number="discountPrice">
                    </div>
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

                <fieldset class="attributes w-100 f f-col f-just-center b-e pad--10 bg-3 m-tb--10">
                    <legend>Attributes</legend>
                    <Attributes :stock="totalStock" :buyPrice="buyPrice" :sellPrice="sellPrice"
                        :discountPrice="discountPrice" :productCurrency="productPricingCurrency"
                        @sendGenerateJSON="attributes" />
                </fieldset>

                <Description v-model="description" />
                <Benefits v-model="benefits" />
                <Dosages v-model="dosages" />
                <Ingredients v-model:ingredients="ingredientsData" />

                <section class="e-faqs" id="faqContainer">
                    <span class="text--m star">Frequently Ask Questions (FAQ)</span>
                    <div class="e-faqInputs" id="e-faqInputs">
                        <input type="text" v-model="faqInputTitle" class="e-questionInput" id="e-questionInput"
                            placeholder="Question" />
                        <textarea id="e-answerInput" class="e-answerInput" v-model="faqInputDescription"
                            placeholder="Answer"></textarea>
                        <button class="btn btn-primary w--100 m-auto" type="button" @click="faqAddBtn">Add</button>
                    </div>
                    <div class="e-faq-preview" :class="{ 'hide': !isAddFaqClicked }">
                        <span class="text--m b darkBlue">FAQ Preview</span>
                        <div class="e-faq-preview-box">
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

                <section class="e-tags" ref="tagContainer">
                    <span class="text--m star">Tags</span>
                    <ul class="e-tag-list" ref="eTagList"></ul>
                    <input type="text" v-model="inputBox" @keydown="inputKeyboardTrigger" class="e-addTagInput"
                        placeholder="Add a new tag" />
                </section>
            </aside>
            <ProductImages v-model:images="productImageUrls" />

            <section class="submitForm">
                <input type="submit" value="Submit" class="btn btn-primary w--200">
            </section>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const accessToken = useCookie<string | null>('access');

// REFS
const productTitle = ref('');
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
const description = ref<string>('');

// FAQ REFS
const faqInputTitle = ref<string>('');
const faqInputDescription = ref<string>('');
const isAddFaqClicked = ref(false);
const faqList = ref<FAQ[]>([]);
const currentEditIndex = ref<number | null>(null);
const dosages = ref<string>('');
const benefits = ref<string>('');

// NAVIGATION
const goBack = () => window.history.back();
const goForward = () => window.history.forward();

// CATEGORY
const updateCategory = (newCategory: string) => {
    category.value = newCategory;
    saveToLocalStorage('category', newCategory);
};

// ATTRIBUTES
const attributes = (json: any) => {
    generateJSONFunc.value = () => json;
    saveToLocalStorage('attributes', json);
};

// LOCAL STORAGE FUNCTIONS
const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(`product_${key}`, JSON.stringify(value));
};

const loadFromLocalStorage = () => {
    productTitle.value = JSON.parse(localStorage.getItem('product_title') || '""');
    category.value = JSON.parse(localStorage.getItem('product_category') || '""');
    totalStock.value = JSON.parse(localStorage.getItem('product_totalStock') || '0');
    buyPrice.value = JSON.parse(localStorage.getItem('product_buyPrice') || '0');
    sellPrice.value = JSON.parse(localStorage.getItem('product_sellPrice') || '0');
    discountPrice.value = JSON.parse(localStorage.getItem('product_discountPrice') || '0');
    productPricingCurrency.value = JSON.parse(localStorage.getItem('product_currency') || '"taka"');
    addProductStockUnit.value = JSON.parse(localStorage.getItem('product_stockUnit') || '"Piece"');
    ingredientsData.value = JSON.parse(localStorage.getItem('product_ingredients') || '[]');
    benefits.value = JSON.parse(localStorage.getItem('product_benefits') || '""');
    dosages.value = JSON.parse(localStorage.getItem('product_dosages') || '""');
    productImageUrls.value = JSON.parse(localStorage.getItem('product_images') || '[]');
    description.value = JSON.parse(localStorage.getItem('product_description') || '""');
    const savedFaqs = JSON.parse(localStorage.getItem('product_faqs') || '[]');
    faqList.value = savedFaqs;
    isAddFaqClicked.value = savedFaqs.length > 0;
    const attrs = JSON.parse(localStorage.getItem('product_attributes') || 'null');
    if (attrs) generateJSONFunc.value = () => attrs;

    const savedTags = JSON.parse(localStorage.getItem('product_tags') || '[]');
    if (eTagList.value && savedTags.length > 0) {
        eTagList.value.innerHTML = '';
        savedTags.forEach((tag: string) => addTagToList(tag));
    }
};

const clearLocalStorage = () => {
    Object.keys(localStorage)
        .filter(key => key.startsWith('product_'))
        .forEach(key => localStorage.removeItem(key));
};

// WATCHERS TO SAVE DATA
watch(productTitle, (newVal) => saveToLocalStorage('title', newVal));
watch(totalStock, (newVal) => saveToLocalStorage('totalStock', newVal));
watch(buyPrice, (newVal) => saveToLocalStorage('buyPrice', newVal));
watch(sellPrice, (newVal) => saveToLocalStorage('sellPrice', newVal));
watch(discountPrice, (newVal) => saveToLocalStorage('discountPrice', newVal));
watch(productPricingCurrency, (newVal) => saveToLocalStorage('currency', newVal));
watch(addProductStockUnit, (newVal) => saveToLocalStorage('stockUnit', newVal));
watch(dosages, (newVal) => saveToLocalStorage('dosages', newVal));
watch(benefits, (newVal) => saveToLocalStorage('benefits', newVal));
watch(ingredientsData, (newVal) => saveToLocalStorage('ingredients', newVal), { deep: true });
watch(productImageUrls, (newVal) => saveToLocalStorage('images', newVal), { deep: true });
watch(description, (newVal) => saveToLocalStorage('description', newVal));
watch(faqList, (newVal) => saveToLocalStorage('faqs', newVal), { deep: true });

// TAG MANAGEMENT
const tagChecker = (tag: string, list: HTMLElement | null): boolean =>
    list ? Array.from(list.children).some(li => li.textContent === tag) : false;

const hasSpecialChars = (tag: string): boolean => /[^a-zA-Z0-9 ]/.test(tag);

const addTagToList = (tagValue: string) => {
    if (!eTagList.value) return;

    const li = document.createElement('li');
    li.innerHTML = `<p>${tagValue}</p><i class="m-m-cross"></i>`;
    eTagList.value.appendChild(li);

    li.querySelector('i')?.addEventListener('click', () => {
        li.remove();
        updateTagsInStorage();
    });

    const tagText = li.querySelector('p');
    li.addEventListener('dblclick', () => {
        if (!tagText) return;
        tagText.contentEditable = 'true';
        tagText.focus();

        const finishEditing = () => {
            tagText.contentEditable = 'false';
            const newTag = tagText.textContent?.trim();
            if (newTag) tagText.textContent = newTag;
            updateTagsInStorage();
        };

        tagText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            }
        });
        tagText.addEventListener('blur', finishEditing, { once: true });
    });

    updateTagsInStorage();
};

const updateTagsInStorage = () => {
    if (eTagList.value) {
        const tagsArray = Array.from(eTagList.value.children)
            .map(li => li.querySelector('p')?.textContent?.trim() || '')
            .filter(tag => tag !== '');
        saveToLocalStorage('tags', tagsArray);
    }
};

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

    addTagToList(tagValue);
    inputBox.value = '';
};

// FAQ MANAGEMENT
interface FAQ {
    title: string;
    description: string;
    animationClass: string;
}

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
    saveToLocalStorage('faqs', faqList.value);
};

const deleteFaq = (index: number) => {
    faqList.value[index].animationClass = 'bounce-delete';
    setTimeout(() => {
        faqList.value.splice(index, 1);
        if (!faqList.value.length) isAddFaqClicked.value = false;
        saveToLocalStorage('faqs', faqList.value);
    }, 500);
};

// FORM SUBMISSION
const addProduct = async () => {
    const form = document.querySelector('#addProductForm') as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    formData.append('category', category.value);
    formData.append('description', description.value);
    formData.append('dosages', dosages.value);
    formData.append('benefits', benefits.value);

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

        clearLocalStorage();
        toast.success('Product created successfully!');
        router.push('/k-admin/products/manage-products');

    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to create product');
    }
};

// LOAD DATA ON MOUNT
onMounted(() => {
    loadFromLocalStorage();
});
</script>