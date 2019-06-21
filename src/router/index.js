import Vue from 'vue'
import Router from 'vue-router'
// 配置一级路由
import AppHome from '@/views/home'
import AppLogin from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: AppHome
    },
    {
      name: 'login',
      path: '/login',
      component: AppLogin
    }
  ]
})
