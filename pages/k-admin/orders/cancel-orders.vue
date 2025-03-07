<template>
    <section class="w-100 f f-col gap-10 overflow-scroll">
        <h2 class="f-start-centered btn btn-nav-error">Canceled Order List</h2>
        <hr>
        <aside class="f-between-center gap-10">
            <span class="f-start-center gap-10">
                <p>Total Orders:</p>
                <p class="text--12 b Red">{{ totalCount }}</p>
            </span>
            <div class="f-center gap-10">
                <i class="f-start-centered btn btn-silver m-file-picture" @click="exportToPicture"
                    title="Export to Picture"></i>
                <i class="f-start-centered btn btn-silver m-file-pdf" @click="exportToPDF" title="Export to PDF"></i>
                <i class="f-start-centered btn btn-silver m-microsoftexcel" @click="exportToExcel"
                    title="Export to Excel"></i>
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
                    <th @click="sortBy('courier')">Courier<i
                            :class="sortColumn === 'courier' ? (sortDirection ? 'm-triangle-up' : 'm-triangle-down') : 'm-triangle-up'"></i>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredItems" :key="item.key">
                    <td>
                        {{ sortDirection || !sortColumn ? index + 1 : Math.max(1, Math.min(MAX_SERIAL,
                            filteredItems.length) - index) }}
                    </td>
                    <td>
                        <div class="f-centered f-col gap-03">
                            <strong>{{ item.name }}</strong>
                            <NuxtLink :to="`tel:${item.phone_no}`"
                                class="f-start-centered btn btn-nav-primary btn-sm border-all">
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
                                        class="f-start-centered btn btn-sm btn-love">
                                        {{ formatAttribute(attr) }}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{{ formatDate(item.date) }}</p>
                            <button class="f-start-centered btn btn-sm w-100" :class="{
                                'btn-primary': item.status === 'Approved',
                                'btn-warning': item.status === 'Pending',
                                'btn-success': item.status === 'Delivered',
                                'btn-coral': item.status === 'Shipping',
                                'btn-error': item.status === 'Cancel'
                            }">
                                {{ item.status }}
                            </button>

                        </div>
                    </td>
                    <td>
                        <div class="option">
                            <select v-model="item.courier" @change="updateCourier(item.key, $event)">
                                <option value="Pathao">Pathao</option>
                                <option value="Steadfast">Steadfast</option>
                                <option value="Sundarban">Sundarban</option>
                                <option value="SA Paribahan">SA Paribahan</option>
                                <option value="RedX">RedX</option>
                                <option value="Janata">Janata</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div class="f-centered gap-05 relative">
                            <button class="f-start-centered btn btn-pastel-green btn-sm"
                                @click="toggleActions(item.key)">
                                <i class="m-dots-three-vertical"></i>
                            </button>
                            <div v-if="activeOrderKey === item.key" class="dropdown-menu">
                                <button class="f-start-centered f-start-centered btn btn-sm btn-sleep w-100"
                                    @click="showInvoiceModal(item.key)">
                                    <i class="m-file-text"></i>
                                    <p>Invoice</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-warning w-100"
                                    @click="updateStatus(item.key, 'Pending')">
                                    <i class="m-clock"></i>
                                    <p>Pending</p>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>


                <tr ref="loadMoreTrigger">
                    <td colspan="6" class="text-center" v-if="isLoading">
                        <div class="mastor-las"><span class="loader"></span></div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Invoice Modal -->
        <Teleport to="body">
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Invoice - Order #{{ selectedOrder?.id }}</h3>
                        <button class="f-start-centered btn btn-sm btn-error" @click="closeModal">
                            <i class="m-close"></i>
                        </button>
                    </div>
                    <div class="modal-body" v-if="selectedOrder">
                        <div class="f-between-center gap-10">
                            <div class="f-col gap-5">
                                <h4>From:</h4>
                                <p><strong>{{ companyInfo.name }}</strong></p>
                                <p>{{ companyInfo.address }}</p>
                                <p>{{ companyInfo.city }}, {{ companyInfo.country }}</p>
                                <p>Phone: {{ companyInfo.phone }}</p>
                                <p>Email: {{ companyInfo.email }}</p>
                            </div>
                            <div class="f-col gap-5 text-right">
                                <h4>To:</h4>
                                <p><strong>{{ selectedOrder.name }}</strong></p>
                                <p>{{ selectedOrder.phone_no }}</p>
                                <p>{{ selectedOrder.address }}</p>
                                <p>{{ selectedOrder.area }}, {{ selectedOrder.district }}</p>
                                <p>{{ selectedOrder.division }}</p>
                            </div>
                        </div>

                        <div class="f-between-center gap-10 mt-20">
                            <p><strong>Invoice Date:</strong> {{ formatDate(selectedOrder.date) }}</p>
                            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
                            <p><strong>Courier:</strong> {{ selectedOrder.courier }}</p>
                        </div>

                        <hr class="my-10">

                        <h4>Order Details</h4>
                        <table class="table table-1 w-100">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Attributes</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in selectedOrder.order_products" :key="product.id">
                                    <td>{{ product.product.title }}</td>
                                    <td>
                                        <div v-if="product.attribute">
                                            <div v-for="(value, key) in product.attribute" :key="key">
                                                <strong>{{ key }}</strong>
                                                <div v-for="attr in normalizeAttribute(value)" :key="attr"
                                                    class="ml-10">
                                                    {{ formatAttribute(attr) }}
                                                </div>
                                            </div>
                                        </div>
                                        <span v-else>-</span>
                                    </td>
                                    <td>{{ calculateProductPrice(product) }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-right"><strong>Subtotal:</strong></td>
                                    <td>{{ formatPrice(calculateSubtotal(selectedOrder.order_products)) }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-right"><strong>Delivery:</strong></td>
                                    <td>{{ formatPrice(selectedOrder.delivery_charge) }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-right"><strong>Grand Total:</strong></td>
                                    <td>{{ formatPrice(calculateSubtotal(selectedOrder.order_products) +
                                        selectedOrder.delivery_charge) }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <hr class="my-10">

                        <div class="f-col gap-10">
                            <div>
                                <h4>Terms and Conditions:</h4>
                                <p>Sold items are non-refundable</p>
                            </div>
                            <div>
                                <h4>Prepared By:</h4>
                                <p>KEHEM IT</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="f-start-centered btn btn-primary" @click="showPrintOptions">Print</button>
                        <button class="f-start-centered btn btn-error" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>

            <!-- Print Options Modal -->
            <Teleport to="body">
                <div v-if="showPrintModal" class="modal-overlay" @click.self="showPrintModal = false">
                    <div class="print-options-modal">
                        <h3>Select Print Format</h3>
                        <div class="f-col gap-10">
                            <button class="f-start-centered btn btn-primary" @click="printInvoice('pos')">POS Print
                                (80mm)</button>
                            <button class="f-start-centered btn btn-primary" @click="printInvoice('a5')">A5
                                Print</button>
                            <button class="f-start-centered btn btn-primary" @click="printInvoice('default')">Default
                                Print</button>
                            <button class="f-start-centered btn btn-silver"
                                @click="showPrintModal = false">Cancel</button>
                        </div>
                    </div>
                </div>
            </Teleport>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useToast } from 'vue-toastification'
import { useCookie } from '#app'
const { startRefreshing, stopRefreshing, logout } = useAuth();

onMounted(() => {
    startRefreshing();
});

onUnmounted(() => {
    stopRefreshing();
});
const showModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const showPrintModal = ref(false)
const activeOrderKey = ref<string | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const page = ref(1)
const totalCount = ref(0)
const nextUrl = ref<string | null>(null)
const orders = ref<Order[]>([])

// Constants
const API_URL = 'http://192.168.0.111:3000/api'

// Refs
const MAX_SERIAL = 999 // Set your desired maximum value (e.g., 9, 99, 999)

// Refs
const searchQuery = ref('')
const sortColumn = ref<number | string>('')
const sortDirection = ref(true)
const currentPage = ref(1)
const nextPageUrl = ref<string | null>(null)
const tableRef = ref<HTMLElement | null>(null)

// Composables
const toast = useToast()
const accessToken = useCookie<string | null>('access')

// Utility Functions
const toggleActions = (orderKey: string) => {
    activeOrderKey.value = activeOrderKey.value === orderKey ? null : orderKey
}

const normalizeAttribute = (value: any) => {
    if (!value) return []
    if (Array.isArray(value) && Array.isArray(value[0])) return value
    return [value]
}

const formatAttribute = (attr: any) => {
    if (Array.isArray(attr)) {
        return `${attr[0]} - ${attr[1]} Qty`
    }
    return attr
}

const companyInfo = {
    name: "Your Company Name",
    address: "123 Business Street",
    city: "Dhaka",
    country: "Bangladesh",
    phone: "+880 1234-567890",
    email: "info@yourcompany.com"
}

const calculateSubtotal = (products: OrderProduct[]) => {
    return products.reduce((sum, product) => {
        const basePrice = product.product.discountPrice || product.product.sellPrice
        let totalQty = 0
        if (product.attribute) {
            Object.values(product.attribute).forEach(value => {
                const attrs = normalizeAttribute(value)
                attrs.forEach(attr => {
                    if (Array.isArray(attr) && attr[1]) {
                        totalQty += Number(attr[1])
                    }
                })
            })
        }
        return sum + basePrice * (totalQty || 1)
    }, 0)
}

const calculateProductPrice = (product: OrderProduct) => {
    const basePrice = product.product.discountPrice || product.product.sellPrice
    let totalQty = 0
    if (product.attribute) {
        Object.values(product.attribute).forEach(value => {
            const attrs = normalizeAttribute(value)
            attrs.forEach(attr => {
                if (Array.isArray(attr) && attr[1]) {
                    totalQty += Number(attr[1])
                }
            })
        })
    }
    return formatPrice(basePrice * (totalQty || 1))
}

interface Product {
    title: string
    images: string
    key: string
    sellPrice: number
    discountPrice: number
}

interface OrderProduct {
    id: number
    product: Product
    attribute: Record<string, any>
    order: number
}

interface Order {
    id: number
    order_products: OrderProduct[]
    key: string
    date: string
    name: string
    phone_no: string
    division: string
    district: string
    area: string
    address: string
    label: string
    total: number
    delivery_charge: number
    pay_method: string
    status: string
    courier: string
}

interface ApiResponse {
    count: number
    next: string | null
    previous: string | null
    results: Order[]
}

// Initial fetch
const fetchOrders = async (url: string) => {
    isLoading.value = true
    try {
        const { data, error } = await useFetch<ApiResponse>(url, {
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
            transform: (response: ApiResponse) => {
                response.results.forEach(order => {
                    order.order_products.forEach(product => {
                        product.product.sellPrice = Number(product.product.sellPrice)
                        product.product.discountPrice = Number(product.product.discountPrice)
                    })
                })
                return response
            }
        })

        if (error.value) {
            toast.error('Failed to fetch orders. Try again later...')
            return
        }

        if (data.value) {
            orders.value = [...orders.value, ...data.value.results]
            totalCount.value = data.value.count
            nextUrl.value = data.value.next
        }
    } catch (err) {
        toast.error('Error fetching orders. Try again later...')
    } finally {
        isLoading.value = false
    }
}

// Initial load
fetchOrders(`${API_URL}/order_filter/Cancel?page=${page.value}&page_size=3`)

// Intersection Observer for infinite scroll
const observer = ref<IntersectionObserver | null>(null)
onMounted(() => {
    observer.value = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && nextUrl.value && !isLoading.value) {
                fetchOrders(nextUrl.value)
            }
        },
        { threshold: 0.1 }
    )
    if (loadMoreTrigger.value) {
        observer.value.observe(loadMoreTrigger.value)
    }
})

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})

// Computed
const filteredItems = computed(() => {
    let result = [...orders.value]

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.order_products.some(p => p.product.title.toLowerCase().includes(query)) ||
            String(item.id).includes(query)
        )
    }

    // Apply sorting (no default sort by 'id')
    if (sortColumn.value) {
        result.sort((a, b) => {
            const key = sortColumn.value as keyof Order
            let valueA: any = a[key]
            let valueB: any = b[key]

            if (key === 'order_products') {
                valueA = a.order_products[0]?.product.title || ''
                valueB = b.order_products[0]?.product.title || ''
                return sortDirection.value
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA)
            } else if (key === 'date') {
                valueA = new Date(valueA).getTime()
                valueB = new Date(valueB).getTime()
                return sortDirection.value ? valueA - valueB : valueB - valueA
            } else if (key === 'courier') {
                valueA = String(valueA).toLowerCase()
                valueB = String(valueB).toLowerCase()
                return sortDirection.value
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA)
            } else if (key === 'id') {
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }

            if (typeof valueA === 'number') {
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }

            valueA = String(valueA).toLowerCase()
            valueB = String(valueB).toLowerCase()
            return sortDirection.value
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA)
        })
    }

    return result
})

// Sort function (unchanged)
const sortBy = (column: string) => {
    if (sortColumn.value === column) {
        sortDirection.value = !sortDirection.value
    } else {
        sortColumn.value = column
        sortDirection.value = true // Start with ascending when changing columns
    }
}

// Utility Functions
const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(price)

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

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

// const sortBy = (column: string) => {
//     sortDirection.value = sortColumn.value === column ? !sortDirection.value : true
//     sortColumn.value = column
// }

const updateCourier = async (orderKey: string, event: Event) => {
    const newCourier = (event.target as HTMLSelectElement).value
    try {
        const response = await fetch(`${API_URL}/order_detail/${orderKey}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courier: newCourier })
        })

        if (!response.ok) throw new Error('Failed to update courier')

        const index = orders.value.findIndex(item => item.key === orderKey)
        if (index !== -1) {
            orders.value[index].courier = newCourier
            toast.success(`Courier updated to ${newCourier} for order ${orderKey}`)
        }
    } catch (error) {
        toast.error(`Error updating courier. Try again later...`)
    }
}

const updateStatus = async (orderKey: string, status: string) => {
    try {
        const response = await fetch(`${API_URL}/order_detail/${orderKey}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })

        if (!response.ok) throw new Error('Failed to update status')

        const index = orders.value.findIndex(item => item.key === orderKey)
        if (index !== -1) {
            orders.value[index].status = status
            toast.success(`Order ${orderKey} status updated to ${status}`)
        }
    } catch (error) {
        toast.error(`Error updating status. Try again later...`)
    } finally {
        activeOrderKey.value = null
    }
}

// Modal functions
const showInvoiceModal = (orderKey: string) => {
    selectedOrder.value = filteredItems.value.find(item => item.key === orderKey) || null
    showModal.value = true
    activeOrderKey.value = null
}

const closeModal = () => {
    showModal.value = false
    selectedOrder.value = null
    showPrintModal.value = false
}

const showPrintOptions = () => {
    showPrintModal.value = true
}

const printInvoice = (format: 'pos' | 'a5' | 'default') => {
    const printWindow = window.open('', '_blank')
    if (!printWindow || !selectedOrder.value) return

    const styles = `
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .invoice { padding: ${format === 'pos' ? '5px' : '6px'}; }
            ${format === 'pos' ? 'body { width: 80mm; font-size: 8px; }' : ''}
            ${format === 'a5' ? 'body { width: 148mm; height: 210mm; font-size: 10px; }' : ''}
            .flex-between { display: flex; justify-content: space-between; }
            .flex-col { display: flex; flex-direction: column; }
            .gap-5 { gap: 5px; }
            .gap-10 { gap: 10px; }
            .text-right { text-align: right; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 5px; font-size: 10px }
            th { background: #f5f5f5; }
            hr { border: none; border-top: 1px solid #ddd; margin: 10px 0; }
        </style>
    `

    const content = `
        <div class="invoice">
            <h2>Invoice - Order #${selectedOrder.value.id}</h2>
            <div class="flex-between gap-10">
                <div class="flex-col gap-5">
                    <h4>From:</h4>
                    <p><strong>${companyInfo.name}</strong></p>
                    <p>${companyInfo.address}</p>
                    <p>${companyInfo.city}, ${companyInfo.country}</p>
                    <p>Phone: ${companyInfo.phone}</p>
                    <p>Email: ${companyInfo.email}</p>
                </div>
                <div class="flex-col gap-5 text-right">
                    <h4>To:</h4>
                    <p><strong>${selectedOrder.value.name}</strong></p>
                    <p>${selectedOrder.value.phone_no}</p>
                    <p>${selectedOrder.value.address}</p>
                    <p>${selectedOrder.value.area}, ${selectedOrder.value.district}</p>
                    <p>${selectedOrder.value.division}</p>
                </div>
            </div>
            <div class="flex-between gap-10">
                <p><strong>Invoice Date:</strong> ${formatDate(selectedOrder.value.date)}</p>
                <p><strong>Status:</strong> ${selectedOrder.value.status}</p>
                <p><strong>Courier:</strong> ${selectedOrder.value.courier}</p>
            </div>
            <hr>
            <h4>Order Details</h4>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Attributes</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${selectedOrder.value.order_products.map(product => `
                        <tr>
                            <td>${product.product.title}</td>
                            <td>${product.attribute ?
            Object.entries(product.attribute).map(([key, value]) => {
                const attrs = normalizeAttribute(value)
                return `${key}<br>` + attrs.map(attr => `  ${formatAttribute(attr)}`).join('<br>')
            }).join('<br>') :
            '-'
        }</td>
                            <td>${calculateProductPrice(product)}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="2" class="text-right"><strong>Subtotal:</strong></td>
                        <td>${formatPrice(calculateSubtotal(selectedOrder.value.order_products))}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right"><strong>Delivery:</strong></td>
                        <td>${formatPrice(selectedOrder.value.delivery_charge)}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right"><strong>Grand Total:</strong></td>
                        <td>${formatPrice(calculateSubtotal(selectedOrder.value.order_products) + selectedOrder.value.delivery_charge)}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="flex-col gap-10">
                <div>
                    <h4>Terms and Conditions:</h4>
                    <p>Sold items are non-refundable</p>
                </div>
                <div>
                    <h4>Prepared By:</h4>
                    <p>KEHEM IT</p>
                </div>
            </div>
        </div>
    `
    printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice #${selectedOrder.value.id}</title>
        ${styles}
    </head>
    <body>
        ${content}
        <script>
            window.print();
            window.close();
</body>

</html>
`)

    printWindow.document.close()
    showPrintModal.value = false
    toast.success(`Printing invoice in ${format} format...`)
}

const editOrder = (orderKey: string) => {
    console.log('Edit order:', orderKey)
}

const deleteOrder = async (orderKey: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    try {
        const response = await fetch(`${API_URL}/order_detail/${orderKey}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Failed to delete order')

        orders.value = orders.value.filter(item => item.key !== orderKey)
        totalCount.value -= 1
        toast.success('Order deleted successfully')
    } catch (error) {
        toast.error(`Error deleting order. Try again later...`)
    }
}
</script>