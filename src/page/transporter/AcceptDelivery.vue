<template>
  <!-- Main Container -->
  <div class="p-8 max-w-7xl mx-auto bg-(--gray-100) h-screen">
    <!-- Header -->
    <div class="mb-[2rem]">
      <h1 class="text-3xl font-bold text-(--gray-800)">Available Orders</h1>
    </div>

    <!-- LOADING / EMPTY STATE SAFETY -->
    <div
      v-if="getdata.length === 0"
      class="text-center py-20 text-(--gray-400)"
    >
      No orders available right now.
    </div>

    <!-- GRID LAYOUT -->
    <!-- Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- CARD -->
      <div
        v-for="item in getdata.filter((i) => i.status === null )"
        :key="item.delivery_id"
        class="bg-white rounded-xl sd border border-(--gray-100) p-6 flex flex-col justify-between"
      >
        <div>
          <!-- TOP SECTION: From/To/Price -->
          <div class="mb-[1rem]">
            <!-- Price Badge (Top Right) -->
            <div class="flex justify-between items-start mb-[1rem]">
              <span class="text-xs font-bold text-(--gray-400) uppercase"
                >Pickup Location</span
              >
              <span class="text-xl font-bold text-green-600">
                ${{ item.total_amount || "0.00" }}
                <!-- Fallback if no price in DB yet -->
              </span>
            </div>

            <!-- From -->
            <div class="mb-[1rem]">
              <p class="font-bold text-black text-lg line-clamp-1">
                {{ item.pick_up_address }}
              </p>
            </div>

            <!-- To -->
            <div class="">
              <span class="text-xs font-bold text-(--gray-400) uppercase"
                >Dropoff Location</span
              >
              <p class="font-bold text-black text-lg line-clamp-1">
                {{ item.destination_address || "Destination" }}
                <!-- Adjust key based on DB -->
              </p>
            </div>
          </div>

          <!-- MIDDLE SECTION: Weight/Details -->
          <div class="flex items-center gap-3 mb-6 rounded-lg">
            <!-- FIXED ICON CONTAINER -->
            <div
              class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xl"
            >
              📦
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase">Weight</p>
              <p class="text-xl font-bold text-gray-800">
                {{ item.weight }} kg
              </p>
            </div>
          </div>

          <!-- BOTTOM BUTTON -->
          <!-- Click triggers navigation to Detail Page -->
          <button
            @click="goToDetail(item.delivery_id)"
            class="w-full py-3 bg-(--gray-200) text-black font-bold rounded-lg hover:bg-(--gray-300) transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useCreateDeliveryStore from "../../store/createDelivery";

const userstoredelivery = useCreateDeliveryStore();
const getdata = ref([]);

onMounted(async () => {
  const result = await userstoredelivery.getalldelivery();
  getdata.value = result.deliveries.data;

  console.log(getdata.value.map(i => i.status));
});
console.log(getdata.value);
// import useCreateDeliveryStore from '../../store/createDelivery'; // Comment out for now

const router = useRouter();
// const userstoredelivery = useCreateDeliveryStore(); // Comment out for now

// Initialize with Mock Data directly
// const getdata = ref([
//   {
//     id: 101,
//     pick_up_address: 'St. 315, Tuol Kork, Phnom Penh',
//     drop_off_address: 'Aeon Mall 2, Sen Sok',
//     weight: '2',
//     price: 5.00,
//     item_type: 'Electronics'
//   },
//   {
//     id: 102,
//     pick_up_address: '#12, St. 63 (BKK1), Phnom Penh',
//     drop_off_address: 'Riverside (Sisowath Quay)',
//     weight: '0.5',
//     price: 2.50,
//     item_type: 'Documents'
//   },
//   {
//     id: 103,
//     pick_up_address: 'Phnom Penh Intl Airport',
//     drop_off_address: 'Olympia City, 7 Makara',
//     weight: '15',
//     price: 12.00,
//     item_type: 'Luggage'
//   },
//   {
//     id: 104,
//     pick_up_address: 'Chbar Ampov Market',
//     drop_off_address: 'Chip Mong Noro Mall',
//     weight: '5',
//     price: 4.50,
//     item_type: 'Food/Groceries'
//   },
//   {
//     id: 105,
//     pick_up_address: 'Royal University of Phnom Penh (RUPP)',
//     drop_off_address: 'Vattanac Capital Tower',
//     weight: '1',
//     price: 3.00,
//     item_type: 'Books'
//   }
// ]);

// SIMULATE API CALL (Optional - just to verify logic)
/*
onMounted(async () => {
  try {
    // const result = await userstoredelivery.getalldelivery();
    // getdata.value = result.deliveries.data; 
    console.log("Using Mock Data");
  } catch (error) {
    console.error("Error", error);
  }
});
*/

// Function to handle navigation
const goToDetail = (orderId: number) => {
  console.log("Navigating to order ID:", orderId);
  router.push(`/driver/delivery/detail/${orderId}`);
  // router.push(`/driverDeliveryDetail`);
};
</script>
