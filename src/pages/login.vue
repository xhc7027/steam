<template>
  <div class="login-page page">
    <h1>登录</h1>
    <p>&nbsp;</p>
    <login-module />
  </div>
</template>
<script>
import LoginModule from '@components/modules/login'

export default {
  name: 'login-page',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    LoginModule
  }
}
</script>
<style lang="stylus">
</style>
