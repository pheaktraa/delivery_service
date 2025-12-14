import { createWebHistory, createRouter } from 'vue-router'
import Home from './page/Home.vue'
import Landing from './page/Landing.vue'
import Loginpage from './page/Loginpage.vue'
import ContactPage from './page/ContactPage.vue'
import AboutPage from './page/AboutPage.vue'
import CreateDelivery from './page/createdelivery/index.vue'
import DeliveryDetail from './page/createdelivery/DeliveryDetail.vue'
import SettingPage from './page/admin/SettingPage.vue'
import ManageUserPage from './page/admin/ManageUserPage.vue'
import MyDeliveries from './page/mydeliveries/index.vue'
import MyDeliveriesDetails from './page/mydeliveries/MyDeliveriesDetails.vue'
import DashboardPage from './page/admin/DashboardPage.vue'
import OrderManagementPage from './page/admin/OrderManagementPage.vue'
import Acceptdeliver from './page/transporter/Acceptdeliver.vue'
import Delivery from './page/transporter/Delivery.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/home', component: Home },
  { path: '/auth/login', component: Loginpage },
  { path: '/contact', component: ContactPage },
  { path: '/aboutus', component: AboutPage },
  {
    path: '/createdelivery',
    component: CreateDelivery,
    children: [
      {
        path: 'detail',
        component: DeliveryDetail
      }
    ]
  },
  { path: '/setting', component: SettingPage },
  { path: '/manageuser', component: ManageUserPage },
  { path: '/mydeliveries', 
    component: MyDeliveries,
    children: [
      {
        path: 'details',
        component: MyDeliveriesDetails
      }
    ]
  },
  { path: '/dashboard', component: DashboardPage },
  { path: '/manageorders', component: OrderManagementPage },
  
  // transporter
  { path: '/acceptdelivery', component: Acceptdeliver },
  { path: '/delivery', component: Delivery }
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})