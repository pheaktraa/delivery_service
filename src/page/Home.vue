<template>
  <div class="max-w-[80rem] h-full m-auto mt-[5rem]">
    <div class="flex">
      <div class="py-[12rem] w-full">
        <p
          class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold"
        >
          Fast
          <span class="text-black"
            >and Reliable Delivery at <br />
            Your</span
          >
          Fingertips
        </p>
        <p
          class="text-[length:var(--text-description)] font-semibold py-[2rem]"
        >
          Send your packages easily and track them <br />
          in real-time.
        </p>
        <router-link to="/createdelivery">
          <button class="bg-[var(--red-800)] text-white px-4 py-2 rounded-[.5rem]">
          Create Delivery
        </button>
      </router-link>
        
      </div>
      <div class="w-full flex items-center justify-center p-10 relative">
        <div
          class="w-[30rem] h-[30rem] border-[2rem] rounded-[50%] border-(--red-800)"
        ></div>
        <img
          src="../assets/img/motohomepage.png"
          alt=""
          class="absolute w-[40rem] left-[7rem] top-[4rem] z-1"
          :style="imageStyle"
        />
      </div>
    </div>
    <p class="text-center text-[length:var(--text-title)] text-[var(--red-800)] font-semibold my-[3rem]">Why You Should Choose Our Service</p>
    <div class="grid md:grid-cols-2 gap-x-20 gap-y-10 relative">
      <div class="w-[37rem] h-[15rem] bg-(--gray-200) rounded-[1rem] p-6 sd">
        <p class="text-[length:var(--text-title)] font-semibold text-[var(--red-800)]">Fast <br>Delivery</p>
        <p class="mt-5 font-semibold ">Get your packages to their destination in record time with our optimized delivery routes and express options.</p>
      </div>
      <div class="w-[37rem] h-[15rem] bg-(--gray-200) rounded-[1rem] p-6 sd">
        <p class="text-[length:var(--text-title)] font-semibold text-[var(--red-800)]">Secure <br>Handling</p>
        <p class="mt-5 font-semibold ">Your items are protected at every step handled with care and delivered safely to your doorstep.</p>
      </div>
      <div class="w-[37rem] h-[15rem] bg-(--gray-200) rounded-[1rem] p-6 sd">
        <p class="text-[length:var(--text-title)] font-semibold text-[var(--red-800)]">Real-Time <br>Tracking</p>
        <p class="mt-5 font-semibold ">Stay updated anytime, anywhere. Track your shipment live and know exactly where it is.</p>
      </div>
      <div class="w-[37rem] h-[15rem] bg-(--gray-200) rounded-[1rem] p-6 sd">
        <p class="text-[length:var(--text-title)] font-semibold text-[var(--red-800)]">24/7 <br>Support</p>
        <p class="mt-5 font-semibold ">We’re always here for you. Our friendly support team is available day and night to help with any questions.</p>
      </div>
      <div class=" h-[33rem] border-s-4 absolute left-1/2 top-0 border-[var(--gray-300)]"></div>
    </div>
    <div class="mt-[10rem] grid md:grid-cols-2 gap-x-20">
      <div class="w-[37rem] h-[25rem]">
        <p class="text-[length:var(--text-title)] font-semibold text-[var(--red-800)]">Rate your experience</p>
        <p class="font-semibold my-3">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback. </p>
        <textarea class="border-2 outline-none rounded-[.5rem] w-10/12 h-[12rem] bg-white p-2"></textarea>
        <br>
        <button class="px-[2.5rem] py-[.5rem] bg-(--red-800) text-white rounded-[.5rem]">Send</button>
      </div>
      <div class="w-[37rem] h-[25rem] relative">
        <div class="w-11/12 h-[14.5rem] bg-(--gray-200) rounded-[.5rem] absolute top-[5rem] right-0"></div>
        <div class="w-11/12 h-[12rem] bg-(--red-800) rounded-[.5rem] absolute top-[1rem]"></div>
        <img src="../assets/img/homepage2.png" alt="" class="w-[25rem] absolute top-[-5rem] left-[3rem] ">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const top = ref(4 * 16); 
const direction = ref(1); 
const amplitude = 50; 
const speed = 0.25; 

const imageStyle = ref({
  top: top.value + "px",
  transition: "none",
});

const animate = () => {
  top.value += speed * direction.value;

  if (top.value > 4 * 16 + amplitude || top.value < 4 * 16) {
    direction.value *= -1;
  }
  
  

  imageStyle.value.top = top.value + "px";

  requestAnimationFrame(animate);
};

onMounted(() => {
  requestAnimationFrame(animate);
});
</script>
