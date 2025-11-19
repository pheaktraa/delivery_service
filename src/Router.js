import { createWebHistory, createRouter } from 'vue-router'

import Home from './page/Home.vue'
import Landing from './page/Landing.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/home', component: Home },
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})