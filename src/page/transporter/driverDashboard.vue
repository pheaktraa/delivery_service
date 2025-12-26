<template>
  <!-- CONTAINER -->
  <div class="p-8 max-w-7xl mx-auto h-screen bg-(--gray-100)">
    <div class="">
      <!-- PAGE HEADER -->
      <div class="mb-[1rem]">
        <p class="text-(--gray-800) text-[2rem] font-bold">Dashboard</p>
        <p class="text-xl font-bold text-(--gray-800)">welcome back driver</p>
      </div>

      <!-- horizon line -->
      <div class="border-b-[2px] border-(--gray-300) pb-[2rem]"></div>

      <!-- INFO BOXES -->
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-[1rem]"
      >
        <!-- BOX CONTAINER -->
        <div class="bg-white rounded-2xl flex items-center gap-4 p-4 sd">
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="w-12 h-12 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <!-- TEXT INFO -->
          <div class="">
            <p class="text-[2rem] font-bold">${{ stats.total_earnings }}</p>
            <p class="font-bold">Total Earnings (80%)</p>
          </div>
        </div>
        <!-- BOX CONTAINER -->
        <div class="bg-white rounded-2xl flex items-center gap-4 p-4 sd">
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="w-12 h-12 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center shrink-0"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-6"
              >
                <path
                  d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z"
                />
              </svg>
            </span>
          </div>
          <!-- TEXT INFO -->
          <div>
            <p class="text-[2rem] font-bold">{{ stats.total_delivered }}</p>
            <p class="font-bold">Total Delivered</p>
          </div>
        </div>
      </div>

      <!-- horizon line -->
      <div class="border-b-[2px] border-(--gray-300) pb-[2rem]"></div>

      <!-- 2. RECENT ACTIVITY (Replaces Order List) -->
      <div
        class="bg-white rounded-2xl mt-[2rem] shadow-sm border border-(--gray-100) overflow-hidden"
      >
        <!-- Header -->
        <div
          class="flex justify-between items-center p-6 border-b border-(--gray-300)"
        >
          <h2 class="text-xl font-bold text-(--gray-800)">Recent History</h2>
        </div>

        <!-- Delivery Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <!-- TABLE HEADER -->
            <thead class="bg-(--gray-200)">
              <tr class="text-left text-(--gray-800) text-sm uppercase">
                <th class="px-6 py-4">ID</th>
                <th class="px-6 py-4">Route</th>
                <th class="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>

            <!-- TABLE BODY -->
            <tbody>
              <tr
                v-for="(item, index) in getdata"
                :key="index"
                class="border-b border-(--gray-300) hover:bg-(--gray-100) transition cursor-pointer"
                @click="
                  $router.push(`/driver/delivery/detail/${item.delivery_id}`)
                "
              >
              <!-- Order ID -->
                <td class="px-6 py-5 text-(--gray-800) font-bold">
                  {{ increase++ }}
                </td>

                <!-- Route -->
                <td class="px-6 py-5 font-semibold text-(--gray-800)">
                  <div class="flex items-center gap-3">
                    <span>{{ item.pick_up_address }}</span>
                    <img
                      src="../../assets/icon/arrowleft.svg"
                      alt="to"
                      class="w-4 h-4 opacity-60"
                    />
                    <span>{{ item.destination_address }}</span>
                  </div>
                </td>

                <!-- Amount -->
                <td
                  class="px-6 py-5 text-right text-green-600 font-bold text-lg"
                >
                  ${{ Number(item.total_amount).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State (Optional) -->
        <div v-if="getdata.length === 0" class="p-8 text-center text-gray-400">
          No recent deliveries found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useCreateDeliveryStore from "../../store/createDelivery";
import Index from "../chat/index.vue";
const createDeliveryStore = useCreateDeliveryStore();

const getdata = ref([]);
const increase = -1;

// Add a ref to hold the stats
const stats = ref({
  total_delivered: 0,
  total_earnings: "0.00",
});

onMounted(async () => {
  // Fetch the list (for the table)
  const data = await createDeliveryStore.getTransporterDeliveries();
  getdata.value = data;

  // Fetch the summary stats (for the boxes)
  const statsData = await createDeliveryStore.getDriverStats();
  if (statsData.success) {
    stats.value = statsData;
  }

  console.log("Driver Deliveries:", getdata.value);
});
</script>
