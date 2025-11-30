<template>
  <div class="max-w-[80rem] h-full m-auto page">
    <div class="mt-[2rem] bg-(--gray-100) p-[2rem] rounded-lg sd">
      <div class="border-b-[2px] border-(--gray-300) pt-[2rem] pb-[2rem]">
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          My Deliveries
        </p>
      </div>

      <div class="w-full h-[2.5rem] flex flex-row gap-[2rem] mt-[2rem] mb-[2rem]">      
        <!-- Status Filter Dropdown -->
        <label for="status" class="text-[length:var(--text-description)] flex items-center gap-2">
          Status:
          <select id="status"
            v-model="selectedStatus"
            class="p-[.5rem] bg-white border-2 border-(--gray-300) rounded-md focus:outline-none focus:ring-1 focus:ring-(--gray-500)">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
          </select>
        </label>
      </div>

      <!-- Order List Items -->
      <div class="w-full h-full overflow-x-auto mb-[4rem] border border-(--gray-300) rounded-lg">
        <table class="w-full border-collapse text-fixed">
          <thead class="bg-(--gray-100) border-b border-(--gray-300)">
            <!-- Table Header -->
            <tr class="bg-(--gray-500)">
              <th class="p-4 text-left text-(--gray-100) font-bold">Order ID</th>
              <th class="p-4 text-left text-(--gray-100) font-bold">Name</th>
              <th class="p-4 text-left text-(--gray-100) font-bold">Price</th>
              <th class="p-4 text-left text-(--gray-100) font-bold">Date</th>
              <th class="p-4 text-left text-(--gray-100) font-bold">Status</th>
              <th class="p-4 text-left text-(--gray-100) font-bold">Delivery Type</th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody class="divide-y divide-(--gray-200) bg-white">
            <tr v-for="delivery in filteredDeliveries" :key="delivery.id" class="hover:bg-(--gray-100) transition duration-300">
              <!-- Order ID -->
              <td class="p-4 text-(--gray-800) font-bold">{{ delivery.id }}</td>

              <!-- Items -->
              <td class="p-4 text-(--gray-800)">
                <ul>
                  <li v-for="item in delivery.items" :key="item.name">
                    {{ item.name }} (x{{ item.quantity }})
                  </li>
                </ul>
              </td>

              <!-- Price -->
              <td class="p-4 text-(--gray-800) font-bold">${{ delivery.total.toFixed(2) }}</td>

              <!-- Date -->
              <td class="p-4 text-(--gray-800)">{{ delivery.date }}</td>

              <!-- Status -->
              <td class="p-4">
                <span :class="[
                  'px-2 py-1 rounded-full text-sm font-bold border',
                  delivery.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                  delivery.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-(--gray-100) text-(--gray-600)'
                ]">
                  {{ delivery.status }}
                </span>
              </td>

              <!-- Delivery Type -->
              <td class="p-4 text-(--gray-800) font-bold">{{ delivery.delivery_type }}</td>
            </tr>

            <!-- Empty State (Shows if no deliveries found) -->
            <tr v-if="filteredDeliveries.length === 0">
              <td colspan="5" class="p-8 text-center text-(--gray-400)">
                No deliveries found for the selected status.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data for deliveries
const deliveries = [
  {
    id: 'D-1001',
    date: '2024-06-01',
    status: 'Pending',
    items: [
      { name: 'Glock-18', quantity: 2 },
    ],
    total: 45.00,
    delivery_type: 'standard',
  },
  {
    id: 'D-1002',
    date: '2024-05-28',
    status: 'Delivered',
    items: [
      { name: 'Diamond Sword', quantity: 3 },
    ],
    total: 75.50,
    delivery_type: 'express',
  },
  {
    id: 'D-1003',
    date: '2024-05-30',
    status: 'Pending',
    items: [
      { name: 'Health Potion', quantity: 5 },
    ],
    total: 120.00,
    delivery_type: 'standard',
  }
  // More delivery objects...
];

const selectedStatus = ref('all');

const filteredDeliveries = computed(() => {
  if (selectedStatus.value === 'all') {
    return deliveries;
  }
  return deliveries.filter(delivery => 
  delivery.status.toLowerCase() === selectedStatus.value);
});

</script>