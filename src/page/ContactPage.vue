<template>
  <div class="max-w-[80rem] h-full m-auto">
    <div class="flex justify-center pt-[8rem] pb-[3rem]">
      <p class="text-[2.5rem] text-(--red-800) font-bold">CONTACT US</p>
    </div>

    <div class="flex">
      <div class="w-[40rem] h-[55rem] p-[2.5rem] bg-(--gray-200) border border-(--gray-200) rounded-xl sd">
        <div class="flex flex-row justify-center gap-[2rem]">
          <img 
            src="../assets/icon/oepn_mailbox.svg"
            alt=""
            class="w-[6rem] h-[6.5rem]"
          />
          <p class="text-[length:var(--text-description)] font-semibold">Write us a message about your issue and we’ll try to reach back as soon as possible.</p>
        </div>

        <form class="mt-[2rem] p-[2rem] flex flex-col">
          <input
            id="firstName"
            type="text"
            v-model="formData.firstName" required
            placeholder="First Name"
            class="w-full p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="lastName"
            type="text"
            v-model="formData.lastName" required
            placeholder="Last Name"
            class="w-full mt-[1.5rem] p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="phone"
            type="text"
            v-model="formData.phone" required
            placeholder="Phone Number"
            class="w-full mt-[1.5rem] p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="email"
            type="text"
            v-model="formData.email" required
            placeholder="Email Address"
            class="w-full mt-[1.5rem] p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <textarea
            id="message"
            name="message"
            v-model="formData.message" required
            placeholder="Message"
            class="w-full h-[10rem] placeholder:text-(--gray-500) mt-[1.5rem] p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          ></textarea>
        </form>
        
        <div class="mx-[2rem]">
          <button
            type="submit"
            class="w-full p-[1rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-(--red-800) border border-(--gray-400) rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
})

</script>