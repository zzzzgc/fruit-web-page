<template>
    <div class="forget-pwd">
      <div class="top-fixed-header title">
        <div class="back" @click="$router.go(-1)">
          <icon scale="1.6" name="angle-left"></icon>
        </div>
        <div class="title-desc">忘记密码</div>
      </div>
      <div class="content">
        <mt-field label="手机号码"  v-model="phone" placeholder="请输入手机号码" :attr="{ maxlength:11}" style="color:red;" class="horizontal"></mt-field>
        <mt-field label="验 证 码" placeholder="请输入验证码" style="color:red;" class="horizontal">
          <mt-cell title="获取验证码" to="www.baidu.com" class="authcode"></mt-cell>
        </mt-field>
        <mt-field label="新 密 码" v-model="password" type="password"  placeholder="请输入最少6位数密码" :attr="{maxlength: 18 }"  style="color:red;" class="horizontal"></mt-field>
        <mt-button type="primary" size="large" class="registerButton" @click.navite="resetPwdForForget">重设密码</mt-button>
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
    name: 'forget-pwd',
    components: {
      Icon
    },
    data: function () {
      return {
        phone: '',
        validCode: '',
        password: ''
      }
    },
    methods: {
      resetPwdForForgetBefore: function () {  // 重设密码的提交表单的校验
        var flag = true
        var errorMsg = ''
        if (!validatePhone(this.phone)) {
          flag = false
          errorMsg = '手机号码'
        } else if (!validateStrLength(this.password)) {
          flag = false
          errorMsg = '新密码'
        }
        if (!flag) {
          this.$toast(errorMsg + '输入的格式有误!')
        }
        return flag
      },
      resetPwdForForget: function () {
        if (!this.resetPwdForForgetBefore()) {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .forget-pwd {
    margin-bottom: 0;
  }
  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 18px;
    font-weight: bold;
  }
  .back{
    position: absolute;
    top: 10px;
    left:15px;
  }

  .content{
    margin-top:45px;
  }
  .horizontal{
    border-bottom:1px solid rgba(51, 51, 51, 0.42);
  }
  .authcode{
    width:95px;
    color:deepskyblue;
    font-size:12px;
  }
  .authcode :hover{
    color:deepskyblue;
  }
  .registerButton{
    margin-top:15px;
  }
</style>
