<template>
    <section class="w-100 f f-col gap-10">
        <aside class="f-between-center gap-10">
            <span class="f-start-center gap-10">
                <p>Total Products :</p>
                <p class="text--12 b Red">1</p>
            </span>
            <div class="f-center gap-10">
                <i class="btn btn-silver m-microsoftexcel" @click="exportToExcel" title="Export to Excel"></i>
                <div class="search-container">
                    <input @input="queryFromTable" type="text" class="search-input" id="textSearch"
                        placeholder="Search Product...">
                </div>
            </div>
        </aside>

        <table class="table">
            <thead>
                <tr>
                    <th v-for="(header, key) in headers" :key="key" @click="AceDecFilter(key)">
                        {{ header }}
                        <i
                            :class="sortColumn === key ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in data" :key="item.id">
                    <!-- <td v-for="(value, index) in item" :key="index">
                        {{ value }}
                    </td> -->
                    <td :row-key="item.key"> {{ item.key }}</td>
                    <td>
                        <div class="f-centered gap-05 f-col">
                            <span class="d-block w--50 h-auto">
                                <img class="w-100 h-auto" :src="item.images" alt="">
                            </span>
                            <p class="b">{{ item.title }} <NuxtLink :to="`http://localhost:3000/${item.key}`"><i
                                        class="Blue m-external-link"></i></NuxtLink>
                            </p>
                        </div>
                    </td>
                    <td>{{ item.category }}</td>
                    <td>
                        <div v-for="(values, index) in item.attributes" :key="index">
                            <b class="Blue-700">{{ index }}</b> <br>
                            <span v-for="(attr, x) in values" class="f-centered gap-05">
                                <p class="b">{{ x }}</p> : <p>{{ attr }} pcs</p> <br>
                            </span>
                        </div>
                    </td>
                    <td>{{ item.created_at }}</td>
                    <td>
                        <div class="f-centered gap-05">
                            <button class="btn btn-primary btn-sm" data-edit=""><i class="m-edit1"></i></button>
                            <button class="btn btn-error btn-sm" data-delete=""><i class="m-trash"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import { useToast } from 'vue-toastification';
const toast = useToast();
const accessToken = useCookie<string | null>('access');

interface TableItem {
    key: number
    [key: string]: string | number
}

const headers = ref<Record<string, string>>({
    header1: 'ID',
    header2: 'Image',
    header3: 'Proudct Name',
    header4: 'Category',
    header5: 'Current Stocks',
    date: 'Date'
})

// Sample data
// const tableData = ref<TableItem[]>([
//     {
//         key: 1,
//         header1: 'img',
//         header3: 'Moonseed - Diabetic Care',
//         header4: "Organic",
//         header5: "210",
//         date: '01-01-2024'
//     },
//     {
//         key: 2,
//         header1: 'Row 2, Cell 2',
//         header3: 'World',
//         date: '01-10-2025'
//     }
// ])

// Search and sort states
const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref(true)

// Computed property for filtered and sorted items
// const filteredItems = computed(() => {
//     // let result = [...tableData.value]

//     // Filter based on search query
//     if (searchQuery.value) {
//         const query = searchQuery.value.toLowerCase()
//         result = result.filter(item =>
//             Object.values(item).some(value =>
//                 String(value).toLowerCase().includes(query)
//             )
//         )
//     }

//     // Sort if a column is selected
//     if (sortColumn.value) {
//         result.sort((a, b) => {
//             const valueA = String(a[sortColumn.value]) // Convert to string
//             const valueB = String(b[sortColumn.value]) // Convert to string

//             if (sortColumn.value === 'date') {
//                 // Assuming date format is DD-MM-YYYY
//                 const dateA = new Date(valueA.split('-').reverse().join('-'))
//                 const dateB = new Date(valueB.split('-').reverse().join('-'))
//                 return sortDirection.value
//                     ? dateA.getTime() - dateB.getTime()
//                     : dateB.getTime() - dateA.getTime()
//             }

//             return sortDirection.value
//                 ? valueA.localeCompare(valueB)
//                 : valueB.localeCompare(valueA)
//         })
//     }

//     return result
// })

// Export to Excel function
const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.value)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'products_export.xlsx')
}

// Search function
const queryFromTable = (event: Event) => {
    const input = event.target as HTMLInputElement
    searchQuery.value = input.value
}

// Sort function
const AceDecFilter = (column: string) => {
    if (column === 'id') return // Don't sort by id
    if (sortColumn.value === column) {
        sortDirection.value = !sortDirection.value
    } else {
        sortColumn.value = column
        sortDirection.value = true
    }
}

const productList = await fetch('http://192.168.0.111:3000/api/productlist', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
})
const data = await productList.json()
console.log(data);

</script>