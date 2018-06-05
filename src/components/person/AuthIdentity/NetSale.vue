<template>
    <div class="net-sale">
      <titlt-info titleContent="实名认证(无实体店)"></titlt-info>
      <div class="netSale-shop-info">
        <mt-field label="法人姓名：" :attr="{ maxlength: 5 }" :readonly="isEdit" placeholder="请输入法人姓名" v-model="businessAuth.legal_person_name"></mt-field>
        <mt-field label="身份证号：" :attr="{ maxlength: 18 }" :readonly="isEdit" placeholder="请输入身份证号" v-model="businessAuth.identity"></mt-field>
        <mt-field label="银行卡帐号：" :attr="{ maxlength: 19 }" :readonly="isEdit" placeholder="请输入银行卡帐号" v-model="businessAuth.bank_account"></mt-field>
      </div>
      <div class="netSale-shop-img" v-show="!isEdit">
        <div style="display: flex;flex-direction: column;">
          <div id="img_identity_front_container" class="img_container">
            <div>
              <img :src="imgDefault1" id="img_identity_front" class="uploader-img"/>
            </div>
            <input type="file" id="file1" @change="doUpload"  accept="image/*"/>
          </div>
          <div id="img_identity_reverse_container" class="img_container">
            <div>
              <img :src="imgDefault2" id="img_identity_reverse" class="uploader-img"/>
            </div>
            <input type="file" id="file2" @change="doUpload"  accept="image/*"/>
          </div>
          <div id="img_online_shop_container" class="img_container">
            <div>
              <img :src="imgDefault3" id="img_online_shop"  class="uploader-img"/>
            </div>
            <input type="file" id="file3" @change="doUpload"  accept="image/*"/>
          </div>
        </div>
        <mt-button size="large" type="primary" @click.navite="saveAuthInfo">确认</mt-button>
      </div>
      <div v-show="isEdit" style="width:100%;margin:0 auto;">
        <div style="margin: 20px auto;width:274px;">
          <img :src="businessAuth.img_identity_front" class="uploader-img"/>
        </div>
        <div style="margin: 20px auto;width:274px;">
          <img :src="businessAuth.img_identity_reverse" class="uploader-img"/>
        </div>
        <div style="margin: 20px auto;width:274px;">
          <img :src="businessAuth.img_online_shop" class="uploader-img"/>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import TitltInfo from '../../common/TitleInfo'
  import MtField from 'mint-ui/packages/field/src/field'
  import MtButton from 'mint-ui/packages/button/src/button'
  import Mint from 'mint-ui'
  import {imgUrlPrefix, urlPrefix, imgUrlPrefix2} from '../../../common/const'
  import lrz from 'lrz'

  Vue.use(Mint)
  export default {
    name: 'net-sale',
    components: {
      MtButton,
      MtField,
      TitltInfo
    },
    data: function () {
      return {
        imgList: [],
        config: {
          quality: 0.7
        },
        businessAuth: {
          legal_person_name: '',
          identity: '',
          bank_account: '',
          img_identity_front: '',
          img_identity_reverse: '',
          img_online_shop: '',
          auth_type: '2'
        },
        imgDefault1: require('../../../images/default/img_identity_front2.png'),
        imgDefault2: require('../../../images/default/img_identity_reverse2.png'),
        imgDefault3: require('../../../images/default/img_online_shop2.png'),
        imgUrlPrefix,
        urlPrefix,
        isEdit: false
      }
    },
    methods: {
      doUpload: function (e) {
        var self = this
        if (e.target.files.length === 0) return
        let fileId = e.target.id
        var file = e.target.files[0]
        console.log('fileSize:' + file.size)
        if (400 * 1024 >= file.size) {
          self.config.quality = 1
        } else {
          self.config.quality = 0.7
        }
        lrz(file, this.config).then(function (rst) {
          let img = {
            key: 0,
            name: rst.origin.name,
            size: rst.base64.length,
            file: rst.base64
          }
          if (fileId === 'file1') {
            img.key = 1
            self.imgList[0] = img
            let fileReader = new FileReader()
            fileReader.onloadend = function () {
              if (fileReader.readyState === fileReader.DONE) {
                document.getElementById('img_identity_front').setAttribute('src', fileReader.result)
              }
            }
            fileReader.readAsDataURL(file)
          } else if (fileId === 'file2') {
            img.key = 2
            self.imgList[1] = img
            let fileReader = new FileReader()
            fileReader.onloadend = function () {
              if (fileReader.readyState === fileReader.DONE) {
                document.getElementById('img_identity_reverse').setAttribute('src', fileReader.result)
              }
            }
            fileReader.readAsDataURL(file)
          } else if (fileId === 'file3') {
            img.key = 3
            self.imgList[2] = img
            let fileReader = new FileReader()
            fileReader.onloadend = function () {
              if (fileReader.readyState === fileReader.DONE) {
                document.getElementById('img_online_shop').setAttribute('src', fileReader.result)
              }
            }
            fileReader.readAsDataURL(file)
          }
        }).catch(function (err) {
          console.log(err)
        }).always(function () {
          // e.target.value = null
        })
      },
      remove: function (idx) {
        this.imgList.splice(idx, 1)
      },
      isExitImgList: function (key, img) { // 判断是否存在,若存在并删除
        // var _this = this
        var flag = false
        for (var i = 0; i < this.imgList.length; i++) {
          if (key === this.imgList[i].key) {
            flag = true
            this.imgList[i] = img
          }
        }
        return flag
      },
      initDrawImg: function () { // 初始化图片页面
        var fileTag1 = document.getElementById('file1')
        var fileTag2 = document.getElementById('file2')
        var fileTag3 = document.getElementById('file3')
        var _this = this
        fileTag1.onchange = function () {
          var file = fileTag1.files[0]
          let img = {
            key: 1,
            name: file.name,
            size: file.size,
            file: file
          }
          // var flag = _this.isExitImgList(1, img)
          // if (!flag) {
          //   _this.imgList.push(img)
          // }
          _this.imgList[0] = img
          var fileReader = new FileReader()
          fileReader.onloadend = function () {
            if (fileReader.readyState === fileReader.DONE) {
              document.getElementById('img_identity_front').setAttribute('src', fileReader.result)
            }
          }
          fileReader.readAsDataURL(file)
        }
        fileTag2.onchange = function () {
          var file = fileTag2.files[0]
          let img = {
            key: 2,
            name: file.name,
            size: file.size,
            file: file
          }
          // var flag = _this.isExitImgList(2, img)
          // if (!flag) {
          //   _this.imgList.push(img)
          // }
          _this.imgList[1] = img
          var fileReader = new FileReader()
          fileReader.onloadend = function () {
            if (fileReader.readyState === fileReader.DONE) {
              document.getElementById('img_identity_reverse').setAttribute('src', fileReader.result)
            }
          }
          fileReader.readAsDataURL(file)
        }
        fileTag3.onchange = function () {
          var file = fileTag3.files[0]
          let img = {
            key: 3,
            name: file.name,
            size: file.size,
            file: file
          }
          // var flag = _this.isExitImgList(3, img)
          // if (!flag) {
          //   _this.imgList.push(img)
          // }
          _this.imgList[2] = img
          var fileReader = new FileReader()
          fileReader.onloadend = function () {
            if (fileReader.readyState === fileReader.DONE) {
              document.getElementById('img_online_shop').setAttribute('src', fileReader.result)
            }
          }
          fileReader.readAsDataURL(file)
        }
      },
      saveAuthInfoBefore: function () {
        var flag = true
        var showErro = ''
        var showType = 0
        if (this.businessAuth.legal_person_name === '') {
          flag = false
          showErro = '法人姓名'
        } else if (this.businessAuth.identity === '') {
          flag = false
          showErro = '身份证号'
        } else if (this.businessAuth.bank_account === '') {
          flag = false
          showErro = '银行卡号'
        }
        if (!flag) {
          if (showType === 0) {
            this.$toast(showErro + '输入格式有误！')
          } else {
            this.$toast('请选择三个图片')
          }
        }
        return flag
      },
      saveAuthInfo: function () {
        let formData = new FormData()
        if (!this.saveAuthInfoBefore()) {
          return false
        }
        this.$indicator.open({
          text: '提交中...',
          spinnerType: 'fading-circle'
        })
        this.imgList.forEach((item, index) => {
          item.name = 'imgFiles[' + index + ']'
          formData.append(item.name, item.file)
        })
        // 新建请求
        const xhr = new XMLHttpRequest()
        xhr.open('POST', urlPrefix + 'authIdentity/addAuthInfoImgTwo', true)
        xhr.send(formData)
        var _this = this
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            let datas = JSON.parse(xhr.responseText)
            _this.businessAuth.img_identity_front = imgUrlPrefix2 + datas[0]
            _this.businessAuth.img_identity_reverse = imgUrlPrefix2 + datas[1]
            _this.businessAuth.img_online_shop = imgUrlPrefix2 + datas[2]
            _this.$http.post('/authIdentity/addAuthInfo', _this.businessAuth).then((response) => {
              _this.businessAuth.legal_person_name = ''
              _this.businessAuth.bank_account = ''
              _this.businessAuth.identity = ''
              _this.businessAuth.img_online_shop = ''
              _this.businessAuth.img_identity_reverse = ''
              _this.businessAuth.img_identity_front = ''
              document.getElementById('img_identity_front').setAttribute('src', _this.imgDefault1)
              document.getElementById('img_online_shop').setAttribute('src', _this.imgDefault3)
              document.getElementById('img_identity_reverse').setAttribute('src', _this.imgDefault2)
              _this.$router.push({path: '/login'})
              _this.$indicator.close()
              _this.$toast('添加成功')
              // this.getAuthInfoByUid()
            })
          } else {
            _this.$indicator.close()
            _this.$toast('添加失败')
          }
        }
      },
      getAuthInfoByUid: function () {
        this.$http.post('/authIdentity/getAuthInfoByUid', this.businessAuth).then((response) => {
          if (response.data !== null && response.data !== '' && response.data.length > 0 && typeof (response.data[0]) !== 'undefined') {
            this.businessAuth.legal_person_name = response.data[0]['legal_person_name']
            this.businessAuth.bank_account = response.data[0]['bank_account']
            this.businessAuth.identity = response.data[0]['identity']
            this.businessAuth.img_identity_front = response.data[0]['img_identity_front'].split('images')[0]
            this.businessAuth.img_identity_reverse = response.data[0]['img_identity_reverse'].split('images')[0]
            this.businessAuth.img_online_shop = response.data[0]['img_online_shop'].split('images')[0]
            this.isEdit = true
          }
        })
      },
      getUserId: function () {
        console.log(this.$route.query.userId)
        if (typeof (this.$route.query.userId) === 'undefined' || this.$route.query.userId === null || this.$route.query.userId === '') {
          this.$http.post('/authIdentity/getUId').then((response) => {
            this.businessAuth.u_id = response.data[0]
          })
        } else {
          this.businessAuth.u_id = this.$route.query.userId
        }
      }
    },
    mounted: function () {
      // this.initDrawImg() // 初始化图片页面
      this.getUserId()
      this.getAuthInfoByUid()
    }
  }
</script>

<style scoped>
  .net-sale {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .netSale-shop-info {
    color: #ff0000;
    margin-top: 60px;
  }

  .img_container{
    margin:13px auto;
  }
  .uploader-img{
    width:274px;
    height: 144px;
  }
</style>
