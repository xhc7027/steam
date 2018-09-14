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
      <div class="sku-questions" v-show="stage > 1">
        <h4>SKU选项</h4>
        <hsb-questions
          :items="computedSkuItems"
          v-model="skuResults"
          >
          </hsb-questions>
      </div>
      <div class="extra-questions" v-show="stage > 1">
        <h4>手工输入选项</h4>
        <hsb-questions
          :items="computedExtraItems"
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
        class="save-btn save2-btn"
        v-show="stage !== 1"
        @click="save1()"
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
      orderSerial: 'C180329001100000000001', // 机身条码
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
      this.$validator.validateAll().then(result => {
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
      this.$http.post('/calc', {
        data: {
          resultSerial: this.resultSerial
        },
        beforeParams: input => {
          console.log('log-----beforeParams', this.skuResults)
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
        }
      }).then(response => {
        console.info('save2 response', response)
        this.stage = 3
        this.priceResult = response.price - 0
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
