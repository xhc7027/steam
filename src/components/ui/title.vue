<template>
  <div class="title-bar row">
    <q-btn flat dense
      class="menu-toggle"
      @click="onToggleClicked"
      aria-label="Menu">
      <q-icon name="menu" />
    </q-btn>
    <q-collapsible
      class="title" label="产线作业系统" sublabel="" height="48px">
    </q-collapsible>
  </div>
</template>
<script>
export default {
  name: 'title-bar',
  methods: {
    onToggleClicked () {
      this.$bus.emit('menuToggleClicked')
    }
  }
}
</script>
<style lang="stylus">
.title-bar
  width 240px
  height 48px
  background #004D40
  overflow visible
  .title
    width 192px
  .menu-toggle
    width 48px
    height 48px
    background #00695C
  .q-item-side
    color #004d40
  .q-item-label
    line-height 32px
</style>
