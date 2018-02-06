// 校验手机号码
export function validatePhone (phone) {
  var flag = false
  var pattern = /^1[34578]\d{9}$/
  if (pattern.test(phone)) {
    flag = true
  }
  return flag
}
// 校验商铺名字，中文+数字
export function validateChineseAndNum (chineseAndNum) {
  var flag = false
  var regex = new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[0-9_]){1,20}$')
  if (regex.test(chineseAndNum)) {
    flag = true
  }
  return flag
}
// 校验正整数
export function validatePositiveNum (num) {
  var flag = false
  var pattern = /^[1-9]\d*$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验负整数
export function validateMinusNum (num) {
  var flag = false
  var pattern = /^-[1-9]\d*$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验正数
export function validateNum (num) {
  var flag = false
  var pattern = /^-?[1-9]\d*$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验非负整数
export function validateNotMinusNum (num) {
  var flag = false
  var pattern = /^[1-9]\d*|0$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验非正整数
export function validateNotPositiveNum (num) {
  var flag = false
  var pattern = /^-[1-9]\d*|0$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验正浮点数
export function validateFloatPositiveNum (num) {
  var flag = false
  var pattern = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验负浮点数
export function validateFloatMinusNum (num) {
  var flag = false
  var pattern = /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验浮点数
export function validateFloatNum (num) {
  var flag = false
  var pattern = /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验非负浮点数（正浮点数 + 0）
export function validateNotFloatMinusNum (num) {
  var flag = false
  var pattern = /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// 校验匹配非正浮点数（负浮点数 + 0）
export function validateNotFloatPositiveNum (num) {
  var flag = false
  var pattern = /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/
  if (pattern.test(num)) {
    flag = true
  }
  return flag
}
// -------------------------
// 校验Email地址
export function validateEmailAddress (address) {
  var flag = false
  var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (pattern.test(address)) {
    flag = true
  }
  return flag
}
// 校验身份证号(18位)
export function validateIDCardBy18 (idcard) {
  var flag = false
  var pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (pattern.test(idcard)) {
    flag = true
  }
  return flag
}
// 校验身份证号(15位)
export function validateIDCardBy15 (idcard) {
  var flag = false
  var pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (pattern.test(idcard)) {
    flag = true
  }
  return flag
}
// 校验字符串的长度
export function validateStrLength (str) {
  var flag = false
  // eval("var re = /\\d{4}" + splitChar + "\\d{2}$/;");
  // eval('var pattern = /^.{' + beginLength + ', ' + endLength + '}$/')
  // var pattern = new RegExp('^[a-zA-Z0-9]{' + beginLength + ', ' + endLength + '}$')
  var pattern = /^.{6,18}$/
  if (pattern.test(str)) {
    flag = true
  }
  return flag
}
