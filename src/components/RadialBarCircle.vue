<template>
  <div class="w-full">
    <apexchart
      type="radialBar"
      width="100%" 
      height="200"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const series = ref([70])

const chartOptions = ref({
  chart: {
    type: 'radialBar',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#cd1c18'], // end color
      stops: [0, 100]
    }
  },
  colors: ['#66023C'], // start color
  labels: ['Progress'],
})
</script>
