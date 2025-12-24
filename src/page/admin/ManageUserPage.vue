<template>
  <div class="p-8 max-w-6xl min-h-screen mx-auto bg-(--gray-100)">
    <div class="">
    
    <!-- PAGE TITLE -->
    <div class="border-b-[2px] border-(--gray-300) pb-[1rem]">
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          User Management
        </p>
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

      <!-- Only show if we are on Drivers tab -->
      <button 
        v-if="activeTab === 'Drivers'"
        @click="openCreateModal"
        class="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-900"
      >
        + Add New Driver
      </button>
    </div>

    <!-- REUSABLE TABLE COMPONENT -->
    <!-- We pass the filtered list into the table -->
    <ShareUserTable 
      :users="filteredList" 
      @view="openEditModal" 
      @edit=""
      @ban="banUser"
    />

    <!-- REUSABLE MODAL COMPONENT -->
    <!-- It sits here, hidden, until showModal becomes true -->
    <ShareUserProfileModal 
      :isOpen="showModal" 
      :user="selectedUser" 
      :isCreating="isCreating"
      @close="showModal = false"
      @save="handleSave"
    />
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'
import ShareUserProfileModal from '../../components/ShareUserProfileModal.vue'
import ShareUserTable from '../../components/ShareUserTable.vue'

// MOCK DATA (Simulating Backend)
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


// PAGE STATE
const activeTab = ref('Customers') // Controls which tab is open (clicked)
const showModal = ref(false)       // True = Show Pop-up, False = Hide Pop-up
const selectedUser = ref(null)     // Stores the specific user we are looking at clicked by Admin
const isCreating = ref(false)      // True = We are adding a NEW person. False = We are editing an OLD person.

// OPEN FOR EDITING (existing user)
const openEditModal = (user) => {
  // Put the user data into our variable
  selectedUser.value = user //  Load the clicked user's data
  isCreating.value = false // We are NOT creating
  showModal.value = true // Open the box
}

// OPEN FOR CREATING (New Logic)
const openCreateModal = () => {
  // We create a "Mock Empty Database Row" here
  selectedUser.value = {
    id: 'D-NEW', // Temporary ID
    role: 'driver', // Force role to driver
    status: 'Active',
    name: '',
    phone: '',
    email: '',
    vehicleType: 'motorbike', // Default
    plateNumber: '',
    address: ''
  }
  
  isCreating.value = true // We ARE creating (Flag is TRUE)
  showModal.value = true // Open the box
}

// COMPUTED PROPERTIES (Filter Logic)
// This automatically updates the list based on the active tab
const filteredList = computed(() => {
  if (activeTab.value === 'Customers') {
    return allUsers.filter(user => user.role === 'customer')
  } else {
    return allUsers.filter(user => user.role === 'driver')
  }
})

// THE SMART SAVE FUNCTION
const handleSave = (userData) => {
  if (isCreating.value) {
    // === LOGIC FOR ADDING ===
    console.log("Creating new user:", userData)
    
    // Generate a fake random ID for the frontend demo
    userData.id = 'D-' + Math.floor(Math.random() * 1000)
    
    // Push to the array (Simulates saving to DB)
    allUsers.push(userData)
    
  } else {
    // === LOGIC FOR EDITING (EDITING EXISTING) ===
    console.log("Updating existing user:", userData)
    // Find where this user is in the array
    const index = allUsers.findIndex(u => u.id === userData.id)
    // Overwrite the old data with new data
    if (index !== -1) allUsers[index] = userData
  }
  
  showModal.value = false // Close modal
  alert("Success!")
}

// Handle "Save" event from the Modal
// const updateUser = (updatedData) => {
//   console.log("Saving user:", updatedData)
  
  // Find the user in our mock list and update them
//   const index = allUsers.findIndex(u => u.id === updatedData.id)
//   if (index !== -1) {
//     allUsers[index] = updatedData // This updates the Table instantly!
//   }
  
//   showModal.value = false // Close modal
//   alert("User Profile Updated Successfully!")
// }

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