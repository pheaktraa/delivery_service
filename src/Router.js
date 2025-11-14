import { createWebHistory, createRouter } from 'vue-router'
import ContactPage from './page/ContactPage.vue'
import Home from './page/Home.vue'

const routes = [
  { path: '/home', component: Home },
  { path: '/contact', component: ContactPage},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})