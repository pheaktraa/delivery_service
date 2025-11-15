import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './Router'
import { createPinia } from 'pinia';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const app = createApp(App)
const pinia = createPinia(); 
app.use(router)
app.mount('#app')
app.use(pinia); 
AOS.init({
  // Global settings for AOS (optional)
  duration: 900,
  once: true,
});
