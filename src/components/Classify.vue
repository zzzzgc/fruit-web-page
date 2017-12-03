<template>
  <div>
    <top-search></top-search>
    <div class="classify">
      <div v-for="item in typeGroups" class="item line-block" :key="item.id">
        <div class="title">{{item.name}}</div>
        <div class="item-child">
          <router-link v-for="itemChild in types" v-if="itemChild.group_id == item.id" :to="productListUrl(itemChild.id)" :key="itemChild.id">{{itemChild.name}}</router-link>
        </div>
        <router-link :to="productListGroupUrl(item.id)" class="more">全部</router-link>
      </div>
    </div>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import TopSearch from './common/TopSearch'
  import BottomMenu from './common/BottomMenu'

  export default {
    name: 'Classify',
    components: {
      TopSearch,
      BottomMenu
    },
    created: function () {
    },
    mounted: function () {
      this.getData()
    },
    data () {
      return {
        typeGroups: [],
        types: []
      }
    },
    methods: {
      goSearch: function (val) {
        console.info('搜索商品关键字为：%s', val)
      },
      getData: function () {
        this.$http.post('/classify/get').then((response) => {
          this.typeGroups = response.data.groups
          this.types = response.data.types
        })
      },
      productListUrl: function (typeId) {
        return '/product/list/' + typeId
      },
      productListGroupUrl: function (groupId) {
        return '/product/list/0-' + groupId
      }
    },
    computed: {
    }
  }
</script>
<style scoped lang="scss">
  .classify {
    /*overflow: auto;*/
    padding: 44px 0;
    box-sizing: border-box;
    /*height: 100%;*/
    .item {
      padding: 10px;
      background: white;
      .title,.more {
        text-align: center;
        padding: 5px 0;
        font-size: 17px;
      }
      .title {
        font-weight: bold;
        border-bottom: 1px solid #e4e4e4;
      }
      .item-child {
        padding: 10px 10px;
        a {
          display: inline-block;
          padding: 10px;
          color: black;
        }
      }
      .more {
        display: block;
        color: black;
        border-top: 1px solid #e4e4e4;
      }
    }
    .line-block {
      margin-bottom: 15px;
      box-sizing: border-box;
      overflow-y: hidden;
      background: white;
    }
  }
</style>
