<script setup>
import { reactive, ref } from 'vue'

// 1. STATE: Is the user currently editing?
const isEditing = ref(false)

// 2. fake DATA: The Admin's Information
const adminData = reactive({
    firstName: 'Lebron',
    lastName: 'James',
    email: 'admin@movesmart.com',
    phone: '012 999 888',
    role: 'Admin',
    address: '#12, Street 2004, Sen Sok, Phnom Penh',
    avatar: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTERIELXWC3QMfy-g_rUnG_HAplsff-mSoWU73ZBqKkrgQ2IhbPMnc0bn-57o4-fVM1frgbgj6YEfnCto4'
})

// 3. LOGIC: Handle Button Clicks
// To store data in case user clicks Cancel
let backupData = {}

const startEditing = () => {
    // Create a backup copy before editing
    backupData = { ...adminData }
    isEditing.value = true
}

const cancelEditing = () => {
    // Revert data back to original
    Object.assign(adminData, backupData)
    isEditing.value = false
}

const saveChanges = () => {
    // Here you would call your Backend API
    console.log("Saving data:", adminData)
    alert("Profile Updated Successfully!")
    isEditing.value = false
}

const triggerFileInput = () => {
    // Logic to open file browser would go here
    alert("Open File Browser to upload new Avatar")
}
</script>

<template>
    <div class="p-8 max-w-5xl mx-auto mt-[5rem]">

        <!-- PAGE HEADER -->
        <div class="flex justify-between items-center">
            <p class="text-[2rem] font-bold text-(--gray-800)">Account Settings</p>

            <!-- ACTION BUTTONS -->
            <div class="flex gap-3">
                <!-- Show 'Edit' only when NOT editing -->
                <button v-if="!isEditing" @click="startEditing"
                    class="flex items-center gap-2 px-6 py-2 bg-(--gray-700) text-white rounded-lg hover:bg-(--gray-900)">
                    Edit Profile
                </button>

                <!-- Show 'Cancel' & 'Save' when Editing -->
                <template v-else>
                    <button @click="cancelEditing"
                        class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button @click="saveChanges"
                        class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md">
                        Save Changes
                    </button>
                </template>
            </div>
        </div>

        <!-- TOP CARD: PROFILE HEADER -->
        <div
            class="bg-(--gray-200) rounded-[1rem] sd p-8 flex flex-col md:flex-row items-center md:items-start gap-8 mt-[1rem]">

            <!-- AVATAR SECTION -->
            <!-- relative group -->
            <div class="relative">
                <!-- The Image -->
                <img :src="adminData.avatar"
                    class="w-32 h-32 rounded-full object-cover border-4 border-(--gray-500)">

                <!-- The Camera Icon (Only visible in Edit Mode) -->
                <button v-if="isEditing" @click="triggerFileInput"
                    class="absolute bottom-0 right-0 bg-(--red-700) p-2 rounded-full hover:bg-(--red-800)"
                    title="Change Photo">
                    📷
                </button>
            </div>

            <!-- TEXT INFO -->
            <div class="text-center md:text-left mt-2">
                <h2 class="text-[1.5rem] font-bold text-(--gray-800)">{{ adminData.firstName }} {{ adminData.lastName }}</h2>
                <p class="text-(--gray-800) font-medium">{{ adminData.role }}</p>
                <p class="text-(--gray-800) font-medium mt-[1rem]">Admin Personal Information (TOP SECRET)</p>
            </div>
        </div>

        <!-- BOTTOM CARD: PERSONAL INFORMATION FORM -->
        <div class="bg-(--gray-200) rounded-[1rem] sd p-8 mt-[3rem]">
            <h3 class="text-[1.5rem] font-bold text-(--gray-800) border-b pb-4">Personal Information</h3>

            <form @submit.prevent="saveChanges">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[2rem]">

                    <!-- First Name -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">First Name</label>
                        <input v-model="adminData.firstName" type="text" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Last Name -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Last Name</label>
                        <input v-model="adminData.lastName" type="text" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Email Address</label>
                        <input v-model="adminData.email" type="email" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Phone Number</label>
                        <input v-model="adminData.phone" type="tel" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Address (Full Width) -->
                    <div class="md:col-span-2">
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Address</label>
                        <input v-model="adminData.address" type="text" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- User Role (ALWAYS READ ONLY) -->
                    <div class="md:col-span-2">
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">User Role</label>
                        <input v-model="adminData.role" type="text" disabled
                            class="w-full p-3 rounded-lg bg-white border-none text-(--gray-700) cursor-not-allowed">
                        <p v-if="isEditing" class="text-xs text-(--red-500) mt-1">You cannot change your own role.</p>
                    </div>

                </div>
            </form>
        </div>

    </div>
</template>