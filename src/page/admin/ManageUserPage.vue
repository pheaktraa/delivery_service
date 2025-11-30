<template>
  <div class="p-8 max-w-5xl mx-auto mt-[5rem] bg-(--gray-100)">
    
    <!-- PAGE TITLE -->
    <div class="flex justify-between items-center">
      <div>
        <p class="text-[2rem] font-bold text-(--gray-800)">Users Management</p>
      </div>
    </div>

    <!-- TABS CONTROLLER -->
    <div class="flex gap-2 bg-(--gray-700) p-1.5 rounded-xl w-fit mt-[2rem]">
      <button 
        @click="activeTab = 'Customers'"
        :class="['px-6 py-2 rounded-lg font-bold text-sm', 
        activeTab === 'Customers' ? 'bg-white text-(--gray-800)' : 'text-white hover:text-(--gray-500)']"
      >
        Customers
      </button>
      <button 
        @click="activeTab = 'Drivers'"
        :class="['px-6 py-2 rounded-lg font-bold text-sm transition duration-500', 
        activeTab === 'Drivers' ? 'bg-white text-(--gray-800)' : 'text-white hover:text-(--gray-500)']"
      >
        Drivers
      </button>
    </div>

    <!-- REUSABLE TABLE COMPONENT -->
    <!-- We pass the filtered list into the table -->
    <ShareUserTable 
      :users="filteredList"
      @view="openModal" 
      @edit=""
      @ban="banUser"
    />

    <!-- REUSABLE MODAL COMPONENT -->
    <!-- It sits here, hidden, until showModal becomes true -->
    <ShareUserProfileModal 
      :isOpen="showModal" 
      :user="selectedUser" 
      @close="showModal = false"
      @save="updateUser"
    />

  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'
import ShareUserProfileModal from '../../components/ShareUserProfileModal.vue'
import ShareUserTable from '../../components/ShareUserTable.vue'

// 1. MOCK DATA (Simulating Backend)
// We use 'reactive' so if we change data, the table updates automatically.
const allUsers = reactive([
  // CUSTOMERS
  { 
    id: 'C-1001', 
    name: 'Sokha Dara', 
    role: 'customer', 
    status: 'Active', 
    phone: '012 999 888', 
    email: 'sokha@gmail.com', 
    address: '#12, St 2004, Sen Sok, Phnom Penh' 
  },
  { 
    id: 'C-1002', 
    name: 'John Smith', 
    role: 'customer', 
    status: 'Banned', 
    phone: '098 777 123', 
    email: 'john@yahoo.com', 
    address: 'Aeon Mall 1, Phnom Penh' 
  },
  
  // DRIVERS
  { 
    id: 'D-5001', 
    name: 'Vibol Chan', 
    role: 'driver', 
    status: 'Active', 
    phone: '011 222 333', 
    email: 'vibol.driver@movesmart.com', 
    address: 'Kandal Province',
    vehicleType: 'motorbike',
    plateNumber: '1A-9988'
  },
  { 
    id: 'D-5002', 
    name: 'Chea Oudom', 
    role: 'driver', 
    status: 'Active', 
    phone: '099 555 666', 
    email: 'oudom.truck@movesmart.com', 
    address: 'Takhmau City',
    vehicleType: 'truck',
    plateNumber: '3B-1234'
  }
])


// 2. PAGE STATE
const activeTab = ref('Customers') // Controls which tab is open
const showModal = ref(false)       // Controls if pop-up is visible
const selectedUser = ref(null)     // Stores the user clicked by Admin

// 3. COMPUTED PROPERTIES (Filter Logic)
// This automatically updates the list based on the active tab
const filteredList = computed(() => {
  if (activeTab.value === 'Customers') {
    return allUsers.filter(user => user.role === 'customer')
  } else {
    return allUsers.filter(user => user.role === 'driver')
  }
})

// 4. ACTION HANDLERS
// Open Modal when "View" is clicked
const openModal = (user) => {
  selectedUser.value = user // Pass this data to the modal prop
  showModal.value = true
}

// Handle "Save" event from the Modal
const updateUser = (updatedData) => {
  console.log("Saving user:", updatedData)
  
  // Find the user in our mock list and update them
  const index = allUsers.findIndex(u => u.id === updatedData.id)
  if (index !== -1) {
    allUsers[index] = updatedData // This updates the Table instantly!
  }
  
  showModal.value = false // Close modal
  alert("User Profile Updated Successfully!")
}

// Handle "Ban" event
const banUser = (user) => {
  if(confirm(`Are you sure you want to BAN ${user.name}?`)) {
    const index = allUsers.findIndex(u => u.id === user.id)
    if (index !== -1) {
      allUsers[index].status = 'Banned' // Change status locally
    }
  }
}
</script>