import { createWebHistory, createRouter } from 'vue-router'
import ContactPage from './page/ContactPage.vue'
import Home from './page/Home.vue'
import Landing from './page/Landing.vue'
import Loginpage from './page/Loginpage.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/home', component: Home },
  { path: '/auth/login', component: Loginpage },
  { path: '/contact', component: ContactPage},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})