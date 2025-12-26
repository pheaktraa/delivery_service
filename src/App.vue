<!-- <template>
  <Navbar v-if="!['/auth/login'].includes(route.path)"></Navbar>
  <router-view></router-view>
  <Footer v-if="!['/auth/login'].includes(route.path)"></Footer>
</template> -->


<template>
  <div class="min-h-screen flex flex-col">

    <!-- snow -->
    <SnowfallEffect />

    <!-- TOP NAVBAR -->
    <!-- Only shows on public pages (Home, About), hides on Admin/Driver pages -->
    <Navbar v-if="!hidePublicNav"></Navbar>

    <!-- ADMIN/DRIVER SIDEBAR -->
    <!-- Only shows if the router says meta: { layout: 'dashboard' } -->
    <SideBarMenu v-if="isDashboard"></SideBarMenu>

    <!-- MAIN CONTENT AREA -->
    <!-- If Sidebar is visible, we add 'ml-[250px]' (Margin Left) 
      so the content pushes right and doesn't get covered by the sidebar. -->
    <main :class="{ 'ml-[250px]': isDashboard }">
      <router-view></router-view>
    </main>

    <!-- FOOTER -->
    <!-- Hides on Dashboard and Login -->
    <Footer v-if="!hideFooter"></Footer>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import SideBarMenu from './components/SideBarMenu.vue';
import SnowfallEffect from './components/SnowfallEffect.vue';

const route = useRoute();

// CHECK: Is this a Dashboard page (Admin/Driver)?
const isDashboard = computed(() => {
  return route.meta.layout === 'dashboard';
});

// CHECK: Should we hide the Top Navbar?
// Hide it if it's a Dashboard page OR if it's the Login page
const hidePublicNav = computed(() => {
  return isDashboard.value || ['/auth/login', '/signup'].includes(route.path);
});

// CHECK: Should we hide the Footer?
const hideFooter = computed(() => {
  return isDashboard.value || ['/auth/login', '/signup'].includes(route.path);
});

</script>