<template>
  <Navbar v-if="!['/auth/login'].includes(route.path)"></Navbar>
  <router-view></router-view>
  <Footer v-if="!['/auth/login'].includes(route.path)"></Footer>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
const route = useRoute();

</script>