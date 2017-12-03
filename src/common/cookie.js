// 获取cookie
export function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (name, value, expireSeconds) {
  let expire = ''
  if (expireSeconds !== null) {
    let expireDate = new Date()
    expireDate.setTime(expireDate.getTime() + expireSeconds * 1000)
    expire = ';expires=' + expireDate.toGMTString()
  }
  document.cookie = name + '=' + escape(value) + expire
}

// 删除cookie
export function delCookie (name) {
  setCookie(name, '', -1)
}

// 是否存在某个cookie
export function existCookie (name) {
  return getCookie(name) !== null
}
