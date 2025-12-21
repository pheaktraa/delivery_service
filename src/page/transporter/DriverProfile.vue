<template>

  <div class="p-8 max-w-7xl mx-auto min-h-screen bg-(--gray-100)" >
    
    <!-- HEADER -->
    <div class="mb-[2rem]">
      <h1 class="text-[2rem] font-bold text-(--red-800)">My Profile</h1>
    </div>

    <!-- LOADING STATE -->
    <div v-if="isLoading" class="text-center py-20 text-gray-500">
        Loading Profile Details
    </div>

    <!-- PROFILE CARD -->
    <div class="bg-white rounded-2xl sd">

      <div class="p-8 pb-8">
        
        <!-- Avatar (Overlapping Banner) -->
        <div class="flex justify-between items-end">
          <div class="w-24 h-24 rounded-full border-4 border-(--gray-500) bg-(--gray-200) shadow-md flex items-center justify-center text-4xl">
            👤
          </div>
          <!-- Edit Button -->
          <!-- <button class="bg-(--gray-300) hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm transition">
            Edit Details
          </button> -->
        </div>
        
        <!-- USER INFO GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[1rem]">
          
          <!-- Fname -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">First Name</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.firstname || 'N/A' }}</div>
          </div>

          <!-- Lname -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">Last Name</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.lastname || 'N/A' }}</div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">Email</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.email || 'N/A' }}</div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">Phone Number</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.phoneNumber || 'N/A' }}</div>
          </div>

          <!-- Role -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">Account Role</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.role || 'N/A' }}</div>
          </div>

          <!-- Vehicle Type -->
          <div>
            <label class="block text-xs font-bold text-(--gray-400) uppercase mb-[1rem]">Vehicle Type</label>
            <div class="w-full p-3 border border-(--gray-300) rounded-lg bg-white font-bold text-(--gray-800)">{{ user?.vehicletype || 'N/A' }}</div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { computed,onMounted  } from 'vue';
import { useProfileStore } from '../../store/profileStore';
import getUserPayload from '../../utils/jwt';

// 1. Initialize the New Store
const profileStore = useProfileStore(); 
const tokenData = getUserPayload();

onMounted(async () => {
console.log('tokenData:', tokenData) // debug
  const userId = tokenData?.id || tokenData?.sub || 'mock-id' 
  if (userId) {
    // 2. Call the action from the NEW store
    await profileStore.fetchProfile(userId);
  }
});

// 3. Get Data from the NEW store
const user = computed(() => profileStore.data);
const isLoading = computed(() => profileStore.loading);

// Helper to check role
const isDriver = computed(() => {
  return user.value?.role === 'driver' || user.value?.role === 'transporter';
});
</script>