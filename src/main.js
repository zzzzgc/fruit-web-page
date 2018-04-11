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

/*
上传地址
上传后返回fileName 文件名
*/
Vue.prototype._uploadFilePath = 'http://localhost:8080/manage/common/upload'
/*
文件下载地址
例如直接访问-> this._downloadFilePath + 文件名
 */
Vue.prototype._downloadFilePath = 'http://localhost:8080/upload/file/'

/* 引入组件 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
