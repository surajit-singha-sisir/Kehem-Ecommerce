<template>
  <section class="pad--50">
    <!-- Add or Update Product Form -->
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="newProduct.productName" required />
      </div>

      <div>
        <label for="totalQuantity">Total Quantity:</label>
        <input type="number" id="totalQuantity" v-model="newProduct.total_quantity" required min="1" />
      </div>

      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="newProduct.price" required min="0" />
      </div>

      <div>
        <label for="attributeName">Attribute Name:</label>
        <input
          type="text"
          id="attributeName"
          v-model="newAttribute.name"
          placeholder="e.g. red"
          required
        />
      </div>

      <div>
        <label for="attributeValue">Attribute Value:</label>
        <input
          type="number"
          id="attributeValue"
          v-model="newAttribute.value"
          placeholder="e.g. 10"
          required
        />
      </div>

      <button type="button" @click="addAttribute">Add Attribute</button>

      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update Product' : 'Add Product' }}</button>
    </form>

    <div>
      <h3>Current Cart</h3>
      <div v-for="product in cartJSON" :key="product.productId">
        <p>{{ product.productName }} - {{ product.total_quantity }} - ${{ product.price }}</p>
        <button @click="deleteFromCart(product.productId)">Delete</button>
        <button @click="editProduct(product)">Edit</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { productCart } from '@/stores/cart'; // Make sure the correct path is used

// Access the productCart store
const productcart = productCart();
const { cartJSON } = storeToRefs(productcart); // This ensures the reactive reference to cartJSON

// Define the Product type
interface Product {
  productId: number;
  productName: string;
  total_quantity: number;
  price: number;
  attributes: Record<string, [number, number]>[]; // Allow dynamic keys and values
}

// Define the state for the form
const newProduct = ref<Product>({
  productId: 0,
  productName: '',
  total_quantity: 1,
  price: 0,
  attributes: [],
});

// State for new attribute input
const newAttribute = ref({
  name: '',
  value: 0,
});

// State for tracking if it's an edit or add operation
const isEdit = ref(false); // This flag indicates if we are editing an existing product

// Store the product that is being edited
const currentProduct = ref<Product | null>(null);

// Method to handle form submission (either add or update)
const handleSubmit = () => {
  if (isEdit.value && currentProduct.value) {
    // Update existing product in the cart
    productcart.updateProduct(currentProduct.value.productId, newProduct.value);
  } else {
    // Add new product to the cart
    newProduct.value.productId = Date.now(); // Using current timestamp as a unique ID
    productcart.addToCart(newProduct.value);
  }

  // Reset the form after submission
  resetForm();
};

// Method to add an attribute dynamically
const addAttribute = () => {
  if (newAttribute.value.name && newAttribute.value.value >= 0) {
    // Dynamically create or update the attributes array
    const attribute: Record<string, [number, number]> = {
      [newAttribute.value.name]: [newAttribute.value.value, newAttribute.value.value],
    };
    newProduct.value.attributes.push(attribute);
    // Clear the input fields for the next entry
    newAttribute.value.name = '';
    newAttribute.value.value = 0;
  } else {
    alert('Please provide a valid attribute name and value.');
  }
};

// Method to delete a product from the cart
const deleteFromCart = (productId: number) => {
  productcart.deleteFromCart(productId);
};

// Method to start editing a product
const editProduct = (product: Product) => {
  // Set the current product to be edited
  currentProduct.value = { ...product };

  // Fill the form with the selected product's data
  newProduct.value = { ...product };

  // Set the flag to indicate it's an edit operation
  isEdit.value = true;
};

// Method to reset the form after adding or editing a product
const resetForm = () => {
  newProduct.value = {
    productId: 0,
    productName: '',
    total_quantity: 1,
    price: 0,
    attributes: [],
  };
  newAttribute.value = { name: '', value: 0 };
  isEdit.value = false;
};
</script>

<style scoped>
/* Add your styles here */
</style>
