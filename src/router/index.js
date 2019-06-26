/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
// 配置一级路由
import layout from '@/views/layout'
import AppLogin from '@/views/login'
// 载入第三方包
import nprogress from 'nprogress'
// 载入本地用户信息
import {
  getUser
} from '@/utils/auth.js'

Vue.use(Router)

const router = new Router({
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
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]

    },
    {
      name: 'login',
      path: '/login',
      component: AppLogin
    }
  ]
})
// 开启进度条
router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = getUser()
  if (to.path !== '/login') {
    if (!userInfo) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    if (!userInfo) {
      next()
    } else {
      next({
        name: 'home'
      })
      window.location.reload()
    }
  }
})
// 关闭进度条
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
