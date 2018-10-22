export default {
  apis: [
    {
      path: '/bind-oms', // 前端path
      to: '/bindDetectBarCode', // 后端path 大检测用
      method: 'post',
      params: [ // 传入参数转换
        {
          name: 'codeInfo',
          value: '$orderSerial'
        },
        {
          name: 'sourceDetect',
          value: '$source'
        },
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: '_interface',
          value: 'det_getProfessionDetect'
        },
        {
          name: 'detVersion',
          value: '$version',
          default: 'v1.0.0'
        }
      ],
      fields: [
        {
          name: 'skuItems',
          from: 'skuList'
        },
        {
          name: 'extraItems',
          from: 'checkList'
        }
      ],
      hooks: {
        beforeParams: input => input,
        afterParams: input => input,
        beforeFields: input => input,
        afterFields: input => {
          let output = {
            sections: [
              {
                id: '1',
                name: 'section-1',
                label: 'SKU选项',
                questions: input.skuItems ? input.skuItems.map(q => ({
                  id: q.questionId,
                  name: 'field-' + q.questionId,
                  label: q.questionName,
                  finished: q.isSelect || false,
                  options: q.answerList.map(a => ({
                    value: a.answerId,
                    label: a.answerName,
                    selected: a.select || false
                  }))
                })) : []
              },
              {
                id: '2',
                name: 'section-2',
                label: '手动选项',
                questions: input.extraItems ? input.extraItems.map(q => ({
                  id: q.questionId,
                  name: 'field-' + q.questionId,
                  label: q.questionName,
                  finished: q.isSelect || false,
                  options: q.answerList.map(a => ({
                    value: a.answerId,
                    label: a.answerName,
                    selected: a.select || false
                  }))
                })) : []
              }
            ]
          }
          return output
        }
      }
    },
    {
      path: '/bind-xy',
      to: '/bindXyDetectBarCode', // 后端path 闲鱼用
      method: 'post',
      params: [ // 传入参数转换
        {
          name: 'codeInfo',
          value: '$orderSerial'
        },
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: '_interface',
          value: 'det_getProfessionDetect'
        },
        {
          name: 'detVersion',
          value: '$version',
          default: 'v1.0.0'
        },
        {
          name: 'sourceDetect',
          value: '$source'
        }
      ],
      fields: [
        {
          name: 'sections',
          from: 'checkList'
        }
      ],
      hooks: {
        beforeParams: input => input,
        afterParams: input => {
          input.login_token = localStorage.getItem('token')
          input.login_user_id = localStorage.getItem('userid')
          input.login_user_name = localStorage.getItem('username')
          return input
        },
        beforeFields: input => input,
        afterFields: input => {
          let sections = input.sections &&
            input.sections.constructor.name === 'Array' ? input.sections : []
          let output = {
            sections: sections.map(q => ({
              id: q.id,
              name: 'section-' + q.id,
              label: q.name,
              isAdd: q.isAdd, // 无用字段
              isAddOption: q.isAddOption, // 无用字段
              isEditor: q.isEditor, // 无用字段
              questions: q.childs.map(a => ({
                id: a.id,
                name: 'filed-' + a.id,
                label: a.name,
                multiple: a.isMultiple,
                isDet: a.isDet, // 无用字段
                finished: a.isSelect, // 无用字段
                options: a.childs.map(o => ({
                  label: o.name,
                  isDefective: o.isDefective, // 无用字段
                  selected: o.isSelect,
                  value: o.id
                }))
              }))
            }))
          }
          console.log('log-----', output)
          return output
        }
      }
    }
  ]
}
