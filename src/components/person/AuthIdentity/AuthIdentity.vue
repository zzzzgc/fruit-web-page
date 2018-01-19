<template>
    <div class="auth-identity">
      <title-info titleContent="实名认证"></title-info>
      <div class="persons-info">
        <div class="auth-shop-info">
          <router-link to="/physicalShop" style="text-decoration: none">
            <div style="margin-top:18%;">
              <span style="display: block;">实体店</span><span>有工商注册营业执照</span>
            </div>
          </router-link>
        </div>
        <router-link to="netSale" style="text-decoration: none">
          <div class="auth-shop-info" style="line-height: 90px;"><span  >实名认证</span></div>
        </router-link>
      </div>
      <mt-button type="primary" size="large" style="margin-top:120px;">确认</mt-button>
    </div>
</template>

<script>
  import TitleInfo from '../../common/TitleInfo'
  import MtButton from 'mint-ui/packages/button/src/button'
  export default {
    name: 'auth-identity',
    components: {
      MtButton,
      TitleInfo
    }
  }
</script>

<style scoped>
  .auth-identity{
    margin:0;
    padding:0;
  }
  .persons-info{
    display: flex;
    flex-direction:row;
    margin-top:115px;
  }
  .auth-shop-info{
    width:150px;
    height:90px;
    font-size:14px;
    border:1px solid #999;
    text-align: center;
    margin:0 auto;
  }
</style>
