import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = resolve => require(['./components/HelloWorld'], resolve)
const Home = resolve => require(['./components/Home'], resolve)
const ProductInfo = resolve => require(['./components/ProductInfo'], resolve)
const Classify = resolve => require(['./components/Classify'], resolve)
const ProductList = resolve => require(['./components/ProductList'], resolve)
const ShoppingCart = resolve => require(['./components/ShoppingCart'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/', // 首页
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        savedPosition: 0,
        keepAlive: true // 针对不同路由设置缓存
      }
    }, {
      path: '/product/list/:params?', // 商品列表页
      // alias: '/product/list',
      // alias: ['/product/list', '/product/list/:type', '/product/list/:type-:groupType'], // 商品列表页
      name: 'ProductList',
      component: ProductList,
      // props: true // 如果组件有接受prop，则此处需为true
      props: (route) => {
        let props = {}
        if (route.params.params) {
          let paramsArray = route.params.params.split('-')
          if (paramsArray.length > 0) {
            props.type = paramsArray[0]
          }
          if (paramsArray.length > 1) {
            props.groupType = paramsArray[1]
          }
          if (paramsArray.length > 2) {
            props.recommendType = paramsArray[2]
          }
        }
        if (route.query.keyword) {
          props.searchKeyword = route.query.keyword
        }
        return props
      }
    }, {
      path: '/product/:params', // 商品详情页
      // path: '/product/:id(-:standardId)?', // 商品详情页
      name: 'ProductInfo',
      component: ProductInfo,
      props: (route) => {
        let props = {}
        let paramsArray = route.params.params.split('-')
        if (paramsArray.length > 0) {
          props.id = paramsArray[0]
        }
        if (paramsArray.length > 1) {
          props.standardId = paramsArray[1]
        }
        return props
      }
    }, {
      path: '/classify', // 商品类型页
      name: 'Classify',
      component: Classify
    }, {
      path: '/cart', // 购物车
      name: 'ShoppingCart',
      component: ShoppingCart
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // console.info(to)
    // console.info(from)
    // console.info(savedPosition)
    // console.info(window.scrollY())
    // console.info(document.body.scrollTop)
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
