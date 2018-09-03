<template>
  <q-page class="create-page flex flex-center">
    <div class="container">
      <q-input v-model="orderSerial"
        ref="orderSerialInput"
        clearable autofocus
        float-label="机身条码" placeholder="输入" />
      <q-input v-model="appResultSerial"
        clearable
        float-label="APP检测结果条码" placeholder="输入" />
      <div class="extra-items">
        <h2>人工输入选项</h2>
        <hsb-field
          v-for="(item, index) in manualInputs"
          :key="index"
          type="button"
          :label="item.label"
          :name="item.name"
          v-model="item.value"
          :options="item.options"
        ></hsb-field>
      </div>
      <p>&nbsp;</p>
      <q-btn
        color="primary"
        size="sm"
        label="提交"
      />
    </div>
  </q-page>
</template>
<script>
import HsbField from 'components/field'
import networksData from '@data/fields/networks'

export default {
  name: 'create-page',
  data () {
    return {
      orderSerial: '',
      appResultSerial: '',
      manualInputs: [
        {
          name: 'networks',
          label: '制式',
          options: networksData
        },
        {
          name: 'watered',
          label: '进水',
          options: [
            {
              label: '有进水',
              value: '有进水'
            },
            {
              label: '无进水',
              value: '无进水'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // this.$refs.orderSerialInput.focus()
  },
  components: {
    HsbField
  }
}
</script>
<style lang="stylus">
.field.networks
  .q-btn
    width 25%
</style>
