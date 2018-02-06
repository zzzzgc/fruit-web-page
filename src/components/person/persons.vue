<template>
  <div class="persons">
    <title-info titleContent="我的" style="margin-bottom:50px"></title-info>
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
        <div class="shop-info"><span><router-link to="authIdentity">实名认证</router-link></span></div>
      </div>
      <div class="my-orders">
        <table class="my-orders-container">
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'one'}}" class="order-item-child">待付款</router-link>
              <span class="my-badge" v-if="waitPay!=0">{{waitPay}}</span>
              <!--<mt-badge class="badge" size="small" type="error">{{waitPay==0?'':waitPay}}</mt-badge>-->
            </td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'two'}}" class="order-item-child">确认中</router-link>
              <span class="my-badge" v-if="verifying!=0">{{verifying}}</span></td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'three'}}" class="order-item-child">待发货
              </router-link>
              <span class="my-badge" v-if="waitReceiver!=0">{{waitReceiver}}</span></td>
          </tr>
          <tr class="order-item">
            <td style="position: relative;">
              <router-link :to="{path: '/orderList',query: {selected:'four'}}" class="order-item-child">我的订单
              </router-link>
              <span class="my-badge" v-if="myOrders!=0">{{myOrders}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="isLogin()" class="update-pwd-container-person">
      <router-link to="/updatePwd" class="update-pwd-person">修改密码</router-link>
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
          <td>{{zihoName}}</td>
        </tr>
        <tr>
          <td>收款人卡号：</td>
          <td>{{zihoCardNum}}</td>
        </tr>
        <tr>
          <td>收 款 银 行 :</td>
          <td> {{zihoBank}}</td>
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
  import TitleInfo from '../common/TitleInfo'

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
        toLogin,
        zihoName: '',
        zihoCardNum: '',
        zihoBank: ''
      }
    },
    components: {
      MtButton,
      BottomMenu,
      mixins: [session],
      TitleInfo
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
          this.zihoName = response.data['zihoName']
          this.zihoBank = response.data['zihoBank']
          this.zihoCardNum = response.data['zihoCardNum']
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
  .my-badge {
    /*position: absolute;*/
    /*right: -26px;*/
    /*top: 6px;*/
    /*font-size: 8px;*/
    /*width:26px;*/
    /*height: 15px;*/
    /*background-color: red;*/
    /*text-align: center;*/
    /*color: white;*/
    /*line-height: 15px;*/
    /*border-radius: 8px;*/
    font-size: 8px;
    width:26px;
    padding:0 6px;
    background-color: red;
    text-align: center;
    margin-left:-4px;
    margin-top:-1px;
    color: white;
    line-height: 15px;
    border-radius: 8px;
  }
</style>
