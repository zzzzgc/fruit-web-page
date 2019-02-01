<template>
  <div class="header top-fixed-header">
    <van-search placeholder="请输入商品关键字" @search="goSearch" type="showcase" :class="{ login: isLogin() }" class="search"></van-search>
    <!--<search @on-submit="goSearch" :class="{ login: isLogin() }" :autoFixed="false" :cancel-text="''" class="search"></search>-->
    <!--<mt-search v-model="value"></mt-search>-->
    <div class="left-button" v-if="!isLogin()" @click="toLogin"><span>登录</span></div>
  </div>
</template>

<script>
  import { Search } from 'vant'
//  import { Search } from 'vux'
//  import { Search } from 'mint-ui'
  import session from '../../mixins/sessionMixin'

  export default {
    name: 'TopSearch',
    mixins: [session],
    components: {
      [Search.name]: Search
//      Search
    },
    created: function () {
    },
    mounted: function () {
    },
    data () {
      return {
      }
    },
    methods: {
      goSearch: function (val) {
        this.$router.push({path: '/product/list', query: {keyword: val}})
      }
    }
  }
</script>
<style scoped lang="scss">
  .header {
    .left-button {
      position: absolute;
      top: 0;
      right: 0;
      left: auto;
      height: 100%;
      line-height: 45px;
      font-size: 15px;
      color: #8a8a8a;
      span {
        margin-right: 10px;
      }
    }
    .search {
      width: 100%;
      box-sizing: border-box;
      padding: 5px 60px 5px 10px;
      /*padding-right: 100px;*/
      /*background: white;*/
    }
    .search.login {
      padding-right: 10px;
    }
  }
</style>

<style lang="scss">
  .header .weui-search-bar {
    padding: 0;
    margin: 3px;
    height: 33px;
    background-color: inherit;
  }
  .header .weui-search-bar__cancel-btn {
    display: none !important;
  }
</style>
