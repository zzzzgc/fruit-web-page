<template>
  <div class="pay-success">
    <div class="top-fixed-header title">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title-desc">订单支付成功</div>
    </div>
    <div class="success-content">
      <div class="success-image">
        <img src="../../images/paysuccess.png" width="150" height="150">
      </div>
      <div class="success-text">订单支付成功</div>
    </div>
    <div class="success-bottom">
      <mt-button type="primary" size="large" class="order-detail" @click.navite="searchOrderDetail">查看订单详情</mt-button>
      <mt-button type="danger" size="large" class="go-to-shopping" @click.navite="goOnShopping">继续购物</mt-button>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/angle-left'
import Icon from 'vue-awesome/components/Icon'
import MtButton from 'mint-ui/packages/button/src/button'
import 'mint-ui/lib/style.css'
import MtCell from 'mint-ui/packages/cell/src/cell'
import { Toast } from 'mint-ui'

export default {
  name: 'pay-success',
  components: {
    MtCell,
    MtButton,
    Toast,
    Icon
  },
  methods: {
    goOnShopping: function () {
      window.location.href = '/'
    },
    searchOrderDetail: function () {
      Toast('请填写订单详情链接')
    }
  }
}
</script>

<style scoped>
  .pay-success {
    margin-bottom: 0;
    flex-direction: column;
  }
  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 15px 20px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: black;
    color:white;
    height:60px;
  }
  .back{
    position: absolute;
    top: 15px;
    left:15px;
    vertical-align: middle;
  }
  .success-bottom{
    margin-top:60px;
  }
  .success-content{
    height:400px;
  }
  .success-image img{
    position:absolute;
    left:50%;
    top:190px;
    margin-left:-75px;
  }
  .success-text{
    position:absolute;
    left:50%;
    top:350px;
    margin-top:30px;
    margin-left:-73px;
    font-size:24px;
    color:#555;
  }
  .order-detail{
    margin-bottom:15px;
    background-color:#06BE04;
  }
  .go-to-shopping{
    background-color:#FF8B2C;
  }
</style>
