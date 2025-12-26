<template>
  <div class="max-w-[64rem] h-full page m-auto">
    <p class="text-[length:var(--text-title)] font-bold">Account Settings</p>

    <div class="p-[2rem] bg-(--gray-100) mt-[2rem] rounded-lg sd">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- AVATAR SECTION -->
        <div class="col-span-2 flex justify-between">
          <div class="flex gap-6">
            <!-- The Image -->
            <img src="../assets/img/imgprofile.avif" alt="" class="w-40 rounded-full">
            <div class="flex items-center">
              <p class="text-[length:var(--text-title)] font-bold text-(--gray-800) mb-[1rem]">
                {{ user?.username }}</p>
              <!-- <span
                  class="text-[length:var(--text-description)] bg-(--gray-100) border border-(--gray-700) px-2 py-1 rounded text-(--gray-800)">
                  ID: {{ user?.id }}
                  </span> -->
            </div>
          </div>
          <div class="me-[1rem]">
            <button 
              @click="logout"
              class="border bg-(--red-800) border-(--red-800) text-(--gray-100) px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-(--red-700) transition duration-300">
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
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">First Name</label>
            <input
              v-model="form.firstname"
              disabled
              class="w-full bg-white border p-3 rounded"
              type="text"
              placeholder="Full name" />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Last Name</label>
            <input
              v-model="form.lastname"
              disabled
              class="w-full bg-white border p-3 rounded"
              type="tel"
              placeholder="Phone number" />
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <label class="block font-bold text-(--gray-800) uppercase mb-[0.5rem]">Email Address</label>
            <input
              v-model="form.email"
              :disabled="!isEditing"
              class="w-full bg-white border p-3 rounded"
              type="email"
              placeholder="Email" />
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
import { ref, onMounted } from 'vue';
import getUserPayload from '../utils/jwt';
import { first, last } from 'lodash-es';

const isEditing = ref(false);

const user = ref({
  id: '',
  lastname: '',
  firstname: '',
  username: '',
  email: '',
  role: '',
  avatar: ''
});

const form = ref({
  firstname: '',  
  lastname: '',
  email: '',
  phone: '',
  address: ''
});

const original = ref({});

const defaultAvatar = 'https://via.placeholder.com/150';

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = getUserPayload();
  if (payload) {
    user.value.id = payload.userId;
    user.value.firstname = payload.firstname;
    user.value.lastname = payload.lastname;
    user.value.username = payload.username;
    user.value.email = payload.email;

    form.value.firstname = payload.firstname;
    form.value.lastname = payload.lastname;
    form.value.email = payload.email;
  }
  console.log(payload);
  
});

/* ======================
   EDIT HANDLERS
====================== */

function startEditing() {
  original.value = { ...form.value };
  isEditing.value = true;
}

function cancelEdit() {
  form.value = { ...original.value };
  isEditing.value = false;
}

async function saveProfile() {
  console.log('Saved profile:', form.value);
  isEditing.value = false;
}

/* ======================
   HELPERS
====================== */

const getImage = (name) => {
  if (!name) return defaultAvatar;
  try {
    return new URL(`../../assets/img/${name}`, import.meta.url).href;
  } catch {
    return defaultAvatar;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
</script>
