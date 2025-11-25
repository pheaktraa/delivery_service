<template>
  <div class="max-w-[80rem] h-full m-auto p-[2rem] bg-white">
    <div class="flex justify-center py-[5rem]">
      <div class="relative top-0 left-0">
        <img
          src="../assets/img/about01.png"
          alt=""
          class="w-[60rem] object-cover"
        />
        <div class="w-[13rem] h-[3.5rem] flex justify-center items-center absolute top-[5rem] bg-(--red-800) border-(--red-800) rounded-lg">
          <p class="text-[length:var(--text-title)] text-(--gray-100) font-bold">About</p>
        </div>
        <div class="w-[7rem] h-[3.5rem] flex justify-center items-center absolute bottom-0 right-[2rem] bg-(--red-800) border-(--red-800) rounded-lg">
          <p class="text-[length:var(--text-title)] text-(--gray-100) font-bold">Us</p>
        </div>
      </div>
    </div>

    <div class="w-full h-[40rem] grid grid-cols-2 gap-8 mb-[8rem] p-[2rem] bg-(--gray-200) rounded-lg z-0">
      <div class="w-[80%] h-full px-[2rem] flex justify-center items-center">
        <div class="relative top-0 left-0 w-full h-[70%]">
          <div class="w-[80%] h-[28rem] bg-(--red-900) absolute top-[-2rem] left-[-2rem] rounded-lg"></div>
          <img
            src="../assets/img/about02.jpg"
            alt=""
            class="w-full h-[30rem] object-cover rounded-lg absolute "
          />
          <div class="w-[12rem] h-[8rem] flex flex-col justify-center items-center bg-(--red-700) absolute top-[-6rem] right-[2rem] rounded-lg">
            <p class="text-(--gray-100) text-[length:var(--text-title)] font-bold">10+</p>
            <p class="text-(--gray-100) font-semibold">Years of Experience</p>
          </div>
        </div>
      </div>

      <div class="w-full h-full flex flex-col justify-center items-center gap-5">
        <p class="text-(--red-900) text-[length:var(--text-title)] font-bold">Who We Are</p>
        <p class="text-[length:var(--text-description)]">Welcome to SwiftDeliver, your trusted delivery management partner.We are a technology-driven 
            company dedicated to making deliveries faster, smarter, and more reliable. Our platform helps 
            businesses manage their deliveries with ease — from order creation to real-time tracking and customer updates.</p>
      </div>
    </div>

    <div class="w-full h-[25rem] grid grid-cols-2 gap-8 p-[2rem] bg-(--gray-200) rounded-lg">
      <div class="w-full h-full ml-[2rem] flex flex-col justify-center items-center gap-5">
        <p class="text-(--red-900) text-[length:var(--text-title)] font-bold">Our Mission</p>
        <p class="text-[length:var(--text-description)]">To simplify delivery operations for businesses of all sizes by providing efficient, transparent, and customer-focused delivery management solutions.To become the leading platform that connects businesses, drivers, and customers through smart logistics and seamless communication.</p>
      </div>
      <div class="w-full h-full px-[2rem] flex justify-center items-center">
        <img
          src="../assets/img/about03.jpg"
          alt=""
          class="w-[80%] h-[20rem] object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

