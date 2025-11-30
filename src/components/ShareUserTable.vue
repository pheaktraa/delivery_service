<template>
  <div class="bg-white rounded-xl shadow-sm border border-(--gray-100) mt-[2rem] overflow-hidden">

    <!-- TABLE START -->
    <table class="w-full text-left">

      <!-- Table Header -->
      <thead class="bg-(--gray-700) border-b border-(--gray-200)">
        <tr>
          <!-- Fixed small width for ID -->
          <th class="p-4 text-xs font-bold text-white uppercase w-[100px]">User ID</th>
          <!-- Allow Name to GROW (No width set) -->
          <th class="p-4 text-xs font-bold text-white uppercase ">User Info</th>
          <!-- Fixed width for Status & Phone -->
          <th class="p-4 text-xs font-bold text-white uppercase w-[180px]">Status</th>
          <th class="p-4 text-xs font-bold text-white uppercase w-[180px]">Phone</th>
          <!-- w-1 forces it to shrink -->
          <th class="p-4 text-xs font-bold text-white w-1 whitespace-nowrap uppercase text-left">Action</th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="divide-y divide-(--gray-200)">
        <tr v-for="user in users" :key="user.id" class="hover:bg-(--gray-200) transition duration-300">

          <!-- Column 1: ID -->
          <td class="p-4 text-xs font-bold text-(--gray-800)">
            {{ user.id }}
          </td>

          <!-- Column 2: Name & Role -->
          <td class="p-4">
            <div class="font-bold text-(--gray-800)">{{ user.name }}</div>
            <div class="text-xs text-(--gray-800) capitalize">{{ user.role }}</div>
          </td>

          <!-- Column 3: Status Badge -->
          <td class="p-4">
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-bold border',
              user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                user.status === 'Banned' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-(--gray-100) text-(--gray-600)'
            ]">
              {{ user.status }}
            </span>
          </td>

          <!-- Column 4: Phone -->
          <td class="p-4 text-sm font-bold text-(--gray-800)">
            {{ user.phone }}
          </td>

          <!-- Column 5: Actions -->
          <td class="p-4 text-right flex gap-2">

            <!-- VIEW BUTTON (Opens the Modal) -->
            <button @click="$emit('view', user)"
              class="px-5 py-3 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-400">
              View
            </button>

            <!-- BAN BUTTON -->
            <button @click="$emit('ban', user)"
              class="px-5 py-3 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-400">
              Ban
            </button>
          </td>

        </tr>

        <!-- Empty State (Shows if no users found) -->
        <tr v-if="users.length === 0">
          <td colspan="5" class="p-8 text-center text-(--gray-400)">
            No users found in this list.
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>


<script setup>
// 1. PROPS (Data received from Parent)
defineProps({
  users: {
    type: Array,
    required: true
  },
  loading: Boolean // Optional: To show a loading spinner later
})
// 2. EMITS (Signals sent to Parent)
// We tell the parent: "Hey, user clicked View!" or "Hey, user clicked Ban!"
defineEmits(['view', 'ban'])
</script>