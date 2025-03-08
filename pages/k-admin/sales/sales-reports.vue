<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCookie } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

// Define types based on your API data
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
const salesData = ref<SalesData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const fromDate = ref<Date | null>(null)
const toDate = ref<Date | null>(null)

// Date utility function
const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0] // Formats to YYYY-MM-DD
}

// Fetch sales data
const periodFilter = async () => {
    if (!fromDate.value || !toDate.value) {
        console.warn('Please select both start and end dates')
        return
    }

    try {
        loading.value = true
        error.value = null

        console.log('Filtering with dates:', fromDate.value, toDate.value) // Debug log
        const url = `${API_BASE}?start_date=${formatDate(fromDate.value)}&end_date=${formatDate(toDate.value)}`
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

// Lifecycle hooks
onMounted(() => {
    startRefreshing()
})

onUnmounted(() => {
    stopRefreshing()
})
</script>

<template>
    <section class="sales-report">
        <h2>Sales Report</h2>

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

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="!loading && salesData" class="report-content">
            <!-- Summary Section -->
            <div class="summary">
                <h3>Sales Summary</h3>
                <div class="summary-stats">
                    <div class="stat-box">
                        <span>Total Orders:</span>
                        <strong>{{ salesData.total_orders }}</strong>
                    </div>
                    <div class="stat-box">
                        <span>Grand Total:</span>
                        <strong>{{ salesData.grand_total.toLocaleString() }} BDT</strong>
                    </div>
                    <div class="stat-box">
                        <span>Unique Customers:</span>
                        <strong>{{ salesData.unique_customers }}</strong>
                    </div>
                </div>
            </div>

            <!-- Product Totals Table -->
            <div class="table-container">
                <h3>Product Sales</h3>
                <table v-if="salesData.product_totals.length > 0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity Sold</th>
                            <th>Revenue (BDT)</th>
                            <th>Order Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in salesData.product_totals" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.product__title }}</td>
                            <td>{{ product.total_quantity }}</td>
                            <td>{{ Number(product.total_amount).toLocaleString() }}</td>
                            <td>{{ product.order_count }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>No product sales data available</p>
            </div>

            <!-- Customer Totals Table -->
            <div class="table-container">
                <h3>Customer Purchases</h3>
                <table v-if="salesData.customer_totals.length > 0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Total Products Purchased</th>
                            <th>Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in salesData.customer_totals" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.customer_name }}</td>
                            <td>{{ customer.phone_no }}</td>
                            <td>{{ customer.total_products_purchased }}</td>
                            <td>{{ customer.total_orders }}</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>No customer data available</p>
            </div>
        </div>
    </section>
</template>


