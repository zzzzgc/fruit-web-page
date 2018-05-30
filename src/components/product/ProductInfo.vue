<template>
  <div class="product-info">
    <div class="top-fixed-header title">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title-desc">商品</div>
      <div class="home" @click="$router.push('/')">
        <icon scale="1.5" name="home"></icon>
      </div>
    </div>
    <div class="content">
      <swiper :options="bannerSwiper.swiperOption" :not-next-tick="bannerSwiper.notNextTick">
        <swiper-slide v-for="(item, index) in productImgs" :key="index">
          <img :src="item" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!--<div>商品ID为:{{$route.params.id}}  -  {{$route.params.standardId}}</div>-->
      <div class="line-block price">
        <span class="area" v-if="product.isForeign">进口</span>{{product.name}}
        <div v-if="isLogin()"><span class="sell-price">￥{{selectStandard.sell_price}}</span><span class="original-price">￥{{selectStandard.original_price}}</span>
          <div class="desc"><span>{{selectStandard.sub_title}}</span><span class="buy-num">本周{{product.week_sell_num}}家购买</span></div>
        </div>
        <div v-else @click="toLogin" style="color: red">登录查看价格</div>
      </div>
      <div class="line-block buy-info">
        <ul>
          <li>质检保障</li>
          <li>冷链配送</li>
          <li>售后保障</li>
        </ul>
      </div>
      <div class="line-block standard">
        <table>
          <tr>
            <td>规格：</td>
            <td>
            <span v-for="(item, index) in standards" v-bind:class="[item.id === selectStandard.id ? 'selected' : '']" @click="choiceStandard(index)" :key="index">
              {{item.name}}
            </span>
            </td>
          </tr>
          <tr>
            <td>数量：</td>
            <td>
              <van-stepper v-model="buyNum" :max="1000"></van-stepper>
              <!--<x-number v-model="buyNum" :min="1" :max="1000"></x-number>-->
            </td>
          </tr>
        </table>
        <!--<div><span class="field-name">规格：</span><span class="select">30头/箱</span><span>26头/箱</span><span>24头/箱</span></div>-->
        <!--<div><span class="field-name">数量：</span><van-stepper v-model="buyNum" /></div>-->
      </div>
      <div class="line-block send-goods"><span></span>指猴全国发货&售后</div>
      <div class="line-block product-info">
        <table>
          <tr>
            <td class="widthDefaultTwo">产地</td>
            <td>{{product.country}} {{product.province}}</td>
          </tr>
          <tr>
            <td class="widthDefaultTwo">品牌</td>
            <td>{{product.brand}}</td>
          </tr>
          <tr>
            <td class="widthDefaultTwo">特征</td>
            <td>{{product.fruit_des}}</td>
          </tr>
        </table>
      </div>
      <div class="time">行情<span>{{marketUpdate}}</span></div>
      <div class="line-block other-info">
        <table>
          <tr>
            <td  class="widthDefaultOne">平台建议</td>
            <td>{{market.buy_suggest}}</td>
          </tr>
          <tr>
            <td class="widthDefaultOne">市场反馈</td>
            <td>{{marketFeedback}}</td>
          </tr>
          <tr>
            <td class="widthDefaultOne">供&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp货</td>
            <td>{{supplyGoods}}</td>
          </tr>
          <tr>
            <td  class="widthDefaultOne">果质特点</td>
            <td>{{market.fruit_des}}</td>
          </tr>
          <tr>
            <td class="widthDefaultOne">服务支持</td>
            <td>{{market.support_des}}</td>
          </tr>
          <tr>
            <td  class="widthDefaultOne">其&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp他</td>
            <td>{{market.remark}}</td>
          </tr>
        </table>
        <img v-for="(item, index) in marketImgs" class="other-img" :src="item" :key="index"/>
      </div>
    </div>
    <div class="bottom-fixed-footer">
      <div class="my-cart" @click='toShoppingCart'>
        <icon scale="1.5" name="shopping-cart"></icon>
        <div>购物车</div>
      </div>
      <div class="pay-now" @click='payNow'>立即购买</div>
      <div class="add-cart" @click='addCart'>加入购物车</div>
    </div>
  </div>
</template>

<script>
  import {Stepper} from 'vant'
  import {Toast} from 'mint-ui'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import 'vue-awesome/icons/angle-left'
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/shopping-cart'
  import session from '../../mixins/sessionMixin'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    name: 'product-info',
    mixins: [session],
    components: {
      [Stepper.name]: Stepper,
      Icon,
      swiper,
      swiperSlide
    },
    props: ['id', 'standardId'], // 目前只能是字符串类型，不能是int
    created: function () {
    },
    data: function () {
      return {
        product: {
          isForeign: true, // 是否为进口
          name: '海季牌泰国金枕榴莲',
          week_sell_num: 10,
          country: '泰国',
          province: '',
          brand: '海季牌',
          fruit_des: '口味柔和，入门首选'
        },
        selectStandard: {}, // 当前选中的规格
        standards: [{
          id: 1,
          original_price: 340.75,
          sell_price: 350.00,
          name: '30头/箱',
          sub_title: '硬度可以 | 甜度适中333'
        }, {
          id: 2,
          original_price: 240.15,
          sell_price: 250.05,
          name: '20头/箱',
          sub_title: '硬度可以 | 甜度适中222'
        }, {
          id: 3,
          original_price: 140.75,
          sell_price: 150.00,
          name: '10头/箱',
          sub_title: '硬度可以 | 甜度适中111'
        }],
        market: {
          buy_suggest: '最近热销的榴莲品牌',
          market_feedback: 2,
          supply_goods: 1,
          fruit_des: '品质稳定，香糯味浓',
          support_des: '死包包赔',
          remark: '毛重约35斤。原价350，薄款价340'
        },
        marketImgs: [
          'https://m.360buyimg.com/n12/jfs/t5851/56/9123571032/303833/d234e010/5982cb1fNc0786acb.jpg!q70.jpg',
          'https://m.360buyimg.com/n12/s734x734_jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg!q70.jpg.webp',
          'https://m.360buyimg.com/n12/s734x734_jfs/t5917/222/7992045266/433794/ba2c2835/5982cb20N0d89acb7.jpg!q70.jpg.webp'
        ],
        buyNum: 1,
        marketUpdate: '今天 12:01',
        productImgs: [
          'https://img.yzcdn.cn/upload_files/2017/03/15/FvexrWlG_WxtCE9Omo5l27n_mAG_.jpeg',
          'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg'
        ],
        bannerSwiper: {
          notNextTick: true,
          swiperOption: {
            autoplay: 3000,
            pagination: '.swiper-pagination'
          }
        }
      }
    },
    mounted: function () {
      this.getProduct()
    },
    methods: {
      back: function () {
        history.back()
      },
      choiceStandard: function (index) {
        this.selectStandard = this.standards[index]
      },
      getProduct: function () {
        this.$http.post('/product/get', {productId: this.id}).then((response) => {
          this.product = Object.assign({}, response.data.product, {isForeign: response.data.product.country !== '中国'})
          this.standards = response.data.standards
          this.market = response.data.market || {}
          this.marketImgs = response.data.market_img
          this.productImgs = response.data.product_img
          let selectedStandardId = this.standardId ? parseInt(this.standardId) : -1
          let selectedIndex = 0
          for (let i in this.standards) {
            if (this.standards[i].id === selectedStandardId ||
              (selectedStandardId === -1 && this.standards[i].is_default === 1)) {
              selectedIndex = i
            }
          }
          this.selectStandard = this.standards[selectedIndex]
        })
      },
      payNow: function () {
        // 立即购买
        // console.log('product:')
        // console.log(this.product)
        // console.log('standards:')
        // console.log(this.standards)
        // console.log('selectStandard:')
        // console.log(this.selectStandard)
        // console.log('market:')
        // console.log(this.market)
        // console.log('marketImgs:')
        // console.log(this.marketImgs)
        // console.log('productImgs:')
        // console.log(this.productImgs)

        // 后倒入的数据会覆盖前导入的数据this.selectStandard的id被this.product的id覆盖了,所以换一个名字导入selectStandard的id
        let order = Object.assign({}, this.selectStandard, this.product, {standard_id: this.selectStandard.id, standard_name: this.selectStandard.name, buyNum: this.buyNum})
        // console.log('order:')
        // console.log(order)
        this.$http.post('/order/directCreateOrder', order).then(
          // 成功函数
          (response) => {
            console.log(response)
            console.log(response.data)
            // 支付确认页面
            this.$router.push({path: '/orderInfo', query: {'orderIds': [response.data]}})
          },
          // 失败函数
          (response) => {

          }
        )
      },
      addCart: function () {
        let carProduct = {
          'standard_id': this.selectStandard.id,
          'buy_num': this.buyNum,
          'remark': ''
        }
        if (this.isLogin()) {
          // 累加商品,需求的要求
          this.$http.post('/cart/addProduct', carProduct).then((response) => {
            Toast('添加成功')
          })
        } else {
          this.setCartProducts(carProduct)
          Toast('添加成功')
        }
      },
      toShoppingCart: function () {
        this.$router.push({path: '/cart'})
      }
    },
    computed: {
      marketFeedback: function () {
        if (this.market.market_feedback === 1) {
          return '供货平稳'
        } else if (this.market.market_feedback === 2) {
          return '抢购'
        } else {
          return ''
        }
      },
      supplyGoods: function () {
        if (this.market.supply_goods === 1) {
          return '充足'
        } else if (this.market.supply_goods === 2) {
          return '紧张'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .widthDefaultOne{
    width:85px;
  }
  .widthDefaultTwo{
    width:50px;
  }
  .product-info {
    position: relative;
    /*.title-action {*/
    /*position: absolute;*/
    /*.back {*/
    /*padding: 5px 10px;*/
    /*}*/
    /*}*/
  }

  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back, .home {
      position: absolute;
      top: 10px;
    }
    .back {
      left: 20px;
    }
    .home {
      right: 20px;
    }
  }

  .content {
    padding: 44px 0 35px;
  }

  .line-block {
    padding: 10px;
    background: white;
    line-height: 30px;
    margin-bottom: 10px;
  }

  .price {
    font-size: 18px;
    .area {
      background: red;
      color: white;
      font-size: 13px;
      padding: 2px 5px;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .sell-price {
      font-size: 21px;
      color: red;
    }
    .original-price {
      text-decoration: line-through;
      margin: 0 10px;
      color: #acacac;
    }
    .desc {
      color: #acacac;
      font-size: 12px;
      .buy-num {
        float: right;
      }
    }
  }

  .buy-info {
    ul {
      display: -webkit-box;
      list-style: disc;
      /*margin-left: 20px;*/
    }
    ul:before {
      content: '专业采购';
      display: inline-block;
    }
    li {
      margin-left: 30px;
      font-size: 12px;
    }
  }

  .standard {
    font-size: 14px;
    span {
      color: black;
      border: 1px solid #acacac;
      margin: 10px;
      padding: 3px 5px;
      border-radius: 3px;
    }
    span.selected {
      color: red;
      border: 1px solid red;
    }
  }

  .time, .line-block > table tr td:first-child {
    color: #acacac;
  }

  .product-info {
    margin-bottom: 0;
  }

  .send-goods {
    font-size: 15px;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #acacac;
      border: 1px solid #757575;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .time {
    background: white;
    border-top: 1px solid #e6e6e6;
    padding: 10px 14px 0;
    span {
      font-size: 11px;
      margin-left: 20px;
    }
  }

  .product-info, .other-info {
    font-size: 14px;
    table tr td:first-child {
      padding-right: 10px;
    }
  }

  .other-info {
    .other-img {
      width: 47%;
      margin: 0 1%;
    }
  }

  .bottom-fixed-footer {
    > div {
      display: inline-block;
      height: 100%;
      line-height: 44px;
    }
    .add-cart, .pay-now {
      float: right;
      padding: 0 20px;
      color: white;
    }
    .my-cart {
      font-size: 13px;
      line-height: 17px;
      margin: 0 0 0 20px;
    }
    .add-cart {
      background: #F79506;
    }
    .pay-now {
      background: #EF302E;
    }
  }
</style>
<style>
  .product-info .van-stepper {
    display: inline-block;
    margin-left: 10px;
  }

  .product-info .swiper-container {
    height: 230px;
  }
</style>
