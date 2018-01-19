<template>
  <div class="order-info">
    <!--TopBar-->
    <div class="top-fixed-header header">
      <div class="back" @click="$router.go(-1)">
        <icon scale="1.6" name="angle-left"></icon>
      </div>
      <div class="title">获取的数据</div>
    </div>

    <!--content-->
    <div class="content">
      <div class="goods_info">
        <table>
          <tr>
            <td>配送时间:</td>
            <td>次日08:00--10:00</td>
          </tr>
          <tr>
            <td>配送方式:</td>
            <td>市场车</td>
          </tr>
          <tr>
            <td>收 货 人:</td>
            <td>张小姐 12329090000</td>
          </tr>
          <tr>
            <td>收货地址:</td>
            <td>贵州省贵阳市（小件都要捆一下）</td>
          </tr>
        </table>
      </div>
      <hr>
      <div class="products">
        <div v-if="products.length > 0" v-for="(product, index) in products" :key="product.id" class="product-item">

          <div class="product">
            <img :src='product.img' alt="">
            <span class="top_left_str">[{{product.import=='中国'?'国产':'进口'}}]{{product.product_name}}</span>
            <span class="sub_str">{{product.product_standard_name}}</span>
            <span class="lower_right_str"><span
              style="color: red;">￥{{product.sell_price}}</span>*{{product.num}}</span>
          </div>

        </div>
      </div>
      <hr>
      <span class="count_str">共{{countNum}}件</span>
      <table class="order_detail">
        <tr>
          <td>商品金额:</td>
          <td>￥{{countPrice}}</td>
        </tr>
        <tr>
          <td>物 流 费:</td>
          <td>发货后按实际产生费用收取</td>
        </tr>
      </table>

    </div>

    <!--底栏-->
    <table class="bottom_bar" style="position: fixed;background-color: red">
      <tr>
        <td>实付款</td>
        <td>提交订单</td>
      </tr>
    </table>

    <!--<mt-tabbar  v-model="selected">-->
    <!--<mt-tab-item >实付款</mt-tab-item>-->
    <!--<mt-tab-item >提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->

    <!--<mt-tabbar style="position: fixed;height: 50px;" v-model="selected">-->
    <!--<mt-tab-item style="text-align: right">实付款</mt-tab-item>-->
    <!--<mt-tab-item style="text-align: center;background-color: red">提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <!--<mt-tabbar style="position: fixed;height: 50px;" v-model="selected">-->
    <!--<mt-tab-item style="text-align: right">实付款</mt-tab-item>-->
    <!--<mt-tab-item style="text-align: center;background-color: red;">提交订单</mt-tab-item>-->
    <!--</mt-tabbar>-->

  </div>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/angle-left'
  import MtTabbar from '../../../node_modules/mint-ui/packages/tabbar/src/tabbar.vue'
  import MtTabItem from '../../../node_modules/mint-ui/packages/tab-item/src/tab-item.vue'

  export default {
    name: 'orderInfo',
    computed: {
      countNum: function () {
        // 商品总数
        let count = 0
        console.log(count)
        for (let product of this.products) {
          count += product.num
        }
        console.log(count)
        return count
      },
      countPrice: function () {
        // 商品总金额
        let price = 0.0
        for (let product of this.products) {
          price += product.num * product.sell_price
          console.log(price)
        }
        return price
      }
    },
    data: function () {
      return {
        selected: true,
        orderId: '',
        products: [
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 1,
            import: '中国',
            product_name: '天山雪莲',
            product_standard_name: '1朵',
            sell_price: 999.00,
            num: 27
          },
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 2,
            import: '美国',
            product_name: '牛油果',
            product_standard_name: '12个',
            sell_price: 20.00,
            num: 5
          },
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 3,
            import: '菲律宾',
            product_name: '大芒果',
            product_standard_name: '24个',
            sell_price: 15.00,
            num: 10
          }
        ]
      }
    },
    mounted: function () {
      console.log('totalPay:' + this.$route.query.orderId)
      this.orderId = this.$route.query.orderId
      // 获取预微信预支付
      this.http.post('/order/createPayOrder', {'orderId': this.orderId})
        .then(
          (response) => {

          }, (response) => {

          }
        )
    },
    components: {
      MtTabItem,
      MtTabbar,
      Icon
    },
    methods: {
      getProducts: function () {
        // 获取下单商品
        this.$http.post('/order/createOrder', {'standardIds': this.standardIds})
          .then((res) => {
              // 成功执行
              console.log(res)
              console.log('返回的数据:' + res.data)
              this.$router.push({path: '/orderInfo', query: {'orderId': res.data}})
            },
            (res) => {
              // 失败执行
              console.log(res)
              console.log('失败返回的数据:' + res.data)
              this.$router.push({path: '/orderInfo', query: {'orderId': res.data}})
            }
          )
      }
    }
  }
</script>

<style scoped lang="scss">

  .header {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 20px;
    .back {
      position: absolute;
      left: 20px;
      top: 10px;
    }
  }

  .content {
    padding: 55px 0 88px;
    margin-left: 15px;
    margin-right: 15px;
    /*margin-top: 50px;*/
    tr {
      line-height: 30px;
      td:nth-child(2) {
        width: 250px;
        padding-left: 10px;
      }
    }

    .product {
      /*border: 1px solid; // 临时*/
      box-sizing: border-box;
      height: 90px;
      font-size: 14px;
      background-color: white;
      margin-bottom: 10px;
      margin-left: 10px;
      border-radius: 15px;
      img {
        float: left;
        width: 80px;
        height: 80px;
        margin-top: 5px;
        margin-left: 10px;
      }

      .top_left_str {
        margin-top: 30px;
      }

      .sub_str {
        // 把span的行级升级为块级模块,避免span因为空间充足而不换行的渲染span,导致多行并在一行上
        display: block;
        color: darkgrey;
        /*margin-left: 100px;*/
      }

      .lower_right_str {
        display: block;
        text-align: right;
        line-height: 50px;
        margin-right: 5px;
      }
    }

    .count_str {
      display: block;
      text-align: right;
    }

    .order_detail {
      td:nth-child(2) {
        text-align: right;
        color: red;
      }
    }
  }

  .bottom_bar {

  }


</style>
