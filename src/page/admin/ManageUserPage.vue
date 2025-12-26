<template>
  <div class="max-w-[80rem] h-full m-auto px-[5rem]">
    <div class="bg-(--gray-100) p-[2rem] rounded-lg sd">
      <!-- PAGE TITLE -->
      <div class="border-b-2 border-gray-300 pb-4">
        <p class="text-[length:var(--text-title)] font-extrabold">User Management</p>
      </div>

      <!-- TABS -->
      <div class="flex gap-2 bg-(--gray-700) p-1.5 rounded-xl w-fit mt-6">
        <button
          @click="activeTab = 'user'"
          :class="[
            'px-6 py-2 rounded-lg font-bold text-sm',
            activeTab === 'user'
              ? 'bg-white text-gray-800'
              : 'text-white hover:text-gray-400',
          ]"
        >
          Customers
        </button>
        <button
          @click="activeTab = 'transporter'"
          :class="[
            'px-6 py-2 rounded-lg font-bold text-sm transition duration-500',
            activeTab === 'transporter'
              ? 'bg-white text-gray-800'
              : 'text-white hover:text-gray-400',
          ]"
        >
          Drivers
        </button>

        <button
          v-if="activeTab === 'transporter'"
          @click="openCreateModal"
          class="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-900"
        >
          + Add New Driver
        </button>
      </div>

      <!-- USERS TABLE -->
      <div
        class="w-full h-full overflow-x-auto mt-8 border border-gray-300 rounded-lg overflow-hidden"
      >
        <table class="w-full border-collapse text-fixed">
          <!-- Table Header -->
          <thead class="bg-gray-200 border-b border-gray-300">
            <tr>
              <th class="p-4 text-left font-bold text-gray-800">User ID</th>
              <th class="p-4 text-left font-bold text-gray-800">User Info</th>
              <th class="p-4 text-left font-bold text-gray-800">Status</th>
              <th class="p-4 text-left font-bold text-gray-800">Phone</th>
              <th class="p-4 text-left font-bold text-gray-800">Action</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="user in filteredList"
              :key="user.id"
              class="hover:bg-gray-100 transition duration-300"
            >
              <td class="p-4 text-gray-800">{{ user.id }}</td>
              <td class="p-4 text-gray-800 font-bold">
                {{ user.firstname }} {{ user.lastname }}
              </td>
              <td class="p-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-bold border',
                    user.status.toLowerCase() === 'active'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : user.status.toLowerCase() === 'banned'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="p-4 text-gray-800 font-bold">{{ user.email }}</td>
              <td class="p-4 flex gap-2">
                <button
                  @click="openEditModal(user)"
                  class="px-5 py-3 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-400"
                >
                  View
                </button>
                <button
                  @click="banSelected(user)"
                  class="px-5 py-3 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-400"
                >
                  Ban
                </button>
              </td>
            </tr>
            <tr v-if="filteredList.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-400">
                No users found in this list.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- USER MODAL -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-xs"
      >
        <div class="bg-white rounded-xl w-full max-w-2xl overflow-hidden">
          <!-- HEADER -->
          <div
            class="bg-gray-200 px-6 py-4 border-b flex justify-between items-center"
          >
            <div>
              <p class="text-xl font-bold text-gray-800">
                {{
                  isEditing
                    ? isCreating
                      ? "Add New User"
                      : "Edit Profile"
                    : "User Details"
                }}
              </p>
              <p class="text-gray-800 uppercase">
                {{ selectedUser.role }} Profile
              </p>
            </div>
            <button
              v-if="!isEditing"
              @click="isEditing = true"
              class="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            >
              Edit
            </button>
          </div>

          <!-- BODY -->
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- AVATAR & NAME -->
            <div
              class="col-span-2 flex items-center gap-4 pb-4 border-b border-gray-600"
            >
              <img
                src="https://via.placeholder.com/150"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-500"
              />
              <div>
                <p class="text-xl font-bold text-gray-800 mb-2">
                  {{ selectedUser.firstname }} {{ selectedUser.lastname }}
                </p>
                <span
                  class="text-sm bg-gray-100 border border-gray-700 px-2 py-1 rounded text-gray-800"
                >
                  ID: {{ selectedUser.id }}
                </span>
              </div>
            </div>

            <div>
              <label class="block font-bold text-gray-800 uppercase mb-1"
                >First Name</label
              >
              <input
                v-model="selectedUser.firstname"
                :disabled="!isEditing"
                class="w-full p-3 rounded-lg border"
              />
            </div>

            <div>
              <label class="block font-bold text-gray-800 uppercase mb-1"
                >Last Name</label
              >
              <input
                v-model="selectedUser.lastname"
                :disabled="!isEditing"
                class="w-full p-3 rounded-lg border"
              />
            </div>
              <div v-if="activeTab === 'transporter'">
                <label class="block font-bold text-gray-800 uppercase mb-1"
                  >Plate Number</label
                >
                <input
                  v-model="selectedUser.license_plate"
                  :disabled="!isEditing"
                  class="w-full p-3 rounded-lg border"
                />
              </div>
              <div v-if="activeTab === 'transporter'">
                <label class="block font-bold text-gray-800 uppercase mb-1"
                  >Vehicle Type</label
                >
                <input
                  v-model="selectedUser.vehicle_type"
                  :disabled="!isEditing"
                  class="w-full p-3 rounded-lg border"
                />
              </div>
              <div v-if="showinputpassword" class="col-span-2">
                <label class="block font-bold text-gray-800 uppercase mb-1"
                  >password</label
                >
                <input
                  v-model="selectedUser.password"
                  :disabled="!isEditing"
                  class="w-full p-3 rounded-lg border"
                />
              </div>

              <div v-if="showinputpassword" class="hidden">
                <label class="block font-bold text-gray-800 uppercase mb-1"
                  >Status</label
                >
                <input
                  v-model="selectedUser.status"
                  :disabled="!isEditing"
                  class="w-full p-3 rounded-lg border"
                />
              </div>
              <div class="col-span-2" v-else>
                <label class="block font-bold text-gray-800 uppercase mb-1"
                >Status</label
                >
                <input
                v-model="selectedUser.status"
                :disabled="!isEditing"
                class="w-full p-3 rounded-lg border"
                />
            </div>

            <div class="col-span-2">
              <label class="block font-bold text-gray-800 uppercase mb-1"
                >Email</label
              >
              <input
                v-model="selectedUser.email"
                :disabled="!isEditing"
                class="w-full p-3 rounded-lg border"
              />
            </div>
          </div>

          <!-- FOOTER -->
          <div class="bg-gray-200 px-6 py-4 flex justify-end gap-3 border-t">
            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="px-6 py-2 bg-white text-gray-800 rounded-lg font-bold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              v-if="isEditing"
              @click="saveSelected"
              class="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-md"
            >
              Save Changes
            </button>
            <button
              v-if="!isEditing"
              @click="closeModal"
              class="px-6 py-2 bg-white text-gray-800 rounded-lg font-bold hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showMessage"
        class="fixed top-1/12 left-10/12 -translate-x-1/2 w-[16rem] py-3 px-4 text-center rounded-lg z-2"
        :class="
          userStore.error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        "
      >
        <p v-if="userStore.error">{{ userStore.error }}</p>
        <p v-else>{{ userStore.success }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useUserStore } from "../../store/userstore";
const userStore = useUserStore();

const users = ref([]);
const showMessage = ref(false);
onMounted(async () => {
  if (activeTab.value === "user") {
    const allUsers = await userStore.getallusers();
    users.value = allUsers.users || allUsers || [];
  } else if (activeTab.value === "transporter") {
    const allTransporters = await userStore.getalltransporters();
    users.value = allTransporters.transporters || allTransporters || [];
  }
});

const activeTab = ref("user");
const showModal = ref(false);
const isCreating = ref(false);
const isEditing = ref(false);
const selectedUser = ref({});
const showinputpassword = ref(false);

watch(activeTab, async (newTab) => {
  if (newTab === "user") {
    const allUsers = await userStore.getallusers();
    users.value = allUsers.users || allUsers || [];
  } else if (newTab === "transporter") {
    const allTransporters = await userStore.getalltransporters();
    users.value = allTransporters.transporters || allTransporters || [];
    console.log(users.value);
  }
});

const filteredList = computed(() => {
  return users.value
    .filter((u) =>
      activeTab.value === "user" ? u.role === "user" : u.role === "transporter"
    )
    .sort((a, b) => a.id - b.id); // sort by id ascending
});

const openEditModal = (user) => {
  selectedUser.value = { ...user };
  showModal.value = true;
  isEditing.value = false;
  isCreating.value = false;
  showinputpassword.value = false;
};

const openCreateModal = () => {
  selectedUser.value = {
    id: '',
    role: 'transporter',
    status: 'Active',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    license_plate: '',
    vehicle_type: '',
  };
  showModal.value = true;
  isEditing.value = true;
  isCreating.value = true;
  showinputpassword.value = true;
};


const saveSelected = async () => {
  try {
    if (isCreating.value) {
      if (activeTab.value === 'user') {
        // Local creation for demo
        selectedUser.value.id = 'U-' + Math.floor(Math.random() * 1000);
        users.value.push({ ...selectedUser.value });
      } else if (activeTab.value === 'transporter') {
        // Call API to register transporter
        const res = await userStore.registerTransporter(
          selectedUser.value.firstname,
          selectedUser.value.lastname,
          selectedUser.value.email,
          selectedUser.value.password,
          selectedUser.value.license_plate,
          selectedUser.value.vehicle_type
        );
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2500);
        if (res.success) {
          showModal.value = false;      // ✅ close modal immediately
          isCreating.value = false;
          isEditing.value = false;

          // Then refresh list
          const transporters = await userStore.getalltransporters();
          users.value = transporters;

          showMessage.value = true;
          setTimeout(() => (showMessage.value = false), 2500);
        } else {
          console.error("Failed to register driver:", res.message);
        }
      }
    } else {
      // Edit existing user/driver
      if (activeTab.value === 'user') {
        const res = await userStore.updateUserProfile(
          selectedUser.value.id,
          selectedUser.value.firstname,
          selectedUser.value.lastname,
          selectedUser.value.email,
          selectedUser.value.status
        );
        if (res.success) {
          const idx = users.value.findIndex(u => u.id === selectedUser.value.id);
          if (idx !== -1) users.value[idx] = { ...selectedUser.value };

          showMessage.value = true;
          setTimeout(() => (showMessage.value = false), 2500);
        }
      } else if (activeTab.value === 'transporter') {
        const res = await userStore.updateTransporterProfile(
          selectedUser.value.id,
          selectedUser.value.firstname,
          selectedUser.value.lastname,
          selectedUser.value.email,
          selectedUser.value.license_plate,
          selectedUser.value.vehicle_type,
          selectedUser.value.status
        );
        if (res.success) {
          const idx = users.value.findIndex(u => u.id === selectedUser.value.id);
          if (idx !== -1) users.value[idx] = { ...selectedUser.value };
          showMessage.value = true;
          setTimeout(() => (showMessage.value = false), 2500);
        }
      }
    }

    showModal.value = false;
    isEditing.value = false;
    isCreating.value = false;

    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2000);
  } catch (err) {
    console.error("Error saving:", err);
  }
};


const cancelEdit = () => {
  if (isCreating.value) {
    showModal.value = false;
  }
  isEditing.value = false;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
};

const banSelected = async (item) => {
  try {
    if (activeTab.value === "user") {
      const res = await userStore.updateUserStatus(item.id, "banned");
      if (res.success) {
        const idx = users.value.findIndex((u) => u.id === item.id);
        if (idx !== -1) users.value[idx].status = "banned";
          showMessage.value = true;
          setTimeout(() => (showMessage.value = false), 2000);
      }
      else {
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2000);
      }
    } else if (activeTab.value === "transporter") {
      const res = await userStore.updateTransporterStatus(item.id, "banned");
      if (res.success) {
        const idx = users.value.findIndex((u) => u.id === item.id);
        if (idx !== -1) users.value[idx].status = "banned";
          showMessage.value = true;
          setTimeout(() => (showMessage.value = false), 2000);
      }
      else {
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2000);
      }
    }
  } catch (err) {
    console.error("Error banning:", err);
  }
};
</script>
