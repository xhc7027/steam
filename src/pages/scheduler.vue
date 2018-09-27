<template>
  <q-page class="scheduler-page page flex">
    <div class="container full-width">
      <h1>产线实时状况</h1>
      <p>&nbsp;</p>
      <div class="line row gutter-xs">
        <div class="station col col-2">
          <label>进料</label>
        </div>
        <div class="station col col-2">
          <label class="number">1</label>
        </div>
        <div class="station col col-2">
          <label class="number">2</label>
        </div>
        <div class="station col col-2">
          <label></label>
        </div>
        <div class="station col col-2">
          <label></label>
        </div>
        <div class="station col col-2">
          <label></label>
        </div>
      </div>
      <p>&nbsp;</p>
      <q-btn color="secondary">进料</q-btn>
      <p>&nbsp;</p>
      <q-btn color="secondary" @click="onCreateMessage">Message create</q-btn>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'scheduler-page',
  mounted () {
    console.log('scheduler--[age--mounted---$feathers', this.$feathers)
    this.$feathers.authenticate({
      strategy: 'local',
      email: '782135@qq.com',
      password: 'Mko0nji**'
    }).then((result) => {
      console.log('log-----', 'feathers loggedin', result)
      let service = this.$feathers.service('messages')
      this.$feathers.io.on('pong', data => {
        console.log('$feathers on pong////', data)
      })
      service.on('created', message =>
        console.log('Created a message======', message))
      service.on('updated', message =>
        console.log('messages updated======', message))
    }).catch(e => {
      console.error('$feathers authentication error:=====', e)
    })
  },
  methods: {
    onCreateMessage () {
      console.log('log-----', 'onCreateMessage')
      let service = this.$feathers.service('messages')
      service.create({
        text: 'Brand new message from vue'
      })
    }
  }
}
</script>
<style lang="stylus">
.scheduler-page
  .station
    height 100px
    position relative
    background-color #f7f7f7
    text-align center
    padding 10px
    .h2
      bottom 0
</style>
