<template>
  <div class="physical-shop">
    <titlt-info titleContent="实名认证(实体店)"></titlt-info>
    <div class="physical-shop-info">
      <mt-field label="法人姓名：" placeholder="请输入法人姓名"></mt-field>
      <mt-field label="身份证号：" placeholder="请输入身份证号"></mt-field>
      <mt-field label="银行卡帐号：" placeholder="请输入银行卡帐号"></mt-field>
      <mt-field label="营业执照号：" placeholder="请输入营业执照号"></mt-field>
    </div>
    <div class="physical-shop-img">
      <!--<uploader :options="options" class="uploader-example" style="width:80%">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop style="width:90%;font-size:20px;">
         &lt;!&ndash; <p>Drop files here to upload or</p>
          <uploader-btn>select files</uploader-btn>
          <uploader-btn :attrs="attrs">select images</uploader-btn>
          <uploader-btn :directory="true">select folder</uploader-btn>&ndash;&gt;
          <uploader-btn :attrs="imgTwo" style="width:80%;height:160px;margin:8% 0 0 10%;">上传身份证背面照</uploader-btn>
          <uploader-btn :attrs="imgThree" style="width:80%;height:160px;margin:8% 0 0 10%;">上传营业执照</uploader-btn>
        </uploader-drop>
        <uploader-btn :attrs="imgOne" style="width:80%;height:160px;margin:8% 0 0 10%;">上传身份证正面照</uploader-btn>
        <uploader-list style="width:320px;"></uploader-list>
      </uploader>-->
      <div>
        <uploader
          url="http://localhost:8090/authIdentity/uploadImgs"
        ></uploader>
        <div class="btn" @click="upload">
          上传
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitltInfo from '../../common/TitleInfo'
  import MtField from 'mint-ui/packages/field/src/field'
  import { mapState } from 'vuex'

  export default {
    name: 'physical-shop',
    components: {
      MtField,
      TitltInfo
    },
    data: function () {
      return {
        options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          target: '//localhost:8090/authIdentity/uploadImgs',
          testChunks: false
        },
        imgOne: {
          accept: 'image/*'
        },
        imgTwo: {
          accept: 'image/*'
        },
        imgThree: {
          accept: 'image/*'
        },
        imgs: []
      }
    },
    computed: {
      ...mapState({
        imgStatus: state => state.imgstore.img_status,
        imgPaths: state => state.imgstore.img_paths
      })
    },
    methods: {
      upload () {
        this.$store.commit('set_img_status', 'uploading')
      },
      submit () {
        let values = []
        for (let key of this.imgPaths) {
          values.push(key)
        }
        this.imgs = values
        console.log(this.imgs)
      }
    },
    watch: {
      imgStatus () {
        if (this.imgStatus === 'finished') {
          this.submit()
        }
      }
    },
    destoryed () {
      this.imgs = []
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

  .uploader-example {
    /*width: 880px;*/
    /*width:200px;*/
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .btn {
    width: 100%;
    height: 3em;
    background-color: #169BD5;
    color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
