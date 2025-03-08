<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
    LinearScale
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Define types based on your updated API data
interface ProductSummary {
    product__title: string
    total_amount: string
    total_quantity: number
    order_count: number
}

interface CustomerSummary {
    phone_no: string
    customer_name: string
    total_products_purchased: number
    total_orders: number
}

interface SalesData {
    total_orders: number
    grand_total: number
    unique_customers: number
    customer_totals: CustomerSummary[]
    product_totals: ProductSummary[]
}

// Auth and API setup
const { startRefreshing, stopRefreshing } = useAuth()
const accessToken = useCookie<string | null>('access')
const API_BASE = 'http://192.168.0.111:3000/api/sales_manager'

// State management
const activePeriod = ref('Today') // Default to 'Today'
const fromDate = ref<Date | null>(null)
const toDate = ref<Date | null>(null)
const salesData = ref<SalesData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Date utility functions
const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() is 0-based
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getPeriodDates = (period: string) => {
    const today = new Date()
    let start: Date
    let end = new Date()

    switch (period.toLowerCase()) {
        case 'today':
            start = new Date(today)
            end = new Date(today) // Still set end, but won't use it in URL
            break
        case 'week':
            start = new Date(today)
            start.setDate(today.getDate() - 7)
            break
        case 'month':
            start = new Date(today)
            start.setMonth(today.getMonth() - 1)
            break
        case 'total':
            start = new Date('2020-01-01')
            break
        default:
            start = new Date(today)
    }
    return { start, end }
}

// Fetch sales data
const fetchSalesData = async (start: Date, end: Date, isToday: boolean = false) => {
    try {
        loading.value = true
        error.value = null

        // For "Today", only use start_date; otherwise, use both start_date and end_date
        const formattedStart = formatDate(start)
        const formattedEnd = formatDate(end)
        const url = isToday
            ? `${API_BASE}?start_date=${formattedStart}`
            : `${API_BASE}?start_date=${formattedStart}&end_date=${formattedEnd}`

        console.log('API Request URL:', url) // Log the URL for debugging

        const response = await useFetch<SalesData>(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken.value ?? ''}`
            }
        })

        if (response.error.value) {
            throw new Error(response.error.value.message)
        }

        salesData.value = response.data.value
        console.log('Fetched sales data:', salesData.value)
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch sales data'
        console.error('Fetch error:', error.value)
    } finally {
        loading.value = false
    }
}

// Handle period selection
const selectPeriod = (period: string) => {
    activePeriod.value = period
    const { start, end } = getPeriodDates(period)
    fetchSalesData(start, end, period.toLowerCase() === 'today')
}

// Handle custom date filter
// Handle custom date filter
const periodFilter = () => {
    if (fromDate.value && toDate.value) {
        activePeriod.value = ''
        console.log('Filtering with dates:', fromDate.value, toDate.value)

        // Format dates to 'YYYY-MM-DD'
        const formattedFromDate = formatDate(fromDate.value)
        const formattedToDate = formatDate(toDate.value)

        console.log('Formatted dates for API:', formattedFromDate, formattedToDate)
        fetchSalesData(fromDate.value, toDate.value)
    } else {
        console.warn('Please select both start and end dates')
    }
}

// Computed properties for display
const totalRevenue = computed(() => salesData.value?.grand_total || 0)
const totalOrders = computed(() => salesData.value?.total_orders || 0)
const uniqueCustomers = computed(() => salesData.value?.unique_customers || 0)
const productSummaries = computed((): ProductSummary[] => salesData.value?.product_totals || [])
const customerSummaries = computed((): CustomerSummary[] => salesData.value?.customer_totals || [])

// Chart data
const chartData = computed(() => ({
    labels: productSummaries.value.map((p: ProductSummary) => p.product__title),
    datasets: [{
        label: 'Revenue (BDT)',
        backgroundColor: '#246fd8',
        data: productSummaries.value.map((p: ProductSummary) => Number(p.total_amount))
    }]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Revenue (BDT)'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Products'
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: true,
            text: 'Product Revenue Comparison'
        }
    }
}

// Lifecycle hooks
onMounted(() => {
    startRefreshing()
    const { start } = getPeriodDates('Today') // Fetch only today's data
    fetchSalesData(start, start, true) // Pass true for isToday
})

onUnmounted(() => {
    stopRefreshing()
})
</script>

<template>
    <section class="sales">
        <h2 class="pad--10 border-bottom f-start-center gap-04 Gray-800">
            <i class="m-bars-alt"></i><b>Sales Manager</b>
        </h2>

        <div class="f f-col m-t--10">
            <div class="filtered">
                <aside class="time-filter">
                    <div>
                        <span v-for="period in ['Today', 'Week', 'Month', 'Total']" :key="period" class="time-session"
                            :class="{ active: activePeriod === period }" @click="selectPeriod(period)">
                            {{ period }}
                        </span>
                    </div>
                </aside>

                <aside class="period">
                    <div class="inner-period">
                        <p>From</p>
                        <DateTimePicker v-model="fromDate" />
                    </div>
                    <div class="inner-period">
                        <p>To</p>
                        <DateTimePicker v-model="toDate" />
                    </div>
                    <button type="button" class="btn btn-rain btn-sm" @click="periodFilter">
                        <i class="m-filter"></i> Filter
                    </button>
                </aside>
            </div>

            <div class="sales-amount border-all" v-if="!loading && salesData">
                <div class="text-set">
                    <b>Total Sold Amounts</b>
                </div>
                <div class="amount">
                    <span>
                        <b>{{ totalRevenue.toLocaleString() }}</b>
                        <b>BDT</b>
                    </span>
                    <div>
                        <p class="increased">Orders: {{ totalOrders }} | Unique Customers: {{ uniqueCustomers }}</p>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="loading">Loading...</div>
            <div v-if="error" class="error">{{ error }}</div>

            <!-- Chart Section -->
            <aside class="chart-container" v-if="!loading && productSummaries.length">
                <h3 class="f-start-center gap-05">
                    <i class="m-chart-bar"></i>
                    <p>Revenue Comparison</p>
                </h3>
                <div class="chart-wrapper">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
            </aside>

            <!-- Total Sales Summary Table -->
            <aside class="outer-table" v-if="!loading && productSummaries.length > 0">
                <h3 class="f-start-center gap-05">
                    <i class="m-stats-bars2"></i>
                    <p>Total Sales Summary</p>
                </h3><br>
                <table class="table table-2">
                    <thead>
                        <tr>
                            <th colspan="5">Sales Summary</th>
                        </tr>
                        <tr>
                            <th>SL</th>
                            <th>Product</th>
                            <th>Total Sales</th>
                            <th>Revenue</th>
                            <th>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in productSummaries" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.product__title }}</td>
                            <td>{{ product.total_quantity }}</td>
                            <td>{{ Number(product.total_amount).toLocaleString() }} BDT</td>
                            <td>{{ product.order_count }}</td>
                        </tr>
                    </tbody>
                </table>
            </aside>
            <div v-else-if="!loading && productSummaries.length === 0" class="no-data">
                No sales data available for this period
            </div><br>

            <!-- Top Customers List Table -->
            <h3 class="f-start-center gap-05">
                <i class="m-file-text1"></i>
                <p>Top Customers List</p>
            </h3>
            <aside class="outer-table" v-if="!loading && customerSummaries.length > 0">
                <table class="table table-3">
                    <thead>
                        <tr>
                            <th colspan="5">Top Customers</th>
                        </tr>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Total Purchase</th>
                            <th>Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in customerSummaries" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.customer_name }}</td>
                            <td>{{ customer.phone_no }}</td>
                            <td>{{ customer.total_products_purchased }}</td>
                            <td>{{ customer.total_orders }}</td>
                        </tr>
                    </tbody>
                </table>
            </aside>
            <div v-else-if="!loading && customerSummaries.length === 0" class="no-data">
                No customer data available for this period
            </div>
        </div>
    </section>
</template>

<style lang="scss"></style>