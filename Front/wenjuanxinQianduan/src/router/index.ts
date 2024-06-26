import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/QuestShow/:qnid',
      name: 'QuestShow',
      component: () => import('../QuestionnaireShow/QusetionnaireShow.vue'),
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../LogInFace/LoginFace.vue')//这里写具体哪个组件
    },
    {
      path: '/user/:uid',
      name: 'user',
      component: () => import('../UserCenter/UserCenter.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../ReAccountFace/ReAccountFace.vue')
    },
    {
      path:'/create/:qnid',
      name:'create',
      component: () => import('../QuCreateFace/QuCreateFace.vue')
    },
    {
      path:'/QuestShare/:qnid',
      name:'QuestShare',
      component: () => import('../QuSendFace/QuSendFace.vue')
    },
    {
      path:'/Data/:qnid',
      name:'DataShow',
      component: () => import('../DataShowFace/DataShow.vue')
    },
    {
      path:'/fill/:qnid',
      name:'fill',
      component : () => import('../QnFill/QnFill.vue')
    }, 
    {
      path:'/fillEnd',
      name:'fillEnd',
      component : () => import('../QnFill/QnFillEnd.vue')
    },
    {
      path:'/AdminLogin',
      name:'AdminLogin',
      component : () => import('../LoginAdmin/LoginAdmin.vue')
    },
    {
      path:'/AdminRegister',
      name:'AdminRegister',
      component : () => import('../ReAdmin/ReAdmin.vue')
    },
    {
      path:'/Admin',
      name:'Admin',
      component : () => import('../admin/admin.vue')
    },
  ]
})

export default router
