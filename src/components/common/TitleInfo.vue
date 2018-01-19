<template>
    <div class="title-info">
      <div class="top-fixed-header title">
        <div class="back" @click="$router.go(-1)">
          <icon scale="1.6" name="angle-left"></icon>
        </div>
        <div class="title-desc">{{titleContent}}</div>
      </div>
    </div>
</template>

<script>
  import 'vue-awesome/icons/angle-left'
  import Icon from 'vue-awesome/components/Icon'
  import 'mint-ui/lib/style.css'

  export default {
    name: 'title-info',
    props: {
      'titleContent': this.titleContent
    },
    components: {
      Icon
    }
  }
</script>

<style scoped>
  .title-info{
    margin:0 0 0 0;
    padding:0;
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
</style>
