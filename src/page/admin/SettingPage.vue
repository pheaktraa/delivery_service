<template>
    <div class="max-w-[80rem] h-full m-auto px-[5rem]">
        <div class="py-[2rem]">
            <!-- PAGE HEADER -->
        <div class="flex justify-between items-center">
            <p class="text-[2rem] font-bold text-(--gray-800)">Account Settings</p>

        </div>

        <!-- TOP CARD: PROFILE HEADER -->
        <div
            class="bg-(--gray-100) rounded-[1rem] sd p-8 flex flex-col md:flex-row items-center md:items-start gap-8 mt-[1rem]"
            >

            <!-- AVATAR SECTION -->
            <!-- relative group -->
            <div class="relative">
                <!-- The Image -->
                <img src="../../assets/img/imgprofile.avif" alt="" class="w-40 rounded rounded-full">

                <!-- The Camera Icon (Only visible in Edit Mode) -->
                <button v-if="isEditing" @click="triggerFileInput"
                    class="absolute bottom-0 right-0 bg-(--red-700) p-2 rounded-full hover:bg-(--red-800)"
                    title="Change Photo">
                    📷
                </button>
            </div>

            <!-- TEXT INFO -->
            <div class="text-center md:text-left mt-2">
                <h2 class="text-[1.5rem] font-bold text-(--gray-800)">{{ adminData.firstname }} {{ adminData.lastname }}</h2>
                <p class="text-(--gray-800) font-medium">{{ adminData.role }}</p>
            </div>
        </div>

        <!-- BOTTOM CARD: PERSONAL INFORMATION FORM -->
        <div class="bg-(--gray-100) rounded-[1rem] sd p-8 mt-[3rem]">
            <h3 class="text-[1.5rem] font-bold text-(--gray-800) border-b pb-4">Personal Information</h3>

            <form @submit.prevent="saveChanges">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[2rem]">

                    <!-- First Name -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">First Name</label>
                        <input v-model="adminData.firstname" type="text" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Last Name -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Last Name</label>
                        <input v-model="adminData.lastname" type="text" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">Email Address</label>
                        <input v-model="adminData.email" type="email" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-white border-none focus:outline-2 focus:-outline-offset-2' : 'bg-white border-none text-(--gray-700)']">
                    </div>

                    <!-- User Role (ALWAYS READ ONLY) -->
                    <div class="">
                        <label class="block text-[1rem] font-bold text-(--gray-700) mb-[1rem]">User Role</label>
                        <input v-model="adminData.role" type="text" disabled
                            class="w-full p-3 rounded-lg bg-white border-none text-(--gray-700) cursor-not-allowed">
                        <p v-if="isEditing" class="text-xs text-(--red-500) mt-1">You cannot change your own role.</p>
                    </div>

                </div>
            </form>
        </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import getUserPayload from '../../utils/jwt'

const userPayload = getUserPayload()
console.log(userPayload);


// 1. STATE: Is the user currently editing?
const isEditing = ref(false)

// 2. fake DATA: The Admin's Information
const adminData = ref({})
adminData.value = userPayload;

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
