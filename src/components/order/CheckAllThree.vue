<template>
  <div style="clear:both;height:89px;">
    <table class="pay-order">
      <tr >
        <td style="margin:0;padding-left:10px;">
          <!--<mt-checklist-->
          <!--v-model="checkAll"-->
          <!--:options="['全选']" style="width:100px;margin-left:-10px;">-->
          <!--</mt-checklist>-->
          <!--<div @click.navite="checkAllByThree">-->
            <van-checkbox  id="checkAllThree" v-model="checkAll" @change="checkAllByThree">全选</van-checkbox>
          <!--</div>-->
          <!--<input type="checkbox" id="checkAllThree" v-model="checkAll">-->
          <!--<label for="checkAllThree">全选</label>-->
        </td>
        <td class="price" style="font-size:16px;">
          <div>合计：<span class="total-price">￥{{totalPrice}}</span></div>
          <!--<div class="total-pay">总额：￥{{totalPay}} 立减：￥{{discountMoney}}</div>-->
        </td>
        <td class="go-pay" @click.navite="goPayByThree">去结算</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import VanCheckbox from 'vant/packages/checkbox/index'
  import bus from '../../common/bus'
  export default {
    name: 'check-all-three',
    components: {
      VanCheckbox
    },
    watch: {
      // checkAll: function (val, oldVal) { // 此处只能使用监听的方式，更新商品列表，因为搜索后还是在当前页面，所以不会执行mounted
      //   if (val) {
      //     for (var key in this.orders) {
      //       let ascNum = 0
      //       for (let o in this.orders[key]) {
      //         if (ascNum === 0) {
      //           this.orders[key][o].check = true
      //           ascNum = 1
      //         }
      //       }
      //     }
      //   } else {
      //     for (var index in this.orders) {
      //       let ascNum = 0
      //       for (let o of this.orders[index]) {
      //         if (ascNum === 0) {
      //           o.check = false
      //           ascNum = 1
      //         }
      //       }
      //     }
      //   }
      // }
      isCheckAll: function (val, oldVal) {
        this.checkAll = this.isCheckAll
      }
    },
    data: function () {
      return {
        checkAll: false,
        orderIds: [],
        ordersCount: 0
      }
    },
    props: {
      'orders': this.orders,
      'isCheckAll': this.isCheckAll
    },
    methods: {
      goPayBefore: function () {
        let flag = false
        if (this.orderIds === null || this.orderIds.length <= 0) {
          flag = true
          this.$toast('请至少选择一条订单!')
        }
        return flag
      },
      goPayByThree: function () {
        if (this.goPayBefore()) {
          return
        }
        this.$router.push({path: '/orderInfo', query: {'orderIds': this.orderIds}})
      },
      checkAllByThree: function () {
        if (this.checkAll) {
          let checkOrderCount = 0
          for (var key in this.orders) {
            let ascNum = 0
            for (let o in this.orders[key]) {
              if (ascNum === 0) {
                checkOrderCount++
                this.orders[key][o].check = true
                ascNum = 1
              }
            }
          }
          bus.$emit('checkOrderCount', checkOrderCount)
        } else {
          for (var index in this.orders) {
            let ascNum = 0
            for (let o of this.orders[index]) {
              if (ascNum === 0) {
                o.check = false
                ascNum = 1
              }
            }
          }
        }
      }
    },
    computed: {
      totalPrice: function () { // 获取到选中的总金额
        let price = 0
        this.orderIds = []
        this.ordersCount = 0
        for (var key in this.orders) {
          let flag = false
          let isExit = false
          this.ordersCount ++
          for (let o of this.orders[key]) {
            if (o.check) {
              if (!isExit) {
                this.orderIds.push(key)
                isExit = true
              }
              flag = true
            }
          }
          if (flag) {
            for (let o of this.orders[key]) {
              price = ((((o.sell_price * 10) * (o.num * 10)) / 100) * 10 + price * 10) / 10
            }
          }
        }
        return price
      }
    }
  }
</script>

<style scoped>
  .total-price {
    color: red;
    font-size: 18px;
  }
  .pay-order {
    position: fixed;
    bottom: 44px;
    z-index: 1;
    width: 100%;
    height: 44px;
    background: white;
    border-top: 1px solid #EEE;
    /*box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);*/
    /*.price {*/
    /*line-height: inherit;*/
    /*padding: 0 10px;*/
    /*}*/
  }
  .total-pay {
    font-size: 14px;
  }
  .go-pay {
    width: 120px;
    text-align: center;
    background: red;
    color: white;
    height: 50px;
    margin-bottom:10px;
  }
  .login {
    text-align: center;
  }
</style>
