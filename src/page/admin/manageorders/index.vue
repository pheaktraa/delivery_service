<template>
  <OrderManagementPage v-if="route.path !== '/admin/manageorders/details'"></OrderManagementPage>
  <router-view></router-view>
</template>

<script setup>
import OrderManagementPage from './OrderManagementPage.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>