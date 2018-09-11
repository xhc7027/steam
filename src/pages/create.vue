<template>
  <q-page class="create-page page flex flex-center">
    <div class="container">
      <q-input v-model="orderSerial"
        ref="orderSerialInput"
        clearable autofocus
        :before="[{icon: 'fas fa-barcode', handler () {}}]"
        float-label="机身条码" placeholder="输入" />
      <q-input v-model="resultSerial"
        clearable
        :before="[{icon: 'fas fa-barcode', handler () {}}]"
        float-label="APP检测结果条码" placeholder="输入" />
      <div class="sku-questions" v-show="stage === 2">
        <h4>SKU选项</h4>
        <hsb-questions
          :items="skuItems"
          v-model="skuResults">
          </hsb-questions>
      </div>
      <div class="extra-questions" v-show="stage === 2">
        <h4>手工输入选项</h4>
        <hsb-questions
          :items="extraItems"
          v-model="extraResults"></hsb-questions>
      </div>
      <q-field label="备注" :label-width="2" v-show="stage === 2">
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
        @click="save()"
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
import HsbQuestions from 'components/form/questions'

export default {
  name: 'create-page',
  data () {
    return {
      stage: 1, // 保存步骤 1=扫描条码 2=保存手填选项
      orderSerial: '359167074097936', // 机身条码
      resultSerial: '2b4f822d81756917OrZZ21', // 屏幕条码(app检测结果)
      skuItems: [],
      extraItems: [],
      skuResults: [],
      extraResults: [],
      memo: ''
    }
  },
  mounted () {
    this.$refs.orderSerialInput.focus()
  },
  methods: {
    save () {
      if (this.stage === 1) {
        this.save1()
      } else {
        this.save2()
      }
    },
    save1 () {
      this.$http.call('/bind', {
        data: {
          orderSerial: this.orderSerial,
          resultSerial: this.resultSerial
        }
      }).then(response => {
        this.skuItems = response.skuItems
        this.extraItems = response.extraItems
        this.stage = 2
      })
    }
  },
  components: {
    HsbField,
    HsbQuestions
  }
}
</script>
<style lang="stylus">
.field.networks
  .q-btn
    width 25%
</style>
