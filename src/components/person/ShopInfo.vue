<template>
  <div class="shop-info-container">
    <title-info titleContent="店铺信息"></title-info>
    <div class="shop-detail">
      <mt-field label="店铺名称:" :attr="{ maxlength: 10 }" placeholder="所在城市+店名，如广州嘻果" v-model="businessInfo.business_name" :readonly="this.isEdit"></mt-field>
      <span style="display: block;color:#D6CCD6;width:100%;text-indent: 10px;font-size:16px;margin:-10px 0;">店铺名称仅限中文+数字，不超过10个字符</span>
      <!--<mt-cell style="color:#D6CCD6;" title="店铺名称仅限中文+数字，不超过10个字符"></mt-cell>-->
      <mt-field  label="联系人：" :attr="{ maxlength: 5 }"  placeholder="请输入联系人" v-model="businessInfo.business_contacts" :readonly="this.isEdit"></mt-field>
      <mt-field  label="联系电话：" :attr="{ maxlength: 11 }" placeholder="请输入联系电话" v-model="businessInfo.phone" :readonly="this.isEdit"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-cell style="width:117px;;color: #ff0000;"  title="省      市：">
        </mt-cell>
        <div style="flex:1;margin-top:8px;text-align: left;color:#000;" @click.navite="showProvinceAndCity" :readonly="this.isEdit">{{businessInfo.address_province}}-{{businessInfo.address_city}}</div>
      </div>
      <mt-field  label="收货地址：" placeholder="请输入收货地址"  :attr="{ maxlength: 35 }" v-model="businessInfo.address_detail" :readonly="this.isEdit"></mt-field>
      <mt-field  label="店铺地址：" placeholder="若与收货地址一致，无需填写"  :attr="{ maxlength: 35 }" v-model="businessInfo.address_shop" :readonly="this.isEdit"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-cell style="color:#ff0000;width:117px;" title="物流方式："></mt-cell>
        <div style="flex: 1;line-height: 44px;margin-top:4px;text-align: left;color:#000;">
          <div @click.navite="showShipmentsType">{{businessInfo.shipments_type}}</div>
        </div>
      </div>
      <mt-popup position="bottom" v-model="isShowShipmentsType" style="width:100%;padding: 10px 0;">
        <mt-picker :slots="shipmentsType" :visible-item-count="5" @change="onValuesChange"></mt-picker>
      </mt-popup>
      <mt-popup position="bottom" v-model="isShowProvinceAndCity" style="width:100%;padding:20px 0;">
        <mt-picker :slots="addressProvince" value-key="showName" :visible-item-count="5" @change="onValuesChange2"></mt-picker>
      </mt-popup>
      <mt-button size="large" type="primary" style="margin-top:20px;" @click.navite="addBusinessInfo" v-show="!this.isEdit">确认</mt-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TitleInfo from '../common/TitleInfo'
  import 'mint-ui/lib/style.css'
  import Mint from 'mint-ui'
  import {address} from '../../assets/ProvinceAndCity'
  import {validatePhone, validateChineseAndNum} from '../../common/FormValidate'

  Vue.use(Mint)
  export default {
    components: {
      TitleInfo},
    name: 'shop-info',
    data: function () {
      return {
        businessInfo: {
          business_name: '',
          business_contacts: '',
          phone: '',
          address_province: '请选择',
          address_city: '请选择',
          address_detail: '',
          address_shop: '',
          shipments_type: '请选择'
        },
        shipmentsType: [
          {values: ['请选择', '市场车', '物流', '自提']}
        ],
        isShowShipmentsType: false,
        addressProvince: [
          {
            flex: 1,
            values: address,
            defaultIndex: 0,
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            defaultIndex: 0,
            className: 'slot2'
          }, {
            flex: 1,
            values: address[0].city,
            defaultIndex: 0,
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        isShowProvinceAndCity: false,
        isEdit: true
      }
    },
    methods: {
      addBusinessInfoBefore: function () { // 添加商户信息时进行校验
        var flag = true
        var showError = ''
        if (this.businessInfo.business_name.trim() === '' || !validateChineseAndNum(this.businessInfo.business_name)) {
          flag = false
          showError = '商户名称'
        } else if (this.businessInfo.business_contacts.trim() === '') {
          flag = false
          showError = '联系人'
        } else if (!validatePhone(this.businessInfo.phone)) {
          flag = false
          showError = '电话号码'
        } else if (this.businessInfo.address_province.trim() === '' || this.businessInfo.address_province.trim() === '请选择') {
          flag = false
          showError = '省份'
        } else if (this.businessInfo.address_city.trim() === '' || this.businessInfo.address_city.trim() === '请选择') {
          flag = false
          showError = '城市'
        } else if (this.businessInfo.address_detail.trim() === '') {
          flag = false
          showError = '收货地址'
        } else if (this.businessInfo.shipments_type.trim() === '' || this.businessInfo.shipments_type.trim() === '请选择') {
          flag = false
          showError = '物流方式'
        }
        if (!flag) {
          this.$toast(showError + '输入格式有误')
        } else {
          if (this.businessInfo.address_shop.trim() === '') {
            this.businessInfo.address_shop = this.businessInfo.address_detail
          }
        }
        return flag
      },
      addBusinessInfo: function () { // 添加商店信息
        if (this.addBusinessInfoBefore()) {
          this.$http.post('/businessInfo/addBusinessInfo', this.businessInfo).then((response) => {
            if (response.data === 1) {
              this.$toast('添加成功')
              // this.businessInfo.business_name = ''
              // this.businessInfo.business_contacts = ''
              // this.businessInfo.phone = ''
              // this.businessInfo.address_province = '请选择'
              // this.businessInfo.address_city = '请选择'
              // this.businessInfo.address_detail = ''
              // this.businessInfo.address_shop = ''
              // this.businessInfo.shipments_type = '请选择'
              this.getBusinessInfo()
            }
          })
        }
      },
      showShipmentsType: function () { // 通过isShowShipmentsType为true来控制popup显示
        if (!this.isShowShipmentsType && this.isEdit === false) {
          this.isShowShipmentsType = true
        }
      },
      onValuesChange (picker, values) { // 设置物流方式的值
        this.businessInfo.shipments_type = values[0]
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
      },
      onValuesChange2 (picker, values) { // 设置省份城市二级联动
        if (!values[0]) {
          this.$nextTick(() => {
            picker.setValues([address[0], address[0].city[0]])
          })
        } else {
          picker.setSlotValues(1, values[0].city)
          let town = []
          if (values[1]) {
            town = values[1].city
          }
          picker.setSlotValues(2, town)
        }
        if (typeof (values) !== 'undefined' && typeof (values[0]) !== 'undefined' && typeof (values[1]) !== 'undefined' && typeof (values[0].showName) !== 'undefined' && typeof (values[1].showName) !== 'undefined') {
          this.businessInfo.address_province = values[0].showName
          this.businessInfo.address_city = values[1].showName
        }
      },
      showProvinceAndCity: function () { // 通过设置isShowProvinceAndCity的true来设置展示popup
        if (this.isEdit === false) {
          this.isShowProvinceAndCity = true
        }
      },
      getBusinessInfo: function () { // 获取商户信息
        this.$http.post('/businessInfo/getBusinessInfo').then((response) => {
          if (response.data !== null && response.data !== '' && response.data.length > 0 && typeof (response.data[0]) !== 'undefined') {
            this.businessInfo.business_name = response.data[0]['business_name']
            this.businessInfo.business_contacts = response.data[0]['business_contacts']
            this.businessInfo.phone = response.data[0]['phone']
            this.businessInfo.address_detail = response.data[0]['address_detail']
            this.businessInfo.address_shop = response.data[0]['address_shop']
            this.businessInfo.shipments_type = response.data[0]['shipments_type']
            this.businessInfo.address_province = response.data[0]['address_province']
            this.businessInfo.address_city = response.data[0]['address_city']
            // this.businessInfo.shipments_type = this.shipmentsType[0].values[response.data[0]['shipments_type']]
            // this.businessInfo.address_province = address[response.data[0]['address_province']].showName
            // this.businessInfo.address_city = address[response.data[0]['address_province']].city[response.data[0]['address_city'].split('-')[1] - 1].showName
            // this.businessInfo.address_city = address[response.data[0]['address_province'].city[response.data[0]['address_city'].showName]]
            this.isEdit = true
          } else {
            this.isEdit = false
          }
        })
      }
    },
    mounted: function () {
      this.getBusinessInfo()
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
    margin: 55px 0 0 0;
  }
</style>
<style>
  /* 不能删除 去掉mint-ui的cell组件自带的样式 */
  .mint-cell-wrapper{
    background-image: none;
  }
</style>
