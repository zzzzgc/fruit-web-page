/**
 * 购物车工具类
 * @Author: ZGC
 * @Date Created in 16:48 2018/1/3
 */

/**
 * 添加到购物车 // TODO 购物车模块功能集合
 * @param product 商品对象,需要包含standard_id,buy_num,remark
 */
export function addProduct (product) {
  this.$http.post('/cart/addProduct', product).then((response) => {
    return response
  })
}
