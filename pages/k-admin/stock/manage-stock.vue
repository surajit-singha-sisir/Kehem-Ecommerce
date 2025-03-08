<template>
  <div class="stock-page">
    <h1>Stock Overview ({{ totalCount }} Products)</h1>
    <div class="stock-grid" v-if="products && products.length > 0">
      <div class="stock-card" v-for="product in products" :key="product.title + product.category">
        <!-- Product Header -->
        <div class="header">
          <h2>{{ product.title }}</h2>
          <span class="category">{{ product.category }}</span>
        </div>

        <!-- Pricing Section -->
        <div class="pricing">
          <div class="price-item">
            <span class="label">Buy Price:</span>
            <span class="value">৳{{ product.buyPrice }}</span>
          </div>
          <div class="price-item">
            <span class="label">Sell Price:</span>
            <span class="value">৳{{ product.sellPrice }}</span>
          </div>
          <div class="price-item discount">
            <span class="label">Discount Price:</span>
            <span class="value">৳{{ product.discountPrice }}</span>
          </div>
        </div>

        <!-- Stock Info -->
        <div class="stock-info">
          <span class="label">Total Stock:</span>
          <span class="stock-count">{{ product.stock }} PCS</span>
        </div>
        <div class="stock-info">
          <span class="label">Current Stock:</span>
          <span class="stock-count">{{ getTotalCurrentStock(product) }} PCS</span>
        </div>

        <!-- Mandatory Attributes (Adjusted for Sold) -->
        <div class="variants" v-if="adjustedAttributes(product).Mandatory_attributes">
          <h3>Variants</h3>
          <div class="variant-list">
            <div 
              v-for="(variantData, variantKey) in adjustedAttributes(product).Mandatory_attributes" 
              :key="variantKey"
              class="variant-group"
            >
              <span class="variant-label">{{ variantKey }}:</span>
              <div class="variant-items">
                <div 
                  v-for="(values, option) in variantData" 
                  :key="option"
                  class="variant-item"
                >
                  <span class="variant-name">{{ option }}</span>
                  <span class="variant-stock">{{ values[0] }} PCS</span>
                  <span class="variant-price">৳{{ values[1] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="products && products.length === 0" class="no-data">
      No products available.
    </div>
    <div v-if="isLoading" class="loading">Loading more products...</div>
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>

<script setup>
// Reactive state for API data
const products = ref([])
const totalCount = ref(0)
const nextUrl = ref(null)
const isLoading = ref(false)

// Function to fetch stock data
const fetchStock = async (url = 'http://192.168.0.111:3000/api/stock', append = false) => {
  isLoading.value = true
  const { data, error } = await useFetch(url, {
    method: 'GET',
  })

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

// Function to adjust Mandatory_attributes based on sold data
const adjustedAttributes = (product) => {
  const attributes = JSON.parse(JSON.stringify(product.attributes)) // Deep copy to avoid mutating original
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

// Function to calculate total current stock for the product
const getTotalCurrentStock = (product) => {
  const adjusted = adjustedAttributes(product)
  if (!adjusted.Mandatory_attributes) return product.stock // Fallback to total stock if no variants

  let totalCurrentStock = 0
  for (const variantData of Object.values(adjusted.Mandatory_attributes)) {
    for (const [stockQty] of Object.values(variantData)) {
      totalCurrentStock += stockQty
    }
  }
  return totalCurrentStock
}

// Initial fetch
fetchStock()

// Infinite scroll logic
const sentinel = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && nextUrl.value && !isLoading.value) {
        fetchStock(nextUrl.value, true) // Append new data
      }
    },
    { threshold: 0.1 } // Trigger when 10% of sentinel is visible
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
.stock-page {
  width: 100%; /* Full width */
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.stock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%; /* Ensure grid spans full width */
}

.stock-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header {
  margin-bottom: 15px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center; /* Center the header for full-width feel */
}

h2 {
  font-size: 18px;
  color: #444;
  margin: 0;
  word-break: break-word;
}

.category {
  font-size: 12px;
  color: #777;
  background: #f5f5f5;
  padding: 3px 6px;
  border-radius: 10px;
  margin-left: 8px;
}

.pricing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

.price-item {
  display: flex;
  flex-direction: column;
}

.price-item.discount .value {
  color: #e74c3c;
}

.label {
  font-size: 12px;
  color: #666;
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.stock-info {
  margin-bottom: 15px;
}

.stock-count {
  font-size: 14px;
  font-weight: 600;
  color: #27ae60;
  margin-left: 8px;
}

.variants {
  margin-top: 15px;
}

h3 {
  font-size: 14px;
  color: #444;
  margin-bottom: 8px;
}

.variant-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.variant-group {
  background: #f9f9f9;
  padding: 8px;
  border-radius: 6px;
}

.variant-label {
  font-weight: 600;
  color: #333;
  font-size: 13px;
}

.variant-items {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.variant-item {
  min-width: 90px;
}

.variant-name {
  font-weight: 600;
  color: #333;
  font-size: 12px;
}

.variant-stock {
  display: block;
  font-size: 12px;
  color: #666;
}

.variant-price {
  display: block;
  font-size: 12px;
  color: #2c3e50;
  font-weight: 600;
}

.loading, .no-data {
  text-align: center;
  color: #666;
  font-size: 16px;
  padding: 20px;
  width: 100%;
}

.sentinel {
  height: 20px;
  width: 100%;
}
</style>