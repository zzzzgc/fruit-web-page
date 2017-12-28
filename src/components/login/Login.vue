<template>
  <div>
    <login-by-pwd></login-by-pwd>
  </div>
</template>

<script>
  export default {
    name: 'login',
    components: {
      loginByPwd: resolve => {
        require(['./LoginByPwd'], resolve)
      }
    }
  }
</script>

<style scoped>

</style>
