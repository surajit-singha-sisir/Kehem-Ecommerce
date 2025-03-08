<template>
    <div class="stock-report-page">
        <h1>Stock Report</h1>
        <p class="subtitle">{{ totalCount }} Products</p>

        <!-- Bar Chart -->
        <div class="chart-container" v-if="products && products.length > 0">
            <Bar :data="chartData" :options="chartOptions" />
        </div>

        <!-- Stock List -->
        <div class="stock-list" v-if="products && products.length > 0">
            <div class="stock-item" v-for="product in products" :key="product.title + product.category">
                <div class="product-header">
                    <span class="product-title">{{ product.title }}</span>
                    <span class="product-category">{{ product.category }}</span>
                </div>
                <div class="stock-details">
                    <span>Total: {{ product.stock }} PCS</span>
                    <span>Current: {{ getTotalCurrentStock(product) }} PCS</span>
                    <span>Sold: {{ getTotalSold(product) }} PCS</span>
                </div>
                <div class="variants" v-if="product.attributes.Mandatory_attributes">
                    <div v-for="(variantData, variantKey) in adjustedAttributes(product).Mandatory_attributes"
                        :key="variantKey" class="variant-group">
                        <span class="variant-key">{{ variantKey }}</span>
                        <div class="variant-options">
                            <span v-for="(values, option) in variantData" :key="option" class="variant-option">
                                {{ option }}: {{ values[0] }} / {{ getTotalVariantStock(product, variantKey, option) }}
                                (Sold: {{ getSoldForVariant(product, variantKey, option) }})
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else class="no-variants">No variant details</div>
            </div>
        </div>
        <div v-else-if="products && products.length === 0" class="no-data">
            No products available.
        </div>
        <div v-if="isLoading" class="loading">Loading more...</div>
        <div ref="sentinel" class="sentinel"></div>
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Reactive state for API data
const products = ref([])
const totalCount = ref(0)
const nextUrl = ref(null)
const isLoading = ref(false)

// Fetch stock data
const fetchStock = async (url = 'http://192.168.0.111:3000/api/stock', append = false) => {
    isLoading.value = true
    const { data, error } = await useFetch(url, { method: 'GET' })

    if (error.value) {
        console.error('Error fetching stock data:', error.value)
        isLoading.value = false
        return
    }

    if (data.value) {
        if (append) {
            products.value = [...products.value, ...(data.value.results || [])]
        } else {
            products.value = data.value.results || []
        }
        totalCount.value = data.value.count || 0
        nextUrl.value = data.value.next
    }
    isLoading.value = false
}

// Adjust Mandatory_attributes based on sold data
const adjustedAttributes = (product) => {
    const attributes = JSON.parse(JSON.stringify(product.attributes))
    const sold = product.sold || {}

    if (Object.keys(sold).length > 0) {
        for (const [variantKey, soldVariants] of Object.entries(sold)) {
            if (attributes.Mandatory_attributes[variantKey]) {
                soldVariants.forEach(([option, soldQty]) => {
                    if (attributes.Mandatory_attributes[variantKey][option]) {
                        const [stockQty, price] = attributes.Mandatory_attributes[variantKey][option]
                        attributes.Mandatory_attributes[variantKey][option] = [stockQty - soldQty, price]
                    }
                })
            }
        }
    }
    return attributes
}

// Calculate total current stock
const getTotalCurrentStock = (product) => {
    const adjusted = adjustedAttributes(product)
    if (!adjusted.Mandatory_attributes) return product.stock

    let totalCurrentStock = 0
    for (const variantData of Object.values(adjusted.Mandatory_attributes)) {
        for (const [stockQty] of Object.values(variantData)) {
            totalCurrentStock += stockQty
        }
    }
    return totalCurrentStock
}

// Calculate total sold
const getTotalSold = (product) => {
    const sold = product.sold || {}
    let totalSold = 0
    for (const soldVariants of Object.values(sold)) {
        soldVariants.forEach(([, soldQty]) => {
            totalSold += soldQty
        })
    }
    return totalSold
}

// Get total stock for a variant option
const getTotalVariantStock = (product, variantKey, option) => {
    return product.attributes.Mandatory_attributes[variantKey][option][0]
}

// Get sold quantity for a variant option
const getSoldForVariant = (product, variantKey, option) => {
    const sold = product.sold || {}
    if (sold[variantKey]) {
        const soldEntry = sold[variantKey].find(([opt]) => opt === option)
        return soldEntry ? soldEntry[1] : 0
    }
    return 0
}

// Chart data
const chartData = computed(() => ({
    labels: products.value.map(p => p.title),
    datasets: [
        {
            label: 'Total Stock',
            backgroundColor: '#3498db',
            data: products.value.map(p => p.stock)
        },
        {
            label: 'Current Stock',
            backgroundColor: '#2ecc71',
            data: products.value.map(p => getTotalCurrentStock(p))
        },
        {
            label: 'Sold',
            backgroundColor: '#e74c3c',
            data: products.value.map(p => getTotalSold(p))
        }
    ]
}))

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Quantity (PCS)' } },
        x: { title: { display: true, text: 'Products' } }
    },
    plugins: {
        legend: { position: 'top' },
        tooltip: { enabled: true }
    }
}

// Initial fetch
fetchStock()

// Infinite scroll logic
const sentinel = ref(null)
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && nextUrl.value && !isLoading.value) {
                fetchStock(nextUrl.value, true)
            }
        },
        { threshold: 0.1 }
    )

    if (sentinel.value) {
        observer.observe(sentinel.value)
    }

    onUnmounted(() => {
        observer.disconnect()
    })
})
</script>

<style scoped>
.stock-report-page {
    width: 100%;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
}

h1 {
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
}

.subtitle {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin-bottom: 20px;
}

.chart-container {
    width: 100%;
    max-width: 900px;
    height: 300px;
    margin: 0 auto 40px;
}

.stock-list {
    max-width: 900px;
    margin: 0 auto;
}

.stock-item {
    background: #f9f9f9;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.product-title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
}

.product-category {
    font-size: 12px;
    color: #777;
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 12px;
}

.stock-details {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
}

.stock-details span {
    font-size: 14px;
    color: #555;
}

.stock-details span:nth-child(1) {
    color: #3498db;
}

/* Total */
.stock-details span:nth-child(2) {
    color: #2ecc71;
}

/* Current */
.stock-details span:nth-child(3) {
    color: #e74c3c;
}

/* Sold */

.variants {
    margin-top: 10px;
}

.variant-group {
    margin-bottom: 8px;
}

.variant-key {
    font-size: 14px;
    font-weight: 600;
    color: #444;
}

.variant-options {
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.variant-option {
    font-size: 12px;
    color: #666;
    background: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.no-variants {
    font-size: 12px;
    color: #888;
    font-style: italic;
}

.loading,
.no-data {
    text-align: center;
    color: #666;
    font-size: 16px;
    padding: 20px;
}

.sentinel {
    height: 20px;
}
</style>