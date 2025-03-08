<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCookie } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Define types
interface SalesData {
    total_orders: number
    grand_total: number
    unique_customers: number
    customer_totals: { phone_no: string; customer_name: string; total_products_purchased: number; total_orders: number }[]
    product_totals: { product__title: string; total_amount: string; total_quantity: number; order_count: number }[]
}

interface OrderData {
    count: number
    results: { id: number; status: string; total: number; date: string; name: string; phone_no: string }[]
}

interface ProductData {
    key: string
    title: string
    category: string
    images: string
    attributes: Record<string, Record<string, [number, number]>>
}

// Auth and API setup
const { startRefreshing, stopRefreshing } = useAuth()
const accessToken = useCookie<string | null>('access')
const API_BASE = 'http://192.168.0.111:3000/api'

// State management
const salesToday = ref<SalesData | null>(null)
const salesWeek = ref<SalesData | null>(null)
const salesMonth = ref<SalesData | null>(null)
const orders = ref<{ [key: string]: number }>({ Pending: 0, Approved: 0, Shipping: 0, Delivered: 0, Cancel: 0 })
const products = ref<ProductData[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Date utility
const formatDate = (date: Date) => date.toISOString().split('T')[0]

const getPeriodDates = (period: string) => {
    const today = new Date()
    let start: Date
    switch (period) {
        case 'today':
            start = new Date(today)
            return { start, end: start }
        case 'week':
            start = new Date(today)
            start.setDate(today.getDate() - 7)
            return { start, end: today }
        case 'month':
            start = new Date(today)
            start.setMonth(today.getMonth() - 1)
            return { start, end: today }
        default:
            return { start: today, end: today }
    }
}

// Fetch functions
const fetchSalesData = async (period: string, refTarget: typeof salesToday) => {
    const { start, end } = getPeriodDates(period)
    const url = period === 'today'
        ? `${API_BASE}/sales_manager?start_date=${formatDate(start)}`
        : `${API_BASE}/sales_manager?start_date=${formatDate(start)}&end_date=${formatDate(end)}`

    try {
        const response = await useFetch<SalesData>(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` }
        })
        if (response.error.value) throw new Error(response.error.value.message)
        refTarget.value = response.data.value
    } catch (err) {
        error.value = err instanceof Error ? err.message : `Failed to fetch ${period} sales`
    }
}

const fetchOrders = async () => {
    const statuses = ['Pending', 'Approved', 'Shipping', 'Delivered', 'Cancel']
    for (const status of statuses) {
        const url = `${API_BASE}/order_filter/${status}?page=1&page_size=5`
        try {
            const response = await useFetch<OrderData>(url, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken.value ?? ''}` }
            })
            if (response.error.value) throw new Error(response.error.value.message)
            orders.value[status] = response.data.value?.count || 0
        } catch (err) {
            error.value = err instanceof Error ? err.message : `Failed to fetch ${status} orders`
        }
    }
}

const fetchProducts = async () => {
    const url = `${API_BASE}/productlist`
    try {
        const response = await useFetch<ProductData[]>(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken.value ?? ''}` }
        })
        if (response.error.value) throw new Error(response.error.value.message)
        products.value = response.data.value || []
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch products'
    }
}

// Chart data
const chartData = computed(() => ({
    labels: ['Today', 'Week', 'Month'],
    datasets: [{
        label: 'Revenue (BDT)',
        backgroundColor: '#246fd8',
        data: [
            salesToday.value?.grand_total || 0,
            salesWeek.value?.grand_total || 0,
            salesMonth.value?.grand_total || 0
        ]
    }]
}))

const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Revenue (BDT)' } },
        x: { title: { display: true, text: 'Period' } }
    },
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Sales Trend' }
    }
}

// Fetch all data on mount
onMounted(async () => {
    loading.value = true
    startRefreshing()
    await Promise.all([
        fetchSalesData('today', salesToday),
        fetchSalesData('week', salesWeek),
        fetchSalesData('month', salesMonth),
        fetchOrders(),
        fetchProducts()
    ])
    loading.value = false
})

onUnmounted(() => stopRefreshing())
</script>

<template>
    <section class="dashboard">
        <h2>Dashboard Overview</h2>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="!loading" class="dashboard-content">
            <!-- Sales Summary -->
            <div class="summary-section">
                <h3>Sales Overview</h3>
                <div class="summary-stats">
                    <div class="stat-box">
                        <span>Today’s Revenue:</span>
                        <strong>{{ salesToday?.grand_total.toLocaleString() || 0 }} BDT</strong>
                    </div>
                    <div class="stat-box">
                        <span>Week’s Revenue:</span>
                        <strong>{{ salesWeek?.grand_total.toLocaleString() || 0 }} BDT</strong>
                    </div>
                    <div class="stat-box">
                        <span>Month’s Revenue:</span>
                        <strong>{{ salesMonth?.grand_total.toLocaleString() || 0 }} BDT</strong>
                    </div>
                    <div class="stat-box">
                        <span>Today’s Orders:</span>
                        <strong>{{ salesToday?.total_orders || 0 }}</strong>
                    </div>
                    <div class="stat-box">
                        <span>Unique Customers (Month):</span>
                        <strong>{{ salesMonth?.unique_customers || 0 }}</strong>
                    </div>
                </div>
            </div>

            <!-- Sales Trend Chart -->
            <div class="chart-container">
                <h3>Sales Trend</h3>
                <div class="chart-wrapper">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
            </div>

            <!-- Order Status -->
            <div class="order-section">
                <h3>Order Status</h3>
                <div class="status-grid">
                    <div class="status-box" v-for="(count, status) in orders" :key="status">
                        <span>{{ status }}:</span>
                        <strong>{{ count }}</strong>
                    </div>
                </div>
            </div>

            <!-- Top Products -->
            <div class="product-section">
                <h3>Top Products (Month)</h3>
                <table class="table table-2" v-if="salesMonth?.product_totals?.length">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Revenue (BDT)</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in salesMonth.product_totals.slice(0, 5)" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.product__title }}</td>
                            <td>{{ Number(product.total_amount).toLocaleString() }}</td>
                            <td>{{ product.total_quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>No sales data available</p>
            </div>
        </div>
    </section>
</template>
