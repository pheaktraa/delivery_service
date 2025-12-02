<template>
  <MyDeliveries v-if="route.path !== '/mydeliveries/details'"></MyDeliveries>
  <router-view></router-view>
</template>

<script setup>
import MyDeliveries from "./MyDeliveries.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>