import { createWebHistory, createRouter } from 'vue-router'
import ContactPage from './page/ContactPage.vue'
import Home from './page/Home.vue'
import Loginpage from './page/Loginpage.vue'

const routes = [
  { path: '/home', component: Home },
  { path: '/auth/login', component: Loginpage },
  { path: '/contact', componect: ContactPage},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})