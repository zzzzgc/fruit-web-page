<template>
  <div class="shopping-cart">
    <div class="top-fixed-header header">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div>购物车</div>
      <div class="edit" @click="edit()">{{isEdit ? '取消' : '编辑'}}</div>
    </div>
    <div class="products">
      <!--<product-item v-for="(p, index) in products" :product="p" :key="p.id"></product-item>-->
      <div v-if="products.length > 0" v-for="(product, index) in products" :key="product.id" class="product-item">

        <!-- 商品图片 -->
        <router-link :to="'/product/' + product.id + '-' + product.standard_id" class="pic">
          <img :src="product.img" alt="">
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
          <div class="price-info" v-if="isLogin()">
            <span class="price">￥{{product.sell_price}}</span>/{{product.measure_unit}}
          </div>
          <div v-else class="hide-price">登录查看价格</div>

          <div class="modify-num">
            <van-stepper v-model="product.buy_num" :max="1000" @change="update(index)"/>
          </div>
        </div>

        <!--<span>备注信息</span>-->
        <div class="remark">
          <input v-model="product.remark" placeholder="填写备注信息" @blur="update(index)"/>
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
        <!--<div style="width:100%;height:38px;line-height: 38px;color:white;background-color:deepskyblue;border-radius:3px;text-align:center;">登录</div>-->
      </tr>
    </table>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import {Stepper} from 'vant'
  import BottomMenu from '../common/BottomMenu'
  import { Toast } from 'mint-ui'
  import 'vue-awesome/icons/angle-left'
  import 'vue-awesome/icons/check'
  import 'vue-awesome/icons/close'
  import Icon from 'vue-awesome/components/Icon'
  import MtButton from 'mint-ui/packages/button/src/button'
  import 'mint-ui/lib/style.css'
  import session from '../../mixins/sessionMixin'
  import {getCartProducts, removeCartProduct, setCartProducts} from '../../common/session'

  export default {
    name: 'ProductList',
    mixins: [session],
    components: {
      MtButton,
      [Stepper.name]: Stepper,
      BottomMenu,
      Icon
    },
    props: [],
    created: function () {
    },
    mounted: function () {
      this.getProducts()
    },
    data () {
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
        this.$http.post('/product/listStandardIds', {ids: productStandardIds}).then((response) => {
          let cartProduct = []
          for (let p of response.data) {
            for (let product of products) {
              if (p.standard_id === product.standard_id) {
                cartProduct.push(Object.assign({}, product, p))
              }
            }
          }
          this.products = cartProduct
          if (this.isEdit && this.products.length === 0) { // 如果没有购物车商品，则取消编辑状态
            this.edit()
          }
        })
      },
      _getServerProduct: function () {
        // 获取服务器中的本人的购物车
        this.$http.post('/cart/getProduct', {pageNum: this.pageNum}).then((response) => {
          this.products = response.data
          this.pageNum++ // 下次取数据，从下一页开始
        })
      },
      edit: function () {
        if (this.isEdit) {
          this.isEdit = false
        } else {
          this.isEdit = true
        }
//        this.isEdit = !this.isEdit
      },
      choice: function (index) {
        if (this.isEdit) {
          return
        }
        if (this.products[index].check) {
          this.products[index].check = false
        } else {
          this.$set(this.products[index], 'check', true)
//          this.products[index].check = true
        }
      },
      remove: function (index) {
        let productStandardId = this.products[index].standard_id
        if (this.isLogin()) {
          // 删除数据库中该用户的购物车商品
          this.$http.post('/cart/removeProduct', {ids: [productStandardId]}).then((response) => {
          })
        } else {
          removeCartProduct(productStandardId)
        }
        this.getProducts()
      },
      update: function (index) {
        let product = {
          standard_id: this.products[index].standard_id,
          buy_num: this.products[index].buy_num,
          remark: this.products[index].remark
        }
        if (this.isLogin()) {
          // 更新或添加数据库中该用户的购物车商品
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
        console.log('size:' + standardIds.length)
        if (standardIds == null || standardIds.length < 1) {
          Toast({
            message: '请选择需要下单的商品哦'
          })
          return
        }
        this.$http.post('/order/createOrder', {'standardIds': standardIds}).then((res) => {
          this.$router.push({path: '/orderInfo', query: { 'orderId': res.data }})
        },
        (res) => {
          console.log(res)
          console.log('返回的数据:' + res.data)
          this.$router.push({path: '/orderInfo', query: { 'orderId': res.data }})
        })
      }
    },
    computed: {
      totalPrice: function () {
        let price = 0
        for (let p of this.products) {
          if (p.check) {
            price += p.sell_price
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
      padding: 5px 0;
      border-top: 1px solid #EEE;
      overflow: hidden;
    }
    .pic {
      position: absolute;
      z-index: 1;
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      position: relative;
      color: black;
      display: block;
      box-sizing: border-box;
      padding: 10px 10px 3px 125px;
      height: 70px;
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
      font-size: 15px;
      color: #767676;
      border-top: 1px solid #EEE;
      input {
        width: 100%;
        border: 0;
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
