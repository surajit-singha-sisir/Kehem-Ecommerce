<!-- pages/update/[key].vue -->
<template>
    <div class="container">
        <h1>Update Product</h1>
        <div v-if="isLoading">Loading...</div>
        <form v-else @submit.prevent="submitForm">
            <section class="pad-tb--20">
                <label>Title</label>
                <input v-model="form.title" type="text" class="form-input" />
            </section>

            <section class="pad-tb--20">
                <label>Buy Price</label>
                <input v-model="form.buyPrice" type="number" class="form-input" />
            </section>

            <section class="pad-tb--20">
                <label>Sell Price</label>
                <input v-model="form.sellPrice" type="number" class="form-input" />
            </section>

            <section class="pad-tb--20">
                <label>Discount Price</label>
                <input v-model="form.discountPrice" type="number" class="form-input" />
            </section>

            <section class="pad-tb--20">
                <span class="text--m star">Description</span>
                <textarea class="summernote" ref="description" name="description"></textarea>
            </section>

            <section class="pad-tb--20">
                <span class="text--m star">Benefits</span>
                <textarea class="summernote" ref="benefits" name="benefits"></textarea>
            </section>

            <section class="pad-tb--20">
                <span class="text--m star">Dosage</span>
                <textarea class="summernote" ref="dosage" name="dosage"></textarea>
            </section>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">Update Product</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCookie } from '#app'
const { startRefreshing, stopRefreshing } = useAuth()

const route = useRoute()
const toast = useToast()
const accessToken = useCookie('access')
const key = route.params.key
const form = ref({})
const description = ref(null)
const benefits = ref(null)
const dosage = ref(null)
const isLoading = ref(false)
const isSubmitting = ref(false)

onMounted(async () => {
    startRefreshing()
    isLoading.value = true
    try {
        const { data, error } = await useFetch(`http://192.168.0.111:3000/api/product_update/${key}`, {
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`
            }
        })

        if (error.value) {
            toast.error('Failed to load product data')
            return
        }

        form.value = data.value

        // Initialize Summernote editors
        $(description.value).summernote({
            placeholder: 'Add Description',
            tabsize: 2,
            height: 200,
            toolbar: [['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['picture']]],
        }).summernote('code', form.value.description)

        $(benefits.value).summernote({
            placeholder: 'Add Benefits',
            tabsize: 2,
            height: 200,
            toolbar: [['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['picture']]],
        }).summernote('code', form.value.benefits)

        $(dosage.value).summernote({
            placeholder: 'Add Dosage',
            tabsize: 2,
            height: 200,
            toolbar: [['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['picture']]],
        }).summernote('code', form.value.dosage)

        toast.success('Product data loaded successfully')
    } catch (error) {
        toast.error('An error occurred while loading product data')
        console.error('Error fetching product:', error)
    } finally {
        isLoading.value = false
    }
})

onUnmounted(() => {
    stopRefreshing()
})

const submitForm = async () => {
    isSubmitting.value = true
    form.value.description = $(description.value).summernote('code')
    form.value.benefits = $(benefits.value).summernote('code')
    form.value.dosage = $(dosage.value).summernote('code')

    try {
        const { error } = await useFetch(`http://192.168.0.111:3000/api/product_update/${key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken.value ?? ''}`
            },
            body: JSON.stringify(form.value)
        })

        if (error.value) {
            toast.error('Failed to update product')
            return
        }

        toast.success('Product updated successfully')
    } catch (error) {
        toast.error('An error occurred while updating product')
        console.error('Error updating product:', error)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
/* Same styles as before */
.submit-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>