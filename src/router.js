import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = resolve => require(['./components/HelloWorld'], resolve)
const Home = resolve => require(['./components/Home'], resolve)
const ProductInfo = resolve => require(['./components/ProductInfo'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        savedPosition: 0,
        keepAlive: true // 针对不同路由设置缓存
      }
    }, {
      path: '/product/:id',
      name: 'ProductInfo',
      component: ProductInfo
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.info(to)
    console.info(from)
    console.info(savedPosition)
    // console.info(window.scrollY())
    console.info(document.body.scrollTop)
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
