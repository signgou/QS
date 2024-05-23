import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/QuestShow',
      name: 'QuestShow',
      component: () => import('../QuestionnaireShow/QusetionnaireShow.vue')//这里写具体哪个组件
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../LogInFace/LoginFace.vue')//这里写具体哪个组件
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../UserCenter/UserCenter.vue'),
      children:[
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../ReAccountFace/ReAccountFace.vue')
    },
    {
      path:'/create',
      name:'create',
      component: () => import('../QuCreateFace/QuCreateFace.vue')
    },
    {
      path:'/QuestShare',
      name:'QuestShare',
      component: () => import('../QuSendFace/QuSendFace.vue')
    },
    {
      path:'/Data',
      name:'DataShow',
      component: () => import('../DataShowFace/DataShow.vue')
    },
  ]
})

export default router