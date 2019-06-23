import Vue from 'vue'
import Router from 'vue-router'
// 配置一级路由
import layout from '@/views/layout'
import AppLogin from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: layout,
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/views/home')
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
