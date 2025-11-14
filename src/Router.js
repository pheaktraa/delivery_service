import { createWebHistory, createRouter } from 'vue-router'

import Home from './page/Home.vue'

const routes = [
  { path: '/home', component: Home },
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})