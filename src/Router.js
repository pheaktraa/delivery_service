import { createWebHistory, createRouter } from 'vue-router'
import Home from './page/Home.vue'
import Landing from './page/Landing.vue'
import Loginpage from './page/Loginpage.vue'
import ContactPage from './page/ContactPage.vue'
import AboutPage from './page/AboutPage.vue'
import CreateDelivery from './page/CreateDelivery.vue'


const routes = [
  { path: '/', component: Landing },
  { path: '/home', component: Home },
  { path: '/auth/login', component: Loginpage },
  { path: '/contact', component: ContactPage},
  { path: '/aboutus', component: AboutPage },
  { path: '/createdelivery', component: CreateDelivery },
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})