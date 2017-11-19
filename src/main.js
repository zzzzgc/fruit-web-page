import Vue from 'vue'
import App from './App'
import router from './router'
import { Lazyload } from 'vant'
import './assets/common.css'

Vue.use(Lazyload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
