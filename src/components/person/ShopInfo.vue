<template>
  <div class="shop-info-container">
    <title-info titleContent="店铺信息"></title-info>
    <div class="shop-detail">
      <mt-field label="店铺名称:" style="color:#ff0000;" placeholder="所在城市+店名，如广州嘻果"></mt-field>
      <span style="display: block;color:#D6CCD6;width:100%;margin:-5px 0 0 10px;">店铺名称仅限中文+数字，不超过10个字符</span>
      <!--<mt-cell style="color:#D6CCD6;" title="店铺名称仅限中文+数字，不超过10个字符"></mt-cell>-->
      <mt-field  label="联系人：" placeholder="请输入联系人"></mt-field>
      <mt-field  label="联系电话：" placeholder="请输入联系电话"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-field  label="省     市：" style="flex:1;">
        </mt-field>
        <div style="flex: 1;line-height: 44px;">
          <select style="width:50%;text-align: left;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div style="flex: 1;line-height: 44px;">
          <select style="width:50%;text-align: left;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
      <mt-field  label="收货地址：" placeholder="请输入收货地址"></mt-field>
      <mt-field  label="店铺地址：" placeholder="若与收货地址一致，无需填写"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-cell style="color:#ff0000;flex: 0.5;" title="物流方式："></mt-cell>
        <div style="flex: 1;line-height: 44px;">
          <select style="width:25%;text-align: left;">
            <option>请选择</option>
            <option>市场车</option>
            <option>物流</option>
            <option>自提</option>
          </select>
        </div>
      </div>
      <mt-button size="large" type="primary" style="margin-top:20px;">确认</mt-button>
    </div>
  </div>
</template>

<script>
  import TitleInfo from '../common/TitleInfo'
  import MtField from 'mint-ui/packages/field/src/field'
  import 'mint-ui/lib/style.css'
  import MtCell from 'mint-ui/packages/cell/src/cell'
  import MtButton from 'mint-ui/packages/button/src/button'

  export default {
    components: {
      MtButton,
      MtCell,
      MtField,
      TitleInfo},
    name: 'shop-info',
    component: {
      TitleInfo
    }
  }
</script>

<style scoped>
  body{
    width:100%;
    margin:0;
  }
  .shop-info-container {
    width:100%;
    border: 0;
    padding: 0;background-color: white;
  }

  .shop-detail {
    line-height: 34px;
    color: #ff0000;
    margin: 65px 0 0 0;
  }

  .shop-detail span {
    width:27%;
    display: inline-block;
    color: #ff0000;
  }
</style>
