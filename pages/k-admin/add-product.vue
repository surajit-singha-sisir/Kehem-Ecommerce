<style>
.e-tags .e-tag-list li {
    animation: bounce 1s ease;
}

.e-tags .e-tag-list li p[contenteditable="true"]:focus-visible {
    outline: none;
    background-color: #ffffff;
    border-radius: 1rem;
    color: #000;
}




.added-faq {
    position: relative;
    transition: all 0.3s ease-in-out;
}

.bounce-add {
    animation: bounce 1s ease;
}

.bounce-delete {
    animation: fade-out-bounce 0.5s ease-out forwards;
}

.bounce-edit {
    animation: bounce-edit 0.5s ease-out;
}

@keyframes fade-out-bounce {
    0% {
        opacity: 1;
    }

    40% {
        transform: scale(1.1);
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: scale(0);
    }
}

@keyframes bounce-edit {
    0% {
        background-color: transparent;
        transform: scale(1);
    }

    50% {
        background-color: #e6e6e6;
        transform: scale(1.1);
    }

    100% {
        background-color: transparent;
        transform: scale(1);
    }
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    20% {
        transform: translateY(-10px);
    }

    40% {
        transform: translateY(0);
    }

    60% {
        transform: translateY(-5px);
    }

    80% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
    }
}
</style>

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

                <Category />

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
                    <Attributes :stock="totalStock" :buyPrice="buyPrice" :sellPrice="sellPrice"
                        :discountPrice="discountPrice" :productCurrency="productPricingCurrency" />

                </fieldset>

                <!-- TEXT EDITOR -->
                <SummerNote />

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
                        <button class="btn btn-primary w--100 m-auto" @click="faqAddBtn">Add</button>
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




            </aside>
            <ProductImages />




            
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
// BACK AND FORWARD
const goBack = () => {
    window.history.back();
};

const goForward = () => {
    window.history.forward();
};
const addProduct = () => { }




const totalStock = ref<number>(0);
const buyPrice = ref<number>(0);
const sellPrice = ref<number>(0);
const discountPrice = ref<number>(0);
const productPricingCurrency = ref('taka')

// PRICING
const addProductStockUnit = ref('Piece')







const inputBox = ref<string>('');
const eTagList = ref<HTMLElement | null>(null);

// TAG :: DUPLICATE CHECKER
const tagChecker = (tag: string, list: HTMLElement | null): boolean => {
    return list ? Array.from(list.children).some((li) => li.textContent === tag) : false;
};

// TAG :: NO SPECIAL CHARACTERS
const specialChars = (tag: string): boolean => {
    const regex = /[^a-zA-Z0-9 ]/;
    return regex.test(tag);
};

// TAG :: KEYBOARD
const inputKeyboardTrigger = (event: KeyboardEvent): void => {
    if (event.key === 'Tab' || event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const tagValue = inputBox.value?.trim() || '';

        if (tagValue) {
            // CHECK DUPLICATION
            if (tagChecker(tagValue, eTagList.value)) {
                toast.error('Tag already exists');
                return;
            }
            // CHECK SPECIAL CHARACTERS
            else if (specialChars(tagValue)) {
                toast.error('Tag contains special characters');
                return;
            }
            // CHECK MINIMUM 3 CHARACTER INPUTVALUE
            else if (tagValue.length < 3) {
                toast.error('Tag must be at least 3 characters long');
                return;
            }

            // ADD LI
            const li = document.createElement('li');
            li.innerHTML = `<p>${tagValue}</p><i class="m-m-cross"></i>`;
            if (eTagList.value) {
                eTagList.value.appendChild(li);
            }

            // DELETE ACTION
            const deleteButton = li.querySelector('i');
            if (deleteButton) {
                deleteButton.addEventListener('click', () => {
                    if (eTagList.value) {
                        eTagList.value.removeChild(li);
                    }
                });
            }


            // DOUBLECLICK TO EDIT CONTENT
            li.addEventListener('dblclick', () => {
                const tagText = li.querySelector('p');
                if (tagText) {
                    tagText.setAttribute('contenteditable', 'true');

                    tagText.focus();
                    tagText.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();

                            tagText.removeAttribute('contenteditable');

                            const newTag = tagText.textContent?.trim();
                            if (newTag && newTag !== tagText.textContent) {
                                tagText.textContent = newTag;
                            }
                        }
                    });
                    tagText.addEventListener('blur', () => {
                        tagText.removeAttribute('contenteditable');

                        const newTag = tagText.textContent?.trim();
                        if (newTag && newTag !== tagText.textContent) {
                            tagText.textContent = newTag;
                        }
                    });
                }
            });



            // EMPTY INPUT BOX
            if (inputBox.value) {
                inputBox.value = '';
            }
        }
    }
};







// FAQs
const faqInputTitle = ref<string>('');
const faqInputDescription = ref<string>('');
const isAddFaqClicked = ref(false);
const faqList = ref<Array<{ title: string, description: string, animationClass: string }>>([]);
const currentEditIndex = ref<number | null>(null);

const faqAddBtn = () => {
    isAddFaqClicked.value = true;

    if (!faqInputTitle.value || faqInputTitle.value.length < 10 || faqInputTitle.value.length > 100) {
        toast.error('Question must be between 10 and 100 characters.');
        return;
    }

    if (!faqInputDescription.value || faqInputDescription.value.length < 20 || faqInputDescription.value.length > 200) {
        toast.error('Answer must be between 20 and 200 characters.');
        return;
    }

    const isDuplicate = faqList.value.some(faq => faq.title.toLowerCase() === faqInputTitle.value.toLowerCase());
    if (isDuplicate) {
        toast.error('This question already exists.');
        return;
    }

    if (currentEditIndex.value !== null) {
        faqList.value[currentEditIndex.value] = {
            title: faqInputTitle.value,
            description: faqInputDescription.value,
            animationClass: 'bounce-edit',
        };
        currentEditIndex.value = null;
    } else {
        faqList.value.push({
            title: faqInputTitle.value,
            description: faqInputDescription.value,
            animationClass: 'bounce-add',
        });
    }

    faqInputTitle.value = '';
    faqInputDescription.value = '';
    toast.success(`You have added a new FAQ`)

    if (faqList.value.length === 0) {
        isAddFaqClicked.value = false;
    }
};

const editFaq = (index: number) => {
    faqInputTitle.value = faqList.value[index].title;
    faqInputDescription.value = faqList.value[index].description;
    currentEditIndex.value = index;

    faqList.value[index].animationClass = 'bounce-edit';
};

const deleteFaq = (index: number) => {
    faqList.value[index].animationClass = 'bounce-delete';

    setTimeout(() => {
        faqList.value.splice(index, 1);

        if (faqList.value.length === 0) {
            isAddFaqClicked.value = false;
        }
    }, 500);
};
























</script>
