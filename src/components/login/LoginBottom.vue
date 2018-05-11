<template>
  <div class="login-bottom">
    <mt-button type="primary" size="large" class="loginClick" @click.native='handleLogin'>登录</mt-button>
    <mt-button type="primary" size="large" v-show="isAuth" class="loginClick" @click.native='handleLogin'>去认证</mt-button>
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
  import {homeUrl} from '../../common/const.js'
  import session from '../../mixins/sessionMixin'
  import {validatePhone, validateStrLength} from '../../common/FormValidate'

  Vue.use(Mint)

  export default {
    name: 'login-bottom',
    mixins: [session],
    components: {
      Icon
    },
    data: function () {
      return {}
    },
    props: [
      'phone',
      'password',
      'msgVerifyCode',
      'imageVerifyCode',
      'selected',
      'rememberPW'
    ],
    methods: {
      toLoginByPwdBefore: function () {  // 密码登录校验
        var flag = true
        var errorMsg = ''
        if (!validatePhone(this.phone)) {
          flag = false
          errorMsg = '手机号码'
        } else if (!validateStrLength(this.password)) {
          flag = false
          errorMsg = '密码'
        }
        if (!flag) {
          this.$toast(errorMsg + '输入格式有误!')
        }
        return flag
      },
      toLoginByMsgBefore: function () { // 短信登录校验
        var flag = true
        var errorMsg = ''
        if (!validatePhone(this.phone)) {
          flag = false
          errorMsg = '手机号码'
        } else if (this.msgVerifyCode === null || this.msgVerifyCode.trim() === '') {
          flag = false
          errorMsg = '短信验证码'
        }
        if (!flag) {
          this.$toast(errorMsg + '输入格式有误!')
        }
        return flag
      },
      handleLogin: function () {
        // 密码登录判断
        if (parseInt(this.selected) === 1) {
          if (!this.toLoginByPwdBefore()) {
            return false
          }
          this.login(1, this.imageVerifyCode)
        } else if (parseInt(this.selected) === 2) {
          if (!this.toLoginByMsgBefore()) {
            return false
          }
          this.login(2, this.msgVerifyCode)
        }
      },
      login: function (verifyCodeType, verifyCode) {
        this.$http.post('/login/auth', {phone: this.phone, password: this.password, verifyCode: verifyCode, rememberPW: this.rememberPW, verifyCodeType: verifyCodeType}, {showLoading: true})
          .then(
            (response) => {
              // 本地
              this.setLoginUser(response.data, this.rememberPW)
              // 把本地的购物车移动到数据库中
              this.$http.post('/cart/saveGoodsData', {'cartProducts': JSON.stringify(this.getCartProducts())}).then((response) => {
                // 清空购物车
                this.removeCartProductAll()
              })
              this.$toast('登录成功')
              this.$router.push(homeUrl)
            },
            (response) => {
              this.$emit('changeVerifyCode')
            }
          )
        // this.$emit('changeVerifyCode') 触发父类的修改验证码
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
