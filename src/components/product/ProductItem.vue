<template>
  <div class="product-item" style="border-radius: 20px;box-shadow: 0 1px 10px #888888">
    <div class="pic" id="product-item-img">
      <img v-lazy.product-item-img="product.img" width="120px" height="120px">
      <!--<img v-lazy.product-item-img="product.img" width="120px" height="120px">-->
    </div>
    <router-link :to="productUrl" class="info">
      <div class="title"><p style="display:inline;color: red">[{{product.country != '中国' ? '进口' : '国产'}}]</p>{{product.name}}</div>
      <div class="desc">{{product.standard_name}}|{{product.sub_title}}</div>
    </router-link>
    <div class="product-bottom">
      <div v-if="isLogin()">
        <router-link :to="productUrl">
          <div class="buy-num">本周{{product.week_sell_num}}家购买</div>
          <div class="price-info">
            <span class="price">￥{{product.sell_price}}/{{product.measure_unit}}</span>
            <span class="ori-price">￥{{product.original_price}}/{{product.measure_unit}}</span>
          </div>
        </router-link>
      </div>

      <div v-else @click="toLogin" class="hide-price">登录查看价格</div>
      <mt-button @click="addToCart()" class="add-to-cart">加入购物车</mt-button>
      <!--<div class="add-to-cart" @click="addToCart()">加入购物车</div>-->
      <!--<van-button class="add-to-cart" type="default" size="small">加入购物车</van-button>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Mint from 'mint-ui'
  import session from '../../mixins/sessionMixin'
  import {addCartProducts} from '../../common/session'
  import {toast} from '../../common/utils'
  import Tag from 'vant/packages/tab/index'
  import 'vant/lib/vant-css/index.css'

  // Vue.use(Tag)
  // import {lazyload} from 'mint-ui'
  //  import {ToastPlugin} from 'vux'
  //  Vue.use(ToastPlugin)
  Vue.use(Mint)

  export default {
    name: 'product-item',
    mixins: [session],
    components: {
      Tag
//      [Button.name]: Button
//      ToastPlugin
    },
    props: ['product'],
    created: function () {
    },
    data: function () {
      return {
//        isLogin: false
      }
    },
    mounted: function () {
      // console.log(this.product)
    },
    methods: {
      addToCart: function () {
        if (this.isLogin()) {
          // 新增或累加商品
          this.$http.post('/cart/addProduct', {standard_id: this.product.standard_id}).then((response) => {
            toast('添加购物车成功')
          })
        } else {
          addCartProducts(this.product.standard_id)
          toast('添加购物车成功')
        }
      },
      toLogin: function () {
        this.$router.push('login')
      }
    },
    computed: {
      productUrl: function () {
        return '/product/' + this.product.id + '-' + this.product.standard_id
      }
    }
  }
</script>

<style scoped lang="scss">

  .product-item {
    position: relative;
    background-color: white;
    margin:10px;
  }

  .pic {
    background-color: #F3F3F3;
    position: absolute;
    margin-left: 2px;
    margin-top: 2px;
    width: 110px;
    height: 110px;
    img {
      // border-radius: 20px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    color: black;
    display: block;
    box-sizing: border-box;
    padding: 10px 10px 3px 125px;
    /*padding-left: 125px;*/
    height: 70px;
    line-height: 23px;
    font-size: 15px;
    > div {
      /*margin-bottom: 5px;*/
    }
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
    /*>.desc.buy {*/
    /*-webkit-line-clamp: 1;*/
    /*}*/
  }

  .product-bottom {
    position: relative;
    margin: 5px 10px 0 125px;
    /*margin-bottom: 0;*/
    height: 40px;
    .hide-price {
      color: red;
      padding: 8px 0;
    }
    .buy-num {
      font-size: 13px;
      color: #626262;
    }
    .price-info {
      position: absolute;
      font-size: 13px;
      .price {
        color: red;
        font-size: 15px;
      }
      .ori-price {
        text-decoration: line-through;
        font-size: 12px;
        color: #959595;
        margin-left: 10px;
      }
    }
    .add-to-cart {
      /*border: 1px solid #000;*/
      border-radius: 10px;
      position: absolute;
      right: 0;
      top: -10px;
      height: 40px;
      padding: 0px 9px;
      font-size: 15px;
      color: #fff;
      background: #169BD5;
    }
  }
</style>
