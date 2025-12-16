<template>
  <div class="max-w-[64rem] h-full page m-auto">
    <p class="text-[length:var(--text-title)] font-bold">Account Settings</p>

    <div class="p-[2rem] bg-(--gray-100) mt-[2rem] rounded-lg sd">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- AVATAR SECTION -->
        <div class="col-span-2 flex justify-between">
          <div class="flex gap-6">
            <!-- The Image -->
            <img :src="original.avatar"
                 alt="avatar"
                class="w-50 h-50 rounded-full object-cover border-4 border-(--gray-500)">
            </img>
            <div>
              <p class="text-[length:var(--text-title)] font-bold text-(--gray-800) mb-[1rem]">{{ original.fullName }}</p>
              <span
                  class="text-[length:var(--text-description)] bg-(--gray-100) border border-(--gray-700) px-2 py-1 rounded text-(--gray-800)">ID: {{ original.id }}
                  </span>
            </div>
          </div>
          <div class="me-[1rem]">
            <button 
              class="border bg-(--red-800) border-(--red-800) text-(--gray-100) px-4 py-2 rounded-lg hover:cursor-pointer hover:opacity-80">
              Log Out</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Details -->
    <div class="p-[2rem] bg-(--gray-100) mt-[2rem] rounded-lg sd">
      <div>
        <p class="text-[length:var(--text-title)] font-bold">Contact Details</p>
      </div>

      <div class="p-[2rem] mt-[1rem] border bg-white border-(--gray-100) rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Full Name -->
          <div>
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Full Name</label>
            <input
              v-model="form.fullName"
              :readonly="!isEditing"
              @focus="startEditing"
              @click="startEditing"
              class="w-full bg-white border p-3 rounded"
              type="text"
              placeholder="Full name" />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Phone Number</label>
            <input
              v-model="form.phone"
              :readonly="!isEditing"
              @focus="startEditing"
              @click="startEditing"
              class="w-full bg-white border p-3 rounded"
              type="tel"
              placeholder="Phone number" />
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Email Address</label>
            <input
              v-model="form.email"
              :readonly="!isEditing"
              @focus="startEditing"
              @click="startEditing"
              class="w-full bg-white border p-3 rounded"
              type="email"
              placeholder="Email" />
          </div>

          <!-- Address -->
          <div class="col-span-2">
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Address</label>
            <input
              v-model="form.address"
              :readonly="!isEditing"
              @focus="startEditing"
              @click="startEditing"
              class="w-full bg-white border p-3 rounded"
              type="text"
              placeholder="Address" />
          </div>   
        </div>
      </div>

      <!-- Save button (visible only while editing) -->
      <div 
        v-if="isEditing"
        class="bg-(--gray-100) px-[2rem] py-[1rem]">
        <div class="rounded-md flex gap-2 items-center justify-end">
          <button
            @click="saveProfile"
            class="border bg-white text-(--gray-900) px-4 py-2 rounded-lg hover:bg-(--gray-300)">
            Cancel
          </button>
          <button
            @click="cancelEdit"
            class="border bg-(--red-700) text-(--gray-100) px-3 py-2 rounded-lg hover:bg-(--red-900)">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const isEditing = ref(false);

const original = reactive({
  id: 'C-1001',
  avatar: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTERIELXWC3QMfy-g_rUnG_HAplsff-mSoWU73ZBqKkrgQ2IhbPMnc0bn-57o4-fVM1frgbgj6YEfnCto4',
  fullName: 'Labron James',
  email: 'labron@example.com',
  phone: '012 345 678',
  address: '123 Main St, City'
});

// form is a copy that the user edits
const form = reactive({
  fullName: original.fullName,
  email: original.email,
  phone: original.phone,
  address: original.address
});

function startEditing() {
  isEditing.value = true;
}

function saveProfile() {
  // apply changes (replace this with real API call)
  original.fullName = form.fullName;
  original.email = form.email;
  original.phone = form.phone;
  original.address = form.address;

  isEditing.value = false;
}

function cancelEdit() {
  // revert form to original values and exit edit mode
  form.fullName = original.fullName;
  form.email = original.email;
  form.phone = original.phone;
  form.address = original.address;
  isEditing.value = false;
}
</script>