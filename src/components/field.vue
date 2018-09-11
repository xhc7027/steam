<template>
    <div class="field" :class="name">
      <q-field
        helper=""
        :label="label"
        :label-width="2"
      >
        <hsb-btn-select
          v-model="dataValue"
          :name="name"
          @input="onSelectChange"
          color="tertiary"
          text-color="#666666 "
          toggle-color='secondary'
          :multiple="multiple"
          :options="computedOptions"
        ></hsb-btn-select>
      </q-field>
    </div>
</template>
<script>
import HsbBtnSelect from 'components/form/btn-select'

export default {
  name: 'field',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    label: String,
    name: String,
    options: {
      type: Array,
      default () {
        return ['A', 'B']
      }
    }
  },
  computed: {
    computedOptions: {
      get () {
        let computed = this.options
        if (typeof computed[0] === 'string') {
          computed = computed.filter(_ => _).map(x => ({
            label: x,
            value: x
          }))
        }
        return computed
      }
    }
  },
  data () {
    return {
      dataValue: this.value
    }
  },
  methods: {
    onSelectChange () {
      this.$emit('input', this.dataValue)
    }
  },
  components: {
    HsbBtnSelect
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
.field
  .q-btn-toggle
    flex-wrap wrap
    .q-btn
      border-style solid
      border-width 0 1px 1px 0
      border-color #fff
      font-size 12px
</style>
