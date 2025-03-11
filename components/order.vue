<!-- components/OrderForm.vue -->
<template>
    <section class="container">
      <!-- Left Section: Shipping & Billing -->
      <div class="section shipping-billing">
        <h2>Shipping & Billing</h2>
        <form id="orderForm" @submit.prevent="handleSubmit">
          <label for="fullName">Full Name <span class="required">*</span></label>
          <input
            v-model="form.fullName"
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            required
          />
  
          <label for="phoneNumber">Phone Number <span class="required">*</span></label>
          <input
            v-model="form.phoneNumber"
            type="tel"
            id="phoneNumber"
            placeholder="Enter your valid phone"
            required
          />
  
          <h3>Shipping Address <span class="required">*</span></h3>
          <div class="shipping-border">
            <label for="division">Division</label>
            <select v-model="form.division" id="division" required>
              <option value="">Select Division</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="rajshahi">Rajshahi</option>
            </select>
  
            <label for="district">District</label>
            <select v-model="form.district" id="district" required>
              <option value="">Select District</option>
              <option value="dhaka">Dhaka</option>
              <option value="narayanganj">Narayanganj</option>
              <option value="gazipur">Gazipur</option>
            </select>
  
            <label for="area">Area</label>
            <select v-model="form.area" id="area" required>
              <option value="">Select Area</option>
              <option value="mirpur">Mirpur</option>
              <option value="dhanmondi">Dhanmondi</option>
              <option value="gulshan">Gulshan</option>
            </select>
  
            <label for="address">Address</label>
            <input
              v-model="form.address"
              type="text"
              id="address"
              placeholder="Example: House #12, Street #4, XYZ Road"
              required
            />
          </div>
  
          <label>Select a label for effective delivery</label>
          <div class="delivery-labels">
            <button
              type="button"
              class="label-btn"
              :class="{ active: deliveryLabel === 'office' }"
              @click="deliveryLabel = 'office'"
            >
              OFFICE
            </button>
            <button
              type="button"
              class="label-btn"
              :class="{ active: deliveryLabel === 'house' }"
              @click="deliveryLabel = 'house'"
            >
              HOUSE
            </button>
          </div>
        </form>
      </div>
  
      <!-- Right Section: Product Information & Order Summary -->
      <div class="section product-info">
        <h2>Product Information</h2>
        <div class="product" v-for="(product, index) in products" :key="index">
          <img :src="product.image" :alt="product.name" />
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
            <p>{{ product.quantity }} piece{{ product.quantity > 1 ? 's' : '' }}</p>
          </div>
        </div>
  
        <h2>Order Summary</h2>
        <div class="order-summary">
          <p v-for="(item, index) in orderSummary" :key="index">
            {{ item.name }} <span>{{ item.cost }}</span>
          </p>
          <p class="total">TOTAL <span>Tk {{ total }}</span></p>
        </div>
  
        <p class="contact-info">
          For any inquiry, call: +8801700905268 <br />
          <small
            >যেকোনো সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন। <br />
            আমরা সর্বোচ্চ চেষ্টা করবো আপনার সমস্যা সমাধান করতে। <br />
            ডেলিভারি সময়: পেমেন্ট করার ২ থেকে ৫ দিন।</small
          >
        </p>
  
        <button type="submit" form="orderForm" class="order-btn">Order Now</button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Reactive form state
  const form = reactive({
    fullName: '',
    phoneNumber: '',
    division: '',
    district: '',
    area: '',
    address: '',
  })
  
  // Delivery label state
  const deliveryLabel = ref('house')
  
  // Product data
  const products = ref([
    {
      name: 'Moonseed Diabetic Care',
      price: 'Tk 390.00',
      quantity: 3,
      image: 'https://via.placeholder.com/80',
    },
    {
      name: 'Adger Herbal Diabetic Care',
      price: 'Tk 790.00',
      quantity: 1,
      image: 'https://via.placeholder.com/80',
    },
  ])
  
  // Order summary data
  const orderSummary = ref([
    { name: 'Moonseed (3 x 390)', cost: 'Tk 1170' },
    { name: 'Adger Herbal (1 x 790)', cost: 'Tk 790' },
    { name: 'Delivery Fee (2 items x 120)', cost: 'Tk 240' },
  ])
  
  // Computed total
  const total = computed(() => {
    return 2200 // You can calculate this dynamically if needed
  })
  
  // Form submission handler
  const handleSubmit = () => {
    if (
      form.fullName &&
      form.phoneNumber &&
      form.division &&
      form.district &&
      form.area &&
      form.address
    ) {
      alert(
        `Order placed successfully!\n\nFull Name: ${form.fullName}\nPhone Number: ${form.phoneNumber}\nAddress: ${form.address}, ${form.area}, ${form.district}, ${form.division}`
      )
    } else {
      alert('Please fill in all required fields.')
    }
  }
  </script>
  
  <style scoped>
  /* Scoped styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .section {
    padding: 25px;
  }
  
  h2 {
    font-size: 22px;
    color: #1a202c;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  h3 {
    font-size: 18px;
    color: #2d3748;
    margin-bottom: 15px;
  }
  
  label {
    font-size: 14px;
    color: #4a5568;
    margin-bottom: 8px;
    display: block;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }
  
  input:focus,
  select:focus {
    border-color: #63b3ed;
    outline: none;
  }
  
  .required {
    color: #e53e3e;
  }
  
  .delivery-labels {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .label-btn {
    padding: 10px 20px;
    border: 1px solid #e2e8f0;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .label-btn.active {
    background-color: #79a370;
    color: #fff;
  }
  
  .label-btn:hover {
    background-color: #edf2f7;
  }
  
  .product {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9fafb;
    border-radius: 8px;
  }
  
  .product img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
  }
  
  .product-details h3 {
    font-size: 16px;
    color: #2d3748;
    margin-bottom: 5px;
  }
  
  .product-details p {
    font-size: 14px;
    color: #718096;
    margin: 2px 0;
  }
  
  .order-summary p {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #4a5568;
    margin: 10px 0;
  }
  
  .order-summary .total {
    font-size: 18px;
    color: #2d3748;
    font-weight: 600;
    border-top: 1px solid #e2e8f0;
    padding-top: 15px;
    margin-top: 15px;
  }
  
  .contact-info {
    font-size: 12px;
    color: #718096;
    margin-top: 20px;
    line-height: 1.8;
  }
  
  .order-btn {
    width: 100%;
    padding: 10px;
    background-color: #2b6cb0;
    color: #fff;
    border: none;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }
  
  .order-btn:hover {
    background-color: #2c5282;
  }
  
  .shipping-border {
    border: 1px solid #e2e8f0;
    padding: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
    }
  
    .section {
      width: 100%;
    }
  }
  </style>