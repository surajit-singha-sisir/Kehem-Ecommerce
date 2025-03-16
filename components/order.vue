<template>
  <form @submit.prevent="handleSubmit" class="g-res-2-col-container gap-20 res-container m-auto pad-t--20">
    <div class="f-col f gap-10">
      <h2>Shipping & Billing</h2>
      <section id="orderForm" class="f f-col gap-10">
        <label for="fullName" class="star">Full Name</label>
        <input v-model="form.fullName" type="text" id="fullName" placeholder="Enter your full name" required />

        <label for="phoneNumber" class="star">Phone Number</label>
        <div>
          <input maxlength="14" v-model="form.phoneNumber" type="tel" id="phoneNumber"
            placeholder="Enter your valid phone" required @input="formatPhoneNumber"
            :class="{ 'is-invalid': !isValidPhone && form.phoneNumber }" />
          <div v-if="!isValidPhone && form.phoneNumber" class="Red">
            {{ errorMessage }}
          </div>
        </div>

        <h3 class="star">Shipping Address</h3>
        <div class="b-Silver b-1 pad--10 b-rad--03 f-center-start f-col gap-05">
          <label for="division">Division</label>
          <div class="option">
            <select v-model="form.division" id="division" required>
              <option value="">Select Division</option>
              <option v-for="division in divisions" :key="division.id" :value="division.id">
                {{ division.name }}
              </option>
            </select>
          </div>

          <label for="district">District</label>
          <div class="option">
            <select v-model="form.district" id="district" required :disabled="!form.division">
              <option value="">Select District</option>
              <option v-for="district in filteredDistricts" :key="district.id" :value="district.name">
                {{ district.name }}
              </option>
            </select>
          </div>

          <label for="area">Area</label>
          <div class="option">
            <select v-model="form.area" id="area" required :disabled="!form.district">
              <option value="">Select Area</option>
              <option v-for="upazila in filteredUpazilas" :key="upazila.id" :value="upazila.name">
                {{ upazila.name }}
              </option>
            </select>
          </div>

          <label for="address">Address</label>
          <input v-model="form.address" type="text" id="address" placeholder="Example: House #12, Street #4, XYZ Road"
            required />
        </div>

        <label>Select a label for effective delivery</label>
        <div class="delivery-labels">
          <button type="button" class="label-btn" :class="{ active: deliveryLabel === 'office' }"
            @click="deliveryLabel = 'office'">
            OFFICE
          </button>
          <button type="button" class="label-btn" :class="{ active: deliveryLabel === 'house' }"
            @click="deliveryLabel = 'house'">
            HOUSE
          </button>
        </div>
      </section>
    </div>

    <div class="f-center-between f-col">
      <h2>Order Summary</h2>
      <div v-for="item in cartItems" :key="item.key" class="f-between-start gap-10 pad-tb--05 text--09 border bottom"
        :data-item="item.key">
        <div>
          <b class="d-block m-b--05">{{ item.title }}</b>
          <p><b>{{ item.total_quantity || 1 }}</b> (<b>{{ Object.keys(Object.values(item.attributes)[0])[0] }}</b>) x
            {{
              parseFloat(item.discountPrice).toFixed(2)
            }}</p>
        </div>
        <p>{{ ((item.total_quantity || 1) * parseFloat(item.discountPrice)).toFixed(2) }}/=</p>
      </div>
      <div class="f-between-center gap-10 pad-tb--05 text--09">
        <p>Delivery Fee ({{ totalItems }} items x {{ DELIVERY_FEE_PER_ITEM }})</p>
        <p>{{ deliveryFee.toFixed(2) }}/=</p>
      </div>
      <div class="f-between-center gap-10 border bottom top pad-tb--05">
        <b>TOTAL</b>
        <b class="total">Tk {{ total.toFixed(2) }}/=</b>
      </div>
      <p class="pad-tb--05 text--09"><b class="u">বি:দ্র:</b> দ্রুত সময়ের মধ্যে আমাদের সাপোর্ট টিম <b class="Maroon">{{
        form.phoneNumber }}</b> নাম্বারে যোগাযোগের মাধ্যমএ আপনার অর্ডারটি নিশ্চিত করবেন।</p>
      <p class="pad-tb--05 text--09"><b class="u">ডেলিভারি সময়:</b> সিলেটে ১ দিন এবং সিলেটের বাইরে ২ থেকে ৫ দিন</p>
      <div class="f-centered">
        <button class="btn btn-primary w--100 m-t--10" :disabled="!cartItems.length" type="submit">Order Now</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { productCart } from '@/stores/cart'
import { useToast } from "vue-toastification"
const toast = useToast()

interface Product {
  title: string;
  sellPrice: string;
  category: string;
  discountPrice: string;
  attributes: Record<string, Record<string, [number, number]>>;
  images: string;
  key: string;
  total_quantity: number;
}

const cartStore = productCart()
const cartItems = computed<Product[]>(() => cartStore.getCartJSON)


const DELIVERY_FEE_PER_ITEM = 120

const totalItems = computed(() => {
  return cartItems.value.reduce((sum: number, item: Product) => {
    return sum + (item.total_quantity || 1)
  }, 0)
})

const deliveryFee = computed(() => totalItems.value * DELIVERY_FEE_PER_ITEM)

const total = computed(() => {
  return cartItems.value.reduce((sum: number, item: Product) => {
    return sum + ((item.total_quantity || 1) * parseFloat(item.discountPrice))
  }, 0) + deliveryFee.value
})







interface Division {
  id: string
  name: string
  bn_name: string
  url: string
}

interface District {
  id: string
  division_id: string
  name: string
  bn_name: string
  lat: string
  lon: string
  url: string
}

interface Upazila {
  id: string
  district_id: string
  name: string
  bn_name: string
  url: string
}

const form = reactive({
  fullName: '',
  phoneNumber: '',
  division: '',
  district: '',
  area: '',
  address: '',
})


const bdPhoneRegex = /^(?:\+8801[3-9]|01[3-9])[0-9]{8}$/

const isValidPhone = ref<boolean>(true)
const errorMessage = ref<string>('')

watch(
  () => form.phoneNumber,
  (newValue) => {
    if (!newValue) {
      isValidPhone.value = false
      errorMessage.value = 'Phone number is required'
      return
    }

    isValidPhone.value = bdPhoneRegex.test(newValue)
    errorMessage.value = isValidPhone.value
      ? ''
      : 'Please enter a valid Bangladeshi phone number'
  }
)

const formatPhoneNumber = () => {
  let value = form.phoneNumber.replace(/\D/g, '')
  if (value.startsWith('880') && value.length > 3) {
    form.phoneNumber = `+${value}`
  } else if (value.startsWith('0') && value.length > 1) {
    form.phoneNumber = value
  }
}





const deliveryLabel = ref('house')

const divisions = ref<Division[]>([])
const districtsData = ref<District[]>([])
const upazilasData = ref<Upazila[]>([])

const filteredDistricts = computed(() => {
  if (!form.division) return []
  return districtsData.value.filter(
    (district: District) => district.division_id === form.division
  )
})

const filteredUpazilas = computed(() => {
  if (!form.district) return []
  const selectedDistrict = districtsData.value.find(
    (d: District) => d.name === form.district
  )
  if (!selectedDistrict) return []
  return upazilasData.value.filter(
    (upazila: Upazila) => upazila.district_id === selectedDistrict.id
  )
})

const fetchDivisions = async () => {
  try {
    const response = await fetch('/API/divisions.json')
    const jsonData = await response.json()
    const divisionsTable = jsonData.find(
      (item: { type: string; name: string }) => item.type === 'table' && item.name === 'divisions'
    )
    divisions.value = divisionsTable.data as Division[]
  } catch (error) {
    toast.error('Error fetching divisions')
  }
}

// Fetch districts from JSON file
const fetchDistricts = async () => {
  try {
    const response = await fetch('/API/districts.json')
    const jsonData = await response.json()
    const districtsTable = jsonData.find(
      (item: { type: string; name: string }) => item.type === 'table' && item.name === 'districts'
    )
    districtsData.value = districtsTable.data as District[]
  } catch (error) {
    console.error('Error fetching districts:', error)
  }
}

const fetchUpazilas = async () => {
  try {
    const response = await fetch('/API/upazilas.json')
    const jsonData = await response.json()
    const upazilasTable = jsonData.find(
      (item: { type: string; name: string }) => item.type === 'table' && item.name === 'upazilas'
    )
    upazilasData.value = upazilasTable.data as Upazila[]
  } catch (error) {
    console.error('Error fetching upazilas:', error)
  }
}

onMounted(() => {
  fetchDivisions()
  fetchDistricts()
  fetchUpazilas()
})


// const pk = Object.keys(Object.values(item.attributes)[0])[0];
console.log(cartItems.value);

const handleSubmit = async () => {
  if (
    form.fullName &&
    form.phoneNumber &&
    form.division &&
    form.district &&
    form.area &&
    form.address &&
    cartItems.value.length > 0 // Ensure there are items in the cart
  ) {
    const selectedDivision = divisions.value.find((d) => d.id === form.division)?.name || '';
    const selectedDistrict = filteredDistricts.value.find((d) => d.name === form.district)?.name || '';
    const selectedUpazila = filteredUpazilas.value.find((u) => u.name === form.area)?.name || '';

    // Prepare order data based on Django 'order' model
    const orderData = {
      name: form.fullName,
      phone_no: form.phoneNumber,
      division: selectedDivision,
      district: selectedDistrict,
      area: selectedUpazila,
      address: form.address,
      label: deliveryLabel.value, // 'office' or 'house'
      total: total.value, // Convert to integer as per model
      delivery_charge: deliveryFee.value, // Convert to integer
      pay_method: null, // You can add a payment method field in the form if needed
      status: 'Pending', // Default value
      courier: null, // Optional field, can be updated later
    };

    const orderProducts = cartItems.value.map((item) => {
      // Get the first attribute name (e.g., "Color")
      const attributeName = Object.keys(item.attributes)[0];

      // Get the first attribute value pair (e.g., { "Red": [50, 350] })
      const attributeValues = item.attributes[attributeName];
      const firstAttributeValueKey = Object.keys(attributeValues)[0]; // e.g., "Red"

      return {
        product: item.key,
        attribute: {
          [attributeName]: [
            item.total_quantity || 1, // Use total_quantity instead of original qty (50)
            parseFloat(item.discountPrice), // Discount price (350)
            firstAttributeValueKey // Attribute value name (e.g., "Red")
          ]
        }
      };
    });

    const payload = {
      order: orderData,
      order_products: orderProducts,
    };

    try {
      const response = await fetch('http://192.168.0.111:3000/api/new_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      toast.success('Order placed successfully!');
      form.fullName = '';
      form.phoneNumber = '';
      form.division = '';
      form.district = '';
      form.area = '';
      form.address = '';
      cartStore.clearCart();

      alert(
        `Order placed successfully!\n\nFull Name: ${orderData.name}\nPhone Number: ${orderData.phone_no}\nAddress: ${orderData.address}, ${orderData.area}, ${orderData.district}, ${orderData.division}`
      );
    } catch (error) {
      toast.error('Error submitting order');
    }
  } else {
    toast.error('Please fill in all required fields and ensure cart is not empty.');
  }
};
</script>

<style scoped>
.delivery-labels {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  position: relative;
  display: block;
  border: 1px solid #dfdfdf;
  outline: none;
  width: 100%;
  height: 2.5rem;
  padding: 10px 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: #d2e2fb 0px 0px 0px 2px;
    border: 1px solid #ccc;
    outline: none;
  }
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