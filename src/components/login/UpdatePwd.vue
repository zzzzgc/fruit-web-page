<template>
  <div class="update-pwd">
    <title-info titleContent="修改密码"></title-info>
    <div class="content">
      <mt-field label="手机号码:" v-model="phone" placeholder="请输入手机号码" style="color:red;" class="horizontal" :attr="{maxlength: 11 }"></mt-field>
      <div style="display: flex;flex-direction: row;">
        <mt-field label="验 证 码" v-model="verifyCode" placeholder="请输入验证码" style="color:red;flex:3;" class="horizontal" :attr="{maxlength: 4 }"></mt-field>
        <img :src="fullPathImg" style="flex: 1;" width="120" height="49" @click.navite="changeImagesVerifyCode"/>
      </div>
      <mt-field label="手机验证码:"  v-model="msgCode" placeholder="请输入短信验证码" style="color:red;" class="horizontal">
        <mt-cell title="获取验证码" to="www.baidu.com" class="authcode"></mt-cell>
      </mt-field>
      <mt-field label="请输入新密码:" v-model="password" type="password" placeholder="请输入最少6位数密码" style="color:red;" class="horizontal" :attr="{maxlength: 18 }"></mt-field>
      <mt-field label="请确认新密码:" v-model="validPwd" type="password" placeholder="请输入最少6位数密码" style="color:red;" class="horizontal" :attr="{maxlength: 18 }"></mt-field>
      <mt-button type="primary" size="large" class="registerButton" @click.navite="updatePwd">重设密码</mt-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import TitleInfo from '../common/TitleInfo'
  import {urlPrefix} from '../../common/const'
  import {validatePhone, validateStrLength} from '../../common/FormValidate'

  Vue.use(Mint)
  export default {
    name: 'update-pwd',
    components: {
      Icon,
      TitleInfo
    },
    data: function () {
      return {
        verifyCode: '',
        fullPathImg: '',
        phone: '13242871762',
        password: '111111',
        validPwd: '',
        msgCode: ''
      }
    },
    mounted: function () {
      this.changeImagesVerifyCode()
    },
    methods: {
      // 获取图片验证码
      changeImagesVerifyCode: function () {
        this.$http.post('/validate/createImagesVerifyCode').then((response) => {
          this.fullPathImg = urlPrefix + response.data
          this.verifyCode = ''
        })
      },
      updatePwdBefore: function () {
        var flag = true
        var errorMsg = ''
        if (!validatePhone(this.phone)) {
          flag = false
          errorMsg = '手机号码'
        } else if (this.verifyCode === null || this.verifyCode.trim() === '') {
          flag = false
          errorMsg = '验证码'
        } else if (this.msgCode === null || this.msgCode.trim() === '') {
          flag = false
          errorMsg = '短信验证码'
        } else if (!validateStrLength(this.password)) {
          flag = false
          errorMsg = '密码'
        } else if (this.validPwd !== this.password) {
          flag = false
          errorMsg = '确认密码'
        }
        if (!flag) {
          this.$toast(errorMsg + '输入格式有误!')
        }
        return flag
      },
      updatePwd: function () {
        if (!this.updatePwdBefore()) {
          return false
        }
        this.$http.post('').then((response) => {
        })
      }
    }
  }
</script>

<style scoped>
  .update-pwd {
    margin-bottom: 0;
  }

  .content {
    margin-top: 55px;
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
</style>
