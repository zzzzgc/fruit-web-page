<template>
  <div class="order-item" id="order-item">
    <div v-for="(value,key) in orders" style="border-bottom:1px solid #999;">
      <div v-for="(order,index) in value">
        <div v-if="index==0">
          <div style="float:left;width:100%;display:flex;flex-direction: row;">
            <!--<mt-checklist
            v-model="order.check"
            :options="['您的订单正在确认中…']"  style="flex:0.8;" >
          </mt-checklist>-->
            <div style="flex:0.8;margin:18px 0 0 15px">
              <van-checkbox :id="order.order_id+index" v-model="order.check">您的订单正在确认中…</van-checkbox>
              <!--<input type="checkbox" :id="order.order_id+index" v-model="order.check">
              <label :for="order.order_id+index" style="flex:9;">您的订单正在确认中…</label>-->
            </div>
            <mt-cell style="flex:0.2;margin-top:7px;" v-if="order.ispay == 5">已支付</mt-cell>
            <mt-cell style="flex:0.2;margin-top:7px;" v-else="order.ispay == 0"><span style="color:red;">待付款</span>
            </mt-cell>
          </div>
          <!--  <div style="clear:both;display:flex;flex-direction: row;margin:15px 0 10px 3.8%;">
              <div style="flex:0.55;font-size:13px;">下单时间：{{order.create_time}}</div>
              <div style="flex:0.45;height:10px;font-size:13px;">订单号:{{order.order_id}}</div>
            </div>-->
          <div style="clear:both;display:flex;flex-direction: row;margin:15px 0 0px 3.8%;">
            <div style="flex:0.55;font-size:13px;">下单时间：{{order.create_time}}</div>
          </div>
          <div style="clear:both;display:flex;flex-direction: row;margin:15px 0 20px 3.8%;">
            <div style="flex:1;height:10px;font-size:13px;">订单号:{{order.order_id}}</div>
          </div>
        </div>
        <div class="order-content"
             style="display: flex;width:94%;height:96px;flex-direction: row;background-color: #F2F2F2;margin-left:3%;margin-bottom:15px;" @click.navite="toProductDetail(order.product_id+'-'+order.product_standard_id)">
          <div style="flex:0.25;margin:3px 0 10px 3px">
            <img v-lazy.order-item="order.img_url" width="100" height="90"/>
          </div>
          <div class="order-detail" style="flex: 0.75;margin:3px  0 10px 15px;font-size:14px;">
            <span><span style="color:red;display:inline;">【{{order.country}}】</span>{{order.name}}</span>
            <span style="color:#999;font-size:12px;text-indent: 4px;">{{order.product_standard_name}}</span>
            <span style="float:right;margin-right:10px;color:#333;">￥ {{order.sell_price}} x{{order.num}}件</span>
            <span style="clear:both;color:#524239;">备注:{{order.buy_remark == "null"? "" :order.buy_remark}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.ordersCount<=0" style="width:100%;height: 400px;">
      <div style="width:100px;margin:0  auto;padding-top:70px;padding-left: 40px;">暂无数据</div>
    </div>
  </div>
</template>

<script>
  import MtCell from 'mint-ui/packages/cell/src/cell'
  import Icon from 'vue-awesome/components/Icon'
  import Lazyload from 'mint-ui/packages/lazyload/src/lazyload'
  import InfiniteScroll from 'mint-ui/packages/infinite-scroll/src/infinite-scroll'
  import VanCheckbox from 'vant/packages/checkbox/index'
  import 'vant/lib/vant-css/checkbox.css'
  import 'vant/lib/vant-css/icon.css'

  export default {
    components: {
      VanCheckbox,
      MtCell,
      Icon,
      Lazyload,
      InfiniteScroll
    },
    name: 'order-item',
    data: function () {
      return {
        value1: [],
        value2: [],
        order: {
          id: '',
          order_id: '',
          create_time: '',
          name: '',
          img_url: '',
          country: '',
          num: '',
          check: false,
          buy_remark: '',
          ispay: '',
          sell_price: '',
          product_standard_name: '',
          product_id: '',
          product_standard_id: ''
        },
        img: require('../../images/paysuccess.png'),
        loading: false
      }
    },
    props: {
      'orders': this.orders,
      'selected': this.selected,
      'ordersCount': this.ordersCount
    },
    mounted: function () {
    },
    methods: {
      toProductDetail: function (productUrl) {
        this.$router.push('/product/' + productUrl)
      }
    }
  }
</script>

<style scoped>
  .order-item {
    margin: 5px 0 0 0;
    background-color: white;

  }

  li {
    list-style-type: none;
  }

  .order-detail span {
    display: block;
    line-height: 22px;
  }


</style>
<style>
  /* 不能删除 去掉mint-ui的cell组件自带的样式*/
  .mint-cell-wrapper{
    background-image: none;
  }
  /* 不能删除 去掉mint-ui的cell组件自带的样式*/
  .mint-cell:last-child{
    background-image: none;
  }
</style>
