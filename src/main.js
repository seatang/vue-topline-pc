import Vue from 'vue'
import App from './App.vue'
import router from './router'

//  配置 element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置全局公开样式
import './styles/index.less'
import 'nprogress/nprogress.css'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
