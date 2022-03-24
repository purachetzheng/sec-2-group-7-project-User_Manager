import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TableManager from '../views/TableManager.vue'

const history = createWebHistory()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/table-manager',
    name: 'TableManager',
    component: TableManager,
  },
//   {
//     path: '/:catchNotMatchPath(.*)',
//     name: 'NotFound',
//     component: NotFound,
//   }
]

const router = createRouter({ history, routes })
export default router
