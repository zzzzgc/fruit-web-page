<template>
  <div class="order-list">
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="one">
        <div class="subtitleitem">待付款</div>
      </mt-tab-item>
      <mt-tab-item id="two">
        <div class="subtitleitem">确认中</div>
      </mt-tab-item>
      <mt-tab-item id="three">
        <div class="subtitleitem">待收货</div>
      </mt-tab-item>
      <mt-tab-item id="four">
        <div class="subtitleitem">我的订单</div>
      </mt-tab-item>
    </mt-navbar>
    <div class="horizontal"></div>
    <!-- tabcontainer -->
    <mt-tab-container v-model="selected" :swipeable='true' value="tab-container1">
      <mt-tab-container-item id="one">
        <order-item :orders="orders" :selected="selected"></order-item>
        <check-all-one :orders="orders" ></check-all-one>
        <bottom-menu></bottom-menu>
      </mt-tab-container-item>
      <mt-tab-container-item id="two">
        <order-item :orders="orders" :selected="selected"></order-item>
        <check-all-two :orders="orders" ></check-all-two>
        <bottom-menu></bottom-menu>
      </mt-tab-container-item>
      <mt-tab-container-item id="three">
        <order-item :orders="orders"  :selected="selected"></order-item>
        <check-all-three :orders="orders" ></check-all-three>
        <bottom-menu></bottom-menu>
      </mt-tab-container-item>
      <mt-tab-container-item id="four">
        <order-item :orders="orders" :selected="selected"></order-item>
        <check-all-four :orders="orders" ></check-all-four>
        <bottom-menu></bottom-menu>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
  import OrderItem from './OrderItem'
  import BottomMenu from '../common/BottomMenu'
  import CheckAllOne from './CheckAllOne'
  import CheckAllTwo from './CheckAllTwo'
  import CheckAllThree from './CheckAllThree'
  import CheckAllFour from './CheckAllFour'

  Vue.use(Mint)
  export default {
    components: {
      Icon,
      OrderItem,
      CheckAllOne,
      BottomMenu,
      CheckAllTwo,
      CheckAllThree,
      CheckAllFour
    },
    name: 'order-list',
    data: function () {
      return {
        selected: 'one',
        orders: {
          key: '',
          value: []
        },
        orderCount: []
      }
    },
    methods: {
      getOrderList: function () {
        this.$http.post('/order/getOderList', {order_status: this.selected}).then((response) => {
          this.orders = response.data
          this.$indicator.close()
        })
      }
    },
    watch: {
      selected (val, oldVal) {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.getOrderList()
        this.$indicator.close()
      }
    },
    mounted: function () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.getOrderList()
    }

  }
</script>

<style scoped>
  .order-list{
    margin:0px;
    background-color: #F3F3F3;
  }
  .item {
    display: inline-block;
  }
  .aaa{
    display:block;
    margin-bottom:20px;
  }
  .nav {
    padding: 10px;
  }
  .subtitleitem{
    font-size:16px;
  }
  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
</style>
