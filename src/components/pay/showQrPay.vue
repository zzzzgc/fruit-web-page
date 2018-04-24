<template>
  <div class="content">
    <TitleInfo titleContent="支付宝扫码"></TitleInfo>
    <div class="testPage">

      <div class="up_text">付款金额:<span style="color: red">￥{{total_price}}</span></div>

      <!--支付宝-->
      <img :src="pay_img.ailPay_qr_img" alt="支付宝二维码">

      <!--微信-->
      <img :src="pay_img.wechat_qr_img" alt="微信二维码">

      <!--银行账户-->
      <span style="font-size: 24px;margin-top: 10px">银行账户支付</span>
      <mt-field label="银行" value="中国工商银行"></mt-field>
      <mt-field label="开户行" value="广州天平架支行"></mt-field>
      <mt-field label="账户" value="6222 0236 0210 0977 552"></mt-field>
      <mt-field label="户名" value="段林"></mt-field>


      <span style="color: #999999">注意:支付完成后记得 <span style="color: red">保存截图</span> </span>
      <span style="color: #999999">以作为 <span style="color: green">支付成功的凭证</span></span>
      <!--<div class="button_img"></div>-->
      <mt-button type="primary" @click="main">继续加货</mt-button>
      <mt-button type="info" @click="reset">查看订单</mt-button>
    </div>
  </div>
</template>

<script>
  import TitleInfo from '../common/TitleInfo'

  import Vue from 'vue'
  import Mint from 'mint-ui'

  Vue.use(Mint)

  export default {
    components: {
      TitleInfo},
    name: 'is-pay-ok',
    data: function () {
      return {
        orderIds: [],
        total_price: 0,
        pay_img: {
          ailPay_qr_img: require('../../images/pay/ailPayQR.png'),
          wechat_qr_img: require('../../images/pay/WechatQR.png')
        }
      }
    },
    methods: {
      reset: function () {
        // this.$router.push({path: '/orderInfo', query: {'orderIds': this.orderIds}})
        this.$router.push({path: '/orderList', query: {'selected': 'one'}})
      },
      main: function () {
        this.$router.push('/')
      }
    },
    mounted: function () {
      this.orderIds = this.$route.query.orderIds
      this.total_price = this.$route.query.total_price
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin-top: 45px;
    margin-bottom: 90px;
    .testPage {
      margin-top: 100px;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      /*width: 100%;*/
      /*margin: 0 auto;*/
      .up_text {
        font-size: 24px;
        margin: 10px;
      }
      img {
        width: 300px;
        margin-top: 10px;
      }
      button {
        margin: 10px;
        width: 300px;
      }
    }
  }

</style>
