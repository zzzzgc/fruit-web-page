<template>
  <div class="shopping-cart" id="shopping-cart">
    <div class="top-fixed-header header">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div>购物车</div>
      <div class="edit" @click="edit()">{{isEdit ? '取消' : '编辑'}}</div>
    </div>
    <!--<TitleInfo titleContent="购物车"></TitleInfo>-->

    <div class="products">
      <!--<product-item v-for="(p, index) in products" :product="p" :key="p.id"></product-item>-->
      <div v-if="products.length > 0" v-for="(product, index) in products" :key="product.id" class="product-item">

        <!-- 商品图片 -->
        <router-link :to="'/product/' + product.id + '-' + product.standard_id" class="pic">
          <img v-lazy.shopping-cart="product.img">
        </router-link>


        <!-- 商品信息 -->
        <div class="info" @click="choice(index)">
          <div class="operate">
            <div class="check" v-show="product.check">
              <icon scale="1.0" name="check"></icon>
            </div>
            <div class="close" v-show="isEdit" @click="remove(index)">
              <icon scale="1.0" name="close"></icon>
            </div>
          </div>
          <div class="title">{{product.name}}</div>
          <div class="desc">{{product.standard_name}}</div>
        </div>

        <!-- 价格和按钮 -->
        <div class="product-bottom">
          <!-- 价格 -->
          <div class="price-info" v-if="isLogin()" @click="choice(index)">
            <span class="price">￥{{product.sell_price}}</span>/{{product.measure_unit}}
          </div>
          <div v-else @click="toLogin" class="hide-price">登录查看价格</div>

          <div class="modify-num">
            <van-stepper v-model="product.buy_num" :max="1000" @change="update(index)"/>
          </div>
        </div>

        <!--<span>备注信息</span>-->
        <div class="remark">
          <!--备注:<textarea v-model="product.remark" placeholder="填写备注信息" @blur="update(index)"></textarea>-->
          <span>备注:</span><input type="text" style="display: inline" v-model="product.remark" placeholder="可填写备注信息" @blur="update(index)"/>
        </div>

      </div>

      <div v-if="products.length === 0" class="no-cart-product">暂无商品，
        <router-link to="/" class="go-shopping">去看看</router-link>
      </div>

    </div>
    <table class="pay-order">
      <tr v-if="isLogin()">
        <td>
          <input type="checkbox" id="checkAll" v-model="checkAll">
          <label for="checkAll">全选</label>
        </td>
        <td class="price">
          <div>合计：<span class="total-price">￥{{totalPrice}}</span></div>
          <!--<div class="total-pay">总额：￥{{totalPay}} 立减：￥{{discountMoney}}</div>-->
        </td>
        <td class="go-pay" @click="goPay">去结算</td>
      </tr>
      <tr v-else>
        <mt-button type='danger' size='large' @click='toLogin'>登录</mt-button>
      </tr>
    </table>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import {Stepper} from 'vant'
  import BottomMenu from '../common/BottomMenu'
  import TitleInfo from '../common/TitleInfo'
  // import {this.$toast} from 'mint-ui'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/angle-left'
  import 'vue-awesome/icons/check'
  import 'vue-awesome/icons/close'

  import 'mint-ui/lib/style.css'
  import session from '../../mixins/sessionMixin'
  import {getCartProducts, removeCartProduct, setCartProducts} from '../../common/session'

  import Vue from 'vue'
  import Mint from 'mint-ui'

  Vue.use(Mint)

  export default {
    name: 'ProductList',
    mixins: [session],
    components: {
      [Stepper.name]: Stepper,
      BottomMenu,
      TitleInfo,
      Icon
    },
    props: [],
    created: function () {
    },
    mounted: function () {
      window.scrollTo(100, 100)
      this.getProducts()
    },
    activated: function () {
    },
    deactivated: function () {
    },
    data: function () {
      return {
        pageNum: 1,
        products: [],
//        totalPrice: 0,
//        totalPay: 198.00,
//        discountMoney: 10.00,
        checkAll: false, // 是否全选
        isEdit: false // 是否为编辑模式
      }
    },
    methods: {
      getProducts: function () {
        // 获取购物车
        if (this.isLogin()) {
          // 登陆的
          this._getServerProduct()
        } else {
          // 未登录的
          this._getLocalProduct()
        }
      },
      _getLocalProduct: function () {
        // 获取localStorage中的商品信息
        let products = getCartProducts()
        let productStandardIds = []
        for (let p of products) {
          productStandardIds.push(p.standard_id)
        }
        // 浏览器本地仅保留商品规格ID、购买数量、备注信息，其他信息从数据库取（一个防止商品变更时保持同步，另一个是考虑客户端存储）
        this.$http.post('/product/listStandardIds', {ids: productStandardIds}).then(
          (response) => {
            let cartProduct = []
            for (let p of response.data) {
              for (let product of products) {
                if (p.standard_id === product.standard_id) {
                  cartProduct.push(Object.assign({}, product, p, {check: true}))
                }
              }
            }
            this.products = cartProduct
            if (this.isEdit && this.products.length === 0) { // 如果没有购物车商品，则取消编辑状态
              this.edit()
            }
          }
        )
      },
      _getServerProduct: function () {
        // 获取服务器中的本人的购物车
        this.$http.post('/cart/getProduct', {pageNum: this.pageNum}).then((response) => {
          console.log(response)
          for (let product of response.data) {
            product.check = true
          }
          this.products = response.data
          // this.pageNum++ // 下次取数据，从下一页开始
        })
      },
      edit: function () {
        // 设置为选中和为选中
        this.isEdit = !this.isEdit
      },
      choice: function (index) { // 选中商品后
        if (this.isEdit) {
          return
        }
        if (this.products[index].check) {
          this.products[index].check = false
        } else {
          this.$set(this.products[index], 'check', true)
        }
        // let allCheck = true
        // for (let p of this.products) {
        //   if (!p.check) {
        //     allCheck = false
        //   }
        // }
        // this.checkAll = allCheck
      },
      remove: function (index) {
        let productStandardId = this.products[index].standard_id
        if (this.isLogin()) {
          // 删除数据库中该用户的购物车商品
          this.$http.post('/cart/removeProduct', {ids: [productStandardId]}).then((response) => {
            this.$toast('删除成功,删除的productStandardId:' + productStandardId)
            this.getProducts()
          }, (response) => {
            this.$toast('删除失败,删除的productStandardId:' + productStandardId)
          })
        } else {
          removeCartProduct(productStandardId)
        }
      },
      update: function (index) {
        let product = {
          standard_id: this.products[index].standard_id,
          buy_num: this.products[index].buy_num,
          remark: this.products[index].remark
        }
        if (this.isLogin()) {
          // 覆盖信息,和添加信息
          this.$http.post('/cart/updateProduct', product).then((response) => {
          })
        } else {
          setCartProducts(product)
        }
      },
      goPay: function () {
        // 获取所有选中的商品规格的id
        let standardIds = []
        for (let p of this.products) {
          if (p.check) {
            standardIds.push(p.standard_id)
          }
        }
        if (standardIds == null || standardIds.length < 1) {
          this.$toast({
            message: '请选择需要下单的商品哦'
          })
          return
        }
        this.$http.post('/order/createOrder', {'standardIds': standardIds}).then(
          (res) => {
            // TODO 临时改为query传参
            this.$router.push({path: '/orderInfo', query: {'orderIds': [res.data]}})
          }
        )
      },
      toLogin: function () {
        this.$router.push('login')
      }
    },
    computed: {
      totalPrice: function () {
        let price = 0.00
        for (let p of this.products) {
          if (p.check) {
            // 普通小数计算可能会丢失精度,所以转换整数运算,这里默认精度为小数点后一位
            price = (price * 10 + (p.sell_price * 10 * p.buy_num)) / 10
            // price += p.sell_price * p.buy_num
          }
        }
        return price
      }
    },
    watch: {
      checkAll: function (val, oldVal) { // 此处只能使用监听的方式，更新商品列表，因为搜索后还是在当前页面，所以不会执行mounted
        if (val) {
          for (let p of this.products) {
            p.check = true
          }
        } else {
          for (let p of this.products) {
            p.check = false
          }
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back, .edit {
      position: absolute;
      top: 10px;
    }
    .back {
      left: 20px;
    }
    .edit {
      right: 20px;
      font-size: 17px;
    }
  }

  .products {
    padding: 44px 0 88px;
    box-sizing: border-box;
    .product-item {
      position: relative;
      background: white;
      /*padding: 5px 0;*/
      /*margin: 10px 10px;*/
      overflow: hidden;
      margin: 20px 0;
      /*border-radius: 15px;*/
      /*box-shadow: 0 5px 15px #888888;*/
    }
    .pic {
      margin: 0 5px;
      position: absolute;
      z-index: 1;
      width: 100px;
      height: 100px;
      img {
        border-radius: 10px;
        background: #F3F3F3;
        width: 100%;
        height: 100px;
      }
    }
    .info {
      position: relative;
      color: black;
      display: block;
      box-sizing: border-box;
      padding: 10px 10px 3px 125px;
      height: 50px;
      line-height: 23px;
      font-size: 15px;
      .title {
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 17px;
        font-weight: 500;
      }
      > .desc {
        display: -webkit-box;
        font-size: 13px;
        color: #626262;
        line-height: 18px;
        margin-top: 5px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .operate {
        position: absolute;
        right: -88px;
        top: -58px;
        width: 120px;
        height: 93px;
        line-height: 135px;
        > div {
          position: absolute;
          color: white;
          width: 100%;
          height: 100%;
          border-radius: 55%;
          padding-left: 15px;
        }
        .check {
          background: green;
        }
        .close {
          background: red;
        }
      }
    }
    .product-bottom {
      position: relative;
      margin: 5px 10px 0 125px;
      /*margin-bottom: 0;*/
      height: 45px;
      .hide-price {
        color: red;
        padding: 8px 0;
      }
      > .price-info {
        position: absolute;
        top: 6px;
        .price {
          font-weight: bold;
          color: red;
          font-size: 17px;
        }
      }
      > .modify-num {
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
    .remark {
      font-size: 14px;
      color: #767676;
      input {
        border: 0;
        font-size: 18px;
      }
    }
    .no-cart-product {
      text-align: center;
      margin: 20px 0;
      color: #979797;
      .go-shopping {
        color: blue;
      }
    }
  }

  .pay-order {
    position: fixed;
    bottom: 44px;
    z-index: 1;
    width: 100%;
    height: 44px;
    background: white;
    border-top: 1px solid #EEE;
    /*box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);*/
    /*.price {*/
    /*line-height: inherit;*/
    /*padding: 0 10px;*/
    /*}*/
    .total-pay {
      font-size: 14px;
    }
    .go-pay {
      width: 150px;
      text-align: center;
      background: red;
      color: white;
    }
    .login {
      text-align: center;
    }
    .total-price {
      font-weight: bold;
      color: red;
      font-size: 19px;
    }
  }
</style>

<style>
  .shopping-cart .van-stepper {
    display: inline-block;
    margin-left: 10px;
  }
</style>
