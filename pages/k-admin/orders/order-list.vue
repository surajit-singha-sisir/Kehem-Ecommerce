<style>
.overflow-scroll {
    overflow-x: scroll;
}

.table-1 {
    width: 100%;
    border-collapse: collapse;
}

.table-1 thead tr th {
    color: #2e3088;
    background-color: rgb(233, 233, 233);
    cursor: pointer;
    font-weight: bold;
}

.table-1 .order_summery {
    text-align: left;
}

h2.btn-nav-error {
    font-size: 1.2rem;
}

.m-file-pdf {
    color: #ac21b1;
}

.m-file-picture {
    color: #2e3088;
}

.order_summery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: none !important;
}

.dropdown-menu {
    position: absolute;
    right: 4rem;
    top: 0;
    transform: translateY(-50%);
    background: #fffefe;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    z-index: 10;
}

.dropdown-menu button {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    text-align: left !important;
}

.dropdown-menu button:hover {
    opacity: 0.9;
}
</style>





<template>
    <section class="w-100 f f-col gap-10 overflow-scroll">
        <h2 class="btn btn-nav-error">Order List</h2>
        <hr>
        <aside class="f-between-center gap-10">
            <span class="f-start-center gap-10">
                <p>Total Orders:</p>
                <p class="text--12 b Red">{{ filteredItems.length }}</p>
            </span>
            <div class="f-center gap-10">
                <i class="btn btn-silver m-file-picture" @click="exportToPicture" title="Export to Picture"></i>
                <i class="btn btn-silver m-file-pdf" @click="exportToPDF" title="Export to PDF"></i>
                <i class="btn btn-silver m-microsoftexcel" @click="exportToExcel" title="Export to Excel"></i>
                <input @input="queryFromTable" type="text" class="search-input" id="textSearch"
                    placeholder="Search Order..." v-model="searchQuery">
            </div>
        </aside>

        <table class="table table-1" ref="tableRef">
            <thead>
                <tr>
                    <th @click="sortBy('id')">SL <i
                            :class="sortColumn === 'id' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th @click="sortBy('name')">Customer Info<i
                            :class="sortColumn === 'name' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th @click="sortBy('order_products')">Order Summary<i
                            :class="sortColumn === 'order_products' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th @click="sortBy('date')">Date<i
                            :class="sortColumn === 'date' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>
                        <div class="f-centered f-col gap-03">
                            <strong>{{ item.name }}</strong>
                            <NuxtLink :to="`tel:${item.phone_no}`" class="btn btn-nav-primary btn-sm border-all">
                                <i class="m-phone"></i> {{ item.phone_no }}
                            </NuxtLink>
                            <span>
                                <b>Shipping:</b>
                                <address>
                                    {{ item.area }}, {{ item.district }}
                                    <NuxtLink target="_blank"
                                        :to="`https://www.google.com/maps/search/?q=${item.area}, ${item.district}`">
                                        <i class="Blue m-external-link"></i>
                                    </NuxtLink>
                                </address>
                            </span>
                        </div>
                    </td>
                    <td class="order_summery">
                        <div v-for="product in item.order_products" :key="product.id" class="order-product">

                            <strong class="Red-700">{{ product.product.title }}</strong>
                            <div>
                                <b>Price : </b>
                                {{ formatPrice(product.product.discountPrice || product.product.sellPrice) }}/=
                            </div>
                            <div v-if="product.attribute" class="f gap-05 w-100">
                                <b>Attribute : </b>
                                <span v-for="(value, key) in product.attribute" :key="key" class="f gap-05">
                                    <strong class="Maroon">{{ key }}</strong> -
                                    <button v-for="attr in normalizeAttribute(value)" :key="attr"
                                        class="btn btn-sm btn-love">
                                        {{ formatAttribute(attr) }}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{{ formatDate(item.date) }}</p>
                            <button class="btn btn-primary btn-sm"
                                :class="{ 'btn-primary': item.status === 'Approved', 'btn-warning': item.status === 'Pending' }">
                                {{ item.status }}
                            </button>
                        </div>
                    </td>








                    <!-- ACTION -->
                    <td>
                        <div class="f-centered gap-05 relative">
                            <button class="btn btn-pastel-green btn-sm" @click="toggleActions(item.id)">
                                <i class="m-dots-three-vertical"></i>
                            </button>
                            <!-- Dropdown Menu -->
                            <div v-if="activeOrderId === item.id" class="dropdown-menu">
                                <button class="btn btn-sm btn-primary w-100" @click="generateInvoice(item.id)">
                                    <i class="m-file-text"></i>
                                    <p>Invoice</p>
                                </button>
                                <button class="btn btn-sm btn-warning w-100" @click="updateStatus(item.id, 'Pending')">
                                    <i class="m-clock"></i>
                                    <p>Pending</p>
                                </button>
                                <button class="btn btn-sm btn-success w-100" @click="updateStatus(item.id, 'Approved')">
                                    <i class="m-check"></i>
                                    <p>Approved</p>
                                </button>
                                <button class="btn btn-sm btn-error w-100" @click="updateStatus(item.id, 'Cancel')">
                                    <i class="m-close"></i>
                                    <p>Cancel</p>
                                </button>
                            </div>
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







// Add to Refs
const activeOrderId = ref<number | null>(null)

// Add to Utility Functions
const toggleActions = (orderId: number) => {
    activeOrderId.value = activeOrderId.value === orderId ? null : orderId
}

// Add new action functions
const generateInvoice = (orderId: number) => {
    const order = filteredItems.value.find(item => item.id === orderId)
    if (!order) return

    console.log('Generating invoice for order:', orderId)
    // Add your invoice generation logic here
    // Could open a new window with invoice details or generate a PDF
    toast.success(`Invoice generated for order ${orderId}`)
    activeOrderId.value = null
}

const updateStatus = async (orderId: number, status: string) => {
    const order = filteredItems.value.find(item => item.id === orderId)
    if (!order) return

    try {
        const response = await fetch(`${API_URL}/orderList/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })

        if (response.ok && data.value) {
            const index = data.value.findIndex(item => item.id === orderId)
            if (index !== -1) {
                data.value[index].status = status
                toast.success(`Order ${orderId} status updated to ${status}`)
            }
        } else {
            throw new Error('Failed to update status')
        }
    } catch (error) {
        toast.error(`Error updating status: ${(error as Error).message}`)
    } finally {
        activeOrderId.value = null
    }
}









// Types
interface Product {
    title: string
    sellPrice: number
    discountPrice: number
}

interface OrderProduct {
    id: number
    product: Product
    attribute: Record<string, any>
}

interface Order {
    id: number
    key: string
    name: string
    phone_no: string
    area: string
    district: string
    date: string
    status: string
    order_products: OrderProduct[]
    total: number
}

// Constants
const API_URL = 'http://192.168.0.111:3000/api'

// Refs
const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref(true)
const tableRef = ref<HTMLElement | null>(null)

// Composables
const toast = useToast()
const accessToken = useCookie<string | null>('access')
const { data } = await useFetch<Order[]>(`${API_URL}/orderList`, {
    headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
})

// Computed
const filteredItems = computed(() => {
    let result = [...(data.value || [])]

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.order_products.some(p => p.product.title.toLowerCase().includes(query)) ||
            String(item.id).includes(query)
        )
    }

    if (sortColumn.value) {
        result.sort((a, b) => {
            const key = sortColumn.value as keyof Order
            let valueA: any = a[key]
            let valueB: any = b[key]

            if (key === 'order_products') {
                valueA = a.order_products[0]?.product.title || ''
                valueB = b.order_products[0]?.product.title || ''
            } else if (key === 'date') {
                valueA = new Date(valueA).getTime()
                valueB = new Date(valueB).getTime()
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }

            if (typeof valueA === 'number') {
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }

            valueA = String(valueA).toLowerCase()
            valueB = String(valueB).toLowerCase()
            return sortDirection.value ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        })
    }

    return result
})

// Utility Functions
const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(price)

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const normalizeAttribute = (value: any) =>
    Array.isArray(value) && value.length ? (Array.isArray(value[0]) ? value : [value]) : []

const formatAttribute = (attr: any) =>
    Array.isArray(attr) ?
        attr.length > 1 ? `${attr.slice(0, -1).join(' ')} - ${attr.at(-1)} Qty` : attr[0]
        : attr

// Export Functions
const exportToExcel = () => {
    const exportData = filteredItems.value.map(item => ({
        ID: item.id,
        'Customer Name': item.name,
        Phone: item.phone_no,
        'Order Summary': item.order_products.map(p => p.product.title).join(', '),
        Total: formatPrice(item.total),
        Date: formatDate(item.date)
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
    XLSX.writeFile(workbook, 'Orders_export.xlsx')
    toast.success('Exported to Excel successfully')
}

const exportToPicture = async () => {
    if (!tableRef.value) return
    const canvas = await html2canvas(tableRef.value, { scale: 2 })
    const link = document.createElement('a')
    link.download = 'Orders_table.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    toast.success('Exported to Picture successfully')
}

const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 10
    let yPosition = margin

    doc.setFontSize(16)
    doc.text('Order List', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    const headers = ['#SL', 'Customer Name', 'Order Summary', 'Created Date']
    const colWidths = [15, 70, 120, 40]

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setFillColor(45, 141, 224)
    doc.rect(margin, yPosition - 4, pageWidth - 2 * margin, 8, 'F')

    let xPosition = margin
    headers.forEach((header, i) => {
        doc.text(header, xPosition + 2, yPosition + 2)
        xPosition += colWidths[i]
    })
    yPosition += 8

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    filteredItems.value.forEach((item, index) => {
        const customerLines = `${item.name}\n${item.phone_no}\nShipping: ${item.area}, ${item.district}`.split('\n').length
        const orderHeight = item.order_products.reduce((h, p) =>
            h + 2 + (p.attribute ? Object.keys(p.attribute).length + 1 : 0) + 0.5, 0)
        const rowHeight = Math.max(customerLines * 5, orderHeight * 4) + 2

        if (yPosition + rowHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage()
            yPosition = margin
        }

        doc.setFillColor(index % 2 ? 255 : 233, index % 2 ? 255 : 233, index % 2 ? 255 : 233)
        doc.rect(margin, yPosition - 4, pageWidth - 2 * margin, rowHeight, 'F')

        xPosition = margin
        doc.setTextColor(0, 0, 0)
        doc.text(String(item.id), xPosition + 2, yPosition + 2)
        xPosition += colWidths[0]

        doc.text(`${item.name}\n${item.phone_no}\nShipping: ${item.area}, ${item.district}`, xPosition + 2, yPosition + 2)
        xPosition += colWidths[1]

        let currentY = yPosition + 2
        item.order_products.forEach((p, i) => {
            const price = p.product.discountPrice || p.product.sellPrice
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(200, 0, 0)
            doc.text(`${i + 1}. ${p.product.title}`, xPosition + 2, currentY)
            currentY += 4

            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0, 0, 0)
            doc.text(`Price: ${formatPrice(price)}`, xPosition + 4, currentY)
            currentY += 4

            if (p.attribute) {
                doc.setTextColor(0, 100, 0)
                doc.text('Attributes:', xPosition + 4, currentY)
                currentY += 4

                Object.entries(p.attribute).forEach(([key, value]) => {
                    const val = normalizeAttribute(value)
                    const text = val.length ?
                        `${key}: ${formatAttribute(val[0])}` :
                        `${key}: ${value}`
                    doc.text(text, xPosition + 6, currentY)
                    currentY += 4
                })
            }
            currentY += 2
        })
        xPosition += colWidths[2]

        doc.text(formatDate(item.date), xPosition + 2, yPosition + 2)
        yPosition += rowHeight + 2
    })

    doc.save('Orders_table.pdf')
    toast.success('Exported to PDF successfully')
}

// Action Functions
const queryFromTable = (event: Event) => {
    searchQuery.value = (event.target as HTMLInputElement).value
}

const sortBy = (column: string) => {
    sortDirection.value = sortColumn.value === column ? !sortDirection.value : true
    sortColumn.value = column
}

const editOrder = (orderId: number) => {
    console.log('Edit order:', orderId)
}

const deleteOrder = async (orderKey: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    try {
        const response = await fetch(`${API_URL}/Order_detail/${orderKey}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.ok && data.value) {
            data.value = data.value.filter(item => item.key !== orderKey)
            toast.success('Order deleted successfully')
        } else {
            throw new Error('Failed to delete order')
        }
    } catch (error) {
        toast.error(`Error deleting order: ${(error as Error).message}`)
    }
}
</script>
