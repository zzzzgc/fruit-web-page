<template>
  <div class="product-item">
    <div class="pic">
      <img :src="pic" alt="">
    </div>
    <router-link :to="productUrl" class="info">
      <div class="title">{{title}}</div>
      <div class="desc">{{desc}}</div>
      <div class="desc">{{buyInfo}}</div>
    </router-link>
    <div class="product-bottom">
      <div class="price-info">
        <span class="price">{{price}}</span>
        <span class="old-price">{{oriPrice}}</span>
      </div>
      <!--<div class="add-to-cart">加入购物车</div>-->
      <!--<van-button class="add-to-cart" type="default" size="small">加入购物车</van-button>-->
      <div class="add-to-cart">加入购物车</div>
    </div>
  </div>
</template>

<script>
 // import { Button } from 'vant'

  export default {
    name: 'product-item',
    components: {
//      [Button.name]: Button
    },
    props: ['productId', 'url', 'pic', 'title', 'desc', 'buyInfo', 'price', 'oriPrice'],
    created: function () {
    },
    data: function () {
      return {
        searchData: {type: '', status: '', startTime: '', endTime: ''}
      }
    },
    mounted: function () {
    },
    methods: {
    },
    computed: {
      productUrl: function () {
        return '/product/' + this.productId
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-item {
    position: relative;
    padding: 5px 0;
  }
  .pic {
    position: absolute;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    color: black;
    display: block;
    box-sizing: border-box;
    padding: 10px 10px 10px 155px;
    padding-left: 125px;
    height: 85px;
    line-height: 23px;
    font-size: 14px;
    >div {
      /*margin-bottom: 5px;*/
    }
    .title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    >.desc {
      font-size: 13px;
      color: #626262;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .product-bottom {
    position: relative;
    margin: 16px 10px 0 120px;
    /*margin-bottom: 0;*/
    height: 25px;
    >.price-info {
      position: absolute;
      font-size: 13px;
      .price {
        color: red;
        font-size: 15px;
      }
      .old-price {
        text-decoration: line-through;
        font-size: 12px;
        color: #959595;
        margin-left: 10px;
      }
    }
    >.add-to-cart {
      position: absolute;
      right: 0;
      top: -10px;
      padding: 3px 9px;
      font-size: 12px;
      border: 1px solid;
      border-radius: 3px;
      color: #949494;
      background: white;
    }
  }
</style>
