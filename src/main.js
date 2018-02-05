import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/common.css'
import axiosIntence from './common/axiosIntence'
import VueLazyload from 'vue-lazyload'
import Mint from 'mint-ui'
// import {initTest} from './common/session'

/* 导入插件 */
Vue.use(Mint)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  preLoadTop: 0.0,
  error: require('../src/images/loading/find.png'),
  loading: require('../src/images/loading/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

/* 修改设置 */
// initTest(false) //
Vue.prototype.$http = axiosIntence // 将http设置到vue组件中
Vue.config.productionTip = false

/* 引入组件 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
