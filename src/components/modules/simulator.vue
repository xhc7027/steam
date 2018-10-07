<template>
  <div class="simulator">
    <div class="buttons row">
      <q-input class="serial-input" v-model="serial"></q-input>
      <q-btn color="secondary" @click="onCreateTask">进料</q-btn>
    </div>
    <div class="buttons row">
      <q-btn color="secondary" @click="onMove">MOVE</q-btn>
      <q-btn color="negative" @click="onReset">RESET</q-btn>
    </div>
    <p>&nbsp;</p>
    <h2>发送指令到APP (goto command)</h2>
    <div class="buttons row">
      <q-btn color="secondary" @click="commandGoto('lcd.white')">LCD white</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.blue')">LCD blue</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.grey')">LCD grey</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.red')">LCD red</q-btn>
      <q-btn color="secondary" @click="commandGoto('touch')">TOUCH</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera1')">CAMERA 1</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera2')">CAMERA 2</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera3')">CAMERA 3</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera4')">CAMERA 4</q-btn>
      <q-btn color="secondary" @click="commandGoto('sensors')">SENSORS</q-btn>
    </div>
    <p>&nbsp;</p>
    <h2>模拟检测机发送指令 (on-position message)</h2>
    <div class="buttons row">
      <q-btn color="secondary" @click="messageOnposition('lcd')">LCD</q-btn>
      <q-btn color="secondary" @click="messageOnposition('touch')">TOUCH</q-btn>
      <q-btn color="secondary" @click="messageOnposition('camera1')">CAMERA 1</q-btn>
      <q-btn color="secondary" @click="messageOnposition('camera2')">CAMERA 2</q-btn>
      <q-btn color="secondary" @click="messageOnposition('camera3')">CAMERA 3</q-btn>
      <q-btn color="secondary" @click="messageOnposition('camera4')">CAMERA 4</q-btn>
      <q-btn color="secondary" @click="messageOnposition('sensors')">SENSORS</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'simulator',
  data () {
    return {
      serial: '100000000017'
    }
  },
  methods: {
    onCreateTask () {
      this.$feathers.service('tasks').create({
        product: this.serial,
        stage: 0
      })
    },
    onMove () {
      console.log('sheduler--tasks', this.tasksService)
    },
    commandGoto (stage) {
      this.$feathers.service('command').create({
        name: 'goto',
        data: {
          stage: stage,
          sn: '100000000017'
        }
      }) // work
      // console.log('$feather', this.$feathers.service('command'))
      // this.$feathers.service('command').emit('goto, {stage: 'lcd', color: 'white'}) // not work
    },
    messageOnposition (stage) {
      this.$feathers.service('message').create({
        name: 'on-position',
        data: {
          stage: stage,
          sn: '100000000017'
        }
      })
    },
    onReset () { // 删除所有测试数据
      this.$feathers.service('tasks').remove(null, {
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
.simulator
  .serial-input
    width 200px
    font-size 12px
  .buttons
    margin .5em 0
</style>
