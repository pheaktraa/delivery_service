<template>
  <!-- We create a container that stays fixed to the screen -->
  <div 
    id="snow-container" 
    style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999;"
  ></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useSnowfall } from 'vue-snowfall';

// Set up the snow settings here once
const { startSnowflakes, stopSnowflakes } = useSnowfall({

// Tell the hook to put the snow inside our fixed div
    container: '#snow-container', 
    interval: 300,
    minSpeed: 15,
    maxSpeed: 25,
    minSize: 10,
    maxSize: 30,
    color: '#b9e2f5',
    zIndex: 999,
    maxFlakes: 100,
    chaos: 50,
});

onMounted(() => {
  console.log("Snowfall started...");
  startSnowflakes();
});

onBeforeUnmount(() => {
  stopSnowflakes();
});
</script>