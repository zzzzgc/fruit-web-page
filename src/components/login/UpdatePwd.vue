<template>
  <div class="update-pwd">
    <title-info titleContent="修改密码"></title-info>
    <div class="content">
      <mt-field label="手机号码:" placeholder="请输入手机号码" style="color:red;" class="horizontal"></mt-field>
      <div style="display: flex;flex-direction: row;">
        <mt-field label="验 证 码" placeholder="请输入验证码" style="color:red;flex:3;" class="horizontal" v-model="verifyCode"></mt-field>
        <img :src="fullPathImg" style="flex: 1;" width="120" height="49" @click.navite="changeImagesVerifyCode"/>
      </div>
      <mt-field label="手机验证码:" placeholder="请输入验证码" style="color:red;" class="horizontal">
        <mt-cell title="获取验证码" to="www.baidu.com" class="authcode"></mt-cell>
      </mt-field>
      <mt-field label="请输入新密码:" type="password" placeholder="请输入最少6位数密码" style="color:red;" class="horizontal"></mt-field>
      <mt-field label="请确认新密码:" type="password" placeholder="请输入最少6位数密码" style="color:red;" class="horizontal"></mt-field>
      <mt-button type="primary" size="large" class="registerButton">重设密码</mt-button>
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
        fullPathImg: ''
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
