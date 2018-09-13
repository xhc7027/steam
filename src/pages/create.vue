<template>
  <q-page class="create-page page flex flex-center">
    <div class="container full-width">
      <q-input v-model="orderSerial"
      name="serial1"
      ref="orderSerialInput"
      clearable autofocus
      :before="[{icon: 'fas fa-barcode', handler () {}}]"
      float-label="机身条码" placeholder="输入"
      auto-complete="off"
      v-validate="'required'"
      :error="$validator.errors.has('serial1')">
      <validate-error
        message="请输入机身条码"
        ></validate-error>
      </q-input>
      <q-input v-model="resultSerial"
        clearable
        :before="[{icon: 'fas fa-barcode', handler () {}}]"
        float-label="APP检测结果条码" placeholder="输入" />
      <div class="sku-questions" v-show="stage > 1">
        <h4>SKU选项</h4>
        <hsb-questions
          :items="skuItems"
          v-model="skuResults">
          </hsb-questions>
      </div>
      <div class="extra-questions" v-show="stage > 1">
        <h4>手工输入选项</h4>
        <hsb-questions
          :items="extraItems"
          v-model="extraResults"></hsb-questions>
      </div>
      <q-field label="备注" :label-width="2" v-show="stage > 1">
        <q-input v-model="memo"
          type="textarea"
          color="tertiary"
          rows="4"
          text-color="#666"
          inverted-light
        ></q-input>
      </q-field>
      <p>&nbsp;</p>
      <div class="price-result" v-show="stage > 2">
        <h6>估价结果</h6>
        <p><span class="price">{{priceResult | money}}</span></p>
      </div>
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
      memo: '',
      priceResult: 0
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
    },
    save2 () {
      this.$http.call('/calc', {
        data: {
          resultSerial: this.resultSerial
        },
        beforeParams: input => {
          this.skuItems.forEach(s => {
            s.selected = this.skuResults['field-' + s.id] || ''
          })
          this.extraItems.forEach(s => {
            s.selected = this.extraResults['field-' + s.id] || ''
          })
          return Object.assign({}, {
            skuItems: this.skuItems,
            extraItems: this.extraItems
          }, input)
        }
      }).then(response => {
        console.info('save2 response', response)
        this.stage = 3
        this.notice('已保存')
      })
    },
    validate () {
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
.price-result
  background #009688
  padding 15px
  color #fff
  width 50%
</style>
