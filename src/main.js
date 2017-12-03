import Vue from 'vue'
import App from './App'
import router from './router'
// import { Lazyload } from 'vant'
import './assets/common.css'
import axiosIntence from './common/axiosIntence'
import {initTest} from './common/session'

// Vue.use(Lazyload)
Vue.prototype.$http = axiosIntence // 将http设置到vue组件中
Vue.config.productionTip = false
initTest(true) // TODO 删除测试代码

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
