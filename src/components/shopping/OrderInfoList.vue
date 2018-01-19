<template>
  <div class="products">
    <div v-if="param_array != null" v-for="(product, index) in param_array" :key="product.id">
      <div class="product">
        <img :src='product.img' alt="">
        <span class="top_left_str">[{{product.country =='中国'?'国产':'进口'}}]{{product.product_name}}</span>
        <span class="sub_str">{{product.product_standard_name}}</span>
        <span class="lower_right_str"><span style="color: red;">￥{{product.sell_price}}</span> X {{product.num}}</span>
      </div>
    </div>
    <div v-else v-for="(product, index) in products" :key="product.id">
      <div class="product">
        <img  :src='product.img' alt="">
        <span class="top_left_str">[{{product.country =='中国'?'国产':'进口'}}]{{product.product_name}}</span>
        <span class="sub_str">{{product.product_standard_name}}</span>
        <span class="lower_right_str"><span
          style="color: red;">￥{{product.sell_price}}</span> X {{product.num}}{{product.measure_unit}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        // 数据示例
        products: [
          {
            img: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 1,
            country: '中国',
            product_name: '天山雪莲',
            measure_unit: '箱',
            product_standard_name: '1朵',
            sell_price: 999.00,
            num: 27
          },
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 2,
            country: '美国',
            product_name: '牛油果',
            measure_unit: '箱',
            product_standard_name: '12个',
            sell_price: 20.00,
            num: 5
          },
          {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515150264681&di=342c6500978767844cf0a0a345d18c57&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7e3e6709c93d70cfa27f83e9f2dcd100bba12b48.jpg',
            id: 3,
            country: '菲律宾',
            product_name: '大芒果',
            measure_unit: '箱',
            product_standard_name: '24个',
            sell_price: 15.00,
            num: 10
          }
        ]
      }
    },
    props: {
      'param_array': this.param_array
    },
    mounted: function () {
    }
  }
</script>

<style scoped lang="scss">
  .products {
    box-shadow: 0px 0px 15px #888888;
    border-bottom: 1px solid #676767;
    border-top: 1px solid #676767;
    margin: 10px 0;
    .product {
      box-shadow: 0px 10px 15px #888888;
      /*border: 1px solid; // 临时*/
      box-sizing: border-box;
      height: 90px;
      font-size: 14px;
      margin: 10px 0px 10px 0px;
      background-color: white;
      border-radius: 15px;
      /*border-bottom: 5px solid #676767;*/
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
  }
</style>
