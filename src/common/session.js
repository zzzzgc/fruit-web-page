// 考虑使用cookie保存用户登录标识，因为sessionStorage是针对某个标签页有效的，如果关闭当前标签页，会丢失用户sessionStorage信息
// localStorage又是永久保存的，推出时需手动清除数据，所以选择使用cookie结合localStorage保存用户信息

import {getCookie, setCookie, delCookie, existCookie} from './cookie'

const cookieUserInfoKey = 'cookie_login_user_info'
// const local_session_user_info_key = 's_user_info'
const localSessionCartProductKey = 'local_session_cart_product_key'

// 初始化测试数据，如：登录信息、购物车数据
export function initTest (isDelete) {
  if (isDelete) {
    logout()
    // removeCartProduct(1)
    // removeCartProduct(2)
    // removeCartProduct(3)
    // localStorage.removeItem(localSessionCartProductKey)
  } else {
    setLoginUser({id: 1, name: 'test'})
    setCartProducts({standard_id: 1, buy_num: 2, remark: '测试remark'})
    setCartProducts({standard_id: 2, buy_num: 2, remark: '测试remark'})
    setCartProducts({standard_id: 3, buy_num: 2, remark: '测试remark'})
  }
}

// 判断用户是否已登录
export function isLogin () {
  // return localStorage.hasOwnProperty('userInfo')
  return existCookie(cookieUserInfoKey)
}

// 跳转登录
export function toLogin () {
  this.$router.push({path: '/login'})
}

// 获取登录用户信息
export function getLoginUserInfo () {
  // if (isLogin()) {
  //   return localStorage.getItem(local_session_user_info_key)
  // }
  let userStr = getCookie(cookieUserInfoKey)
  if (userStr == null) {
    return null
  } else {
    return JSON.parse(userStr)
  }
}
// 设置登录用户信息
export function setLoginUser (userInfo) {
  setCookie(cookieUserInfoKey, JSON.stringify(userInfo))
  // localStorage.setItem(local_session_user_info_key, userInfo)
}
// 清除用户登录信息
export function logout () {
  delCookie(cookieUserInfoKey)
  // localStorage.removeItem(local_session_user_info_key)
}
// 获取购物车商品，为商品规格（不是数据库商品）
export function getCartProducts () {
  let productsStr = localStorage.getItem(localSessionCartProductKey)
  if (productsStr === null) {
    return []
  } else {
    return JSON.parse(productsStr)
  }
}
// 删除购物车商品
export function removeCartProduct (id) {
  let products = getCartProducts()
  for (let i = 0; i < products.length; i++) {
    if (products[i].standard_id === id) {
      products.splice(i, 1)
      break
    }
  }
  localStorage.setItem(localSessionCartProductKey, JSON.stringify(products))
}
// 清空购物车
export function removeCartProductAll () {
  localStorage.removeItem(localSessionCartProductKey)
}
// 添加购物车商品，如果存在则数量加一，如果不存在，则添加一个当前商品
export function addCartProducts (id) {
  let products = getCartProducts()
  let founded = false
  for (let p of products) {
    if (p.standard_id === id) {
      p.buy_num++
      founded = true
      break
    }
  }
  if (!founded) {
    products.push({standard_id: id, buy_num: 1})
  }
  localStorage.setItem(localSessionCartProductKey, JSON.stringify(products))
}
// 设置购物车商品，如果有则替换，没有则添加
export function setCartProducts (product) {
  let products = getCartProducts()
  let founded = false
  for (let p of products) {
    if (p.standard_id === product.standard_id) {
      // p = product // 不能直接赋值，无法改变products中的值属性
      Object.assign(p, product)
      founded = true
      break
    }
  }
  if (!founded) {
    products.push(product)
  }
  localStorage.setItem(localSessionCartProductKey, JSON.stringify(products))
}
