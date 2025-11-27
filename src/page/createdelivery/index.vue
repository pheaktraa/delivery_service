<template>
  <CreateDelivery v-if="!['/createdelivery/detail'].includes(route.path)"></CreateDelivery>
  <router-view></router-view>
</template>

<script setup>
import CreateDelivery from "./CreateDelivery.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
