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
import OrderManagementPage from './page/admin/manageorders/index.vue'
import OrderManagementDetailsPage from './page/admin/manageorders/OrderManagementDetailsPage.vue'
import Acceptdeliver from './page/transporter/Acceptdeliver.vue'
import Delivery from './page/transporter/Delivery.vue'
import index from './page/chat/index.vue'
import ProfilePage from './page/ProfilePage.vue'
import driverDashboard from './page/transporter/driverDashboard.vue'
import AcceptDelivery from './page/transporter/AcceptDelivery.vue'
import DriverDeliveryDetails from './page/transporter/DriverDeliveryDetails.vue'
import DriverProfile from './page/transporter/DriverProfile.vue'



const routes = [
  // === PUBLIC ROUTES ===
  { path: '/', component: Landing },
  { path: '/home', component: Home },
  { path: '/auth/login', component: Loginpage },
  { path: '/signup', component: Loginpage },
  { path: '/contact', component: ContactPage },
  { path: '/aboutus', component: AboutPage },
  { path: '/profile', component: ProfilePage},
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
   { path: '/mydeliveries', 
    component: MyDeliveries,
    children: [
      {
        path: 'details',
        component: MyDeliveriesDetails
      }
    ]
  },

  // === ADMIN ROUTES ===
  { path: '/admin/setting', component: SettingPage, meta: { layout: 'dashboard'} },
  { path: '/admin/manageuser', component: ManageUserPage, meta: { layout: 'dashboard'} },
  { path: '/admin/dashboard', component: DashboardPage, meta: { layout: 'dashboard'} },
  { path: '/admin/manageorders',
    component: OrderManagementPage, 
    meta: { layout: 'dashboard' },
    children: [
      {
        path: 'details',
        component: OrderManagementDetailsPage,
        meta: { layout: 'dashboard' }
      }
    ]
  },

  // chat
  { path: '/chat', component: index },
  { path: '/chattransporter', component: index, meta: { layout: 'dashboard' } },
  
  // === TRANSPORTER / DRIVER ROUTES ===
  { path: '/driver/profile', component: DriverProfile, meta: { layout: 'dashboard' } },
  { path: '/driver/acceptdelivery', component: Acceptdeliver, meta: { layout: 'dashboard' } },
  { path: '/driver/delivery', component: Delivery, meta: { layout: 'dashboard' }  },
  { path: '/driver/driverDashboard', component: driverDashboard, meta: { layout: 'dashboard' }  },
  { path: '/driver/accDelivery', component: AcceptDelivery, meta: { layout: 'dashboard' } },
  { path: '/driver/delivery/detail/:id', component: DriverDeliveryDetails, meta: { layout: 'dashboard' } },

]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
  routes,
})