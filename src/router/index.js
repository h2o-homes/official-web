import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '../views/Home.vue'
import RoadMap from '../views/RoadMap.vue'
import Airdrop from '../views/Airdrop.vue'
import Tokenomics from '../views/Tokenomics.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect:'home',
        meta: {}
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {}
      },
      {
        path: 'roadmap',
        name: 'RoadMap',
        component: RoadMap,
        meta: {}
      },
      {
        path: 'airdrop',
        name: 'Airdrop',
        component: Airdrop,
        meta: {}
      },
      {
        path: 'tokenomics',
        name: 'Tokenomics',
        component: Tokenomics,
        meta: {}
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
