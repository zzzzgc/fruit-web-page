<template>
  <div class="shop-info-container">
    <title-info titleContent="店铺信息"></title-info>
    <div class="shop-detail">
      <mt-field label="店铺名称:" placeholder="所在城市+店名，如广州嘻果" v-model="businessInfo.business_name"></mt-field>
      <span style="display: block;color:#D6CCD6;width:100%;text-indent: 10px;">店铺名称仅限中文+数字，不超过10个字符</span>
      <!--<mt-cell style="color:#D6CCD6;" title="店铺名称仅限中文+数字，不超过10个字符"></mt-cell>-->
      <mt-field  label="联系人："  placeholder="请输入联系人" v-model="businessInfo.business_contacts"></mt-field>
      <mt-field  label="联系电话：" placeholder="请输入联系电话" v-model="businessInfo.phone"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-cell style="flex:0.5;color: #ff0000;"  title="省      市：">
        </mt-cell>
        <div style="flex:1;margin-top:8px;text-align: left;color:#000;" @click.navite="showProvinceAndCity">{{businessInfo.address_province}}-{{businessInfo.address_city}}</div>
      </div>
      <mt-field  label="收货地址：" placeholder="请输入收货地址" v-model="businessInfo.address_detail"></mt-field>
      <mt-field  label="店铺地址：" placeholder="若与收货地址一致，无需填写" v-model="businessInfo.address_shop"></mt-field>
      <div style="display: flex;flex-direction: row;background-color: white;">
        <mt-cell style="color:#ff0000;flex: 0.5;" title="物流方式："></mt-cell>
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
      <mt-button size="large" type="primary" style="margin-top:20px;" @click.navite="addBusinessInfo">确认</mt-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TitleInfo from '../common/TitleInfo'
  import 'mint-ui/lib/style.css'
  import Mint from 'mint-ui'
  import {address} from '../../assets/ProvinceAndCity'
  import {validatePhone} from '../../common/FormValidate'

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
        isShowProvinceAndCity: false
      }
    },
    methods: {
      addBusinessInfoBefore: function () {
        var flag = true
        var showError = ''
        if (this.businessInfo.business_name.trim() === '') {
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
      addBusinessInfo: function () {
        if (this.addBusinessInfoBefore()) {
          this.$http.post('/businessInfo/addBusinessInfo', this.businessInfo).then((response) => {
            if (response.data === 1) {
              this.$toast('添加成功')
              this.businessInfo.business_name = ''
              this.businessInfo.business_contacts = ''
              this.businessInfo.phone = ''
              this.businessInfo.address_province = '请选择'
              this.businessInfo.address_city = '请选择'
              this.businessInfo.address_detail = ''
              this.businessInfo.address_shop = ''
              this.businessInfo.shipments_type = '请选择'
            }
          })
        }
      },
      showShipmentsType: function () {
        console.log('123')
        console.log(this.isShowShipmentsType)
        if (!this.isShowShipmentsType) {
          this.isShowShipmentsType = true
        }
        console.log(this.isShowShipmentsType)
      },
      onValuesChange (picker, values) {
        this.businessInfo.shipments_type = values[0]
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
      },
      onValuesChange2 (picker, values) {
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
      showProvinceAndCity: function () {
        this.isShowProvinceAndCity = true
      }
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
