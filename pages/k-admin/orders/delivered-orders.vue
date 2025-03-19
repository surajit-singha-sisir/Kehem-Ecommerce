<template>
    <section class="w-100 f f-col gap-10">
        <!-- Header Section -->
        <h2 class="btn btn-nav-error">Order List</h2>
        <hr>

        <!-- Filters and Controls -->
        <aside class="f-between-center gap-10">
            <span class="f-start-center gap-10">
                <p>Total Orders:</p>
                <p class="text--12 b Red">{{ totalCount }}</p>
            </span>
            <div class="f-center gap-10">
                <i class="btn btn-silver m-file-picture" @click="exportToPicture" title="Export to Picture"></i>
                <i class="btn btn-silver m-file-pdf" @click="exportToPDF" title="Export to PDF"></i>
                <i class="btn btn-silver m-microsoftexcel" @click="exportToExcel" title="Export to Excel"></i>
                <input @input="queryFromTable" type="text" class="search-input" id="textSearch"
                    placeholder="Search Order..." v-model="searchQuery" aria-label="Search orders">
            </div>
        </aside>

        <!-- Orders Table -->
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
                    <td>{{ sortDirection || !sortColumn ? index + 1 : Math.max(1, Math.min(MAX_SERIAL,
                        filteredItems.length) - index) }}</td>
                    <td>
                        <div class="f-centered f-col gap-03">
                            <strong>{{ item.name }}</strong>
                            <NuxtLink :to="`tel:${item.phone_no}`" class="btn btn-nav-primary btn-sm border-all">
                                <i class="m-phone"></i> {{ item.phone_no }}
                            </NuxtLink>
                            <span>
                                <b>Shipping:</b>
                                <address>
                                    {{ item.address }}<br>
                                    {{ item.area }}, {{ item.district }}, {{ item.division }}
                                    <NuxtLink target="_blank"
                                        :to="`https://www.google.com/maps/search/?q=${item.area}, ${item.district}, ${item.division}`">
                                        <i class="Blue m-external-link"></i>
                                    </NuxtLink>
                                </address>
                            </span>
                        </div>
                    </td>
                    <td class="order_summery">
                        <div v-for="product in item.order_products" :key="product.id" class="order-product">
                            <!-- Changed from product.product.title to product ID since product is a number -->
                            <strong class="Red-700">{{ product.product.title }}</strong>
                            <div v-if="product.attribute" class="f-center-start f-col gap-05 w-100">
                                <span v-for="(value, key) in product.attribute" :key="key" class="f-center-start f-col">
                                    <div><b>Attribute:</b> <strong class="Maroon">{{ key }}</strong></div>
                                    <div><b>Variant:</b> <strong class="Maroon">{{ value[2] }}</strong></div>
                                    <div><b>Quantity:</b> <strong class="Maroon"><button class="btn btn-sm btn-love">{{
                                        value[0] }} pieces</button></strong></div>
                                    <div><b>Price:</b> <strong class="Maroon">Tk {{ value[1] }}</strong></div>
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
                                <option value="" selected>Select Courier</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div class="f-centered gap-05 relative">
                            <button class="btn btn-pastel-green btn-sm" @click="toggleActions(item.key)">
                                <i class="m-dots-three-vertical"></i>
                            </button>
                            <div v-if="activeOrderKey === item.key" class="dropdown-menu">
                                <button class="f-start-centered btn btn-sm btn-sleep w-100"
                                    @click="showInvoiceModal(item.key)">
                                    <i class="m-file-text"></i>
                                    <p>Invoice</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-success w-100"
                                    @click="updateStatus(item.key, 'Delivered')" v-if="item.status === 'Shipping'">
                                    <i class="m-m-round-tick-mark"></i>
                                    <p>Delivered</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-coral w-100"
                                    @click="updateStatus(item.key, 'Shipping')" v-if="item.status === 'Approved'">
                                    <i class="m-travel-car"></i>
                                    <p>Shipping</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-forest-green w-100"
                                    @click="updateStatus(item.key, 'Approved')" v-if="item.status === 'Pending'">
                                    <i class="m-check"></i>
                                    <p>Approved</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-warning w-100"
                                    @click="updateStatus(item.key, 'Pending')" v-if="item.status === 'Cancel'">
                                    <i class="m-clock"></i>
                                    <p>Pending</p>
                                </button>
                                <button class="f-start-centered btn btn-sm btn-error w-100"
                                    @click="updateStatus(item.key, 'Cancel')"
                                    v-if="item.status === 'Pending' || item.status === 'Approved'">
                                    <i class="m-close"></i>
                                    <p>Cancel</p>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr ref="loadMoreTrigger">
                    <td colspan="6" class="text-center" v-if="isLoading">
                        <div class="mastor-las"><span class="loader-orderList"></span></div>
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
                        <button class="btn btn-sm btn-error" @click="closeModal">
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
                                <p>{{ selectedOrder.area }}, {{ selectedOrder.district }}, {{ selectedOrder.division }}
                                </p>
                            </div>
                        </div>
                        <div class="f-between-center gap-10 mt-20">
                            <p><strong>Invoice Date:</strong> {{ formatDate(selectedOrder.date) }}</p>
                            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
                            <p><strong>Courier:</strong> {{ selectedOrder.courier || 'Not Assigned' }}</p>
                        </div>
                        <hr class="my-10">
                        <h4>Order Details</h4>
                        <table class="table table-1 w-100">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Attributes</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in selectedOrder.order_products" :key="product.id">
                                    <!-- Changed from product.product.title to product ID -->
                                    <td>{{ product.product.title }}</td>
                                    <td>
                                        <div v-if="product.attribute" class="f-center-start f-col gap-05 w-100">
                                            <span v-for="(value, key) in product.attribute" :key="key"
                                                class="f-center-start f-col">
                                                <div><b>Attribute:</b> <strong class="Maroon">{{ key }}</strong></div>
                                                <div><b>Variant:</b> <strong class="Maroon">{{ value[2] }}</strong>
                                                </div>
                                                <div><b>Quantity:</b> <strong class="Maroon"><button
                                                            class="btn btn-sm btn-love">{{ value[0] }}
                                                            pieces</button></strong></div>
                                                <div><b>Price:</b> <strong class="Maroon">Tk {{ value[1] }}</strong>
                                                </div>
                                            </span>
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
                                    <td>{{ formatPrice(selectedOrder.total) }}</td>
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
                        <button class="btn btn-primary" @click="showPrintOptions">Print</button>
                        <button class="btn btn-error" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>

            <!-- Print Options Modal -->
            <Teleport to="body">
                <div v-if="showPrintModal" class="modal-overlay" @click.self="showPrintModal = false">
                    <div class="print-options-modal">
                        <h3>Select Print Format</h3>
                        <div class="f-col gap-10">
                            <button class="btn btn-primary" @click="printInvoice('pos')">POS Print (80mm)</button>
                            <button class="btn btn-primary" @click="printInvoice('a5')">A5 Print</button>
                            <button class="btn btn-primary" @click="printInvoice('default')">Default Print</button>
                            <button class="btn btn-silver" @click="showPrintModal = false">Cancel</button>
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

// Interfaces

interface Product {
    title: string
    images: string
    key: string
    sellPrice: string
    discountPrice: string
}
interface OrderProduct {
    id: number
    attribute: Record<string, [number, number, string]> // [quantity, price, variant]
    order: number
    product: Product // Product ID instead of full Product object
}

interface Order {
    id: number
    title: string
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
    pay_method: string | null
    status: string
    courier: string | null
}

interface ApiResponse {
    count: number
    next: string | null
    previous: string | null
    results: Order[]
}

// Constants
const API_URL = 'http://192.168.0.111:3000/api'
const MAX_SERIAL = 999

// Refs
const showModal = ref(false)
const showPrintModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const activeOrderKey = ref<string | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const totalCount = ref(0)
const page = ref(1)
const nextUrl = ref<string | null>(null)
const orders = ref<Order[]>([])
const searchQuery = ref('')
const sortColumn = ref<keyof Order | ''>('')
const sortDirection = ref(true)
const tableRef = ref<HTMLElement | null>(null)

// Composables
const toast = useToast()
const accessToken = useCookie<string | null>('access')
const { startRefreshing, stopRefreshing, logout } = useAuth()

// Company Info
const companyInfo = {
    name: "Abraham Organic",
    address: "Nehar Market, Zindabazar",
    city: "Sylhet",
    country: "Bangladesh",
    phone: "+880 1234-567890",
    email: "abrahamorganic@gmail.com"
}

// Lifecycle Hooks
onMounted(() => {
    startRefreshing()
    fetchOrders(`${API_URL}/order_filter/Delivered?page=${page.value}&page_size=5`)
    if (loadMoreTrigger.value) {
        observer.value = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextUrl.value && !isLoading.value) {
                    fetchOrders(nextUrl.value)
                }
            },
            { threshold: 0.1 }
        )
        observer.value.observe(loadMoreTrigger.value)
    }
})

onUnmounted(() => {
    stopRefreshing()
    if (observer.value) observer.value.disconnect()
})

// Computed Properties
const filteredItems = computed(() => {
    let result = [...orders.value]
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item =>
            item.name.toLowerCase().includes(query) ||
            String(item.id).includes(query)
        )
    }
    if (sortColumn.value) {
        result.sort((a, b) => {
            const valueA = a[sortColumn.value as keyof Order]
            const valueB = b[sortColumn.value as keyof Order]
            if (sortColumn.value === 'order_products') {
                const idA = a.order_products[0]?.id || 0
                const idB = b.order_products[0]?.id || 0
                return sortDirection.value ? idA - idB : idB - idA
            }
            if (sortColumn.value === 'date') {
                return sortDirection.value
                    ? new Date(valueA as string).getTime() - new Date(valueB as string).getTime()
                    : new Date(valueB as string).getTime() - new Date(valueA as string).getTime()
            }
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return sortDirection.value ? valueA - valueB : valueB - valueA
            }
            return sortDirection.value
                ? String(valueA || '').localeCompare(String(valueB || ''))
                : String(valueB || '').localeCompare(String(valueA || ''))
        })
    }
    return result
})

// Data Fetching
const observer = ref<IntersectionObserver | null>(null)

const fetchOrders = async (url: string) => {
    isLoading.value = true
    try {
        const { data, error } = await useFetch<ApiResponse>(url, {
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` },
        })
        if (error.value) {
            if (error.value.status === 401) {
                toast.error('Session expired. Please log in again.')
                logout()
                return
            }
            throw new Error('Failed to fetch orders')
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

// Utility Functions
const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(price)

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const calculateSubtotal = (products: OrderProduct[]) => {
    return products.reduce((sum, product) => {
        let qty = 1
        if (product.attribute) {
            Object.values(product.attribute).forEach(value => {
                qty = value[0] // Quantity is the first element
            })
        }
        return sum + qty * (product.attribute ? Object.values(product.attribute)[0][1] : 1000)
    }, 0)
}

const calculateProductPrice = (product: OrderProduct) => {
    let qty = 1
    let price = 1000 // Default price since we don't have product details
    if (product.attribute) {
        const attrs = Object.values(product.attribute)[0]
        qty = attrs[0]
        price = attrs[1]
    }
    return formatPrice(qty * price)
}

// Event Handlers
const toggleActions = (orderKey: string) => {
    activeOrderKey.value = activeOrderKey.value === orderKey ? null : orderKey
}

const sortBy = (column: keyof Order) => {
    if (sortColumn.value === column) sortDirection.value = !sortDirection.value
    else {
        sortColumn.value = column
        sortDirection.value = true
    }
}

const queryFromTable = (event: Event) => {
    searchQuery.value = (event.target as HTMLInputElement).value
}

const updateCourier = async (orderKey: string, event: Event) => {
    const newCourier = (event.target as HTMLSelectElement).value
    try {
        const response = await fetch(`${API_URL}/order_detail/${orderKey}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken.value ?? ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courier: newCourier || null })
        })
        if (!response.ok) throw new Error('Failed to update courier')
        const index = orders.value.findIndex(item => item.key === orderKey)
        if (index !== -1) {
            orders.value[index].courier = newCourier || null
            toast.success(`Courier updated for order ${orderKey}`)
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
    if (!selectedOrder.value) return
    showPrintModal.value = true
}

const printInvoice = (format: 'pos' | 'a5' | 'default') => {
    const printWindow = window.open('', '_blank')
    if (!printWindow || !selectedOrder.value) return

    let width = 'auto'
    if (format === 'pos') width = '80mm'
    if (format === 'a5') width = '148mm'

    const content = `
        <style>
            @media print {
                .invoice { width: ${width}; margin: 0 auto; }
                body { margin: 0; padding: 10mm; }
            }
        </style>
        <div class="invoice">
            <h2>Invoice - Order #${selectedOrder.value.id}</h2>
            <p><strong>From:</strong> ${companyInfo.name}</p>
            <p><strong>To:</strong> ${selectedOrder.value.name}</p>
            <p><strong>Date:</strong> ${formatDate(selectedOrder.value.date)}</p>
            <p><strong>Status:</strong> ${selectedOrder.value.status}</p>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000;">Product</th>
                        <th style="border: 1px solid #000;">Quantity</th>
                        <th style="border: 1px solid #000;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${selectedOrder.value.order_products.map(product => `
                        <tr>
                            <td style="border: 1px solid #000;">${product.product.title}</td>
                            <td style="border: 1px solid #000;">${product.attribute ? Object.values(product.attribute)[0][0] : 1}</td>
                            <td style="border: 1px solid #000;">Tk ${product.attribute ? Object.values(product.attribute)[0][1] : 1000}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="2" style="text-align: right; border: 1px solid #000;"><strong>Subtotal:</strong></td>
                        <td style="border: 1px solid #000;">${formatPrice(calculateSubtotal(selectedOrder.value.order_products))}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: right; border: 1px solid #000;"><strong>Delivery:</strong></td>
                        <td style="border: 1px solid #000;">${formatPrice(selectedOrder.value.delivery_charge)}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: right; border: 1px solid #000;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #000;">${formatPrice(selectedOrder.value.total)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    printWindow.document.write(`<!DOCTYPE html><html><body>${content}<script>window.print();window.close();<script>
</body>

</html>`)
    printWindow.document.close()
}

const exportToExcel = () => {
    const exportData = filteredItems.value.map((item, index) => ({
        'SL': sortDirection.value || !sortColumn.value ? index + 1 : filteredItems.value.length - index,
        'Customer Name': item.name,
        'Phone': item.phone_no,
        'Address': `${item.address}, ${item.area}, ${item.district}, ${item.division}`,
        'Order Summary': item.order_products.map(p =>
            `${p.product.title}${p.attribute ?
                ' (' + Object.entries(p.attribute)
                    .map(([key, [qty, price, variant]]) =>
                        `${key}: ${variant}, ${qty} pcs, Tk ${price}`
                    ).join('; ') + ')'
                : ''}`
        ).join('; '),
        'Date': formatDate(item.date),
        'Courier': item.courier || 'Not Assigned',
        'Status': item.status,
        'Total': formatPrice(item.total),
        'Delivery Charge': formatPrice(item.delivery_charge)
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'Orders_export.xlsx');
    toast.success('Exported to Excel successfully');
};
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
    filteredItems.value.forEach((item, index) => {
        if (index > 0) doc.addPage()
        doc.text(`Order #${item.id}`, 10, 10)
        doc.text(`Customer: ${item.name}`, 10, 20)
        doc.text(`Products: ${item.order_products.map(p => `#${p.product}`).join(', ')}`, 10, 30)
        doc.text(`Total: ${formatPrice(item.total)}`, 10, 40)
    })
    doc.save('Orders_table.pdf')
    toast.success('Exported to PDF successfully')
}
</script>