<template>
  <div class="home" id="home">
    <!--<div class="test-container">-->
    <!--<div class="test">-->

    <!--</div></div>-->
    <!--顶部搜索-->
    <top-search></top-search>

    <div class="content">
      <!--轮播图-->
      <div class="banner line-block">
        <swiper :options="bannerSwiper.swiperOption" :not-next-tick="bannerSwiper.notNextTick">
          <swiper-slide v-for="(banner, index) in banners" :key="index">
            <a :href="banner.click_url" target="_blank">
              <img v-lazy.home="banner.img_url" :alt="banner.click_url">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 支付提醒 -->
      <div v-if="totalOrderInfo.order_count" class="pay-notify line-block">
        <div v-if="isLogin()">
          您有待支付订单{{totalOrderInfo.order_count}}个，共计:￥{{totalOrderInfo.total_money}}元
          <router-link to="/orderList?selected=one" class="pay">确认付款</router-link>
        </div>
        <div v-else>
          您有待支付订单{{totalOrderInfo.order_count}}个,请登陆后下单
          <router-link to="/login" class="pay">登录</router-link>
        </div>
      </div>
      <!--活动-->
      <!--<div class="activity line-block">-->
      <!--<table cellspacing="0" cellpadding="20px">-->
      <!--<tr><td class="first">送66元</td><td>签到免现</td></tr>-->
      <!--</table>-->
      <!--</div>-->
      <!--商品分类-->
      <div class="product-type line-block">
        <table cellspacing="0">
          <tr>
            <td rowspan="2" class="first">
              <router-link to="/product/list/0-0-1">低价热销</router-link>
            </td>
            <td class="second">
              <router-link to="/product/list/0-0-3"
                           style="color: white;font-size:26px;font-family: STSong,Georgia,Serif;">进口好货
              </router-link>
            </td>
            <td style="background: url('../images/homeIcon/智利车厘子-z.jpg')"></td>
          </tr>
          <tr>
            <td class="third">
              <router-link to="/product/list/0-0-5"
                           style=" color: white;font-size:26px;font-family: STSong,Georgia,Serif;">国产精品
              </router-link>
            </td>
          </tr>
        </table>
      </div>
      <!--商品-->
      <div class="products line-block">
        <div class="tab-title">
          <div :class="isSelectTab(0)" @click="selectTab(0)">最常购</div>
          <div :class="isSelectTab(1)" @click="selectTab(1)">今日上新（{{latestPublish}}）</div>
        </div>
        <!--<swiper :options="productSwiper.swiperOption" :not-next-tick="productSwiper.notNextTick" ref="productSwiper">-->
        <!--<swiper-slide>-->
        <!--<product-item v-for="(p, index) in productsBuy" :product="p" :key="p.id"></product-item>-->
        <!--</swiper-slide>-->
        <!--<swiper-slide>-->
        <!--<product-item v-for="(p, index) in productsNew" :product="p" :key="p.id"></product-item>-->
        <!--</swiper-slide>-->
        <!--</swiper>-->
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="5">
          <swiper :options="productSwiper.swiperOption" :not-next-tick="productSwiper.notNextTick" ref="productSwiper">
            <swiper-slide>
              <product-item v-for="(p, index) in productsBuy" :product="p" :key="p.id"></product-item>
            </swiper-slide>
            <swiper-slide>
              <product-item v-for="(p, index) in productsNew" :product="p" :key="p.id"></product-item>
            </swiper-slide>
          </swiper>
        </ul>
        <p v-if="loading" class="page-infinite-loading" style="margin-left:48%;">
          <mt-spinner type="fading-circle" color="#333">
          </mt-spinner>
        </p>
      </div>
    </div>
    <bottom-menu></bottom-menu>
  </div>
</template>


<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import ProductItem from './product/ProductItem'
  import * as moment from 'moment'
  import TopSearch from './common/TopSearch'
  import BottomMenu from './common/BottomMenu'
  import {isLogin, getCartProducts} from '../common/session'

  import Vue from 'vue'
  import Mint from 'mint-ui'

  Vue.use(Mint)

  export default {
    name: 'Home',
    components: {
      ProductItem,
      swiper,
      swiperSlide,
      TopSearch,
      BottomMenu
    },
    created: function () {
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        // 登录后主页是缓存的,所以需要刷新页面重新加载
        if (from.fullPath === '/login') {
          window.location.reload()
        }
      })
    },
    mounted: function () {
      // this.$router.beforeUpdate((to, from, next) => {
      //   console.log(to)
      //   console.log(from)
      //   console.log(next)
      // })
      this.getBanner()
      this.getBuyProduct()
      this.getNewProduct()
      this.getTotalOrderInfo()
    },
    data: function () {
      return {
        totalOrderInfo: {
          order_count: 0,
          total_money: 0
        },
        loading: false,
        loadSelectIndex: 0,
        productSwiper: {
          notNextTick: true,
          swiperOption: {
            // swiper options 所有的配置同swiper官方api配置
//          autoplay: 3000,
//          direction: 'vertical',
//          grabCursor: true,
            setWrapperSize: true,
            autoHeight: true,
//          pagination: '.swiper-pagination',
//          paginationClickable: true,
//          prevButton: '.swiper-button-prev',
//          nextButton: '.swiper-button-next',
//          scrollbar: '.swiper-scrollbar',
//          mousewheelControl: true,
//          observeParents: true,
            // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
            debugger: true,
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onTransitionStart: (swiper) => {
//              console.log(swiper)
              this.productSwiper.selectIndex = swiper.activeIndex
            }
          },
          selectIndex: 0
        },
        bannerSwiper: {
          notNextTick: true,
          swiperOption: {
            autoplay: 3000,
//          direction: 'vertical',
//          grabCursor: true,
//            setWrapperSize: true,
//            autoHeight: true,
            pagination: '.swiper-pagination',
//          paginationClickable: true,
//          prevButton: '.swiper-button-prev',
//          nextButton: '.swiper-button-next',
//          scrollbar: '.swiper-scrollbar',
//          mousewheelControl: true,
//          observeParents: true,
            // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
//            debugger: true,
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onTransitionStart: (swiper) => {
            }
          }
        },
        banners: [
          {
            click_url: 'https://youzan.com',
            img_url: 'https://img.yzcdn.cn/upload_files/2017/03/15/FvexrWlG_WxtCE9Omo5l27n_mAG_.jpeg'
          },
          {
            click_url: 'https://youzan.com',
            img_url: 'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg'
          }
        ],
        productsBuy: [
          {
            id: 1,
            standard_id: 1,
            img: 'https://m.360buyimg.com/n12/jfs/t7534/129/384294096/341045/82f5c2bc/5992767dN7f1b68cd.jpg!q70.jpg',
            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
            standard_name: '30头',
            sub_title: '硬度可以|甜度适中',
            week_sell_num: 10,
            sell_price: 168.3,
            original_price: 170.3,
            measure_unit: '箱'
          }, {
            id: 2,
            standard_id: 5,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3274/255/5964761354/180636/ae32c44/5899a140N189f9e9a.jpg!q50.jpg',
            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤 孕妇水果2500g 红香蕉 红皮香蕉5斤 孕妇水果2500g',
            standard_name: '30头',
            sub_title: '硬度可以|甜度适中',
            week_sell_num: 10,
            sell_price: 168.3,
            original_price: 170.3,
            measure_unit: '箱'
          }, {
            id: 3,
            standard_id: 8,
            img: 'https://m.360buyimg.com/n12/jfs/t5701/13/2547305966/121523/2c59804c/5931774aN090bef86.jpg!q70.jpg',
            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
            standard_name: '30头',
            sub_title: '硬度可以|甜度适中',
            week_sell_num: 10,
            sell_price: 168.3,
            original_price: 170.3,
            measure_unit: '箱'
          }, {
            id: 4,
            standard_id: 11,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t8011/225/1657108972/589852/c39de36b/59bcd4adN217d06f0.jpg!q50.jpg',
            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤前岩山 福建土楼特产水果美人蕉',
            standard_name: '30头',
            sub_title: '硬度可以|甜度适中',
            week_sell_num: 10,
            sell_price: 168.3,
            original_price: 170.3,
            measure_unit: '箱'
          }
        ],
        productsNew: [],
        latestPublish: '12小时前'
      }
    },
    computed: {
      swiper: function () {
        return this.$refs.productSwiper.swiper
      }
    },
    methods: {
      isLogin: isLogin,
      loadMore: function () {
        this.loading = true
        setTimeout(() => {
          if (this.loadSelectIndex === 0) {
            this.$http.post('/product/listBuy', {pageSize: this.productsBuy.length + 5}).then((response) => {
              this.productsBuy = response.data
              // let last = this.productsBuy[this.productsBuy.length - 1]
              // let last = this.productsBuy[response.data.length - 1]
              // for (let i = 1; i <= 5; i++) {
              //   // this.$http.post('/product/listBuy', {pageNum: last + 10}).then((response) => {
              //   //   this.productsBuy = response.data
              //   // })
              //   this.productsBuy.push(last + i)
              // }
            })
          } else {
            this.$http.post('/product/listNew', {pageSize: this.productsNew.length + 5}).then((response) => {
              this.productsNew = response.data
              if (this.productsNew.length > 0) {
                let latestUpdateTime = moment(this.productsNew[0].update_time)
                let nowTime = moment()
                if (latestUpdateTime.isAfter(nowTime.format('YYYY-MM-DD'))) { // 今天发布显示，发布的小时:分钟
                  this.latestPublish = latestUpdateTime.format('HH:mm')
                } else { // 今天之前发布的
                  let hours = nowTime.diff(latestUpdateTime, 'hours')
                  if (hours < 12) { // 相隔的时间大于12个小时，显示12小时前，小于12小时，显示XX小时前
                    this.latestPublish = hours + '小时前'
                  }
                }
              }
            })
            // let last = this.productsNew[this.productsNew.length - 1]
            // for (let i = 1; i <= 5; i++) {
            //   this.productsNew.push(last + i)
            // }
          }
          this.loading = false
        }, 2500)
      },
      getTotalOrderInfo: function () {
        if (this.isLogin()) {
          this.$http.post('/order/getOrderCount').then((response) => {
            this.totalOrderInfo = response.data
          })
        } else {
          let localCartProducts = getCartProducts()
          console.log(localCartProducts)
          this.totalOrderInfo.order_count = localCartProducts.length
          this.totalOrderInfo.total_money = '请登录后查看'.toString()
        }
      },
      getBanner: function () {
        this.$http.post('/banner/groupItem', {groupKey: 'GROUP_HOME'}).then((response) => {
          this.banners = response.data
        })
      },
      getBuyProduct: function () {
        this.$http.post('/product/listBuy').then((response) => {
          this.productsBuy = response.data
          console.log('productsBuy')
          console.log(this.productsBuy)
        })
      },
      getNewProduct: function () {
        this.$http.post('/product/listNew').then((response) => {
          this.productsNew = response.data
          if (this.productsNew.length > 0) {
            let latestUpdateTime = moment(this.productsNew[0].update_time)
            let nowTime = moment()
            if (latestUpdateTime.isAfter(nowTime.format('YYYY-MM-DD'))) { // 今天发布显示，发布的小时:分钟
              this.latestPublish = latestUpdateTime.format('HH:mm')
            } else { // 今天之前发布的
              let hours = nowTime.diff(latestUpdateTime, 'hours')
              if (hours < 12) { // 相隔的时间大于12个小时，显示12小时前，小于12小时，显示XX小时前
                this.latestPublish = hours + '小时前'
              }
            }
          }
          console.log('productsNew')
          console.log(this.productsNew)
        })
      },
      changeProductTab: function (index) {
        console.info('选择的tab Index为：%s', index)
      },
      isSelectTab: function (index) {
        return index === this.productSwiper.selectIndex ? 'select' : ''
      },
      selectTab: function (index) {
        this.loadSelectIndex = index
        this.swiper.slideTo(index)
      }
    }
  }
</script>
<style>
  html {
    line-height: normal;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: auto;*/
  }

  .test {
    width: 100%;
    height: 1000px;
    background: url('../images/homeIcon/智利车厘子-z.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 40px;
  }

  .content {
    /*overflow: auto;*/
    padding: 44px 0;
    box-sizing: border-box;
    /*height: 100%;*/
    .line-block {
      margin-bottom: 5px;
      box-sizing: border-box;
      overflow-y: hidden;
      background: white;
    }
    .pay-notify {
      position: relative;
      /*padding: 5px;*/
      font-size: 12px;
      height: 34px;
      line-height: 25px;
      padding: 6px 5px;
      /*line-height: 30px;*/
      .pay {
        position: absolute;
        /*font-size: 15px;*/
        /*line-height: 22px;*/
        right: 10px;
        top: 4px;
        line-height: initial;
        color: #949494;
        border: 1px solid;
        border-radius: 3px;
        padding: 4px 8px;
      }
    }
    .activity, .product-type {
      > table {
        width: 100%;
        text-align: center;
        height: 150px;
        .first {
          border-right: 2px solid white;
          background: url("../images/homeIcon/不知火丑橘-z.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          a {
            padding: 60px 0;
            color: white;
            font-size: 26px;
            font-family: STSong, Georgia, Serif;
          }
        }
        .second {
          border-bottom: 2px solid white;
          border-right: 2px solid white;
          background: url("../images/homeIcon/智利车厘子-z.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .third {
          background: url("../images/homeIcon/齐峰翠香猕猴桃-z.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        td {
          width: 50%;
          /* background: #e5e5e5; */
          /*padding: 10px 0;*/
          a {
            display: block;
            padding: 26px 0;
          }
        }
      }
    }
    .products {
      .tab-title {
        white-space: nowrap;
        overflow: hidden;
        > div {
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          padding: 10px 0;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > div.select {
          border-bottom: 1px solid;
          color: red;
        }
      }
    }
  }
</style>

<style>
  .home .swiper-pagination-bullet {
    margin: 0 5px;
  }

  .home .banner .swiper-container {
    height: 230px;
  }
</style>
