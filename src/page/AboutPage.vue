<template>
  <div class="max-w-[80rem] h-full m-auto p-[2rem] page">
    <div class="flex justify-center py-[3rem]">
      <div class="relative top-0 left-0">
        <img
          src="../assets/img/about01.png"
          alt=""
          class="w-[60rem] object-cover"
        />
        <div
          class="w-[10rem] h-[3.5rem] flex justify-center items-center absolute top-[5rem] bg-(--red-800) border-(--red-800) rounded-lg"
        >
          <p
            class="text-[length:var(--text-description)] text-white font-semibold"
          >
            About
          </p>
        </div>
        <div
          class="w-[7rem] h-[3.5rem] flex justify-center items-center absolute bottom-0 right-[2rem] bg-(--red-800) border-(--red-800) rounded-lg"
        >
          <p
            class="text-[length:var(--text-description)] text-white font-bold"
          >
            Us
          </p>
        </div>
      </div>
    </div>

    <div
      class="w-full h-[37rem] grid grid-cols-2 mb-[8rem] p-[4rem] sd rounded-lg z-0 mt-[2rem]"
    >
      <div class="w-[80%] h-full px-[2rem] flex justify-center items-center">
        <div class="relative top-0 left-0 w-full h-[70%]">
          <div
            class="w-[80%] h-[28rem] bg-(--red-800) absolute top-[-2rem] left-[-2rem] rounded-lg"
          ></div>
          <img
            src="../assets/img/about02.jpg"
            alt=""
            class="w-full h-[24rem] object-cover rounded-lg absolute"
          />
          <div
            class="w-[12rem] h-[8rem] flex flex-col justify-center items-center bg-(--red-800) absolute top-[-6rem] right-[2rem] rounded-lg"
          >
            <p
              class="text-white text-[length:var(--text-title)] font-bold"
            >
              10+
            </p>
            <p class="text-white font-semibold">Years of Experience</p>
          </div>
        </div>
      </div>

      <div
        class="w-full h-full flex flex-col justify-center items-center gap-5"
      >
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          Who We Are
        </p>
        <p class="text-[length:var(--text-description)]">
          Welcome to MoveSmart, your trusted delivery management partner.We
          are a technology-driven company dedicated to making deliveries faster,
          smarter, and more reliable. Our platform helps businesses manage their
          deliveries with ease — from order creation to real-time tracking and
          customer updates.
        </p>
      </div>
    </div>

    <div class="w-full h-[25rem] grid grid-cols-2 gap-8 p-[2rem] rounded-lg">
      <div
        class="w-full h-full ml-[2rem] flex flex-col justify-center items-center gap-5"
      >
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          Our Mission
        </p>
        <p class="text-[length:var(--text-description)]">
          To simplify delivery operations for businesses of all sizes by
          providing efficient, transparent, and customer-focused delivery
          management solutions.To become the leading platform that connects
          businesses, drivers, and customers through smart logistics and
          seamless communication.
        </p>
      </div>
      <div class="w-full h-full px-[2rem] flex justify-center items-center">
        <img
          src="../assets/img/about03.jpg"
          alt=""
          class="w-[80%] h-[20rem] object-cover rounded-lg"
        />
      </div>
    </div>
    <div>
      <p
        class="text-center text-[length:var(--text-title)] font-semibold text-[var(--red-900)] my-[4rem] mt-[5rem]"
      >
        What We Do
      </p>
      <div class="grid grid-cols-5">
        <div
          class="w-[14rem] h-[8rem] bg-[var(--red-800)] p-2 flex flex-col items-center justify-center rounded-lg"
          v-for="(item, index) in iconandtext"
          :key="index"
        >
          <img
            :src="item.icon"
            alt=""
            :class="{
              'w-[3rem] mt-[-2.8rem]': index === 1,
              'w-[2rem] mt-[-2.1rem]': index === 0,
              'w-[2.5rem] mt-[-2rem]': index === 3,
              'w-[2rem] mt-[-2rem]': index === 4,
              'w-[2rem]': index !== 0 && index !== 1,
            }"
          />

          <p class="w-full break-words text-center text-white">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const iconandtext = [
  {
    icon: "src/assets/icon/motoaboutus.svg",
    title: "Track Deliveries",
  },
  {
    icon: "src/assets/icon/boxaboutus.svg",
    title: "Manage Orders Easily",
  },
  {
    icon: "src/assets/icon/SchedulingiconSvg.co.svg",
    title: "Offer Flexible Scheduling",
  },
  {
    icon: "src/assets/icon/communication.svg",
    title: "Enhance Communication",
  },
  {
    icon: "src/assets/icon/BusinessTrustLaw iconSvg.co.svg",
    title: " Build Trust",
  },
];
</script>
