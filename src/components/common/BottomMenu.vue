<template>
  <div class="bottom-fixed-footer">
    <table>
      <tr>
        <td><router-link  to="/" replace><icon scale="1.2" name="home"></icon><div>首页</div></router-link></td>
        <td><router-link to="/classify" replace><icon scale="1.2" name="th"></icon><div>分类</div></router-link></td>
        <!--<td><router-link to="/a"><icon scale="1.2" name="heart"></icon><div>赚钱</div></router-link></td>-->
        <td><router-link to="/cart" replace><icon scale="1.2" name="shopping-cart"></icon><div>购物车</div></router-link></td>
        <td><router-link to="/person" replace><icon scale="1.2" name="user"></icon><div>我的</div></router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import 'vue-awesome/icons/home'
  import 'vue-awesome/icons/th'
  import 'vue-awesome/icons/heart'
  import 'vue-awesome/icons/shopping-cart'
  import 'vue-awesome/icons/user'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    name: 'BottomMenu',
    components: {
      Icon
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
    }
  }
</script>
<style scoped lang="scss">
  .bottom-fixed-footer table {
    width: 100%;
    height: 100%;
    text-align: center;
    a {
      color: #6a6a6a;
    }
    div {
      font-size: 10px;
    }
    i {
      font-size: 16px;
    }
  }
</style>
<style>
  /*.bottom-fixed-footer .router-link-exact-active,*/
  /*.bottom-fixed-footer a:-webkit-any-link {*/
    /*color: inherit;*/
  /*}*/
  .bottom-fixed-footer .router-link-exact-active {
  /*.bottom-fixed-footer .router-link-active {*/
    color: black !important;
  }
</style>
