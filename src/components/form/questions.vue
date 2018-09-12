<template>
  <div class="options">
    <hsb-field
      v-for="(item, index) in items"
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
import networksData from '@data/fields/networks'
import repairedData from '@data/fields/repaired'

export default {
  name: 'sku-questions',
  props: {
    items: Array
  },
  data () {
    return {
      values: {},
      demoItems: [
        {
          name: 'networks',
          label: '制式',
          options: networksData,
          value: '',
          multiple: true
        },
        {
          name: 'watered',
          label: '进水',
          value: '',
          multiple: false,
          options: [
            {
              label: '无进水',
              value: '无进水'
            },
            {
              label: '有进水',
              value: '有进水'
            }
          ]
        },
        {
          name: 'repired',
          label: '维修',
          value: '',
          multiple: true,
          options: repairedData
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    onFieldChange (name, value) {
      console.info('onFieldCHange--------', this, name, value)
      this.values[name] = value
      this.$emit('input', this.values)
    }
  },
  components: {
    HsbField
  }
}
</script>
