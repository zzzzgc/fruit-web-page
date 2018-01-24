<template>
  <div class="physical-shop">
    <titlt-info titleContent="实名认证(实体店)"></titlt-info>
    <div class="physical-shop-info">
      <form id="businessAuthForm" method="post" action="" enctype="multipart/form-data">
      <mt-field label="法人姓名：" name="legal_person_name" placeholder="请输入法人姓名" v-model="businessAuth.legal_person_name"></mt-field>
      <mt-field label="身份证号：" name="identity" placeholder="请输入身份证号" v-model="businessAuth.identity"></mt-field>
      <mt-field label="银行卡帐号：" name="bank_account" placeholder="请输入银行卡帐号" v-model="businessAuth.bank_account"></mt-field>
      <mt-field label="营业执照号：" name="business_license" placeholder="请输入营业执照号" v-model="businessAuth.business_license"></mt-field>
      </form>
    </div>
    <div class="physical-shop-img">
      <div style="display: flex;flex-direction: column;">
        <div id="img_identity_front_container" class="img_container">
          <div>
            <img :src="imgDefault1" id="img_identity_front" class="uploader-img"/>
          </div>
          <input type="file" id="file1" />
        </div>
        <div id="img_identity_reverse_container" class="img_container">
          <div>
            <img :src="imgDefault2" id="img_identity_reverse" class="uploader-img"/>
          </div>
          <input type="file" id="file2" />
        </div>
        <div id="img_license_container" class="img_container">
          <div>
            <img :src="imgDefault3" id="img_license"  class="uploader-img"/>
          </div>
          <input type="file" id="file3" />
        </div>
      </div>
      <mt-button size="large" type="primary" @click.navite="saveAuthInfo">确认</mt-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TitltInfo from '../../common/TitleInfo'
  import MtField from 'mint-ui/packages/field/src/field'
  import { mapState } from 'vuex'
  import MtButton from 'mint-ui/packages/button/src/button'
  import Mint from 'mint-ui'

  Vue.use(Mint)
  export default {
    name: 'physical-shop',
    components: {
      MtButton,
      MtField,
      TitltInfo
    },
    data: function () {
      return {
        imgList: [],
        businessAuth: {
          legal_person_name: '',
          identity: '',
          bank_account: '',
          business_license: '',
          img_identity_front: '',
          img_identity_reverse: '',
          img_license: ''
        },
        imgDefault1: require('../../../images/default/img_identity_front.png'),
        imgDefault2: require('../../../images/default/img_identity_reverse.png'),
        imgDefault3: require('../../../images/default/img_license.png')
      }
    },
    computed: {
      ...mapState({
        imgStatus: state => state.imgstore.img_status,
        imgPaths: state => state.imgstore.img_paths
      })
    },
    methods: {
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
        console.log('initDrawImg')
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
          var flag = _this.isExitImgList(1, img)
          if (!flag) {
            _this.imgList.push(img)
          }
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
          var flag = _this.isExitImgList(2, img)
          if (!flag) {
            _this.imgList.push(img)
          }
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
          var flag = _this.isExitImgList(3, img)
          if (!flag) {
            _this.imgList.push(img)
          }
          var fileReader = new FileReader()
          fileReader.onloadend = function () {
            if (fileReader.readyState === fileReader.DONE) {
              document.getElementById('img_license').setAttribute('src', fileReader.result)
            }
          }
          fileReader.readAsDataURL(file)
        }
      },
      saveAuthInfoBefore: function () {
        var flag = true
        var showErro = ''
        var showType = 0
        if (this.businessAuth.legal_person_name.trim() === '') {
          flag = false
          showErro = '法人姓名'
        } else if (this.businessAuth.identity.trim() === '') {
          flag = false
          showErro = '身份证号'
        } else if (this.businessAuth.bank_account.trim() === '') {
          flag = false
          showErro = '银行卡号'
        } else if (this.businessAuth.business_license.trim() === '') {
          flag = false
          showErro = '营业执照号'
        } else if (this.imgList.length < 3) {
          flag = false
          showType = 1
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
        this.imgList.forEach((item, index) => {
          item.name = 'imgFiles[' + index + ']'
          formData.append(item.name, item.file)
        })
        // 新建请求
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:8090/authIdentity/addAuthInfoImg', true)
        xhr.send(formData)
        var _this = this
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            let datas = JSON.parse(xhr.responseText)
            _this.businessAuth.img_identity_front = datas[0]
            _this.businessAuth.img_identity_reverse = datas[1]
            _this.businessAuth.img_license = datas[2]
            _this.$http.post('/authIdentity/addAuthInfo', _this.businessAuth).then((response) => {
              if (response.data === 1) {
                _this.businessAuth.legal_person_name = ''
                _this.businessAuth.bank_account = ''
                _this.businessAuth.identity = ''
                _this.businessAuth.business_license = ''
                _this.businessAuth.img_license = ''
                _this.businessAuth.img_identity_reverse = ''
                _this.businessAuth.img_identity_front = ''
                document.getElementById('img_identity_front').setAttribute('src', _this.imgDefault1)
                document.getElementById('img_license').setAttribute('src', _this.imgDefault3)
                document.getElementById('img_identity_reverse').setAttribute('src', _this.imgDefault2)
                _this.$toast('添加成功')
              } else {
                _this.$toast('添加失败')
              }
            })
          } else {
            _this.$toast('添加失败')
          }
        }
      }
    },
    mounted: function () {
      this.initDrawImg() // 初始化图片页面
    }
  }
</script>

<style scoped>
  .physical-shop {
    margin: 0;
    padding: 0;
  }

  .physical-shop-info {
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
