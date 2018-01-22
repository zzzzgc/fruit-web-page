<template>
  <div class="persons">
    <div v-if="isLogin()" class="persons-header">
      <div class="persons-user-title">
        <div class="user-phone">{{phone}}</div>
        <div class="user-logout" @click.navite="toLogOut">退出当前用户</div>
        <div class="persons-blank"></div>
      </div>

      <!--     <div style="display: flex;flex-direction:row;margin-left:30px;margin-top:25px;">
             <div class="shop-info" style="flex:1;"><span style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">店铺信息</span></div>
             <div class="shop-info" style="flex:1;"><span  style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">实名认证</span></div>
           </div>-->
      <div class="persons-info">
        <div class="shop-info"><span><router-link to="/shopInfo">店铺信息</router-link></span></div>
        <div class="shop-info"><span><router-link to="authIdentity">网络销售</router-link></span></div>
      </div>
      <div class="my-orders">
        <table class="my-orders-container">
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'one'}}" class="order-item-child">待付款</router-link>
              <span class="badge">{{waitPay}}</span></td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'two'}}" class="order-item-child">确认中</router-link>
              <span class="badge">{{verifying}}</span></td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'three'}}" class="order-item-child">代发货
              </router-link>
              <span class="badge">{{waitReceiver}}</span></td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'four'}}" class="order-item-child">我的订单
              </router-link>
              <span class="badge">{{myOrders}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="isLogin()" class="update-pwd-container">
      <router-link to="/forgetPwd" class="update-pwd">修改密码</router-link>
    </div>

    <div v-else>
      <span style="display: block;width:50%;height: 160px;line-height:160px;text-align:center;padding:20px;margin:0 auto 30px">您暂未登录，<span style="color: blue;" @click="toLogin()">请选登录</span></span>
    </div>
    <div v-if="isLogin()" class="receiver">
      <table>
        <tr>
          <td>收款信息</td>
        </tr>
        <tr>
          <td>收款人姓名：</td>
          <td>广州指猴互联科技有限公司</td>
        </tr>
        <tr>
          <td>收款人卡号：</td>
          <td>1232435465767687</td>
        </tr>
        <tr>
          <td>收 款 银 行 :</td>
          <td> 工商银行</td>
        </tr>
      </table>
    </div>
    <div style="position:fixed;width:100%;bottom: 45px;left: 0;" v-else>
      <mt-button size="large" type="danger" @click="toLogin()">登录</mt-button>
    </div>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Mint from 'mint-ui'
  import BottomMenu from '../common/BottomMenu'
  import {logout, isLogin, toLogin} from '../../common/session'
  import session from '../../mixins/sessionMixin'
  import './css/persons.css'
  import MtButton from 'mint-ui/packages/button/src/button'

  Vue.use(Mint)
  export default {
    name: 'persons',
    data: function () {
      return {
        phone: '',
        myOrders: '',
        verifying: '',
        waitPay: '',
        waitReceiver: '',
        isLogin,
        toLogin
      }
    },
    components: {
      MtButton,
      BottomMenu,
      mixins: [session]
    },
    methods: {
      toLogOut: function () {
        this.$http.post('/login/logout').then((response) => {
          logout()
          this.$router.push('/login')
        })
      },
      getUserAndOrderInfo: function () {
        this.$http.post('/person/getUserInfo').then((response) => {
          this.phone = response.data['phone']
          this.myOrders = response.data['mapStatusAndCount']['myOrders']
          this.waitPay = response.data['mapStatusAndCount']['waitPay']
          this.waitReceiver = response.data['mapStatusAndCount']['waitReceiver']
          this.verifying = response.data['mapStatusAndCount']['verifying']
        })
      }
    },
    mounted: function () {
      if (isLogin()) {
        this.getUserAndOrderInfo()
      }
    }
  }
</script>

<style scoped>
  .badge {
    color: red;
    position: absolute;
    right: -7px;
    top: -7px;
    font-size: 12px;
  }
</style>
