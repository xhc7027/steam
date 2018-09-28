<template>
  <div class="simulator">
    <div class="row">
      <q-input class="serial-input" v-model="serial"></q-input>
      <q-btn color="secondary" @click="onCreateTask">进料</q-btn>
    </div>
    <div class="row">
      <q-btn color="secondary" @click="onMove">MOVE</q-btn>
      <q-btn color="negative" @click="onReset">RESET</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'simulator',
  data () {
    return {
      serial: 'C180823001100000000007'
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
    onReset () { // 删除所有测试数据
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
.simulator
  .serial-input
    width 200px
    font-size 12px
</style>
