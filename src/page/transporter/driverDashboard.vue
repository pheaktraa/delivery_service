<template>
    <!-- CONTAINER -->
    <div class="p-8 max-w-7xl mx-auto bg-(--gray-100)">
        <div class="">
            <!-- PAGE HEADER -->
            <div class="mb-[1rem]">
                <p class="text-(--red-800) text-[2rem] font-bold">Dashboard</p>
                <p class="text-xl font-bold text-(--gray-800)">welcome back driver</p>
            </div>

            <!-- horizon line -->
            <div class="border-b-[2px] border-(--gray-300) pb-[2rem]">

            </div>

            <!-- INFO BOXES -->
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-[1rem]">
                <!-- BOX CONTAINER -->
                <div class="bg-white rounded-2xl flex items-center gap-4 p-4 sd">
                    <!-- CIRCLE INSIDE BOX -->
                    <div class="w-12 h-12 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="white" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <!-- TEXT INFO -->
                    <div class="">
                        <p class="text-[2rem] font-bold">{{ stats.earnings }}</p>
                        <p class="font-bold">Total Earnings</p>
                    </div>
                </div>
                <!-- BOX CONTAINER -->
                <div class="bg-white rounded-2xl flex items-center gap-4 p-4 sd">
                    <!-- CIRCLE INSIDE BOX -->
                    <div class="w-12 h-12 rounded-full bg-[#cd1c18] shadow-xl flex items-center justify-center shrink-0">
                        <span class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-6">
                                <path
                                    d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                            </svg>
                        </span>
                    </div>
                    <!-- TEXT INFO -->
                    <div>
                        <p class="text-[2rem] font-bold">{{ stats.delivered }}</p>
                        <p class="font-bold">Total Delivered</p>
                    </div>
                </div>
            </div>

            <!-- horizon line -->
            <div class="border-b-[2px] border-(--gray-300) pb-[2rem]">

            </div>

            <!-- 2. RECENT ACTIVITY (Replaces Order List) -->
            <div class="bg-white rounded-2xl mt-[2rem] shadow-sm border border-(--gray-100) overflow-hidden">

                <!-- Header -->
                <div class="flex justify-between items-center p-6 border-b border-(--gray-300)">
                    <h2 class="text-xl font-bold text-(--gray-800)">Recent History</h2>
                    <!-- This button would link to your full History Page -->
                    <button class="text-sm font-bold text-(--gray-500) hover:text-red-600">View All ></button>
                </div>

                <!-- Table List -->
                <div class="divide-y divide-(--gray-300)">

                    <div v-for="item in recentHistory" :key="item.id"
                        class="p-6 flex items-center justify-between hover:bg-(--gray-100) transition duration-300">

                        <!-- Column 1: Route & ID -->
                        <div>
                            <p class="font-bold text-(--gray-800) text-lg">{{ item.route }}</p>
                            <p class="text-sm text-(--gray-400) font-bold mt-1">Order {{ item.id }}</p>
                        </div>

                        <!-- Column 2: Price & Status -->
                        <div class="text-right">
                            <p class="text-xl font-bold text-green-600 mb-1">${{ item.price.toFixed(2) }}</p>
                        </div>

                    </div>

                </div>

                <!-- Empty State (Optional) -->
                <div v-if="recentHistory.length === 0" class="p-8 text-center text-gray-400">
                    No recent deliveries found.
                </div>

            </div>
        </div>
    </div>

</template>


<script setup>
import { reactive } from 'vue'

// Mock Data: This simulates the list of orders coming from the database
// Stats Data (Keep this)
const stats = reactive({
    earnings: 75,
    delivered: 75
})
// Recent History Data (Mock)
// Only show the last 3 or 4 items here
const recentHistory = reactive([
    { id: '#9981', route: 'Tuol Kork → Sen Sok', price: 5.00, status: 'Completed' },
    { id: '#9980', route: 'BKK1 → Riverside', price: 2.50, status: 'Cancelled' },
    { id: '#9979', route: 'Airport → Olympia', price: 8.00, status: 'Cancelled' },
])
</script>