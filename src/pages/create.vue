<template>
  <q-page class="create-page page flex flex-center">
    <div class="container full-width">
      <form action="/" data-vv-scope="bind">
        <q-input v-model="orderSerial"
          name="serial1"
          ref="orderSerialInput"
          clearable autofocus
          :before="[{icon: 'fas fa-barcode', handler () {}}]"
          float-label="机身条码" placeholder="输入"
          auto-complete="off"
          spellcheck="false"
          v-validate="'required'"
          :disable="stage !== 1"
          :error="$validator.errors.has('serial1')">
            <validate-error
              message="请输入机身条码"
              ></validate-error>
        </q-input>
        <q-input v-model="resultSerial"
          name="serial2"
          clearable
          :before="[{icon: 'fas fa-barcode', handler () {}}]"
          float-label="APP检测结果条码" placeholder="输入"
          spellcheck="false"
          v-validate="'required'"
          :disable="stage !== 1"
          :error="$validator.errors.has('serial2')">
          <validate-error
            message="请输入屏幕条码"
            ></validate-error>
          </q-input>
          <q-btn
            class="save-btn save1-btn"
            v-show="stage === 1"
            @click="save1()"
            color="secondary"
            width="200"
            size="md"
            label="提交"
          />
        </form>
      <div class="sku-questions" v-show="stage > 1">
        <h4>SKU选项</h4>
        <hsb-questions
          name="questions1"
          :items="computedSkuItems"
          v-model="skuResults"
          v-validate="`full:${skuItems.length}`"
          data-vv-scope="calc">
          </hsb-questions>
      </div>
      <div class="extra-questions" v-show="stage > 1">
        <h4>手工输入选项</h4>
        <hsb-questions
          name="questions2"
          :items="computedExtraItems"
          v-validate="`full:${computedExtraItems.length}`"
          v-model="extraResults"
          data-vv-scope="calc"></hsb-questions>
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
        class="save-btn save2-btn"
        v-show="stage !== 1"
        @click="save2()"
        color="secondary"
        label="提交"
      />
      <q-btn
        class="cancel-btn"
        v-show="stage !== 1"
        @click="cancel()"
        color="tertiary"
        text-color="#999"
        size="md"
        label="取消"
      />
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
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
      orderSerial: 'C180329001100000000001', // 机身条码
      resultSerial: '2b4f822d81756917OrZZ21', // 屏幕条码(app检测结果)
      skuItems: [],
      extraItems: [],
      skuResults: [],
      extraResults: [],
      memo: '',
      priceResult: 0,
      input1: ''
    }
  },
  created () {
    this.addValidateRule()
  },
  mounted () {
    this.$refs.orderSerialInput.focus()
  },
  computed: {
    computedSkuItems () {
      return this.skuItems.filter(item => item)
    },
    computedExtraItems () {
      return this.extraItems.filter(item => !item.finished)
    }
  },
  methods: {
    save1 () {
      this.$validator.validateAll('bind').then(result => {
        if (result) {
          this.$http.post('/bind', {
            data: {
              orderSerial: this.orderSerial,
              resultSerial: this.resultSerial
            }
          }).then(response => {
            this.skuItems = response.skuItems
            this.extraItems = response.extraItems
            this.stage = 2
          })
        } else {
          this.$refs.orderSerialInput.focus()
        }
      })
    },
    save2 () {
      this.$validator.validateAll('calc').then(result => {
        if (result) {
          this.$http.post('/calc', {
            data: {
              resultSerial: this.resultSerial
            },
            beforeParams: this.calcBeforeParams
          }).then(response => {
            this.stage = 3
            this.priceResult = response.price - 0
            this.notice('已保存')
          })
        } else {
          this.notice('有选项未填写')
        }
      })
    },
    cancel () {
      this.stage = 1
    },
    calcBeforeParams (input) {
      this.skuItems.forEach(s => {
        let selected = this.skuResults['field-' + s.id]
        if (selected) {
          s.options.forEach(o => {
            o.selected = selected.includes(o.value)
          })
        }
      })
      this.extraItems.forEach(s => {
        let selected = this.extraResults['field-' + s.id]
        if (selected) {
          s.options.forEach(o => {
            o.selected = selected && selected.includes(o.value)
          })
        }
      })
      return Object.assign({}, {
        skuItems: this.skuItems,
        extraItems: this.extraItems
      }, input)
    },
    /**
     *  custom validator rule
     *   要求所有选项都填写 没有空项
     */
    addValidateRule () {
      this.$validator.extend('full',
        (value, args) => {
          return Object.keys(value).length === args.full - 0
        },
        {paramNames: ['full']})
    }
  },
  components: {
    HsbField,
    HsbQuestions
  }
}
</script>
<style lang="stylus">
.create-page
  .field.networks
    .q-btn
      width 25%
  .price-result
    background #009688
    padding 15px
    color #fff
    width 50%
  .save-btn
    width 200px
  .save1-btn
    margin-top 1em
</style>
