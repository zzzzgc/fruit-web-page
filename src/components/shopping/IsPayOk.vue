<template>
  <div class="center">
    <TitleInfo titleContent="填写订单"></TitleInfo>
    <!--TODO 页面设设计未完成-->
    <div class="main">
      <mt-button type="primary" @click="endOrderPay">已完成支付</mt-button>
      <mt-button @click="reset">支付遇到问题,重新支付</mt-button>
    </div>
  </div>
</template>

<script>
  import TitleInfo from '../common/TitleInfo'

  import Vue from 'vue'
  import Mint from 'mint-ui'

  Vue.use(Mint)

  export default {
    components: {TitleInfo},
    name: 'is-pay-ok',
    data: function () {
      return {
        orderIds: []
      }
    },
    methods: {
      endOrderPay: function () {
        this.$http.post('/order/endOrderPay', {orderIds: this.orderIds}).then(
          (response) => {
            let isOk = response.data
            if (isOk) {
              // 确认成功
            } else {
              // 确认未成功
            }
          }
        )
      },
      reset: function () {
        // TODO 临时改为query传参
        this.$router.push({path: '/orderInfo', query: {'orderIds': this.orderIds}})
      }
    },
    mounted: function () {
      // this.orderIds = this.$route.params.orderIds
      // TODO 临时改为query传参
      this.orderIds = this.$route.query.orderIds
    }
  }
</script>

<style scoped type="scss">
  .center {
    display: -webkit-flex; /* Safari */
    display: flex;
    background-color: red;
    height: 100%;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: center;
    .main {
      margin-top: 200px;
    }
  }
</style>
