<template>
    <section class="top-bar">
        <div class="res-container inner-topbar">
            <div class="icons m-l--06">
                <NuxtLink to="/" class="iconLink"><i class="m-facebook rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-twitter rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-instagram rounded branded"></i></NuxtLink>
                <NuxtLink to="/" class="iconLink"><i class="m-whatsapp rounded branded"></i></NuxtLink>
            </div>
            <div class="icons searchBar" ref="searchBarRef">
                <NuxtLink to="/" class="iconLink search-icon" @click.prevent="toggleSearch">
                    <i class="m-search rounded branded"></i>
                </NuxtLink>

                <aside v-if="isSearchVisible" class="absolute-box">
                    <input type="text" placeholder="Search ..." v-model="searchText" name="searchText" id="searchText"
                        @keyup.enter="searchSubmit" ref="searchInputRef">
                    <button type="button" @click="searchSubmit" class="btn btn-primary" :disabled="isSearchDisabled">
                        Search
                    </button>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const searchText = ref<string>('')
const isSearchVisible = ref<boolean>(false)
const searchBarRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const router = useRouter()

const isSearchDisabled = computed((): boolean => {
    return !searchText.value.trim()
})

const toggleSearch = (): void => {
    isSearchVisible.value = !isSearchVisible.value
    if (isSearchVisible.value) {
        nextTick(() => {
            searchInputRef.value?.focus()
        })
    }
}

const searchSubmit = (): void => {
    if (searchText.value.trim()) {
        router.push({
            path: '/search',
            query: { q: searchText.value.trim() }
        })
        isSearchVisible.value = false
        searchText.value = ''
    }
}

// Handle click outside
const handleClickOutside = (event: MouseEvent): void => {
    if (searchBarRef.value && !searchBarRef.value.contains(event.target as Node)) {
        isSearchVisible.value = false
    }
}

// Lifecycle hooks
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
