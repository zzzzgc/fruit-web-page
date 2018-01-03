<template>
  <div class="login-bottom">
    <mt-button type="primary" size="large" class="loginClick" @click.native='handleLogin'>登录</mt-button>
    <mt-button type="default" size="large" style="border:1px solid #797979;color:black;" @click.native="handleRegister">
      注册
    </mt-button>
    <!--<mt-cell  value="新商家注册之后需要审核，审核将在一个工作日内完成!"></mt-cell>-->
    <div class="registryTip">新商家注册之后需要审核，审核将在一个工作日内完成!</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
//  import bus from '../../common/bus'
  import { homeUrl } from '../../common/const.js'
  import session from '../../mixins/sessionMixin'

  Vue.use(Mint)

  export default {
    name: 'login-bottom',
    mixins: [session],
    components: {
      Icon
    },
    data: function () {
      return {
      }
    },
    props: [
      'phone',
      'password'
    ],
    methods: {
      handleLogin: function () {
        this.$http.post('/login/auth', Object.assign({}, {phone: this.phone, password: this.password}), {showLoading: true}).then((response) => {
          let userInfo = {
            username: this.phone,
            password: this.password
          }
          this.setLoginUser(userInfo)
          this.$router.push(homeUrl)
        })
      },
      handleRegister: function () {
        this.$router.push('./register')
      }
    }
  }
</script>

<style>
  .loginClick {
    margin-bottom: 15px;
    margin-top: 5px;
  }

  .registryTip {
    font-size: 14px;
    color: #797979;
    margin: 10px auto;
    text-align: center;
  }

</style>
