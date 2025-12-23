<template>
  <!-- SIDEBAR CONTAINER -->
  <nav class="fixed left-0 top-0 h-full w-[250px] bg-(--red-900) z-50 p-[.5rem]">
    
    <!-- BRAND LOGO -->
    <div class="h-[6rem] p-6 border-b-2 border-white  flex items-center justify-center">
      <h1 class="text-4xl font-extrabold italic">
        <span class="text-white">Move</span>
        <span>Smart</span></h1>
    </div>

    <!-- MENU LIST -->
    <div class="p-1 mt-[1rem]">
      <ul class="space-y-1">
        
        <!-- Loop through the COMPUTED 'currentMenu' -->
        <li v-for="item in currentMenu" :key="item.path">
          <router-link 
            :to="item.path" 
            class="flex items-center gap-2 px-4 py-3 transition duration-200 font-bold text-white hover:bg-(--gray-100) hover:text-red-700"
            :class="{ 'bg-white text-red-700 font-bold': route.path === item.path }"
          >
            <!-- Icon -->
            <span class="w-[1.5rem] h-[1rem] flex items-center justify-center">
              <img v-if="item.isImage" :src="item.icon" alt="" class="w-full h-full object-contain" />
              <span v-else>{{ item.icon }}</span>
            </span>
            <!-- Name -->
            <span class="text-lg">{{ item.name }}</span>
          </router-link>
        </li>

      </ul>
    </div>

    <!-- LOGOUT -->
    <div class=" w-full mt-[1rem] pt-4 border-t-3 border-white">
      <button @click="logout" class="text-lg w-full flex items-center gap-4 px-4 py-3 text-white font-bold hover:bg-white hover:text-red-700 transition duration-200">
        <span class="w-[1.5rem] h-[1rem] flex items-center justify-center">
          <img 
            src="../assets/icon/logout2.svg" 
            alt="" 
            class="w-full h-full object-contain" />
        </span> Logout
      </button>
    </div>

  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router' // To verify active link
import getUserPayload from '../utils/jwt' // Your existing JWT utils
import SearchIcon from '../assets/icon/search2.svg'
import DashboardIcon from '../assets/icon/dashboard2.svg'
import OrdersIcon from '../assets/icon/order2.svg'
import UsersIcon from '../assets/icon/user2.svg'
import ProfileIcon from '../assets/icon/profile2.svg'
import SettingIcon from '../assets/icon/setting2.svg'

const route = useRoute()
// 1. DATA: Define the Menus separately
const adminMenu = [
  { 
    name: "Dashboard", 
    path: "/admin/dashboard", 
    icon: DashboardIcon,
    isImage: true
  },
  { 
    name: "Manage Orders", 
    path: "/admin/manageorders", 
    icon: OrdersIcon,
    isImage: true
  },
  { 
    name: "Manage Users", 
    path: "/admin/manageuser", 
    icon: UsersIcon,
    isImage:true
  },
  { 
    name: "Settings", 
    path: "/admin/setting", 
    icon: SettingIcon,
    isImage: true 
  },
]

const driverMenu = [
  { 
    name: "Find Jobs", 
    path: "/driver/accDelivery", 
    icon: SearchIcon,
    isImage: true
  },
  { 
    name: "Dashboard", 
    path: "/driver/driverDashboard", 
    icon: DashboardIcon,
    isImage: true
  },
  { 
    name: "Profile", 
    path: "/driver/profile", 
    icon: ProfileIcon,
    isImage: true
  },

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