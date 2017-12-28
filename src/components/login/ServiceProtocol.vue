<template>
    <div class="service-protocol">
      <div class="top-fixed-header title">
        <div class="back" @click="$router.go(-1)">
          <icon scale="1.6" name="angle-left"></icon>
        </div>
        <div class="title-desc">快速注册</div>
      </div>
      <div class="content">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
          nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
      </div>
    </div>
</template>

<script>
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    name: 'service-protocol',
    components: {
      Icon
    }
  }
</script>

<style scoped>
  .service-protocol {
    margin-bottom: 0;
    flex-direction: column;
  }
  .title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px 20px 0;
    font-size: 18px;
    font-weight: bold;
  }
  .back{
    position: absolute;
    top: 10px;
    left:15px;
  }
  .content{
    margin-top:55px;
    text-indent: 25px;
    padding:10px;
    line-height: 30px;
  }
</style>
