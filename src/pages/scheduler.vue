<template>
  <q-page class="scheduler-page page flex">
    <div class="container full-width">
      <h1>产线实时状况</h1>
      <p>&nbsp;</p>
      <div class="line row gutter-xs">
        <div class="station entry col col-2">
          <label>进料</label>
        </div>
        <div v-for="x in [1,2,3,4,5,6,7,8,9]" :key="x" class="station col col-1">
          <label class="number">{{x}}</label>
        </div>
        <div class="station col col-1">
          <label>出料</label>
        </div>
      </div>
      <p>&nbsp;</p>
      <h2>检测机模拟</h2>
      <p>&nbsp;</p>
      <div class="row">
        <q-btn color="secondary" @click="onCreateTask">进料</q-btn>
        <q-btn color="secondary" @click="onMove">MOVE</q-btn>
      </div>
      <div class="row">
        <q-btn color="negative" @click="onReset">RESET</q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'scheduler-page',
  data () {
    return {
      tasksService: null
    }
  },
  mounted () {
    console.log('scheduler--age--mounted---$feathers', this.$feathers)
    this.$feathers.authenticate({
      strategy: 'local',
      email: 'steam-web@huishoubao.com.cn',
      password: '123456'
    }).then((result) => {
      console.log('log-----', 'feathers loggedin', result)
      this.$feathers.io.on('pong', data => {
        console.log('$feathers on pong////', data)
      })
      this.tasksService = this.$feathers.service('tasks')
      this.tasksService.on('created', task => {
        this.refresh()
      })
      this.tasksService.on('updated', task => {
        this.refresh()
      })
    }).catch(e => {
      console.error('$feathers authentication error:=====', e)
    })
  },
  methods: {
    refresh () {
      console.log('scheduler---refresh')
      this.tasksService.find({}).then(results => {
        console.info('results--', results)
      })
    },
    onCreateTask () {
      console.log('log-----', 'onCreateMessage')
      this.tasksService.create({
        product: 'C180823001100000000007',
        stage: 0
      })
    },
    onMove () {
      console.log('sheduler--tasks', this.tasksService)
    },
    onReset () {
      // 删除所有测试数据
      this.tasksService.remove(null, {
        query: {
          stage: 0
        }
      }).then(result => {
        console.log('log-----reset', result)
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
