<template>
  <div class="register">
    <div class="top-fixed-header title">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title-desc">快速注册</div>
    </div>
    <div class="content">
      <mt-field label="手机号码"  placeholder="请输入手机号码" style="color:red;" class="horizontal"></mt-field>
      <mt-field label="验 证 码"  placeholder="请输入验证码" style="color:red;" class="horizontal">
        <mt-cell title="获取验证码" to="www.baidu.com" class="authcode"></mt-cell>
      </mt-field>
      <mt-field label="密   码" type="password"  placeholder="请输入最少6位数密码" style="color:red;" class="horizontal"></mt-field>
      <mt-field label="邀 请 码"  placeholder="留空则由系统为您分配业务员" class="horizontal"></mt-field>
      <mt-button type="primary" size="large" class="registerButton">注册</mt-button>
      <mt-cell ><span class="serviceTip">点击注册，即代表同意</span>
        <div class="serviceProtocol" @click.navite="showServiceProtocol">《**服务协议》</div>
      </mt-cell>
      <div class="afterSaleByPhone">遇到问题，请致电 : 02009090999</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import Mint from 'mint-ui'
  import 'mint-ui/lib/style.css'
  Vue.use(Mint)
  export default {
    components: {
      Icon
    },
    name: 'register',
    methods: {
      showServiceProtocol: function () {
        window.location.href = './serviceProtocol'
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
  .serviceTip{
    color:#333;
  }
  .serviceProtocol{
    text-decoration:underline;
    color:#199ED8;
  }
.afterSaleByPhone{
  margin-top:40px;
  color:#333;
  text-align: center;
}
</style>
