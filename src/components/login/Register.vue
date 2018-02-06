<template>
  <div class="register">
    <div class="top-fixed-header title">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title-desc">快速注册</div>
    </div>
    <div class="content">
      <mt-field label="手机号码" v-model="phone" :attr="{ maxlength:11}" placeholder="请输入手机号码" style="color:red;" class="horizontal"></mt-field>
      <mt-field label="验 证 码" v-model="verifyCode" placeholder="请输入验证码" style="color:red;" class="horizontal" >
        <mt-cell title="获取验证码" @click="changeSmsVerifyCode" class="authcode"></mt-cell>
      </mt-field>
      <mt-field label="密   码" v-model="password" :attr="{maxlength: 18 }" type="password" placeholder="请输入最少6位数密码" style="color:red;" class="horizontal"></mt-field>
      <mt-field label="邀 请 码" placeholder="留空则由系统为您分配业务员" class="horizontal"></mt-field>
      <mt-button type="primary" size="large" class="registerButton" @click.navite="handleRegister">注册</mt-button>
      <mt-cell><span class="serviceTip">点击注册，即代表同意</span>
        <div class="serviceProtocol" @click.navite="showServiceProtocol">《**服务协议》</div>
      </mt-cell>
      <div class="afterSaleByPhone">遇到问题，请致电 : 020-81636906</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import {validatePhone, validateStrLength} from '../../common/FormValidate'

  Vue.use(Mint)
  export default {
    components: {
      Icon
    },
    name: 'register',
    data: function () {
      return {
        phone: '',
        password: '',
        imageVerifyCode: ''
      }
    },
    methods: {
      changeSmsVerifyCode: function () {
        this.$http.post('/validate/createPhoneSmsVerifyCode').then(
          (response) => {
            this.$toast('发送成功请查收')
          }
        )
      },
      showServiceProtocol: function () {
        window.location.href = './serviceProtocol'
      },
      handleRegisterBefore: function () { // 注册表单提交校验
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
      handleRegister: function () {
        if (!this.handleRegisterBefore()) {
          return false
        }
        this.$http.post('/login/register', {phone: this.phone, password: this.password, verifyCode: this.imageVerifyCode, verifyCodeType: 2}).then((response) => {
          this.$router.push('login')
        })
      }
    }
  }
</script>

<style scoped>
  .register {
    margin-bottom: 0;
    flex-direction: column;

  }

  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 18px;
    font-weight: bold;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 15px;
  }

  .content {
    margin-top: 45px;
  }

  .horizontal {
    border-bottom: 1px solid rgba(51, 51, 51, 0.42);
  }

  .authcode {
    width: 95px;
    color: deepskyblue;
    font-size: 12px;
  }

  .authcode :hover {
    color: deepskyblue;
  }

  .registerButton {
    margin-top: 15px;
  }

  .serviceTip {
    color: #333;
  }

  .serviceProtocol {
    text-decoration: underline;
    color: #199ED8;
  }

  .afterSaleByPhone {
    margin-top: 40px;
    color: #333;
    text-align: center;
  }
</style>
