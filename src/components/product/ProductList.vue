<template>
  <div class="products">
    <!--顶部搜索-->
    <top-search></top-search>
    <div class="content">
      <ul v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="25">
      <product-item v-for="(p, index) in products" :product="p" :key="p.id"></product-item>
      </ul>
      <p v-if="loading" class="page-infinite-loading" style="margin-left:48%;">
        <mt-spinner type="fading-circle" color="#333">
        </mt-spinner>
      </p>
      <p v-if="isTotalCount" style="text-align: center;font-size:14px;color:#999;margin-bottom:5px;">
        -------------------------------- 我 是 有 底 线 的 --------------------------------
      </p>
    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
  import ProductItem from './ProductItem'
//  import * as moment from 'moment'
  import BottomMenu from '../common/BottomMenu'
  import TopSearch from '../common/TopSearch'

  export default {
    name: 'ProductList',
    components: {
      ProductItem,
      TopSearch,
      BottomMenu
    },
    props: ['type', 'groupType', 'recommendType', 'searchKeyword'], // 目前只能是字符串类型，不能是int
    created: function () {
    },
    mounted: function () {
      this.getProducts()
    },
    data () {
      return {
        pageNum: 1,
        loading: false,
        isTotalCount: false,
        products: [
//          {
//            id: 1,
//            standard_id: 1,
//            img: 'https://m.360buyimg.com/n12/jfs/t7534/129/384294096/341045/82f5c2bc/5992767dN7f1b68cd.jpg!q70.jpg',
//            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
//            standard_name: '30头',
//            sub_title: '硬度可以|甜度适中',
//            week_sell_num: 10,
//            sell_price: 168.3,
//            original_price: 170.3,
//            measure_unit: '箱'
//          }, {
//            id: 2,
//            standard_id: 5,
//            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3274/255/5964761354/180636/ae32c44/5899a140N189f9e9a.jpg!q50.jpg',
//            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤 孕妇水果2500g 红香蕉 红皮香蕉5斤 孕妇水果2500g',
//            standard_name: '30头',
//            sub_title: '硬度可以|甜度适中',
//            week_sell_num: 10,
//            sell_price: 168.3,
//            original_price: 170.3,
//            measure_unit: '箱'
//          }, {
//            id: 3,
//            standard_id: 8,
//            img: 'https://m.360buyimg.com/n12/jfs/t5701/13/2547305966/121523/2c59804c/5931774aN090bef86.jpg!q70.jpg',
//            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤',
//            standard_name: '30头',
//            sub_title: '硬度可以|甜度适中',
//            week_sell_num: 10,
//            sell_price: 168.3,
//            original_price: 170.3,
//            measure_unit: '箱'
//          }, {
//            id: 4,
//            standard_id: 11,
//            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t8011/225/1657108972/589852/c39de36b/59bcd4adN217d06f0.jpg!q50.jpg',
//            name: '前岩山 福建土楼特产水果美人蕉 红香蕉 红皮香蕉5斤前岩山 福建土楼特产水果美人蕉',
//            standard_name: '30头',
//            sub_title: '硬度可以|甜度适中',
//            week_sell_num: 10,
//            sell_price: 168.3,
//            original_price: 170.3,
//            measure_unit: '箱'
//          }
        ]
      }
    },
    methods: {
      loadMore: function () {
        if (!this.isTotalCount) {
          this.loading = true
        }
        setTimeout(() => {
          let url = '/product/list' // 按照默认条件查找商品
          let params = {pageNum: this.pageNum}
          if (this.type && this.type !== '0') { // 按照类型查找商品
            url = '/product/listType'
            params.typeId = this.type
          } else if (this.groupType && this.groupType !== '0') { // 按照类型分组查找商品
            url = '/product/listGroupType'
            params.groupTypeId = this.groupType
          } else if (this.recommendType && this.recommendType !== '0') { // 按照推荐类型查找商品
            url = '/product/listRecommendType'
            params.recommendTypeId = this.recommendType
          } else if (this.searchKeyword && this.searchKeyword !== '') { // 按照关键字查找商品
            url = '/product/listKeyword'
            params.keyword = this.searchKeyword
          }
          params.pageSize = this.products.length + 5
          this.$http.post(url, params).then((response) => {
            this.products = response.data.products
            if (response.data.isTotalCount) {
              this.isTotalCount = response.data.isTotalCount
            }
          })
          this.loading = false
          // let last = this.products[this.products.length - 1]
          // for (let i = 1; i <= 10; i++) {
          //   this.products.push(last + i)
          // }
        }, 2500)
      },
      getProducts: function () {
        this.isTotalCount = false
        let url = '/product/list' // 按照默认条件查找商品
        let params = {pageNum: this.pageNum}
        if (this.type && this.type !== '0') { // 按照类型查找商品
          url = '/product/listType'
          params.typeId = this.type
        } else if (this.groupType && this.groupType !== '0') { // 按照类型分组查找商品
          url = '/product/listGroupType'
          params.groupTypeId = this.groupType
        } else if (this.recommendType && this.recommendType !== '0') { // 按照推荐类型查找商品
          url = '/product/listRecommendType'
          params.recommendTypeId = this.recommendType
        } else if (this.searchKeyword && this.searchKeyword !== '') { // 按照关键字查找商品
          url = '/product/listKeyword'
          params.keyword = this.searchKeyword
        }
        this.$http.post(url, params).then((response) => {
          this.products = response.data.products
        })
      }
    },
    computed: {
//      searchKeyword: function () {
//        return this.$route.query.keyword
//      }
    },
    watch: {
      searchKeyword: function (val, oldVal) { // 此处只能使用监听的方式，更新商品列表，因为搜索后还是在当前页面，所以不会执行mounted
        this.getProducts()
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content {
    width:100%;
    padding: 44px 0;
    box-sizing: border-box;
  }
</style>

<style>

</style>
