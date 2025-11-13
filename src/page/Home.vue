<template>
  <div class="max-w-[80rem] h-full m-auto">
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
        <button class="bg-[var(--red-800)] text-white px-4 py-2 rounded-[.5rem]">
          Create Delivery
        </button>
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
    <div class="w-100 h-[100rem]">

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
