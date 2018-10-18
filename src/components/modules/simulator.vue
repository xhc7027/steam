<template>
  <div class="simulator">
    <div class="buttons row">
      <q-input class="sn-input" v-model="sn"></q-input>
      <q-btn color="secondary" @click="onCreateTask">进料</q-btn>
    </div>
    <div class="buttons row">
      <q-btn color="secondary" @click="onMove">MOVE</q-btn>
      <q-btn color="negative" @click="onReset">RESET</q-btn>
    </div>
    <p>&nbsp;</p>
    <h2>发送指令到APP (command goto)</h2>
    <div class="buttons row">
      <q-btn color="secondary" @click="commandGoto('lcd.white')">LCD.white</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.blue')">LCD.blue</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.grey')">LCD.grey</q-btn>
      <q-btn color="secondary" @click="commandGoto('lcd.red')">LCD.red</q-btn>
      <q-btn color="secondary" @click="commandGoto('touch')">TOUCH</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera1')">CAMERA 1</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera2')">CAMERA 2</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera3')">CAMERA 3</q-btn>
      <q-btn color="secondary" @click="commandGoto('camera4')">CAMERA 4</q-btn>
      <q-btn color="secondary" @click="commandGoto('sensors')">SENSORS</q-btn>
    </div>
    <p>&nbsp;</p>
    <h2>模拟从检测机发送指令 (message)</h2>
    <div class="buttons row">
      <q-btn color="secondary" @click="messageHello(123)">HELLO</q-btn>
      <q-btn color="secondary" @click="message('checkout')">CHECKOUT</q-btn>
    </div>
    <h2>message goto</h2>
    <div class="buttons row">
      <q-btn color="secondary" @click="messageGoto('lcd.white')">LCD</q-btn>
      <q-btn color="secondary" @click="messageGoto('touch')">TOUCH</q-btn>
      <q-btn color="secondary" @click="messageGoto('camera1')">CAMERA 1</q-btn>
      <q-btn color="secondary" @click="messageGoto('camera2')">CAMERA 2</q-btn>
      <q-btn color="secondary" @click="messageGoto('camera3')">CAMERA 3</q-btn>
      <q-btn color="secondary" @click="messageGoto('camera4')">CAMERA 4</q-btn>
      <q-btn color="secondary" @click="messageGoto('sensors')">SENSORS</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'simulator',
  data () {
    return {
      sn: '100000000017',
      sn2: '100000000088'
    }
  },
  methods: {
    onCreateTask () {
      this.$feathers.service('tasks').create({
        product: this.sn,
        stage: 0
      })
    },
    onMove () {
      console.log('sheduler--tasks', this.tasksService)
    },
    command (name, stage) {
      let params = {
        sn: this.sn2
      }
      if (stage) {
        params.stage = stage
      }
      this.$feathers.service('commands').create({
        name: name,
        params: params
      })
    },
    commandGoto (stage) {
      this.command('goto', stage)
    },
    message (type, stage, params) {
      params = params || {}
      if (stage) {
        params.stage = stage
      }
      params.sn = this.sn2
      this.$feathers.service('messages').create({
        type: type,
        params: params
      })
    },
    messageGoto (stage) {
      this.message('goto', stage)
    },
    messageHello (random) {
      this.message('hello', '', {random: random})
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
  .sn-input
    width 200px
    font-size 12px
  .buttons
    margin .5em 0
</style>
