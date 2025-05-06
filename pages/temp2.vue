<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}
edit file
const districts = ref<District[]>([]);

const fetchDistricts = async () => {
  try {
    const response = await fetch('/API/districts.json');
    const data = await response.json();

    // Extract the `data` array from the correct table object
    const table = data.find((item: any) => item.type === 'table' && item.name === 'districts');
    if (table && table.data) {
      districts.value = table.data;
    }
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

onMounted(fetchDistricts);
</script>

<template>
  <div>
    <h2>Districts List</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Division ID</th>
          <th>Name</th>
          <th>বাংলা নাম</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="district in districts" :key="district.id">
          <td>{{ district.id }}</td>
          <td>{{ district.division_id }}</td>
          <td>{{ district.name }}</td>
          <td>{{ district.bn_name }}</td>
          <td>{{ district.lat }}</td>
          <td>{{ district.lon }}</td>
          <td><a :href="'https://' + district.url" target="_blank">{{ district.url }}</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
