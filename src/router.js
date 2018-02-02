import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = resolve => require(['./components/HelloWorld'], resolve)
const Home = resolve => require(['./components/Home'], resolve)
const ProductInfo = resolve => require(['./components/product/ProductInfo'], resolve)
const Classify = resolve => require(['./components/Classify'], resolve)
const ProductList = resolve => require(['./components/product/ProductList'], resolve)
const ShoppingCart = resolve => require(['./components/shopping/ShoppingCart'], resolve)
const login = resolve => require(['./components/login/login'], resolve)
const register = resolve => require(['./components/login/Register'], resolve)
const forgetPwd = resolve => require(['./components/login/ForgetPwd'], resolve)
const UpdatePwd = resolve => require(['./components/login/UpdatePwd'], resolve)
const serviceProtocol = resolve => require(['./components/login/ServiceProtocol'], resolve)
const OrderList = resolve => require(['./components/order/OrderList'], resolve)
const PaySuccess = resolve => require(['./components/common/PaySuccess'], resolve)
const orderInfo = resolve => require(['./components/shopping/OrderInfo'], resolve)
const Person = resolve => require(['./components/person/persons'], resolve)
const ShopInfo = resolve => require(['./components/person/ShopInfo'], resolve)
const AuthIdentity = resolve => require(['./components/person/AuthIdentity/AuthIdentity'], resolve)
const PhysicalShop = resolve => require(['./components/person/AuthIdentity/PhysicalShop'], resolve)
const NetSale = resolve => require(['./components/person/AuthIdentity/NetSale'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login', // 登录页面
      name: 'login',
      component: login
    },
    {
      path: '/orderInfo', // 订单确认页面
      name: 'orderInfo',
      component: orderInfo
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/register', // 注册页面
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd', // 忘记密码页面
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/updatePwd', // 修改密码页面
      name: 'UpdatePwd',
      component: UpdatePwd
    },
    {
      path: '/serviceProtocol', // 注册详情页面
      name: 'serviceProtocol',
      component: serviceProtocol
    },
    {
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
    }, {
      path: '/paySuccess', // 注册详情页面
      name: 'PaySuccess',
      component: PaySuccess
    }, {
      path: '/OrderList', // 注册详情页面
      name: 'OrderList',
      component: OrderList
    }, {
      path: '/person', // 我的信息
      name: 'Person',
      component: Person
    }, {
      path: '/shopInfo',
      name: 'ShopInfo',
      component: ShopInfo // 店铺认证页面
    }, {
      path: '/authIdentity', // 实名认证页面
      name: 'AuthIdentity',
      component: AuthIdentity
    }, {
      path: '/physicalShop', // 实体店实名认证
      name: 'PhysicalShop',
      component: PhysicalShop
    }, {
      path: '/netSale', // 网络销售认证
      name: 'NetSale',
      component: NetSale
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // TODO 切换页面后,再切回有缓存的页面时需要设置回原有的
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        console.log('document.body.scrollTop:' + document.body.scrollTop)
        from.meta.savedPosition = document.body.scrollTop
      }
      let ySize = (typeof (to.meta.savedPosition) === 'undefined' ? 0 : to.meta.savedPosition) || 0
      console.log('ySize:' + ySize)
      return { x: 0, y: ySize }
    }
  }
})
