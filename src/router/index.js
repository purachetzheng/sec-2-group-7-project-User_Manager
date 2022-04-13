import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TableManager from '../views/TableManager.vue'
import MyTable from '../views/MyTable.vue'


const history = createWebHistory()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/table-manager/:tableId',
    name: 'TableManager',
    component: TableManager,
  },
  {
    path: '/profile-workbench/:userId',
    name: 'MyTable',
    component: MyTable,
  },
//   {
//     path: '/:catchNotMatchPath(.*)',
//     name: 'NotFound',
//     component: NotFound,
//   }
]

const router = createRouter({ history, routes })
export default router
