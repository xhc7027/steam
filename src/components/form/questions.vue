<template>
  <div class="options">
    <hsb-field
      v-for="(item, index) in items"
      :key="index"
      type="button"
      :label="item.label"
      :name="item.name"
      v-model="values[index]"
      @input="onFieldChange"
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
      values: [],
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
    this.values = this.items.map(item => '')
  },
  methods: {
    onFieldChange () {
    }
  },
  components: {
    HsbField
  }
}
</script>
