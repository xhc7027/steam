<template>
  <q-page class="create-page page flex">
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
          :error="errors.has('serial1', 'bind')"
          @keyup.13="save1">
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
          :error="errors.has('serial2', 'bind')"
          @keyup.13="save1">
          <validate-error
            message="请输入屏幕条码"
            ></validate-error>
          </q-input>
          <div class="row">
            <div class="col-4">
              <q-select class="clients-select"
                :disable="stage !== 1"
                float-label="业务方"
                v-model="source"
                :options="sources"></q-select>
            </div>
            <div class="col-4">
              <q-input v-model="orderNumber"
                v-if="this.source === 'xy'"
                name="order_number"
                float-label="订单号" placeholder="输入"
                spellcheck="false"
                v-validate="'required'"
                :disable="stage !== 1"
                :error="errors.has('order_number', 'bind')"
                @keyup.13="save1">
                <validate-error
                  message="请输入订单号"
                  ></validate-error>
                </q-input>
            </div>
            <div class="col-4">
              <q-input v-model="taskNumber"
                v-if="this.source === 'xy'"
                name="task_number"
                float-label="检测单号" placeholder="输入"
                spellcheck="false"
                v-validate="'required'"
                :disable="stage !== 1"
                :error="errors.has('task_number', 'bind')"
                @keyup.13="save1">
                <validate-error
                  message="请输入检测单号"
                  ></validate-error>
                </q-input>
            </div>
          </div>
          <q-btn
            class="save-btn save1-btn"
            v-show="stage === 1"
            @click="save1()"
            color="secondary"
            width="200"
            size="md"
            label="提交"
          />
          <q-btn
            class="save-btn save1-btn"
            v-show="stage === 1"
            @click="openNotify()"
            color="secondary"
            width="200"
            size="md"
            label="Notify"
          />
      </form>
      <div class="stage-2" v-if="stage === 2">
        <div class="sku-questions" v-for="s in extraSections" :key="s.id">
          <h4>{{s.label}}</h4>
          <hsb-questions
            name="questions1"
            :items="s.questions.filter(q => !q.finished)"
            v-model="results[s.name]">
            </hsb-questions>
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
      </div>
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
      <q-btn
        class="next-btn"
        v-show="stage !== 1"
        @click="next()"
        color="tertiary"
        text-color="secondary"
        size="md"
        label="继续检测"
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
      orderSerial: '', // 机身条码 010118102300115S
      resultSerial: '', // 屏幕条码(app检测结果) 100000000011
      source: 'xy',
      orderNumber: '', // 订单号 闲鱼用 501
      taskNumber: '', // 检测单号 闲鱼用 1701
      sections: [],
      results: {},
      memo: '',
      priceResult: 0,
      sources: [{
        label: '闲鱼验机',
        value: 'xy'
      },
      {
        label: 'OMS',
        value: 'oms'
      }]
    }
  },
  created () {
    this.addValidateRule()
  },
  mounted () {
    this.$refs.orderSerialInput.focus()
  },
  computed: {
    extraSections: function () {
      return this.sections.filter(s => s.questions.some(q => !q.finished))
    }
  },
  methods: {
    save1 () {
      let paths = { // 按source调用不同接口
        oms: '/bind-oms',
        xy: '/bind-xy'
      }
      this.$validator.validateAll('bind').then(result => {
        if (result) {
          let data = {
            orderSerial: this.orderSerial,
            resultSerial: this.resultSerial,
            source: this.source
          }
          this.$http.post(paths[this.source], {
            data: data
          }).then(response => {
            if (response.code === '0') {
              this.sections = response.data.sections
              this.stage = 2
            } else {
              this.notice(response.message)
            }
          })
        } else {
          this.$refs.orderSerialInput.focus()
        }
      })
    },
    save2 () {
      // 提交检测结果
      // 验证 所有问题都有答案
      let paths = { // 按source调用不同接口
        oms: '/save-oms',
        xy: '/save-xy'
      }
      let keys = this.extraSections.map(s => s.name)
      let full = keys.length === this.extraSections.length &&
        keys.every(key =>
          Object.keys(this.results[key]).length ===
            this.sections.find(s => s.name === key)
              .questions.filter(q => !q.finished).length // 先前未选答案之总数
        )
      if (full) {
        let data = {
          resultSerial: this.resultSerial,
          source: this.source,
          memo: this.memo
        }
        if (this.source === 'xy') {
          data.orderNumber = this.orderNumber
          data.taskNumber = this.taskNumber
        }
        this.$http.post(paths[this.source], {
          data: data,
          beforeParams: this.calcBeforeParams
        }).then(response => {
          if (response.code === '0') {
            this.stage = 3
            this.priceResult = response.data.price - 0
            this.notice('已保存')
          } else {
            this.notice(response.message)
          }
        }, e => {
          this.notice('保存出错')
        })
      } else {
        this.notice('有选项未填写')
      }
    },
    cancel () {
      this.stage = 1
    },
    next () {
      this.memo = ''
      this.orderSerial = ''
      this.resultSerial = ''
      this.orderNumber = ''
      this.taskNumber = ''
      this.stage = 1
      this.sections = []
    },
    openNotify () {
      this.modal('login')
    },
    calcBeforeParams (input) {
      console.log('calBeforefParamas--------', input)
      let sectionsCopy = JSON.parse(JSON.stringify(this.sections))
      sectionsCopy.forEach(s => {
        let sectionResult = this.results[s.name]
        if (sectionResult) {
          s.questions.forEach(q => {
            let selected = sectionResult[q.name]
            if (selected) {
              q.finished = true
              q.options.forEach(o => {
                o.selected = selected.includes(o.value)
              })
            }
          })
        }
      })
      return Object.assign({}, {
        sections: sectionsCopy
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
