<template>
  <div class="products">
    <div v-for="(product, index) in products" :key="product.id" class="product-item">
      <div class="product">
        <img :src='product.img' alt="">
        <span class="top_left_str">[{{product.country =='中国'?'国产':'进口'}}]{{product.product_name}}</span>
        <span class="sub_str">{{product.product_standard_name}}</span>
        <span class="lower_right_str"><span
          style="color: red;">￥{{product.sell_price}}</span> X {{product.num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order-info-list",
    data: function () {
      return {
        
      }
    },
    props: function () {
      
    }
  }
</script>

<style scoped type="scss">
  .products {
    border-bottom: 1px solid #676767;
    margin-bottom: 10px;
    .product {
      /*border: 1px solid; // 临时*/
      box-sizing: border-box;
      height: 90px;
      font-size: 14px;
      background-color: white;
      margin-bottom: 10px;
      margin-left: 10px;
      border-radius: 15px;
      border-bottom: 5px solid #676767;
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
