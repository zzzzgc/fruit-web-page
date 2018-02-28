<template>
  <div class="center">
    <TitleInfo titleContent="填写订单"></TitleInfo>

    <div class="main">
      <mt-button type="primary">已完成支付</mt-button>
      <mt-button>支付遇到问题,重新支付</mt-button>
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
        orderId: ''
      }
    },
    mounted: function () {
      console.log(123)
      this.orderId = this.$route.params.orderId
      console.log(this.orderId)
    }
  }
</script>

<style scoped type="scss">
  .center {
    display: -webkit-flex; /* Safari */
    display: flex;
    .main {
      margin-top: 200px;
      flex-direction: row-reverse;
    }
  }
</style>
