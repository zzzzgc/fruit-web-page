<template>
    <div class="persons">
      <div class="persons-header">
        <div class="persons-user-title">
          <div class="user-phone">1353940xxxx</div>
          <div class="user-logout" @click.navite="toLogOut">退出当前用户</div>
          <div class="persons-blank"></div>
        </div>

        <!--     <div style="display: flex;flex-direction:row;margin-left:30px;margin-top:25px;">
               <div class="shop-info" style="flex:1;"><span style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">店铺信息</span></div>
               <div class="shop-info" style="flex:1;"><span  style="width:150px;height:90px;line-height: 90px;border:1px solid #333;text-align: center;padding:35px 42px;">实名认证</span></div>
             </div>-->
        <div class="persons-info">
          <div class="shop-info"><span >店铺信息</span></div>
          <div class="shop-info"><span  >实名认证</span></div>
        </div>
        <div class="my-orders">
          <table class="my-orders-container">
            <tr class="order-item">
              <td><router-link :to="{path: '/orderList',query: {selected:'one'}}" class="order-item-child">待付款</router-link></td>
            </tr>
            <tr class="order-item">
              <td><router-link :to="{path: '/orderList',query: {selected:'two'}}" class="order-item-child">确认中</router-link></td>
            </tr>
            <tr class="order-item">
              <td><router-link :to="{path: '/orderList',query: {selected:'three'}}" class="order-item-child">代发货</router-link></td>
            </tr>
            <tr class="order-item">
              <td><router-link :to="{path: '/orderList',query: {selected:'four'}}" class="order-item-child">我的订单</router-link></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="update-pwd-container">
        <router-link to="/forgetPwd" class="update-pwd">修改密码</router-link>
      </div>

      <div class="receiver">
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
       <bottom-menu></bottom-menu>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Mint from 'mint-ui'
  import BottomMenu from '../common/BottomMenu'
  import {logout} from '../../common/session'
  import './css/persons.css'

  Vue.use(Mint)
  export default {
    name: 'persons',
    components: {
      BottomMenu
    },
    methods: {
      toLogOut: function () {
        this.$http.post('/login/logout').then((response) => {
          logout()
          this.$router.push('/login')
        })
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>

</style>
