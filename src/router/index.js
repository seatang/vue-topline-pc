/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
// 配置一级路由
import layout from '@/views/layout'
import AppLogin from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [{
      naem: 'layout',
      path: '/',
      component: layout,
      children: [{
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]

    },
    {
      name: 'AppLogin',
      path: 'login',
      component: AppLogin
    }
  ]
})
