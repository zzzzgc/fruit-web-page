<template>
  <div class="home">
    <!--顶部搜索-->
    <div class="header top-fixed-header">
      <van-search placeholder="请输入商品名称" @search="goSearch" type="showcase"></van-search>
      <div class="left-button"><span>搜索</span><span>登录</span></div>
    </div>
    <div class="content">
      <!--轮播图-->
      <!--<van-swipe auto-play class="banners line-block">-->
        <!--<van-swipe-item v-for="(banner, index) in banners" :key="index">-->
          <!--<a :href="banner.url" target="_blank">-->
            <!--<img :src="banner.img" alt="">-->
          <!--</a>-->
        <!--</van-swipe-item>-->
      <!--</van-swipe>-->
      <div class="line-block">
        <swiper :options="bannerSwiper.swiperOption" :not-next-tick="bannerSwiper.notNextTick">
          <swiper-slide v-for="(banner, index) in banners" :key="index">
            <a :href="banner.url" target="_blank">
              <img :src="banner.img" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!--活动-->
      <div class="activity line-block">
        <table cellspacing="0" cellpadding="20px">
          <tr><td class="first">送66元</td><td>签到免现</td></tr>
        </table>
      </div>
      <!--商品分类-->
      <div class="product-type line-block">
        <table cellspacing="0">
          <tr><td rowspan="2" class="first">低价热销</td><td class="second">进口好货</td></tr>
          <tr><td>国产精品</td></tr>
        </table>
      </div>
      <!--<div class="products line-block">-->
        <!--<van-tabs @click="changeProductTab">-->
          <!--<van-tab title="最常购">-->
            <!--<product-item v-for="(p, index) in products" :productId="p.id" :url="p.url"-->
              <!--:pic="p.pic" :title="p.title" :desc="p.desc"-->
              <!--:buyInfo="p.buyInfo" :price="p.price" :oriPrice="p.oriPrice" :key="p.id"></product-item>-->
          <!--</van-tab>-->
          <!--<van-tab title="今日上新（12小时前）">-->
            <!--<product-item v-for="(p, index) in products" :productId="p.id" :url="p.url"-->
              <!--:pic="p.pic" :title="p.title" :desc="p.desc"-->
              <!--:buyInfo="p.buyInfo" :price="p.price" :oriPrice="p.oriPrice" :key="p.id"></product-item>-->
          <!--</van-tab>-->
        <!--</van-tabs>-->
      <!--</div>-->
      <!--商品-->
      <div class="products line-block">
        <div class="tab-title">
          <div :class="isSelectTab(0)" @click="selectTab(0)">最常购</div>
          <div :class="isSelectTab(1)" @click="selectTab(1)">今日上新（12小时前）</div>
        </div>
        <swiper :options="productSwiper.swiperOption" :not-next-tick="productSwiper.notNextTick" ref="productSwiper">
          <swiper-slide>
            <product-item v-for="(p, index) in products" :productId="p.id" :url="p.url"
                          :pic="p.pic" :title="p.title" :desc="p.desc"
                          :buyInfo="p.buyInfo" :price="p.price" :oriPrice="p.oriPrice" :key="p.id"></product-item>
          </swiper-slide>
          <swiper-slide>
            <product-item v-for="(p, index) in products" v-if="p.id != 1" :productId="p.id" :url="p.url"
                          :pic="p.pic" :title="p.title" :desc="p.desc"
                          :buyInfo="p.buyInfo" :price="p.price" :oriPrice="p.oriPrice" :key="p.id"></product-item>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="bottom-fixed-footer">
      <table>
        <tr>
          <!--<td><van-icon name="wap-home" /><div>首页</div></td>-->
          <!--<td><van-icon name="wap-nav" /><div>分类</div></td>-->
          <!--<td><van-icon name="like" /><div>赚钱</div></td>-->
          <!--<td><van-icon name="cart" /><div>购物车</div></td>-->
          <!--<td><van-icon name="contact" /><div>我的</div></td>-->

          <td><icon scale="1.2" name="home"></icon><div>首页</div></td>
          <td><icon scale="1.2" name="th"></icon><div>分类</div></td>
          <td><icon scale="1.2" name="heart"></icon><div>赚钱</div></td>
          <td><icon scale="1.2" name="shopping-cart"></icon><div>购物车</div></td>
          <td><icon scale="1.2" name="user"></icon><div>我的</div></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
//  import Vue from 'vue'
//, Tab, Tabs
  import { Search } from 'vant'
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/th'
  import 'vue-awesome/icons/heart'
  import 'vue-awesome/icons/shopping-cart'
  import 'vue-awesome/icons/user'
  import Icon from 'vue-awesome/components/Icon'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import ProductItem from './ProductItem'
//  Vue.use(Button)
//  Vue.component(Button.name, Button)
//  Vue.use(Lazyload)

  export default {
    name: 'Home',
    components: {
      ProductItem,
//      [Swipe.name]: Swipe,
//      [SwipeItem.name]: SwipeItem,
      [Search.name]: Search,
//      [Tab.name]: Tab,
//      [Tabs.name]: Tabs,
      Icon,
      swiper,
      swiperSlide
    },
    created: function () {
      console.info('home created')
    },
//    directives: {
//      lazy: Lazyload
//    },
    data () {
      return {
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
        imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
        banners: [
          {url: 'https://youzan.com', img: 'https://img.yzcdn.cn/upload_files/2017/03/15/FvexrWlG_WxtCE9Omo5l27n_mAG_.jpeg'},
          {url: 'https://youzan.com', img: 'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg'}
        ],
        products: [
          {
            id: 1,
            url: 'https://cn.vuejs.org/v2/guide',
            pic: 'https://m.360buyimg.com/n12/jfs/t7534/129/384294096/341045/82f5c2bc/5992767dN7f1b68cd.jpg!q70.jpg',
            title: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
            desc: '30头|硬度可以|甜度适中',
            buyInfo: '本周110家购买',
            price: '￥168.3/箱',
            oriPrice: '￥170.3/箱'
          }, {
            id: 2,
            url: 'https://cn.vuejs.org/v2/guide',
            pic: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3274/255/5964761354/180636/ae32c44/5899a140N189f9e9a.jpg!q50.jpg',
            title: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤 孕妇水果2500g 红香蕉 红皮香蕉5斤 孕妇水果2500g',
            desc: '30头|硬度可以|甜度适中',
            buyInfo: '本周110家购买',
            price: '￥168.3/箱',
            oriPrice: '￥170.3/箱'
          }, {
            id: 3,
            url: 'https://cn.vuejs.org/v2/guide',
            pic: 'https://m.360buyimg.com/n12/jfs/t5701/13/2547305966/121523/2c59804c/5931774aN090bef86.jpg!q70.jpg',
            title: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
            desc: '30头|硬度可以|甜度适中',
            buyInfo: '本周110家购买',
            price: '￥168.3/箱',
            oriPrice: '￥170.3/箱'
          }, {
            id: 4,
            url: 'https://cn.vuejs.org/v2/guide',
            pic: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t8011/225/1657108972/589852/c39de36b/59bcd4adN217d06f0.jpg!q50.jpg',
            title: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤前岩山 福建土楼特产水果美人蕉',
            desc: '30头|硬度可以|甜度适中',
            buyInfo: '本周110家购买',
            price: '￥168.3/箱',
            oriPrice: '￥170.3/箱'
          }
        ]
      }
    },
    computed: {
      swiper: function () {
        return this.$refs.productSwiper.swiper
      }
    },
    methods: {
      goSearch: function (val) {
        console.info('搜索商品关键字为：%s', val)
      },
      changeProductTab: function (index) {
        console.info('选择的tab Index为：%s', index)
      },
      isSelectTab: function (index) {
        return index === this.productSwiper.selectIndex ? 'select' : ''
      },
      selectTab: function (index) {
        this.swiper.slideTo(index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: auto;*/
  }
  .header .left-button {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    height: 100%;
    line-height: 45px;
    font-size: 15px;
    color: #8a8a8a;
    span {
      margin-right: 10px;
    }
  }
  .bottom-fixed-footer table {
    width: 100%;
    height: 100%;
    text-align: center;
    div {
      font-size: 10px;
    }
    i {
      font-size: 16px;
    }
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
    .activity {
    }
    .activity,.product-type {
      >table {
        width: 100%;
        text-align: center;
        .first {
          border-right: 2px solid white;
        }
        .second {
          border-bottom: 2px solid white;
        }
        td {
          width: 50%;
          background: #e5e5e5;
          padding: 10px 0;
        }
      }
    }
    .products {
      .tab-title {
        white-space: nowrap;
        overflow: hidden;
        >div {
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          padding: 10px 0;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        >div.select {
          border-bottom: 1px solid;
          color: red;
        }
      }
    }
  }
</style>

<style>
  .van-search {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    padding-right: 100px;
    background: white;
  }
  .product-item {
    border-top: 1px solid #EEE;
  }

  .swiper-pagination-bullet {
    margin: 0 5px;
  }
</style>
