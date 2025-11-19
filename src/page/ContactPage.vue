<template>
  <div class="max-w-[80rem] h-full m-auto">
    <div class="flex flex-col md:flex-row justify-center md:pt-[8rem] pt-[4rem] pb-[3rem] w-full">
      <svg 
        class="fill-red-900 wavy z-[-1]" viewBox="0 0 900 600">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--color-red-900)" />
            <stop offset="50%" stop-color="var(--color-red-800)" />
            <stop offset="100%" stop-color="var(--color-red-600)" />
          </linearGradient>
        </defs>
        <path d="M0 148L21.5 158.8C43 169.7 86 191.3 128.8 191.8C171.7 192.3 214.3 171.7 257.2 173.7C300 175.7 
                343 200.3 385.8 209C428.7 217.7 471.3 210.3 514.2 217.2C557 224 600 245 642.8 255C685.7 265 728.3 
                264 771.2 248C814 232 857 201 878.5 185.5L900 170L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 
                0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 
                0 43 0 21.5 0L0 0Z"
              fill="url(#gradient)"
        />
      </svg>

      <div class="w-full md:w-[60%] flex flex-col justify-center items-center text-center md:text-left">
        <p class="mb-[1rem] text-[2rem] md:text-[2.5rem] text-(--gray-100) font-bold">Have Some Question?</p>
        <p class="text-[0.85rem] md:text-[1rem] text-(--gray-100)">Thank you for interest in our services. Please Write us a message or email us at 
          <span class="font-semibold text-(--red-400)">lebron@email.com</span> about your issue and we’ll try to reach back as soon as possible.</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-2 py-[2rem] items-start">
      <div class="flex flex-col w-full md:w-[30rem] h-auto md:h-[55rem]">     
        <img 
          src="../assets/img/mail_image.png"
          alt=""
          class="w-full md:w-[30rem] h-[18rem] md:h-[30rem] object-cover self-end md:self-auto md:relative md:-top-[10%]"
        />

        <div class="w-full md:w-[70%] pb-[1rem] md:relative md:top-[-7rem] md:left-[20%] border-b border-(--gray-400) mt-4 md:mt-0">
          <p class="text-[1.25rem] md:text-[length:var(--text-title)] font-bold">Get in touch</p>
        </div>

        <div class="w-full md:w-[85%] flex flex-row justify-start md:justify-center items-center gap-3 md:relative md:top-[-5rem] mb-[1rem] mt-4">
          <div class="w-[3rem] h-[3rem] flex justify-center items-center bg-white border border-(--gray-500) rounded-[50%]">
            <img 
              src="../assets/icon/phone.svg"
              alt=""
              class="w-[2rem] h-[2rem]"
            />
          </div>
          <p class="text-(--gray-800) font-semibold">+855-123-456-789</p>
        </div>

        <div class="w-full md:w-[85%] flex flex-row justify-start md:justify-center items-center gap-3 md:relative md:top-[-5rem] mb-[1rem]">
          <div class="w-[3rem] h-[3rem] flex justify-center items-center bg-white border border-(--gray-500) rounded-[50%]">
            <img 
              src="../assets/icon/mail.svg"
              alt=""
              class="w-[1.8rem] h-[1.8rem]"
            />
          </div>
          <p class="text-(--gray-800) font-semibold">lebron@gmail.com</p>
        </div>

        <div class="w-full md:w-[85%] flex flex-row justify-start md:justify-center items-center gap-3 md:relative md:top-[-5rem] mb-[1rem]">
          <div class="w-[3rem] h-[3rem] flex justify-center items-center bg-white border border-(--gray-500) rounded-[50%]">
            <img 
              src="../assets/icon/location.svg"
              alt=""
              class="w-[1.8rem] h-[1.8rem]"
            />
          </div>
          <p class="text-(--gray-800) font-semibold">st.667 Tuol Kok, <br/>Phnom Penh</p>
        </div>
      </div>

      <div class="w-full md:w-[33rem] p-[1.25rem] md:p-[2rem] flex flex-col justify-center bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl sd">
        <form class="mt-[1rem] p-[1rem] md:p-[1rem] flex flex-col" @submit.prevent="handleSubmit">
          <input
            id="firstName"
            type="text"
            v-model="formData.firstName" required
            placeholder="First Name"
            class="w-full p-[0.75rem] md:p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="lastName"
            type="text"
            v-model="formData.lastName" required
            placeholder="Last Name"
            class="w-full mt-[1rem] md:mt-[1.5rem] p-[0.75rem] md:p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="phone"
            type="text"
            v-model="formData.phone" required
            placeholder="Phone Number"
            class="w-full mt-[1rem] md:mt-[1.5rem] p-[0.75rem] md:p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <input
            id="email"
            type="text"
            v-model="formData.email" required
            placeholder="Email Address"
            class="w-full mt-[1rem] md:mt-[1.5rem] p-[0.75rem] md:p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          />
          <textarea
            id="message"
            name="message"
            v-model="formData.message" required
            placeholder="Message"
            class="w-full h-[10rem] md:h-[12rem] md:h-[12rem] placeholder:text-(--gray-500) mt-[1rem] md:mt-[1.5rem] p-[0.75rem] md:p-[1rem] bg-(--gray-100) border border-(--gray-400) rounded-lg focus:outline-none focus:ring-1 focus:ring-(--gray-500)"
          ></textarea>

          <div class="mt-[1.25rem] md:mt-[2rem]">
            <button
              type="submit"
              class="w-full p-[0.9rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-gradient-to-r from-(--red-800) to-(--red-600) rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
            >
              Send
            </button>
          </div>
        </form>

        <p class="text-(--gray-500) mx-[0.5rem] md:mx-[2rem] mt-[0.5rem] text-sm">MoveSmart will not sell, share or trade customer information. Your privacy will keep safe within our company.</p>
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

<style scoped>

  .wavy {
    aspect-ratio: auto;
    width: 100%;
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 9%;
  }

  @media (max-width: 768px) {
    .wavy {
      width: 180%;
      top: 0%;
    }
  }

</style>