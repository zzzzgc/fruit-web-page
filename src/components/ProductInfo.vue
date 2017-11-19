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
        <swiper-slide v-for="(banner, index) in banners" :key="index">
          <a :href="banner.url" target="_blank">
            <img :src="banner.img" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!--<div>商品ID为:{{$route.params.id}}</div>-->
      <div class="line-block price">
        <span class="area">进口</span>海季牌泰国金枕榴莲
        <div><span class="sell-price">￥340.70</span><span class="original-price">￥350.00</span></div>
        <div class="desc"><span>硬度可以 | 甜度适中</span><span class="buy-num">本周110家购买</span></div>
      </div>
      <div class="line-block buy-info"><ul><li>质检保障</li><li>冷链配送</li><li>售后保障</li></ul></div>
      <div class="line-block standard">
        <table>
          <tr><td>规格：</td><td>
            <span v-bind:class="[standard === 1 ? 'selected' : '']" @click="standard = 1">30头/箱</span>
            <span v-bind:class="[standard === 2 ? 'selected' : '']" @click="standard = 2">26头/箱</span>
            <span v-bind:class="[standard === 3 ? 'selected' : '']" @click="standard = 3">24头/箱</span>
          </td></tr>
          <tr><td>数量：</td><td><van-stepper v-model="num" /></td></tr>
        </table>
        <!--<div><span class="field-name">规格：</span><span class="select">30头/箱</span><span>26头/箱</span><span>24头/箱</span></div>-->
        <!--<div><span class="field-name">数量：</span><van-stepper v-model="num" /></div>-->
      </div>
      <div class="line-block send-goods"><span></span>指猴全国发货&售后</div>
      <div class="line-block product-info">
        <table>
          <tr><td>产地</td><td>泰国</td></tr>
          <tr><td>品牌</td><td>海季牌</td></tr>
          <tr><td>特征</td><td>口味柔和，入门首选</td></tr>
        </table>
      </div>
      <div class="time">行情<span>今天 12:01</span></div>
      <div class="line-block other-info">
        <table>
          <tr><td>平台建议</td><td>最近热销的榴莲品牌</td></tr>
          <tr><td>市场反馈</td><td>抢购</td></tr>
          <tr><td>供&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp货</td><td>充足</td></tr>
          <tr><td>果质特点</td><td>品质稳定，香糯味浓</td></tr>
          <tr><td>服务支持</td><td>死包包赔</td></tr>
          <tr><td>其&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp他</td><td>毛重约35斤。原价350，薄款价340 </td></tr>
        </table>
        <img class="other-img" src="https://m.360buyimg.com/n12/jfs/t5851/56/9123571032/303833/d234e010/5982cb1fNc0786acb.jpg!q70.jpg"/>
        <img class="other-img" src="https://m.360buyimg.com/n12/s734x734_jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg!q70.jpg.webp"/>
        <img class="other-img" src="https://m.360buyimg.com/n12/s734x734_jfs/t5917/222/7992045266/433794/ba2c2835/5982cb20N0d89acb7.jpg!q70.jpg.webp"/>
      </div>
    </div>
    <div class="bottom-fixed-footer">
      <div class="my-cart"><icon scale="1.5" name="shopping-cart"></icon><div>购物车</div></div>
      <div class="pay-now">立即购买</div>
      <div class="add-cart">加入购物车</div>
    </div>
  </div>
</template>

<script>
  import { Stepper } from 'vant'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import 'vue-awesome/icons/angle-left'
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/shopping-cart'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    name: 'product-info',
    components: {
      [Stepper.name]: Stepper,
      Icon,
      swiper,
      swiperSlide
    },
    props: ['id'],
    created: function () {
      console.info('product-info created')
    },
    data: function () {
      return {
        num: 1,
        standard: 1,
        banners: [
          {url: 'https://youzan.com', img: 'https://img.yzcdn.cn/upload_files/2017/03/15/FvexrWlG_WxtCE9Omo5l27n_mAG_.jpeg'},
          {url: 'https://youzan.com', img: 'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg'}
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
    },
    methods: {
      back: function () {
        history.back()
      },
      goHome: function () {
        console.info('goHome')
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-info {
    position: relative;
    .title-action {
      position: absolute;
      .back {
        padding: 5px 10px;
      }
    }
  }
  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back,.home {
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
  .time,.line-block>table tr td:first-child {
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
  .product-info,.other-info {
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
    >div {
      display: inline-block;
      height: 100%;
      line-height: 44px;
    }
    .add-cart,.pay-now {
      float: right;
      padding: 0 20px;
      color: white;
    }
    .my-cart {
      font-size: 13px;
      line-height: 17px;
      margin: 0 0 0 20px;
    }
    .add-cart{
      background: #F79506;
    }
    .pay-now {
      background: #EF302E;
    }
  }
</style>
<style>
  .van-stepper {
    display: inline-block;
    margin-left: 10px;
  }
</style>
