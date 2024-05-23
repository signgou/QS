import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../LogInFace/LoginFace.vue')//这里写具体哪个组件
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../UserCenter/UserCenter.vue'),
      children:[{
        path:'create',
        name:'create',
        component: () => import('../QuCreateFace/QuCreateFace.vue')
      }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../ReAccountFace/ReAccountFace.vue')
    }
  ]
})

export default router
