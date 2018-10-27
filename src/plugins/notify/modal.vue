<template>
  <q-modal ref="container" class="modal-module"
    :content-css="{minWidth: options.width, minHeight: options.height}"
    no-backdrop-dismiss no-esc-dismiss>
    <q-modal-layout class="modal-module-layout">
      <q-toolbar slot="header" class="popup-header sls-modals-header" v-if="options._header">
        <q-toolbar-title>{{title}}</q-toolbar-title>
        <q-btn flat @click="close"><i class="iconfont icon-close"></i></q-btn>
      </q-toolbar>
      <div :class="[options._padding ? 'layout-padding' : '', 'full-height']">
        <component
          :is="contentComponent"
          v-model="options">
        </component>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import Login from 'components/modules/login'

const __views = {
  login: {
    title: '登录',
    module: Login
  }
}

export default {
  name: 'modal',
  data () {
    return {
      contentComponent: null,
      title: 'Modal',
      options: {},
      config: {
        header: true,
        padding: true,
        width: '400px',
        height: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.$refs.container.hide()
      this.$bus.$emit('loaded')
      setTimeout(() => {
        this.$bus.$emit('resetData')
      }, 500)
    },
    make (view, options) {
      const container = this.$refs.container
      let v = __views[view]
      if (v) {
        this.title = v.title
        this.contentComponent = v.module
      } else {
        this.contentComponent = this.load(view)
      }
      this.options = Object.assign(this.config, options)
      container.show()
    },
    hide () {
      this.$refs.container.hide()
      this.contentComponent = null
    }
  }
}
</script>
<style lang="stylus">
@import '~variables'
.modal-module
  top 60px
  bottom 0
  left 0
  right 0
  .modal-content
    width 400px
    max-width 100vw
    padding 40px
.sls-modals-header
  padding-left 30px
  border-bottom $border
</style>
