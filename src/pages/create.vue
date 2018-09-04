<template>
  <q-page class="create-page page flex flex-center">
    <div class="container">
      <q-input v-model="orderSerial"
        ref="orderSerialInput"
        clearable autofocus
        float-label="机身条码" placeholder="输入" />
      <q-input v-model="appResultSerial"
        clearable
        float-label="APP检测结果条码" placeholder="输入" />
      <div class="extra-items">
        <h4>手工输入选项</h4>
        <hsb-field
          v-for="(item, index) in manualInputs"
          :key="index"
          type="button"
          :label="item.label"
          :name="item.name"
          v-model="item.value"
          :multiple="item.multiple"
          :options="item.options"
        ></hsb-field>
      </div>
      <p>&nbsp;</p>
      <q-field label="备注" :label-width="2">
        <q-input v-model="memo"
          type="textarea"
          color="tertiary"
          rows="4"
          text-color="#666"
          inverted-light
        ></q-input>
      </q-field>
      <p>&nbsp;</p>
      <q-btn
        color="secondary"
        width="200"
        size="md"
        label="提交"
      />
    </div>
  </q-page>
</template>
<script>
import HsbField from 'components/field'
import networksData from '@data/fields/networks'
import repairedData from '@data/fields/repaired'

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
          options: networksData,
          value: '1',
          multiple: true
        },
        {
          name: 'watered',
          label: '进水',
          value: '1',
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
          value: '1',
          multiple: true,
          options: repairedData
        }
      ],
      memo: ''
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
