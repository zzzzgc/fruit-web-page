<template>
  <div class="persons">
    <title-info titleContent="我的" style="margin-bottom:50px;"></title-info>
    <div v-if="isLogin()" class="persons-header">
      <div style="" class="persons-user-title-container">
      <div class="persons-user-title">
        <!--<div class="user-phone">{{phone}}</div>-->
        <!--<div class="user-logout" @click.navite="toLogOut">退出当前用户</div>-->
        <div class="persons-blank"></div>
      </div>

      <!--     <div style="display: flex;flex-direction:row;margin-left:30px;margin-top:25px;">
             <div class="shop-info" style="flex:1;"><span style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">店铺信息</span></div>
             <div class="shop-info" style="flex:1;"><span  style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">实名认证</span></div>
           </div>-->
      <!--<div class="persons-info">-->
        <!--<div class="shop-info"><span><router-link to="/shopInfo">店铺信息</router-link></span></div>-->
        <!--<div class="shop-info"><span><router-link to="authIdentity">实名认证</router-link></span></div>-->
      <!--</div>-->
        <div style="width:100px;height: 100px;border-radius: 50px;background-color: white;margin:0 auto 20px;">
          <img src="../../images/myOrder/logo.png" width="80px;" height="80px;" style="position: relative;left:50%;top:50%;margin-left:-40px;margin-top:-40px;"/>
        </div>
        <div class="user-phone">{{phone}}</div>
      </div>
      <div class="my-orders" style="padding: 5px 0;">
        <table style="display:flex;flex-direction: row;border: 0;margin:0;padding: 0;">
          <tr style="flex:1;">
            <td style="position: relative;margin:0 auto;text-align: center;width:25%;">
              <router-link :to="{path: '/orderList',query: {selected:'one'}}" class="order-item-child"><img src="../../images/myOrder/waitPay1-1.png" width="32px;" height="32px;"/>
              <span class="my-badge" v-if="waitPay!=0 && typeof (waitPay) != 'undefined'">{{waitPay}}</span>
              </router-link>
            </td>
          </tr>
          <tr style="flex:1;">
            <td style="position:relative;margin:0 auto;text-align: center;width:25%;">
              <router-link :to="{path: '/orderList',query: {selected:'two'}}" class="order-item-child"><img src="../../images/myOrder/verifying1-1.png" width="32px;" height="32px;"/>
              <span class="my-badge" v-if="verifying!=0 && typeof (waitPay) != 'undefined'">{{verifying}}</span>
              </router-link>
            </td>
          </tr>
          <tr style="flex:1;">
            <td style="position:relative;margin:0 auto;text-align: center;width:25%;">
              <router-link :to="{path: '/orderList',query: {selected:'three'}}" class="order-item-child"><img src="../../images/myOrder/waitReceiver1-1.png" width="32px;" height="32px;"/>
              <span class="my-badge" v-if="waitReceiver!=0 && typeof (waitPay) != 'undefined'">{{waitReceiver}}</span>
              </router-link>
            </td>
          </tr>
          <tr style="flex:1;">
            <td style="position:relative;margin:0 auto;text-align: center;width:25%;">
              <router-link :to="{path: '/orderList',query: {selected:'four'}}" class="order-item-child">
              <img src="../../images/myOrder/myOrder1-1.png" width="32px;" height="32px;"/>
              <span class="my-badge" v-if="myOrders!=0 && typeof (waitPay) != 'undefined'">{{myOrders}}</span>
              </router-link>
            </td>
          </tr>
        </table>
        <table class="my-orders-container" style="padding: 0;">
          <tr class="my-order-item">
            <td style="position: relative;width:25%;text-align: center;">
              <router-link :to="{path: '/orderList',query: {selected:'one'}}" class="order-item-child">待付款</router-link>
              <!--<mt-badge class="badge" size="small" type="error">{{waitPay==0?'':waitPay}}</mt-badge>-->
            </td>
          </tr>
          <tr class="my-order-item">
            <td style="position: relative;width:25%;text-align: center;">
              <router-link :to="{path: '/orderList',query: {selected:'two'}}" class="order-item-child">确认中</router-link>
              <!--<span class="my-badge" v-if="verifying!=0">{{verifying}}</span>-->
            </td>
          </tr>
          <tr class="my-order-item">
            <td style="position: relative;width:25%;text-align: center;">
              <router-link :to="{path: '/orderList',query: {selected:'three'}}" class="order-item-child">待发货
              </router-link>
              <!--<span class="my-badge" v-if="waitReceiver!=0">{{waitReceiver}}</span>-->
            </td>
          </tr>
          <tr class="my-order-item">
            <td style="position: relative;width:25%;text-align: center;">
              <router-link :to="{path: '/orderList',query: {selected:'four'}}" class="order-item-child">我的订单
              </router-link>
            </td>
          </tr>
        </table>
      </div>
      <mt-button size="large" type="primary" @click.navite="toLogOut" style="position: fixed;left: 0;bottom: 45px;background-color: #FE8B0D;">
        退出当前账户
      </mt-button>
    </div>
    <div v-if="isLogin()" class="update-pwd-container-person">
      <!--<router-link to="/updatePwd" class="update-pwd-person">修改密码</router-link>-->
      <mt-cell title="  修改密码" is-link  is-link to="/updatePwd">
        <!--<span>信息</span>-->
        <img slot="icon" src="../../images/myOrder/update-pwd1-1.png" width="24" height="24">
      </mt-cell>
    </div>
    <div v-if="isLogin()" class="update-pwd-container-person">
      <!--<router-link to="/updatePwd" class="update-pwd-person">修改密码</router-link>-->
      <mt-cell title="  店铺信息" is-link to="/shopInfo">
        <!--<span>信息</span>-->
        <img slot="icon" src="../../images/myOrder/shopinfo1-1.png" width="24" height="24">
      </mt-cell>
    </div>
    <div v-if="isLogin()" class="update-pwd-container-person" @click.navite="toAuthIdentity">
      <!--<router-link to="/updatePwd" class="update-pwd-person">修改密码</router-link>-->
      <mt-cell title="  实名认证">
        <!--<span>信息</span>-->
        <img slot="icon" src="../../images/myOrder/shop-auth1-1.png" width="24" height="24">
      </mt-cell>
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
        <tr>
          <td>开 户 行 ：</td>
          <td>{{zihoOpenBank}}</td>
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
        zihoBank: '',
        zihoOpenBank: ''
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
          this.zihoOpenBank = response.data['zihoOpenBank']
          this.myOrders = response.data['mapStatusAndCount']['myOrders']
          this.waitPay = response.data['mapStatusAndCount']['waitPay']
          this.waitReceiver = response.data['mapStatusAndCount']['waitReceiver']
          this.verifying = response.data['mapStatusAndCount']['verifying']
        })
      },
      toAuthIdentity: function () {
        this.$http.post('/authIdentity/getAuthInfo').then((response) => {
          if (response.data != null && response.data.length > 0) {
            let authType = '网上销售'
            if (response.data[0]['auth_type'] === '1') {
              authType = '实体店'
            }
            this.$toast('您已完成' + authType + '实名认证!')
          } else {
            this.$router.push('authIdentity')
          }
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
    position: absolute;
    right: 20px;
    top: 0;
    font-size: 8px;
    width:20px;
    height: 20px;
    background-color: red;
    text-align: center;
    color: white;
    line-height: 20px;
    border-radius: 10px;
    /*font-size: 8px;*/
    /*width:26px;*/
    /*padding:0 6px;*/
    /*background-color: red;*/
    /*text-align: center;*/
    /*margin-left:-4px;*/
    /*margin-top:-1px;*/
    /*color: white;*/
    /*line-height: 15px;*/
    /*border-radius: 8px;*/
  }
  .persons-user-title-container{
    margin:0px;
    padding: 30px 0;
    background-color: #FE8B0D ;
    /*background: url("../../images/myOrder/person-title.png");*/
    /*!*background-repeat: no-repeat;*!*/
    /*background-repeat: repeat;*/
    /*background-position: 0 0 ;*/
  }
</style>
