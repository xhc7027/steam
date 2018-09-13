<template>
  <div class="options">
    <hsb-field
      v-for="(item, index) in computedItems"
      :key="index"
      type="button"
      :label="item.label"
      :name="item.name"
      v-model="values[index]"
      @input="onFieldChange(item.name, $event)"
      :multiple="item.multiple || false"
      :options="item.options"
    ></hsb-field>
    <p>&nbsp;</p>
  </div>
</template>
<script>
import HsbField from 'components/field'

export default {
  name: 'sku-questions',
  props: {
    items: Array
  },
  computed: {
    // 整理传进来的items数据
    computedItems () {
      return this.items.map(item => {
        if (item.label.indexOf('多选') !== -1) {
          item.multiple = true
        }
        return item
      })
    }
  },
  data () {
    return {
      values: {}
    }
  },
  mounted () {
  },
  methods: {
    onFieldChange (name, value) {
      console.info('onFieldCHange--------', name, value)
      this.values[name] = value
      console.info('onFieldCHange--------////', this.values)
      this.$emit('input', this.values)
    }
  },
  components: {
    HsbField
  }
}
</script>
