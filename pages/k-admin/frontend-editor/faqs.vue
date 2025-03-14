<style>
.old-faqs {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 2rem 0;

    .faq {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid #ccc;
        padding: 1rem;
        min-width: 10rem;
        flex: 1;
        border-radius: 0.3rem;

        .question {
            font-size: 1.2rem;
        }

    }
}
</style>




<template>
    <section class="w-100">
        <h2>Faq List</h2>
        <div class="old-faqs">
            <!-- FAQ FOR LOOP -->
            <div class="faq" v-for="(faq, index) in serverFaqs" :key="faq.id">
                <i @click="deleteRequest(index)" class="m-cross1 crossed"></i>
                <p class="question b">{{ faq.question }}</p>
                <div class="answer text-dotted-6">{{ faq.answer }}</div>
            </div>
        </div>
        <!-- FAQ -->
        <section class="e-faqs" id="faqContainer">
            <span class="text--m">Add New FAQ</span>
            <div class="e-faqInputs" id="e-faqInputs">
                <!-- INPUT BOXES -->
                <input type="text" v-model="faqInputTitle" class="e-questionInput" id="e-questionInput"
                    placeholder="Question" />
                <textarea id="e-answerInput" class="e-answerInput" v-model="faqInputDescription"
                    placeholder="Answer"></textarea>
                <!-- ADD BUTTON -->
                <button class="btn btn-primary w--100 m-auto" type="button" @click="faqAddBtn">Preview</button>
            </div>
            <div class="e-faq-preview" :class="{ 'hide': !isAddFaqClicked }">
                <!-- PREVIEW -->
                <div class="f-between-center">
                    <span class="text--m b darkBlue">FAQ Preview</span>
                    <button type="submit" @click="submitNewFaqs">Submit</button>
                </div>
                <div class="e-faq-preview-box">
                    <!-- FAQ LIST -->
                    <span v-for="(faq, index) in faqList" :key="index" class="added-faq" :class="faq.animationClass">
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
    </section>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import type { Ref } from 'vue';

const toast = useToast();
const accessToken = useCookie<string | null>('access');
const isLoading = ref(false);

// FAQ MANAGEMENT
interface FAQ {
    title: string;
    description: string;
    animationClass: string;
}

interface ServerFAQ {
    id: string;
    question: string;
    answer: string;
}

const faqInputTitle = ref<string>('');
const faqInputDescription = ref<string>('');
const isAddFaqClicked = ref(false);
const faqList = ref<FAQ[]>([]);
const serverFaqs = ref<ServerFAQ[]>([]);
const currentEditIndex = ref<number | null>(null);

const faqAddBtn = () => {
    isAddFaqClicked.value = true;

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
    toast.success('You have added a new FAQ to preview');
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

const submitNewFaqs = async () => {
    if (!faqList.value.length) {
        toast.error('No FAQs to submit');
        return;
    }

    isLoading.value = true;
    const faqData = faqList.value.map(faq => ({
        question: faq.title,
        answer: faq.description
    }));

    try {
        const { status, data, error } = await useFetch(
            'http://192.168.0.111:3000/api/faq_manager',
            {
                method: 'POST',
                headers: {
                    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(faqData)
            }
        );

        if (status.value === 'success') {
            toast.success('FAQs submitted successfully');
            faqList.value = [];
            isAddFaqClicked.value = false;
            await fetchServerFaqs();
        } else {
            console.error('Submit Error:', error.value);
            toast.error('Failed to submit FAQs');
        }
    } catch (error) {
        console.error('Submit error:', error);
        toast.error('Error submitting FAQs');
    } finally {
        isLoading.value = false;
    }
};

const deleteRequest = async (index: number) => {
    const faq = serverFaqs.value[index];

    isLoading.value = true;
    try {
        const { status, error } = await useFetch(
            `http://192.168.0.111:3000/api/faq_manager`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: faq.id })
            }
        );

        if (status.value === 'success') {
            serverFaqs.value.splice(index, 1);
            toast.success('FAQ deleted successfully');
        } else {
            console.error('Delete Error:', error.value);
            toast.error('Failed to delete FAQ from server');
        }
    } catch (error) {
        console.error('Delete error:', error);
        toast.error('Error deleting FAQ');
    } finally {
        isLoading.value = false;
    }
};

const fetchServerFaqs = async () => {
    isLoading.value = true;
    try {
        const { data, status, error } = await useFetch(
            'http://192.168.0.111:3000/api/faqs',
            {
                method: 'GET',
                headers: {
                    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : ''
                }
            }
        );

        if (status.value === 'success' && data.value) {
            serverFaqs.value = data.value as ServerFAQ[];
        } else {
            console.error('Fetch Error:', error.value);
            toast.error('Failed to fetch FAQs');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error fetching FAQs');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchServerFaqs();
});
</script>