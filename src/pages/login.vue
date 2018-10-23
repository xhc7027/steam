<template>
  <div class="login-page page">
    <h1>登录</h1>
    <p>&nbsp;</p>
    <q-input v-model="username"
      name="username"
      placeholder="用户名"
      v-validate="'required'"
      :error="errors.has('username')">
      <validate-error
        message="请输入用户名"
        ></validate-error>
    </q-input>
    <q-input v-model="password"
      name="password"
      type="password"
      placeholder="密码"
      v-validate="'required'"
      :error="errors.has('password')">
      <validate-error
        message="请输入密码"
        ></validate-error>
    </q-input>
    <p>&nbsp;</p>
    <q-btn color="secondary"
      class="login-btn"
      @click="login">登录</q-btn>
  </div>
</template>
<script>
export default {
  name: 'login-page',
  data () {
    return {
      username: 'guoyuxiang',
      password: 'a123123',
      system_id: '114'
    }
  },
  methods: {
    login () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$http.post('/login', {
            data: {
              username: this.username,
              password: this.password,
              system_id: this.system_id
            }
          }).then(response => {
            localStorage.setItem('userid', response.userid)
            localStorage.setItem('username', this.username)
            localStorage.setItem('token', response.token)
            localStorage.setItem('system_id', response.token)
            this.$router.push(this.$route.query.r || '/create')
          })
        } else {
          this.notice('请填写用户名密码')
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.login-page
  .login-btn
    width 200px
</style>
