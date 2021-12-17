import { createRouter, createWebHistory} from 'vue-router'


import AuthLayout from  '../layout/auth-layout'
import AdminLayout from '../layout/admin-layout'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/login/login.vue')
  },

  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../views/auth/login/login.vue'),
      },
    ],
  },
  {
    name:'admin',
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        name: 'overview',
        path: 'overview',
        component: () => import('../views/admin/overview/Overview.vue'),
      },
      {
          name:'dataManager',
          path:'dataManager',
          component:() => import('../views/admin/dataCenter/dataManager')
      },
      {
        name:'devDataView',
        path: 'devDataView',
        component:() => import('../views/admin/dataCenter/devDataView')
      },
      {
        name:'devManager',
        path: 'devManager',
        component:() => import('../views/admin/devManager/devManager')
      },
      {
        name:'historyDataView',
        path: 'historyDataView',
        component: () => import('../views/admin/dataCenter/historyDataView')
      },

      {
        name:'devedit',
        path: 'devedit',
        component: () => import('../views/admin/devManager/devEditor')
      },
      {
        name:'userInfoView',
        path:'userInfoView',
        component:()=> import('../views/admin/userManager/userInfoView')
      }


    ],
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
