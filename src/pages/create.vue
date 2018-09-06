<template>
  <q-page class="create-page page flex flex-center">
    <div class="container">
      <q-input v-model="orderSerial"
        ref="orderSerialInput"
        clearable autofocus
        :before="[{icon: 'fas fa-barcode', handler () {}}]"
        float-label="机身条码" placeholder="输入" />
      <q-input v-model="appResultSerial"
        clearable
        :before="[{icon: 'fas fa-barcode', handler () {}}]"
        float-label="APP检测结果条码" placeholder="输入" />
      <div class="sku-questions">
        <h4>SKU选项</h4>
        <q-field label="具体型号" :label-width="2">
          <q-input v-model="skuInputs[0].value"></q-input>
        </q-field>
        <hsb-field
          v-for="(item, index) in skuInputs.filter(item => item.name !== 'deviceModel')"
          :key="index"
          :label="item.label"
          v-model="item.value"
          :options="item.options"
        ></hsb-field>
      </div>
      <div class="extra-questions">
        <h4>手工输入选项</h4>
        <hsb-field
          v-for="(item, index) in manualInputs"
          :key="index"
          type="button"
          :label="item.label"
          :name="item.name"
          v-model="item.value"
          :multiple="item.multiple || false"
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
      orderSerial: '', // 机身条码
      appResultSerial: '', // 屏幕条码(app检测结果)
      skuInputs: [
        {
          name: 'deviceModel',
          label: '具体型号',
          value: ''
        },
        {
          name: 'color',
          label: '颜色',
          value: '',
          options: []
        },
        {
          name: 'disk',
          label: '容量',
          value: '',
          options: ['1GB', '2GB', '3GB', '4GB', '8GB']
        },
        {
          name: 'warranty',
          label: '保修期',
          value: '',
          options: ['一个月以上', '一个月以下或过保']
        },
        {
          name: 'lock',
          label: '账户锁',
          value: '',
          options: ['无锁', '有锁']
        },
        {
          name: 'lock',
          label: '官换机',
          value: '',
          options: ['否', '是']
        }
      ],
      manualInputs: [
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
