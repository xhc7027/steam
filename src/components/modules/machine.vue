<template>
  <div class="machine">
    <div class="line row gutter-xs">
      <div class="station entry col col-2">
        <label>进料</label>
        <h6>{{tasks[0] ? tasks[0].product.substr(-4) : '-'}}</h6>
      </div>
      <div v-for="x in [1,2,3,4,5,6,7,8,9]" :key="x" class="station col col-1">
        <label class="number">{{x}}</label>
        <h6 text-color="secondary">{{tasks[x] ? tasks[x].product.substr(-4) : '-'}}</h6>
      </div>
      <div class="station col col-1">
        <label>出料</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'machine',
  props: {
    tasks: Array
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.machine
  .station
    height 100px
    position relative
    background-color #f7f7f7
    text-align center
    padding 10px
    h6
      bottom 10px
      position absolute
      width 100%
</style>
