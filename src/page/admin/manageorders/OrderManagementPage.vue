<template>
  <div class="max-w-[80rem] m-auto">
    <div class="bg-(--gray-100) p-[2rem] rounded-lg sd h-screen">
      <div>
        <p class="text-[length:var(--text-title)] font-extrabold">Order Management</p>
      </div>

      <div class="w-full h-[2.5rem] flex flex-row gap-[2rem] mt-[2rem] mb-[2rem]">
        <label
          for="status"
          class="text-[length:var(--text-description)] text-(--gray-100) p-[1rem] py-[1.5rem] flex items-center gap-2 bg-(--gray-700) border-2 border-(--gray-800) rounded-lg"
        >
          Status:
          <select
            id="status"
            v-model="selectedStatus"
            class="text-(--gray-700) p-1 bg-(--gray-100) border-2 border-(--gray-100) rounded-lg"
          >
            <option value="all">All</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="accepted">Accepted</option>
          </select>
        </label>
      </div>

      <div class="w-full overflow-x-auto mb-[1rem] border border-(--gray-300) rounded-lg">
        <table class="w-full border-collapse text-fixed">
          <thead class="bg-gray-200 border-b border-(--gray-300)">

            <tr class="bg-gray-200">
              <th class="p-4 text-left text-gray-800 font-bold">Order ID</th>
              <th class="p-4 text-left text-gray-800 font-bold">Customer Name</th>
              <th class="p-4 text-left text-gray-800 font-bold">Item</th>
              <th class="p-4 text-left text-gray-800 font-bold">Status</th>
              <th class="p-4 text-left text-gray-800 font-bold">Delivery Type</th>
              <th class="p-4 text-left text-gray-800 font-bold"></th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="delivery in filteredDeliveries"
              :key="delivery.id"
              class="bg-white hover:bg-(--gray-100) border-b border-(--gray-300) transition duration-300 font-bold"
            >

            <!-- Delivery ID -->
              <td class="p-4 text-(--gray-800)">
                {{ delivery.delivery_id }}
              </td>

              <!-- Customer Name -->
              <td class="p-4 text-(--gray-800)">
                {{ delivery.username }}
              </td>

              <!-- Item Type -->
              <td class="p-4 text-(--gray-800)">
                {{ delivery.type_of_items }}
              </td>

              <!-- Status -->
              <td class="p-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-sm font-bold border',
                    delivery.status === 'delivered'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : delivery.status === 'in_transit'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : delivery.status === 'accepted'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-(--gray-100) text-(--gray-600)',
                  ]"
                >
                  {{ delivery.status || 'waiting for acceptance' }}
                </span>
              </td>

              <!-- Delivery Type -->
              <td class="p-4 text-(--gray-800)">
                {{ delivery.type_of_delivery }}
              </td>

              <!-- Edit -->
              <td class="p-4">
                <button
                  @click="viewDetails(delivery)"
                  class="px-4 py-2 bg-(--red-800) text-white rounded-lg hover:bg-(--red-700) transition duration-300"
                >
                  View
                </button>
              </td>
            </tr>

             <!-- Empty -->
            <tr v-if="filteredDeliveries.length === 0">
              <td colspan="6" class="p-8 text-center text-(--gray-400)">
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDeliveryStore } from "../../../store/myDeliveryStore";
import useCreateDeliveryStore from "../../../store/createDelivery";

const store = useDeliveryStore();
const router = useRouter();
const storedelivery = useCreateDeliveryStore();
const getdata = ref([])



onMounted(async () => {
  const result = await storedelivery.getalldelivery();
  getdata.value = result.deliveries.data;
})

const selectedStatus = ref('all');

const filteredDeliveries = computed(() => {
  // if (!getdata.value) return [];
  if (selectedStatus.value === 'all') return getdata.value;

  return getdata.value.filter(item => 
    item.status === selectedStatus.value
  );
});

const viewDetails = (delivery) => {
  store.selectedDelivery = delivery;
  router.push('/admin/manageorders/details');
};

</script>