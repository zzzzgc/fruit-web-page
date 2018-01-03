<template>
  <div class="order-info">
      <div class="top-fixed-header header">
        <div class="back" @click="$router.go(-1)">
          <icon scale="1.6" name="angle-left"></icon>
        </div>
        <div>获取的数据{{this.$route.params.totalPay}}</div>
        <div class="payInfo">

        </div>
      </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/angle-left'

  export default {
    name: 'orderInfo',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted: function () {
      console.log(this.$route.params.totalPay)
    },
    components: {
      Icon
    },
    props: [
      'totalPay'
    ]
  }
</script>

<style scoped lang="scss">
  .header {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back, .edit {
      position: absolute;
      top: 10px;
    }
    .back {
      left: 20px;
    }
    .edit {
      right: 20px;
      font-size: 17px;
    }
  }
</style>
