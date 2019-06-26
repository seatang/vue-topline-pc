import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

//  配置 element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置全局公开样式
import './styles/index.less'
import 'nprogress/nprogress.css'
import {
  getUser
} from '@/utils/auth'

axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'
Vue.use(Element)

// 请求拦截器
axios.interceptors.request.use(config => {
  const user = getUser()
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
