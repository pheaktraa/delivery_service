<template>
  <!-- SIDEBAR CONTAINER -->
  <nav class="fixed left-0 top-0 h-screen w-[250px] bg-red-500 z-50">
    
    <!-- BRAND LOGO -->
    <div class="p-6 border-b-3 border-white">
      <h1 class="text-[2rem] font-bold text-white">MoveSmart</h1>
    </div>

    <!-- MENU LIST -->
    <div class="p- mt-[1rem]">
      <ul class="space-y-1">
        
        <!-- Loop through the COMPUTED 'currentMenu' -->
        <li v-for="item in currentMenu" :key="item.path">
          <router-link 
            :to="item.path" 
            class="flex items-center gap-2 px-4 py-3 transition duration-200 font-bold text-white hover:bg-white hover:text-red-700"
            :class="{ 'bg-white text-red-700 font-bold': route.path === item.path }"
          >
            <!-- Icon -->
            <span class="text-[2rem]">{{ item.icon }}</span>
            <!-- Name -->
            <span class="text-lg">{{ item.name }}</span>
          </router-link>
        </li>

      </ul>
    </div>

    <!-- LOGOUT -->
    <div class=" w-full mt-[1rem] pt-4 border-t-3 border-white">
      <button @click="logout" class="w-full flex items-center gap-4 px-4 py-3 text-white font-bold hover:bg-white hover:text-red-700 transition duration-200">
        <span class="text-[2rem]">🚪</span> Logout
      </button>
    </div>

  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router' // To verify active link
import getUserPayload from '../utils/jwt' // Your existing JWT utils

const route = useRoute()
// 1. DATA: Define the Menus separately
const adminMenu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Manage Users", path: "/admin/manageuser", icon: "👥" },
  { name: "Settings", path: "/admin/setting", icon: "⚙️" },
]

const driverMenu = [
  { name: "Find Jobs", path: "/driver/accDelivery", icon: "🚀" },
  { name: "Dashboard", path: "/driver/driverDashboard", icon: "📜" },
  { name: "Profile", path: "/driver/profile", icon: "📍" },

]

// 2. LOGIC: Decide which menu to show
const user = getUserPayload() // Get user from LocalStorage/Token

const currentMenu = computed(() => {
  if (user?.role === 'admin') {
    return adminMenu
  } else if (user?.role === 'driver' || user?.role === 'transporter') {
    return driverMenu
  } else {
    return [] // Or a default guest menu
  }
})

const logout = () => {
  // Implement your logout logic here
  localStorage.removeItem('token');
  window.location.href = '/';
} 

</script>