<template>
  <div style="clear:both;height:89px;">
    <table class="pay-order">
      <tr >
        <td style="margin:0;">
          <!--<mt-checklist-->
          <!--v-model="checkAll"-->
          <!--:options="['全选']" style="width:100px;margin-left:-10px;">-->
          <!--</mt-checklist>-->
          <input type="checkbox" id="checkAllOne" v-model="checkAll">
          <label for="checkAllOne">全选</label>
        </td>
        <td class="price" style="font-size:16px;">
          <div>合计：<span class="total-price">￥{{totalPrice}}</span></div>
          <!--<div class="total-pay">总额：￥{{totalPay}} 立减：￥{{discountMoney}}</div>-->
        </td>
        <td class="go-pay">去结算</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    watch: {
      name: 'check-all-one',
      checkAll: function (val, oldVal) { // 此处只能使用监听的方式，更新商品列表，因为搜索后还是在当前页面，所以不会执行mounted
        if (val) {
          for (var key in this.orders) {
            for (let o in this.orders[key]) {
              this.orders[key][o].check = true
            }
          }
        } else {
          for (var index in this.orders) {
            for (let o of this.orders[index]) {
              o.check = false
            }
          }
        }
      }
    },
    data () {
      return {
        checkAll: false
      }
    },
    props: {
      'orders': this.orders
    },
    computed: {
      totalPrice: function () { // 获取到选中的总金额
        let price = 0
        for (var key in this.orders) {
          let flag = false
          for (let o of this.orders[key]) {
            if (o.check) {
              flag = true
            }
          }
          if (flag) {
            for (let o of this.orders[key]) {
              price += o.sell_price * o.num
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
