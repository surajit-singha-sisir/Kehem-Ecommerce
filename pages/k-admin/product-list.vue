<style>
.table-1 {
    thead {
        tr {
            font-weight: bold;

            th {
                color: #2e3088;
                background-color: #e6e6e6;
            }
        }

    }
}

.table-cus {
    thead {
        tr {
            font-weight: bold;
            background-color: #d1dadb;
            padding: 0;

            th {
                color: blue;
                padding: 0.5rem;
                background-color: #dddddd;
            }
        }
    }

    tbody {
        tr {
            td {
                padding: 0.2rem;
            }
        }
    }
}

.m-file-pdf {
    color: #ac21b1;
}

.m-file-picture {
    color: #2e3088;
}
</style>


<template>
    <!-- Your template remains unchanged -->
    <section class="w-100 f f-col gap-10">
        <aside class="f-between-center gap-10">
            <span class="f-start-center gap-10">
                <p>Total Products :</p>
                <p class="text--12 b Red">{{ filteredItems.length }}</p>
            </span>
            <div class="f-center gap-10">
                <i class="btn btn-silver m-file-picture" @click="exportToPicture" title="Export to Picture"></i>
                <i class="btn btn-silver m-file-pdf" @click="exportToPDF" title="Export to PDF"></i>
                <i class="btn btn-silver m-microsoftexcel" @click="exportToExcel" title="Export to Excel"></i>
                <div class="search-container">
                    <input @input="queryFromTable" type="text" class="search-input" id="textSearch"
                        placeholder="Search Product..." v-model="searchQuery">
                </div>
            </div>
        </aside>

        <table class="table table-1" ref="tableRef">
            <thead>
                <tr>
                    <th @click="AceDecFilter('key')">#SL <i
                            :class="sortColumn === 'key' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th @click="AceDecFilter('title')">Product<i
                            :class="sortColumn === 'title' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th @click="AceDecFilter('category')">Category<i
                            :class="sortColumn === 'category' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th>Attributes Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in filteredItems" :key="item.id">
                    <td :row-key="item.key">{{ i + 1 }}</td>
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
                            <table class="table table-cus">
                                <thead>
                                    <tr>
                                        <th colspan="4">{{ index }}</th>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Values</td>
                                        <td>Stock</td>
                                        <td>Price(Tk)</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(attr, x) in values">
                                        <td colspan="2" class="b">{{ x }}</td>
                                        <td><button class="btn btn-silver">{{ attr[0] }}</button></td>
                                        <td>{{ attr[1] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                    <td>
                        <div class="f-centered gap-05">
                            <button class="btn btn-primary btn-sm" data-edit=""><i class="m-edit1"></i></button>
                            <button class="btn btn-error btn-sm" @click="deleteProduct(item.key)" data-delete=""><i
                                    class="m-trash"></i></button>
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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useToast } from 'vue-toastification'

// Define the product interface
interface Product {
    key: number
    title: string
    category: string
    images: string
    attributes: Record<string, Record<string, [number, number]>>
    id?: string | number
}

const toast = useToast()
const accessToken = useCookie<string | null>('access')
const tableRef = ref<HTMLElement | null>(null)

const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref(true)

// Fetch data with proper typing
const productList = await fetch('http://192.168.0.111:3000/api/productlist', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
})
const data = ref<Product[]>(await productList.json())

const filteredItems = computed(() => {
    let result = [...data.value]

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item =>
            item.title?.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query) ||
            String(item.key).includes(query)
        )
    }

    // Sort
    if (sortColumn.value) {
        result.sort((a, b) => {
            const valueA = a[sortColumn.value as keyof Product]
            const valueB = b[sortColumn.value as keyof Product]

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }

            const strA = String(valueA).toLowerCase()
            const strB = String(valueB).toLowerCase()
            return sortDirection.value ? strA.localeCompare(strB) : strB.localeCompare(strA)
        })
    }

    return result
})

// Export to Excel
const exportToExcel = () => {
    const exportData = filteredItems.value.map(item => ({
        ID: item.key,
        Product: item.title,
        Category: item.category,
        Attributes: Object.entries(item.attributes)
            .map(([key, values]) =>
                `${key}: ${Object.entries(values)
                    .map(([k, v]: [string, [number, number]]) => `${k}: Stock=${v[0]}, Price=${v[1]}`)
                    .join(', ')}`
            )
            .join('; ')
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'products_export.xlsx')
    toast.success('Exported to Excel successfully')
}

// Export to Picture
const exportToPicture = async () => {
    if (!tableRef.value) return
    const canvas = await html2canvas(tableRef.value)
    const imgData = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'products_table.png'
    link.href = imgData
    link.click()
    toast.success('Exported to Picture successfully')
}

// Improved Export to PDF
const exportToPDF = () => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 10
    let y = margin

    // Add title
    doc.setFontSize(16)
    doc.text('Product List', pageWidth / 2, y, { align: 'center' })
    y += 10

    // Table headers
    doc.setFontSize(10)
    const headers = ['#SL', 'Product', 'Category', 'Attributes']
    const colWidths = [20, 80, 40, 130]
    
    // Draw header
    headers.forEach((header, i) => {
        doc.text(header, margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y)
    })
    y += 5
    doc.line(margin, y, pageWidth - margin, y)
    y += 5

    // Table rows
    filteredItems.value.forEach((item, index) => {
        if (y > pageHeight - margin - 20) {
            doc.addPage()
            y = margin
        }

        // SL
        doc.text(String(index + 1), margin, y)
        
        // Product
        doc.text(item.title, margin + colWidths[0], y, { maxWidth: colWidths[1] })
        
        // Category
        doc.text(item.category, margin + colWidths[0] + colWidths[1], y, { maxWidth: colWidths[2] })
        
        // Attributes
        const attrText = Object.entries(item.attributes)
            .map(([key, values]) =>
                `${key}: ${Object.entries(values)
                    .map(([k, v]) => `${k}: ${v[0]} (${v[1]}Tk)`)
                    .join(', ')}`
            )
            .join('; ')
        doc.text(attrText, margin + colWidths[0] + colWidths[1] + colWidths[2], y, { maxWidth: colWidths[3] })

        // Calculate height needed for this row
        const productLines = doc.splitTextToSize(item.title, colWidths[1]).length
        const attrLines = doc.splitTextToSize(attrText, colWidths[3]).length
        const lineHeight = 5
        const rowHeight = Math.max(productLines, attrLines) * lineHeight + 5

        y += rowHeight

        // Add horizontal line
        if (index < filteredItems.value.length - 1) {
            doc.line(margin, y, pageWidth - margin, y)
            y += 5
        }
    })

    doc.save('products_table.pdf')
    toast.success('Exported to PDF successfully')
}

// Search handler
const queryFromTable = (event: Event) => {
    const input = event.target as HTMLInputElement
    searchQuery.value = input.value
}

// Sort handler
const AceDecFilter = (column: string) => {
    if (sortColumn.value === column) {
        sortDirection.value = !sortDirection.value
    } else {
        sortColumn.value = column
        sortDirection.value = true
    }
}

// Delete product
const deleteProduct = async (productKey: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
        const response = await fetch(`http://192.168.0.111:3000/api/product_details/${productKey}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: productKey })
        })

        if (response.ok) {
            const index = data.value.findIndex(item => item.key === productKey)
            if (index !== -1) {
                data.value.splice(index, 1)
                toast.success('Product deleted successfully')
            }
        } else {
            throw new Error('Failed to delete product')
        }
    } catch (error) {
        toast.error(`Error deleting product: ${(error as Error).message}`)
    }
}
</script>