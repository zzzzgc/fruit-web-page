import Vue from 'vue'
import App from './App'
import router from './router'
// import { Lazyload } from 'vant'
import './assets/common.css'
import axiosIntence from './common/axiosIntence'
/* import uploader from 'vue-simple-uploader' */
import uploader from 'vue-easy-uploader'
import Vuex from 'vuex'
// import {initTest} from './common/session'

Vue.use(Vuex)
let store = new Vuex.Store({})
Vue.use(uploader, store)
// Vue.use(Lazyload)
Vue.prototype.$http = axiosIntence // 将http设置到vue组件中
Vue.config.productionTip = false
// initTest(false) // TODO 删除测试代码
/* Vue.use(uploader) */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
