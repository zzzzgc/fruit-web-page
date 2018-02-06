<template>
  <div class="login-info">
    <div class="top-fixed-header title">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title-desc">会员登录</div>
    </div>
    <div class="page-navbar">
      <div class="page-title">Navbar</div>
      <!-- navbar -->
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">
          <div class="subtitleitem">密码登录</div>
        </mt-tab-item>
        <mt-tab-item id="2">
          <div class="subtitleitem">短信登录</div>
        </mt-tab-item>
      </mt-navbar>
      <div class="horizontal"></div>
      <!-- tabcontainer -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
          <mt-field :state="phoneValidation" label="手机号码" type="tel" :attr="{maxlength: 11 }" v-model="phone" placeholder="请输入手机号码"
                    style="color:red;" class="horizontal"></mt-field>
          <mt-field :state="passwordValidation" label="密   码" :attr="{maxlength: 18 }"  type="password" placeholder="请输入密码" v-model="password" style="color:red;"
                    class="horizontal"></mt-field>
          <div style="display: flex;flex-direction: row;">
            <mt-field label="验 证 码" style="color:red;flex:3;" class="horizontal" v-model="verifyCode"></mt-field>
            <img :src="fullPathImg" style="flex: 1;" width="120" height="49" @click.navite="changeImagesVerifyCode"/>
          </div>
          <div class="pwdmanage">
            <mt-checklist
              v-model="value"
              align="left"
              :options="['记住密码']" class="rememberPwd">
            </mt-checklist>
            <mt-cell-swipe title="忘记密码" class="forgetPwd" to="./forgetPwd"> </mt-cell-swipe>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field label="手机号码" v-model="phone" placeholder="请输入手机号码" style="color:red;" class="horizontal"></mt-field>
          <mt-field label="验 证 码" v-model="msgCode" placeholder="请输入验证码" style="color:red;" class="horizontal">
            <mt-cell title="获取验证码" to="www.baidu.com" class="authcode"></mt-cell>
          </mt-field>
          <div class="pwdmanage">
            <mt-checklist
              v-model="value"
              align="left"
              :options="['记住密码']" class="rememberPwd">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <login-bottom @changeVerifyCode="changeImagesVerifyCode" :phone="phone" :password="password" :verifyCode="verifyCode" :selected="selected" :msgCode="msgCode"></login-bottom>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
//  import bus from '../../common/bus'
  import loginBottom from './LoginBottom'
  import 'mint-ui/lib/style.css'
  import {validatePhone, validateStrLength} from '../../common/FormValidate'
  import {urlPrefix} from '../../common/const'

  Vue.use(Mint)
  export default {
    name: 'login',
    components: {
      Icon,
      loginBottom
    },
    data: function () {
      return {
        // phone: '',
        // password: '',
        phone: '13242871762',
        password: '111111',
        phoneValidation: null,
        passwordValidation: null,
        selected: '1',
        value: [],
        fullPathImg: '',
        verifyCode: '',
        msgCode: ''
      }
    },
    watch: {
      phone: function (newStr, oldStr) {
        this.vailablePhone(newStr)
      },
      password: function (newStr, oldStr) {
        this.vailablePassword(newStr)
      }
    },
    methods: {
      back: function () {
        history.back()
      },
      vailablePhone: function (phone) {
        var validtion = validatePhone(phone)
        if (validtion) {
          this.phoneValidation = 'success'
        } else {
          this.phoneValidation = 'error'
        }
      },
      vailablePassword: function (pwd) {
        var validtion = validateStrLength(pwd)
        if (validtion) {
          this.passwordValidation = 'success'
        } else {
          this.passwordValidation = 'error'
        }
      },
      // 获取图片验证码
      changeImagesVerifyCode: function () {
        this.$http.post('/validate/createImagesVerifyCode').then((response) => {
          this.fullPathImg = urlPrefix + response.data
          this.verifyCode = ''
        })
      }
    },
    mounted: function () {
      // 初始化验证码
      this.changeImagesVerifyCode()
    }
  }
</script>

<style scoped>
  .login-info {
    margin-bottom: 0;
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

  .login-info {
    font-size: 16px;

  }

  table tr td:first-child {
    padding-right: 10px;
  }

  .page-navbar {
    margin-top: 18px;
  }

  .pwdmanage {
    display: flex;
  }

  .rememberPwd {
    margin-top: -8px;
    flex: 1;
  }

  .forgetPwd {
    text-align: right;
    padding-right: 1rem;
    flex: 1;
  }

  .authcode {
    width: 95px;
    color: deepskyblue;
    font-size: 12px;
  }

  .authcode :hover {
    color: deepskyblue;
  }

  .subtitle {
    margin-bottom: 10px;
  }

  .subtitleitem {
    font-size: 15px;
  }

  .horizontal {
    border-bottom: 1px solid rgba(51, 51, 51, 0.42);
  }
</style>
