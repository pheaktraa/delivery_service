<template>
  <!-- CONTAINER -->
  <div class="max-w-full h-full">
    <div class="bg-(--gray-100) p-[2rem] rounded-lg sd">
      <!-- PAGE HEADER -->
      <div class="">
        <p class="text-[2rem] font-bold text-(--gray-800)">Dashboard</p>
        <p class="text-xl font-bold text-(--gray-800)">welcome back admin</p>
      </div>

      <!-- INFO BOXES -->
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-[1rem] mb-[1rem]"
      >
        <!-- BOX CONTAINER -->
        <div
          class="bg-white rounded-2xl flex items-center justify-between p-6 sd"
        >
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="w-16 h-16 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-10"
              >
                <path
                  d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z"
                />
              </svg>
            </span>
          </div>
          <!-- TEXT INFO -->
          <div>
            <!-- <p class="text-[2rem] font-bold">{{ getdata.length }}</p> -->
             <p class="text-[2rem] font-bold">{{ totalOrders }}</p>
            <p class="font-bold" >Total Orders</p>
          </div>
        </div>
        <!-- BOX CONTAINER -->
        <div
          class="bg-white rounded-2xl flex items-center justify-between p-6 sd"
        >
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="w-16 h-16 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-10"
              >
                <path
                  d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z"
                />
                <path
                  d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z"
                />
                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
              </svg>
            </span>
          </div>
          <!-- TEXT INFO -->
          <div>
            <!-- <p class="text-[2rem] font-bold" >{{ getdata.filter(item => item.status === 'delivered').length }}</p> -->
             <p class="text-[2rem] font-bold" >{{ totalDelivered }}</p>
            <p class="font-bold">Total Delivered</p>
          </div>
        </div>
       
        <!-- BOX CONTAINER -->
        <div
          class="bg-white w-fit rounded-2xl flex items-center justify-between p-6 sd"
        >
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="min-w-16 h-16 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-10"
              >
                <path
                  d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
          <!-- TEXT INFO -->
          <div>
            <!-- <p class="text-[2rem] font-bold">{{ getdata.filter(item => item.total_amount).reduce((sum, item) => sum + item.total_amount, 0) }}$</p> -->
             <p class="text-[2rem] font-bold">{{ totalSales }}$</p>
            <p class="font-bold">Total Sales</p>
          </div>
        </div>
      </div>

      <!-- BOX CONTAINER -->
        <div
          class="bg-white w-fit rounded-2xl flex items-center justify-between p-6 sd"
        >
          <!-- CIRCLE INSIDE BOX -->
          <div
            class="min-w-16 h-16 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-10"
              >
                <path
                  d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
          <!-- TEXT INFO -->
          <div>
            <!-- <p class="text-[2rem] font-bold">{{ getdata.filter(item => item.total_amount).reduce((sum, item) => sum + item.total_amount, 0) }}$</p> -->
             <p class="text-[2rem] font-bold">{{ totalRevenue }}$</p>
            <p class="font-bold">Total Revenue</p>
          </div>
        </div>

      <!-- CHART CONTAINER -->
      <div class="w-full bg-white rounded-2xl p-3 mt-[3rem]">
        <!-- lg:grid-cols-3 -->
        <!-- Column 1 -->
        <!-- <div class="w-full flex flex-wrap">
                    <RadialBarCircle class="flex-1"/>
                    <RadialBarCircle class="flex-1"/>
                    <LineChart class="flex-1"/>
                </div> -->
        <!-- Column 2 -->
        <!-- <div>
                    <RadialBarCircle />
                </div> -->

        <!-- Column 3 -->
        <!-- <div class="w-full sm:col-span-2 md:col-span-1">
                    <LineChart />
                </div> -->

        <!-- Column N (optional later) -->

        <div
          class="bg-white rounded-2xl mt-[2rem] shadow-sm border border-(--gray-200) overflow-hidden"
        >
          <!-- Header -->
          <div
            class="flex justify-between items-center p-6 border-b border-(--gray-300)"
          >
            <h2 class="text-xl font-bold text-(--gray-800)">History</h2>
          </div>

          <!-- Table List -->
          <div class="overflow-x-auto border border-(--gray-300)">
            <!-- TABLE -->
            <table class="w-full border-collapse">
              <!-- TABLE HEADER -->
              <thead class="bg-gray-200 border-b border-(--gray-300)">
                <tr class="text-left text-gray-800">
                  <th class="p-4 font-bold">ID</th>
                  <th class="p-4 font-bold">Route</th>
                  <th class="p-4 font-bold text-right">Status</th>
                  <th class="p-4 font-bold text-right">Total</th>
                </tr>
              </thead>

              <!-- TABLE BODY -->
              <tbody v-if="getdata.length">
                <tr
                  v-for="item in getdata"
                  :key="item.id"
                  class="border-b border-(--gray-300) hover:bg-(--gray-100) transition"
                >
                  <!-- Order ID -->
                  <td class="p-4 text-sm font-bold text-(--gray-800)">
                    {{ item.delivery_id }}
                  </td>
                  <!-- Route -->
                  <td class="p-4 col-span-6">
                    <div class="flex items-center font-bold text-(--gray-800)">
                      <span>{{ item.pick_up_address }}</span>
                      <img
                        src="../../assets/icon/arrowleft.svg"
                        alt=""
                        class="mx-3 w-4"
                      />
                      <span>{{ item.destination_address }}</span>
                    </div>
                  </td>

                  <td class="p-4 w-[14rem] text-right">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-sm font-bold border',
                        item.status === 'delivered'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : item.status === 'in_transit'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : item.status === 'accepted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-(--gray-100) text-(--gray-600)',
                      ]"
                    >
                      {{ item.status || "waiting for acceptance" }}
                    </span>
                  </td>

                  <!-- Total Amount -->
                  <td class="p-4 text-right font-bold text-green-600">
                    ${{ item.total_amount }}
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- EMPTY STATE -->
            <div
              v-if="getdata.length === 0"
              class="p-8 text-center text-gray-400"
            >
              No recent deliveries found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import useCreateDeliveryStore from "../../store/createDelivery";

const createDeliveryStore = useCreateDeliveryStore();

const getdata = ref([]);

onMounted(async () => {
  const res = await createDeliveryStore.getalldelivery();
  getdata.value = res.deliveries.data;

  console.log("Admin Data Loaded:", getdata.value);
});

// Total Orders Count
const totalOrders = computed(() => getdata.value.length);

// Total Successfully Delivered Count
const totalDelivered = computed(() => {
  return getdata.value.filter(item => item.status === 'delivered').length;
});

// Total Volume (100% of all delivered orders)
const totalSales = computed(() => {
  const sum = getdata.value
    .filter(item => item.status === 'delivered')
    .reduce((acc, item) => acc + (Number(item.total_amount) || 0), 0);
  return sum.toFixed(2);
});

// Company Revenue (20% share)
const totalRevenue = computed(() => {
  // Take the 100% sum and multiply by 0.2
  const profit = Number(totalSales.value) * 0.2;
  return profit.toFixed(2);
});

</script>
