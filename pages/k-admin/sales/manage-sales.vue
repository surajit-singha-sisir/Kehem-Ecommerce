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

// Define the product type based on your API data
interface ProductSummary {
    product__title: string
    total_amount: string
    total_quantity: number
    order_count: number
}

interface SalesData {
    total_orders: number
    grand_total: number
    product_totals: ProductSummary[]
}

// Auth and API setup
const { startRefreshing, stopRefreshing } = useAuth()
const accessToken = useCookie<string | null>('access')
const API_BASE = 'http://192.168.0.111:3000/api/sales_manager'

// State management
const activePeriod = ref('Week')
const fromDate = ref<Date | null>(null)
const toDate = ref<Date | null>(null)
const salesData = ref<SalesData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Date utility functions
const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
}

const getPeriodDates = (period: string) => {
    const today = new Date()
    let start: Date
    let end = new Date()

    switch (period.toLowerCase()) {
        case 'today':
            start = new Date(today)
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
const fetchSalesData = async (start: Date, end: Date) => {
    try {
        loading.value = true
        error.value = null

        const url = `${API_BASE}?start_date=${formatDate(start)}&end_date=${formatDate(end)}`
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
        console.log('Fetched sales data:', salesData.value) // Debug log
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch sales data'
        console.error('Fetch error:', error.value) // Debug log
    } finally {
        loading.value = false
    }
}

// Handle period selection
const selectPeriod = (period: string) => {
    activePeriod.value = period
    const { start, end } = getPeriodDates(period)
    fetchSalesData(start, end)
}

// Handle custom date filter
const periodFilter = () => {
    if (fromDate.value && toDate.value) {
        activePeriod.value = ''
        console.log('Filtering with dates:', fromDate.value, toDate.value) // Debug log
        fetchSalesData(fromDate.value, toDate.value)
    } else {
        console.warn('Please select both start and end dates') // Debug log
    }
}

// Computed properties for display
const totalRevenue = computed(() => salesData.value?.grand_total || 0)
const totalOrders = computed(() => salesData.value?.total_orders || 0)
const productSummaries = computed((): ProductSummary[] => salesData.value?.product_totals || [])

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
    const { start, end } = getPeriodDates('Week')
    fetchSalesData(start, end)
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
                        <p class="increased">Orders: {{ totalOrders }}</p>
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
            <aside class="outer-table">
                <table class="table table-3">
                    <thead>
                        <tr>
                            <th colspan="5">Top Customers</th>
                        </tr>
                        <tr>
                            <th>SL</th>
                            <th>Product</th>
                            <th>Total Sales</th>
                            <th>Revenue</th>
                            <th>Total Customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                        </tr>
                    </tbody>
                </table>
            </aside>
        </div>
    </section>
</template>

<style lang="scss">
.loading {
    text-align: center;
    padding: 20px;
}

.error {
    color: red;
    text-align: center;
    padding: 20px;
}

.time-session {
    cursor: pointer;
    padding: 5px 10px;
}

.time-session.active {
    background-color: #246fd8;
    color: white;
    border-radius: 4px;
}

.chart-container {
    margin: 20px 0;
}

.chart-wrapper {
    position: relative;
    height: 400px;
    width: 100%;
}



.outer-table {
    position: relative;
    width: 100%;
    overflow-x: auto;
    padding: 2rem 0;
    scrollbar-width: thin;
    scrollbar-color: #c4c4c4 transparent;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #c5d9f8;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #246fd8;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
            background: #246fd8;
        }
    }

    .table-2 {
        width: 100%;
        overflow-x: auto;
        border-collapse: collapse;

        thead {
            tr {
                background-color: #c5d9f8;

                th {
                    color: #313131;
                    padding: 1rem;
                }

                &:nth-child(even) {
                    background-color: #246fd8;

                    th {
                        color: #fff;
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    padding: 1rem;
                }
            }
        }
    }

    .table-3 {
        width: 100%;
        overflow-x: auto;
        border-collapse: collapse;

        thead {
            tr {
                background-color: #eee8b0;

                th {
                    color: #313131;
                    padding: 1rem;
                }

                &:nth-child(even) {
                    background-color: #1c8796;

                    th {
                        color: #fff;
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    padding: 1rem;
                }
            }
        }
    }
}





.border-bottom {
    border-bottom: 1px solid #ccc;
}

.sales {
    position: relative;
    width: 100%;

    .filtered {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 0;

        .time-filter {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border: 1px solid #ccc;

                .time-session {
                    display: block;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;

                    &:hover {
                        background-color: #dbe0f3;
                    }
                }

                .active {
                    background-color: #9aaaf1;
                    border: none;

                    &:hover {
                        background-color: #9aaaf1;
                    }
                }
            }
        }

        .period {
            display: flex;
            align-items: flex-end;
            gap: 0.5rem;

            .inner-period {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;

                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                }
            }

            button {
                height: 2.3rem;
            }
        }
    }

    .sales-amount {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 1rem;
        background-color: #fafafa;
        // background-image: url(/images/props-1.png);
        // background-position: right bottom;
        // background-size: cover;
        // background-repeat: no-repeat;


        .text-set {
            font-size: 1.2rem;
            color: #1e3d52;
        }

        .amount {
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            span {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                b:first-child {
                    font-size: 2.5rem;
                }
            }

            div {
                display: flex;
                gap: 1rem;

                p {
                    font-size: 0.8rem;
                }

                .increased {
                    color: #0a6894;
                }

                .decreased {
                    color: #d40808;
                }
            }
        }
    }
}

@media screen and (max-width: 720px) {
    .filtered {
        justify-content: center !important;
        flex-wrap: wrap;
    }

    .period {
        justify-content: center !important;
        flex-wrap: wrap;
    }
}

@media screen and (max-width: 520px) {
    .filtered {
        justify-content: center !important;
        flex-wrap: wrap;
    }
}
</style>