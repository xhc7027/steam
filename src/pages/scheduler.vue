<template>
  <q-page class="scheduler-page page flex">
    <div class="container full-width">
      <h1>产线实时状况</h1>
      <p>&nbsp;</p>
      <hsb-machine :tasks="tasksData"></hsb-machine>
      <p>&nbsp;</p>
      <h2>检测机模拟</h2>
      <p>&nbsp;</p>
      <hsb-simulator></hsb-simulator>
    </div>
  </q-page>
</template>
<script>
import HsbSimulator from 'components/modules/simulator'
import HsbMachine from 'components/modules/machine'

export default {
  name: 'scheduler-page',
  data () {
    return {
      tasksService: null,
      tasksData: []
    }
  },
  mounted () {
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
        console.log('task created=======================')
        this.refresh()
      })
      this.tasksService.on('updated', task => {
        console.log('task updated=======================')
        this.refresh()
      })
      this.$feathers.service('commands').on('goto', args => {
        console.log('COMMAND GOTO --------------------------------------', args)
      })
      this.$feathers.service('messages').on('done', args => {
        console.log('COMMAND DONE --------------------------------------', args)
        this.notice('DONE ' + args.stage)
      })
      this.refresh()
    }).catch(e => {
      console.error('$feathers authentication error:=====', e)
    })
  },
  methods: {
    refresh () {
      this.tasksService.find({}).then(results => {
        console.info('results--', results)
        this.tasksData = results.data
      })
    }
  },
  components: {
    HsbSimulator,
    HsbMachine
  }
}
</script>
<style lang="stylus">
</style>
