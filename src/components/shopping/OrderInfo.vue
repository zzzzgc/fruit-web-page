<template>
  <div class="order-info">
    <!--TopBar-->
    <!--<div class="top-fixed-header header">-->
    <!--<div class="back" @click="$router.go(-1)">-->
    <!--<icon scale="1.6" name="angle-left"></icon>-->
    <!--</div>-->
    <!--<div class="title">获取的数据</div>-->
    <!--</div>-->
    <TitleInfo titleContent="填写订单"></TitleInfo>

    <!--content-->
    <div class="content">
      <div class="goods_info">
        <table>
          <tr>
            <td>配送时间:</td>
            <td>次日08:00--10:00</td>
          </tr>
          <tr>
            <td>配送方式:</td>
            <td>市场车</td>
          </tr>
          <tr>
            <td>收 货 人:</td>
            <td>张小姐 12329090000</td>
          </tr>
          <tr>
            <td>收货地址:</td>
            <td>贵州省贵阳市（小件都要捆一下）</td>
          </tr>
        </table>
      </div>
      <!--<hr>-->
      <div class="products">
        <div v-for="(product, index) in product_info.products" :key="product.id">
          <div class="product">
            <img :src='product.img' alt="">
            <span class="top_left_str">[{{product.country =='中国'?'国产':'进口'}}]{{product.product_name}}</span>
            <span class="sub_str">{{product.product_standard_name}}</span>
            <span class="lower_right_str"><span
              style="color: red;">￥{{product.sell_price}}</span> X {{product.num}}{{product.measure_unit}}</span>
          </div>
        </div>
      </div>

      <!--<hr>-->
      <span class="count_str"></span>
      <table class="order_detail">
        <tr>
          <td></td>
          <td style="color: #000">共{{countNum}}件</td>
        </tr>
        <tr>
          <td>商品金额:</td>
          <td>￥{{countPrice}}</td>
        </tr>
        <tr>
          <td>物 流 费:</td>
          <td>发货后按实际产生费用收取</td>
        </tr>
      </table>

    </div>
    <!--底栏-->
    <table class="bottom_bar" style="position: fixed;
    bottom: 44px;
    z-index: 1;
    width: 100%;
    height: 44px;
    background: white;">
      <tr>
        <td style="z-index: 2;text-align: right;color: red;">实付款: ￥{{this.countPrice}}</td>
        <td style="z-index: 2;width: 40%;background-color: red;text-align: center;color: #fff;">
          <mt-button name="submit" type='danger' @click="getPay" size='large'>提交订单</mt-button>
        </td>
      </tr>
    </table>
    <!--<mt-tabbar  v-model="selected">-->
    <!--<mt-tab-item >实付款</mt-tab-item>-->
    <!--<mt-tab-item >提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->

    <!--<mt-tabbar style="position: fixed;height: 50px;" v-model="selected">-->
    <!--<mt-tab-item style="text-align: right">实付款</mt-tab-item>-->
    <!--<mt-tab-item style="text-align: center;background-color: red">提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <!--<mt-tabbar style="position: fixed;height: 50px;" v-model="selected">-->
    <!--<mt-tab-item style="text-align: right">实付款</mt-tab-item>-->
    <!--<mt-tab-item style="text-align: center;background-color: red;">提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <bottom-menu></bottom-menu>

  </div>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/angle-left'
  import MtTabbar from '../../../node_modules/mint-ui/packages/tabbar/src/tabbar.vue'
  import MtTabItem from '../../../node_modules/mint-ui/packages/tab-item/src/tab-item.vue'
  import BottomMenu from '../common/BottomMenu'
  import OrderInfoList from './OrderInfoList'
  import TitleInfo from '../common/TitleInfo'

  export default {
    name: 'orderInfo',
    computed: {
      countNum: function () {
        // 商品总数
        let count = 0
        console.log(count)
        for (let product of this.products) {
          count += product.num
        }
        return count
      },
      countPrice: function () {
        // 商品总金额
        let price = 0.0
        for (let product of this.products) {
          price += (product.num * 1.0) * (product.sell_price * 1.0)

          console.log('价格:')
          console.log(price)
        }
        return price
      }
    },
    data: function () {
      return {
        selected: true,
        orderId: '',
        product_info: {
          products: [
            {
              img: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
              id: 1,
              country: '中国',
              product_name: '天山雪莲',
              measure_unit: '箱',
              product_standard_name: '1朵',
              sell_price: 999.00,
              num: 27
            },
            {
              img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
              id: 2,
              country: '美国',
              product_name: '牛油果',
              measure_unit: '箱',
              product_standard_name: '12个',
              sell_price: 20.00,
              num: 5
            },
            {
              img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
              id: 3,
              country: '菲律宾',
              product_name: '大芒果',
              measure_unit: '箱',
              product_standard_name: '24个',
              sell_price: 15.00,
              num: 10
            }
          ],
          totalPrice: '12312.00'
        },
        payInfo: {
          appId: '',
          timeStamp: '',
          nonceStr: '',
          prepay_id: '',
          paySign: '',
          signType: ''
        }

      }
    },
    mounted: function () {
      this.orderId = this.$route.query.orderId
      console.log('orderId:' + this.orderId)
      this.getProducts()
    },
    components: {
      MtTabItem,
      MtTabbar,
      Icon,
      BottomMenu,
      OrderInfoList,
      TitleInfo
    },
    methods: {
      getPay: function () {
        console.log('payInfo:')
        console.log(this.payInfo)
        // TODO 微信拉起支付
        // if (typeof WeixinJSBridge == 'undefined') {
        //   if (document.addEventListener) {
        //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        //   } else if (document.attachEvent) {
        //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        //   }
        // } else {
        //   oWeixinJSBridge.invoke(
        //     'getBrandWCPayRequest', {
        //       'appId': this.payInfo.appId,     // TODO 公众号名称，由商户传入
        //       'timeStamp': this.payInfo.timeStamp,         // 时间戳，自1970年以来的秒数
        //       'nonceStr': this.payInfo.nonceStr, // 随机串
        //       'package': 'prepay_id=' + this.payInfo.prepay_id,
        //       'signType': this.payInfo.signType,         // 微信签名方式：
        //       'paySign': this.payInfo.paySign // 微信签名
        //     },
        //     function (res) {
        //       if (res.data.err_msg === 'get_brand_wcpay_request:ok') {
        //         // TODO 跳转到成功页面 ,需要添加页面
        //         this.$router.push('')
        //       }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        //     }
        //   )
        // }
      },
      getProducts: function () {
        // 获取下单的商品信息
        this.$http.post('/order/getOrderProducts', {'orderId': this.orderId})
          .then(
            (response) => {
              console.log('商品信息')
              console.log(response.data)
              console.log(response)
              this.products = response.data
              // 获取预支付信息
              // TODO this.getPayInfo()
            }
          )
      },
      getPayInfo: function () {
        // 获取预微信预支付
        this.$http.post('/order/createPayOrder', {'orderId': this.orderId})
          .then(
            (response) => {
              console.log(response.data)
              this.prepay_id = response.data
              console.log('获取成功了')
            }, (response) => {
              console.log(response.data)
              this.prepay_id = response.data
              console.log('获取失败了')
            }
          )
      }
    }
  }
</script>

<style scoped lang="scss">

  .header {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back {
      position: absolute;
      left: 20px;
      top: 10px;
    }
  }

  .content {
    padding: 55px 0 88px;
    margin-left: 15px;
    margin-right: 15px;
    /*margin-top: 50px;*/
    tr {
      line-height: 30px;
      td:nth-child(2) {
        width: 250px;
        padding-left: 10px;
      }
    }

    .products {
      border-bottom: 1px solid #676767;
      border-top: 1px solid #676767;
      margin: 10px 0;
      .product {
        /*border: 1px solid; // 临时*/
        box-sizing: border-box;
        height: 90px;
        font-size: 14px;
        margin: 10px 0px 10px 0px;
        /*background-color: white;*/
        /*box-shadow: 0px 5px 15px #888888;*/
        /*border-radius: 15px; 美化*/
        /*border-bottom: 5px solid #676767;*/
        img {
          float: left;
          width: 80px;
          height: 80px;
          margin-top: 5px;
          margin-left: 10px;
        }

        .top_left_str {
          margin-top: 30px;
        }

        .sub_str {
          // 把span的行级升级为块级模块,避免span因为空间充足而不换行的渲染span,导致多行并在一行上
          display: block;
          color: darkgrey;
          /*margin-left: 100px;*/
        }

        .lower_right_str {
          display: block;
          text-align: right;
          line-height: 50px;
          margin-right: 5px;
        }
      }
    }

    .count_str {
      display: block;
      text-align: right;
    }

    .order_detail {
      td:nth-child(2) {
        text-align: right;
        color: red;
      }
    }
  }

  .bottom_bar {

  }


</style>
