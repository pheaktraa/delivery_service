<template>
  <div class="w-full">
    <apexchart
      type="line"
      width="100%"
      height="200"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// MOCK DATA (no backend)
const series = ref([
  {
    name: 'Orders',
    data: [10, 25, 18, 40, 32, 50, 45] // Mon–Sun
  }
])

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
  grid: {
    borderColor: '#e5e7eb'
  },
  yaxis: {
    labels: { style: { colors: '#6b7280' } }
  },
  tooltip: {
    theme: 'dark'
  }
})
</script>
