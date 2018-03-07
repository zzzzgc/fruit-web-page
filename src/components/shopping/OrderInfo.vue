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
        <div>
          <mt-field label="配送时间" readonly="readonly" :value="this.buy_info.delivery_time" placeholder="次日08:00--10:00"></mt-field>
        </div>
        <div @click.navite="carTypeClick">
          <mt-field label="配送方式" readonly="readonly" :value="this.buy_info.delivery_type" placeholder="市场车"></mt-field>
        </div>
        <div>
          <mt-field label="收 货 人" :value="this.buy_info.buy_user_name" placeholder="请输入收货人"></mt-field>
        </div>
        <div>
          <mt-field label="联系方式" type="tel" :value="this.buy_info.buy_phone" placeholder="请输入联系方式"></mt-field>
        </div>
        <div>
          <mt-field label="收货地址" :value="this.buy_info.buy_address" placeholder="请输入收货地址"></mt-field>
        </div>
        <mt-popup position="bottom" v-model="on_off.delivery_type_popup" style="width:100%;">
          <!--<mt-popup position="bottom" :visible.sync="on_off.delivery_type_popup">-->
          <mt-picker :slots="deliveryType" @change="pickerChange"></mt-picker>
        </mt-popup>
        <!--<mt-popup position="bottom" v-model="on_off.delivery_time_popup" style="width:100%;">-->
        <!--&lt;!&ndash;<mt-popup position="bottom" :visible.sync="on_off.delivery_type_popup">&ndash;&gt;-->
        <!--<mt-picker :slots="deliveryType" @change="pickerChange"></mt-picker>-->
        <!--</mt-popup>-->
        <!--<table>-->
        <!--<tr>-->
        <!--<td>配送时间:</td>-->
        <!--<td>次日08:00&#45;&#45;10:00</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>配送方式:</td>-->
        <!--<mt-popup position="bottom" v-model="isShowShipmentsType">-->
        <!--<mt-picker :slots="deliveryType" @change="pickerChange"></mt-picker>-->
        <!--</mt-popup>-->
        <!--<td>市场车</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>收 货 人:</td>-->
        <!--<td>张小姐 12329090000</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>收货地址:</td>-->
        <!--<td>贵州省贵阳市（小件都要捆一下）</td>-->
        <!--</tr>-->
        <!--</table>-->
      </div>

      <!--列表展示-->
      <div class="products" v-for="(order,index) in orders.productsInfo" :key="order.orderId">
        <div>
          <span style="padding:10px 0;display: block;width:300px;margin:0 auto;">订单号:{{order.orderId}}</span>
          <div v-for="(product, index) in order.products" :key="product.id">
            <div class="product" @click="lookProduct(product.product_id,product.product_standard_id)">
              <img :src='product.img' alt="">
              <div style="padding-top: 10px">
                <span class="top_left_str"><span
                  style="background-color: red;color: white;border-radius: 5px">&nbsp;{{product.country =='中国'?'国产':'进口'}}&nbsp;</span>&nbsp;{{product.product_name}}</span>
                <span class="sub_str">{{product.product_standard_name}}</span>
                <span class="lower_right_str"><span style="color: red;">￥{{product.sell_price}}</span> X {{product.num}}件</span>
              </div>
            </div>
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
    <table class="bottom_bar">
      <tr>
        <td class="pay_money_str">实付款: ￥{{this.countPrice}}</td>
        <td>
          <mt-button name="submit" style="background-color: red" type='danger' @click="getPay" size='large'>提交订单</mt-button>
        </td>
      </tr>
    </table>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import 'mint-ui/lib/style.css'
  import BottomMenu from '../common/BottomMenu'
  import TitleInfo from '../common/TitleInfo'
  import {urlPrefix} from '../../common/const'

  import Vue from 'vue'
  import Mint from 'mint-ui'

  Vue.use(Mint)

  export default {
    name: 'orderInfo',
    computed: {
      countNum: function () {
        // 商品总数
        let count = 0
        for (let order of this.orders.productsInfo) {
          for (let product of order.products) {
            count += product.num
          }
        }
        return count
      },
      countPrice: function () {
        return this.orders.orderTotalPrice
      }
    },
    data: function () {
      return {
        deliveryType: [
          {
            values: ['市场车', '物流', '自提']
          }
        ],
        buy_info: {
          delivery_type: '',
          deliver_index: 0,
          delivery_time: '',
          buy_user_name: '',
          buy_phone: '',
          buy_address: ''
        },
        on_off: {
          delivery_type_popup: false,
          delivery_time_popup: false
        },
        // time: [
        //   {
        //     flex: 1,
        //     values: [{code: 0, showName: '次日'}, {code: '0', showName: '后天'}],
        //     defaultIndex: 0,
        //     className: 'slot1',
        //     textAlign: 'center'
        //   }, {
        //     divider: true,
        //     content: '-',
        //     defaultIndex: 0,
        //     className: 'slot2'
        //   }, {
        //     flex: 1,
        //     values: ['8点'],
        //     defaultIndex: 0,
        //     className: 'slot3',
        //     textAlign: 'center'
        //   }
        // ],
        orderIds: [],
        orders: {
          productsInfo: [
            {
              orderId: 123456,
              products: [
                {
                  img: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 1,
                  country: '中国',
                  product_name: '天山雪莲',
                  measure_unit: '箱',
                  product_id: 1,
                  product_standard_name: '1朵',
                  sell_price: 999.00,
                  num: 27
                },
                {
                  img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 2,
                  country: '美国',
                  product_name: '牛油果',
                  measure_unit: '箱',
                  product_standard_name: '12个',
                  sell_price: 20.00,
                  num: 5
                },
                {
                  img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 3,
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
            {
              orderId: 123456,
              products: [
                {
                  img: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 1,
                  country: '中国',
                  product_name: '天山雪莲',
                  measure_unit: '箱',
                  product_id: 1,
                  product_standard_name: '1朵',
                  sell_price: 999.00,
                  num: 27
                },
                {
                  img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 2,
                  country: '美国',
                  product_name: '牛油果',
                  measure_unit: '箱',
                  product_standard_name: '12个',
                  sell_price: 20.00,
                  num: 5
                },
                {
                  img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
                  product_standard_id: 3,
                  country: '菲律宾',
                  product_name: '大芒果',
                  measure_unit: '箱',
                  product_standard_name: '24个',
                  sell_price: 15.00,
                  num: 10
                }
              ],
              totalPrice: '12312.00'
            }],
          orderTotalPrice: '123132165.00'
        },
        payInfo: {
          mweb_url: '',
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
      // 传入订单数组
      console.log('params')
      console.log(this.$route)
      this.orderIds = this.$route.query.orderIds
      console.log(this.orderIds)
      this.getProducts()
      // this.getPayInfo()
      this.buyInfo()
    },
    components: {
      BottomMenu,
      TitleInfo
    },
    methods: {
      pickerChange: function (picker, values) {
        this.buy_info.delivery_type = values[0]
        picker.setSlotValue(0, values[0])
      },
      lookProduct: function (productId, productStandardId) {
        // 查看商品
        this.$router.push('/product/' + productId + '-' + productStandardId)
      },
      buyInfo: function () {
        this.$http.post('/order/getBuyInfo').then(
          (res) => {
            this.buy_info = res.data
          }
        )
      },
      getPay: function () {
        this.$http.post('/order/setBuyInfo', Object.assign(this.buy_info, {orderIds: this.orderIds})).then(
          (res) => {
            console.log('物流信息写入成功')
          }
        )
        // 微信H5支付
        // console.log('payInfo:')
        // console.log(this.payInfo)
        // 微信拉起支付
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
        //       'appId': this.payInfo.appId,
        //       'timeStamp': this.payInfo.timeStamp,         // 时间戳，自1970年以来的秒数
        //       'nonceStr': this.payInfo.nonceStr, // 随机串
        //       'package': 'prepay_id=' + this.payInfo.prepay_id,
        //       'signType': this.payInfo.signType,         // 微信签名方式：
        //       'paySign': this.payInfo.paySign // 微信签名
        //     },
        //     function (res) {
        //       if (res.data.err_msg === 'get_brand_wcpay_request:ok') {
        //               // 补充订单信息到数据库
        //         this.$router.push('/paySuccess')
        //       } else {
        //         this.$router.push('/orderList?selected=one')
        //       }
        //       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        //     }
        //   )
        // }
        console.log('urlPrefix' + urlPrefix)
        console.log(this.orderIds.toString())
        //this.$router.push({path: '/isPayOk', params: {orderIds: this.orderIds.toString()}})
        // TODO 临时改为query传参
        this.$router.push({path: '/isPayOk', query: {orderIds: this.orderIds.toString()}})

        // // 正式的支付
        // window.location.href = this.payInfo.mweb_url + '&redirect_url=' + urlPrefix + 'isPayOk/' + this.orderId
      },
      getProducts: function () {
        // 获取下单的商品信息
        this.$http.post('/order/getOrdersProducts', {'orderIds': this.orderIds})
          .then(
            (response) => {
              console.log('商品信息')
              console.log(response.data)
              this.orders = response.data
              // 获取预支付信息
              // this.getPayInfo()
            }
          )
      },
      getPayInfo: function () {
        // 获取预微信预支付H5信息
        // this.$http.post('/order/createPayOrderByH5', {'orderId': this.orderId})
        //   .then(
        //     (response) => {
        //       console.log(response.data)
        //       this.payInfo.prepay_id = response.data.prepay_id
        //       this.payInfo.appId = response.data.appId
        //       this.payInfo.timeStamp = response.data.timeStamp
        //       this.payInfo.nonceStr = response.data.nonceStr
        //       this.payInfo.signType = response.data.signType
        //       console.log('获取成功了')
        //     }, (response) => {
        //       console.log(response.data)
        //       console.log('获取失败了')
        //     }
        //   )

        // 获取预微信预支付JS-API信息
        this.$http.post('/order/createPayOrderByJsApi', {'orderId': this.orderId})
          .then(
            (response) => {
              console.log(response.data)
              this.payInfo.mweb_url = response.data
              console.log('获取成功了')
            }, (response) => {
              console.log(response.data)
              console.log('获取失败了')
            }
          )
      },
      carTypeClick: function () {
        console.log('carTypeClick')
        console.log(this.on_off.delivery_type_popup)
        this.on_off.delivery_type_popup = true
      }
      // ,carTimeClick: function () {
      //   console.log('carTimeClick')
      // },
      // usernameClick: function () {
      //   console.log('usernameClick')
      // },
      // carAddressClick: function () {
      //   console.log('carAddressClick')
      // }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin-top: 45px;
    margin-bottom: 90px;
    .goods_info {

    }

    .products {
      /*border-radius: 50px;*/
      margin: 10px 0;
      padding-bottom: 20px;
      box-shadow: 0px 5px 15px #888888;
      .product {
        /*border: 1px solid; // 临时*/
        box-sizing: border-box;
        height: 90px;
        margin: 10px 20px 10px;
        background-color: white;
        box-shadow: 0px 5px 15px #888888;
        border-radius: 15px;
        //border-bottom: 5px solid #676767;
        img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          float: left;
          width: 80px;
          height: 80px;
          margin: 5px 10px 10px;
        }

        .top_left_str {
          display: block;
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
          line-height: 40px;
          margin-right: 15px;
        }
      }
    }

    .count_str {
      display: block;
      text-align: right;
    }

    .order_detail {
      width: 100%;
      td:nth-child(2) {
        text-align: right;
        color: red;
      }
    }
  }

  .bottom_bar {
    position: fixed;
    bottom: 44px;
    z-index: 1;
    width: 100%;
    height: 44px;
    background: white;
    .pay_money_str {
      z-index: 2;
      text-align: right;
      color: red;
    }
    .go_pay_button {
      z-index: 2;
      width: 40%;
      text-align: center;
    }
  }


</style>
