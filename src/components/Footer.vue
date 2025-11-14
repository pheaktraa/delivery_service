<template>
  <footer class="bg-black mt-[3rem] relative">
    <div class="max-w-[80rem] m-auto h-[20rem]">
      <div class="h-[15rem] flex justify-between py-[2rem]">
        <div class="h-full flex items-center">
          <img src="../assets/img/logo2.png" alt="" class="h-[7rem]" />
        </div>
        <div>
          <p
            class="text-white text-[length:var(--text-description)] font-semibold"
          >
            Navigation
          </p>
          <ul class="list-unstyled mt-[1rem] text-white">
            <li
              class="hover:text-[var(--red-800)] transition-colors duration-300"
            >
              Home
            </li>
            <li
              class="hover:text-[var(--red-800)] transition-colors duration-300"
            >
              Create Delivery
            </li>
            <li
              class="hover:text-[var(--red-800)] transition-colors duration-300"
            >
              My Deliveries
            </li>
            <li
              class="hover:text-[var(--red-800)] transition-colors duration-300"
            >
              About Us
            </li>
            <li
              class="hover:text-[var(--red-800)] transition-colors duration-300"
            >
              Contact
            </li>
          </ul>
        </div>
        <div>
          <p
            class="text-white text-[length:var(--text-description)] font-semibold"
          >
            Address
          </p>
          <p class="text-white mt-[1rem]">
            Street: #611, St.371 (Boeng Tompun) <br />S/K Stung Mean Chey, Khan
            Mean Chey <br />
            City: Khan Mean Chey <br />State/province/area: Phnom Penh
          </p>
        </div>
        <div>
          <p
            class="text-white text-[length:var(--text-description)] font-semibold"
          >
            Social Media
          </p>
          <div class="flex mt-[1rem]">
            <img src="../assets/img/facebookicon.png" alt="" class="h-[3rem]" />
            <img
              src="../assets/img/instagramicon.png"
              alt=""
              class="h-[4rem] mt-[-.5rem] ml-[-1rem]"
            />
          </div>
        </div>
      </div>
      <div class="w-full border-b-2 border-white"></div>
      <p class="text-white my-7">
        All rights reserved © 2025 deliveryManagement
      </p>
    </div>
    <div class="max-w-[80rem] m-auto">
      <div class=" max-w-[80rem] m-auto h-[20rem] w-full fixed top-10/12 left-[95%]">
        <div
          class="p-1 bg-white w-[4rem] flex items-center justify-center h-[4rem] rounded-full relative"
        >
          <img src="../assets/icon/message.svg" alt="" class="w-[2rem] z-1" />
          <div
            class="w-[2rem] h-[2rem] bg-(--red-800) rounded-full absolute z-2 flex items-center justify-center left-[2rem] top-[-1rem]"
             v-if="show > 1"
          >
            <p class="text-white">1</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const show = 1;
</script>
