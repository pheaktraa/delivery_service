import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './Router'
import { createPinia } from 'pinia';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import VueApexCharts from "vue3-apexcharts"; // vue-version3-apexchart

const app = createApp(App)
const pinia = createPinia(); 

// REGISTER EVERYTHING FIRST
app.use(router);
app.use(pinia); 
app.use(VueApexCharts);

// INITIALIZE EXTERNAL LIBS
AOS.init({
  // Global settings for AOS (optional)
  duration: 900,
  once: true,
});

// MOUNT LAST 
app.mount('#app');