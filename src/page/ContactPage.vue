<template>
  <div class="max-w-[80rem] h-full m-auto">
    <div class="flex justify-center pt-[8rem] pb-[6rem]">
      <p class="text-[2.5rem] text-(--red-800) font-bold">CONTACT US</p>
    </div>

    <div class="flex gap-2 py-[2rem]">
      <div class="w-[40rem] h-[55rem] p-[2.5rem] bg-(--gray-200) border border-(--gray-200) rounded-xl sd">
        <div class="flex flex-row justify-center gap-[2rem]">
          <img 
            src="../assets/icon/oepn_mailbox.svg"
            alt=""
            class="w-[6rem] h-[6.5rem]"
          />
          <p class="text-[length:var(--text-description)] font-semibold">Write us a message about your issue and we’ll try to reach back as soon as possible.</p>
        </div>

        <form class="mt-[2rem] p-[2rem] flex flex-col" @submit.prevent="handleSubmit">
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

          <div class="my-[2rem]">
            <button
              type="submit"
              class="w-full p-[1rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-(--red-800) border border-(--gray-400) rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <div class="flex flex-col">
        <div class="w-[38rem] h-[38rem] bg-(--red-800) border border-(--red-800) rounded-[50%] relative -top-[5rem]">
          <p class="text-[3rem] text-(--gray-100) font-semibold relative top-[8rem] left-[3rem]">What can we<br/> help you with?</p>
          
          <div>
            <img
              src="../assets/icon/plane.svg"
              alt=""
              class="w-[13rem] h-[13rem] relative -top-[10rem] -right-[23rem] opacity-40 -rotate-12"
            />
          </div>

          <div>
            <img
              src="../assets/icon/comment.svg"
              alt=""
              class="w-[6rem] h-[7rem] relative left-[5rem] -top-[3rem] -rotate-30"
            />
          </div>

          <div>
            <img
              src="../assets/icon/mail.svg"
              alt=""
              class="w-[15rem] relative left-[10rem] -top-[4rem] -rotate-15"
            />
          </div>

          <div>
            <img
              src="../assets/icon/file_pen.svg"
              alt=""
              class="w-[8rem] h-[8rem] relative -right-[27rem] -top-[25rem] rotate-20"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const $toast = useToast()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
})
const handleSubmit = () => {
  console.log('Form submitted:', formData.value)

  $toast.success('Message send successfully!')

  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  }
}

</script>