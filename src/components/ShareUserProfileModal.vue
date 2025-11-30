<template>
    <!-- OVERLAY (Only visible if isOpen is true) -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-xs">

        <!-- MODAL CARD -->
        <div class="bg-white rounded-xl w-full max-w-2xl overflow-hidden">

            <!-- HEADER -->
            <div class="bg-(--gray-200) px-6 py-4 border-b flex justify-between items-center">
                <div>
                    <p class="text-[1.5rem] font-bold text-(--gray-800)">
                        {{ isEditing ? 'Edit Profile' : 'User Details' }}
                    </p>
                    <p class="text-(--gray-800) uppercase">{{ formData.role }} Profile</p>
                </div>

                <!-- Edit Toggle Button -->
                <button v-if="!isEditing" @click="isEditing = true"
                    class="px-6 py-2 bg-(--gray-700) text-white rounded-lg hover:bg-(--gray-900)">
                    Edit
                </button>
            </div>

            <!-- BODY: FORM -->
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- AVATAR SECTION -->
                <div class="col-span-2 flex items-center gap-4 pb-4 border-b border-(--gray-600)">
                    <!-- The Image -->
                    <img src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTERIELXWC3QMfy-g_rUnG_HAplsff-mSoWU73ZBqKkrgQ2IhbPMnc0bn-57o4-fVM1frgbgj6YEfnCto4"
                        class="w-32 h-32 rounded-full object-cover border-4 border-(--gray-500)">
                    </img>
                    <div>
                        <p class="text-[1.5rem] font-bold text-(--gray-800) mb-[1rem]">{{ formData.name }}</p>
                        <span
                            class="text-[1rem] bg-(--gray-100) border border-(--gray-700) px-2 py-1 rounded text-(--gray-800)">ID:
                            {{ formData.id }}</span>
                    </div>
                </div>

                <!-- First Name -->
                <div>
                    <label class="block font-bold text-(--gray-800) uppercase mb-[1rem]">Full Name</label>
                    <input v-model="formData.name" :disabled="!isEditing"
                        :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-(--gray-100) border-none focus:outline-2 focus:-outline-offset-2' : 'bg-(--gray-100) border-(--gray-700) text-(--gray-700)']">
                </div>

                <!-- Phone -->
                <div>
                    <label class="block font-bold text-(--gray-800) uppercase mb-[1rem]">Phone Number</label>
                    <input v-model="formData.phone" :disabled="!isEditing"
                        :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-(--gray-100) border-none focus:outline-2 focus:-outline-offset-2' : 'bg-(--gray-100) border-(--gray-700) text-(--gray-700)']">
                </div>

                <!-- Email -->
                <div class="col-span-2">
                    <label class="block font-bold text-(--gray-800) uppercase mb-[1rem]">Email Address</label>
                    <input v-model="formData.email" :disabled="!isEditing"
                        :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-(--gray-100) border-none focus:outline-2 focus:-outline-offset-2' : 'bg-(--gray-100) border-(--gray-700) text-(--gray-700)']">
                </div>

                <!-- DRIVER SPECIFIC FIELDS (Only if role === driver) -->
                <div v-if="formData.role === 'driver'" class="col-span-2">
                    <div>
                        <label class="block font-bold text-(--gray-800) uppercase mb-[1rem]">Vehicle Type</label>
                        <select v-model="formData.vehicleType" :disabled="!isEditing"
                            :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-(--gray-100) border-none focus:outline-2 focus:-outline-offset-2' : 'bg-(--gray-100) border-(--gray-700) text-(--gray-700)']">
                            <option value="motorbike">Motorbike</option>
                            <option value="truck">Truck</option>
                            <option value="car">Car</option>
                        </select>
                    </div>
                </div>

                <!-- Address -->
                <div class="col-span-2">
                    <label class="block font-bold text-(--gray-800) uppercase mb-[1rem]">Address</label>
                    <textarea v-model="formData.address" rows="2" :disabled="!isEditing"
                        :class="['w-full p-3 rounded-lg border transition', isEditing ? 'bg-(--gray-100) border-none focus:outline-2 focus:-outline-offset-2' : 'bg-(--gray-100) border-(--gray-700) text-(--gray-700)']">
                    </textarea>
                </div>

            </div>

            <!-- FOOTER -->
            <div class="bg-(--gray-200) px-6 py-4 flex justify-end gap-3 border-t">

                <!-- Cancel (Only show if editing) -->
                <button v-if="isEditing" @click="isEditing = false"
                    class="px-6 py-2 bg-white text-(--gray-800) rounded-lg font-bold hover:bg-(--gray-300)">
                    Cancel
                </button>

                <!-- Save (Only show if editing) -->
                <button v-if="isEditing" @click="handleSave"
                    class="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-md">
                    Save Changes
                </button>

                <!-- Close (Only show if NOT editing) -->
                <button v-if="!isEditing" @click="handleClose"
                    class="px-6 py-2 bg-white text-(--gray-800) rounded-lg font-bold hover:bg-(--gray-300)">
                    Close
                </button>
            </div>

        </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
// 1. PROPS & EMITS
const props = defineProps({
    isOpen: Boolean,
    user: Object // The user object passed from Parent
})

const emit = defineEmits(['close', 'save'])

// 2. LOCAL STATE
const isEditing = ref(false)
const formData = ref({}) // We edit this copy, not the prop directly

// 3. WATCHER
// Whenever the 'user' prop changes (e.g., Admin clicks a different row),
// we update our local 'formData' copy.
watch(() => props.user, (newUser) => {
    if (newUser) {
        formData.value = { ...newUser } // Create a copy
    }
}, { immediate: true })

// 4. ACTIONS
const handleSave = () => {
    // Send the updated data back to the parent
    emit('save', formData.value)
    isEditing.value = false // Exit edit mode
}

const handleClose = () => {
    isEditing.value = false // Reset edit mode
    emit('close')
}
</script>