export default {
  apis: [
    {
      path: '/bind', // 前端path
      to: '/bindDetectBarCode', // 后端path
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
          value: '$source',
          default: 'v1.0.0'
        }
      ],
      fields: [
        {
          name: 'sections',
          from: 'detectOptions'
        }
      ],
      hooks: {
        beforeParams: input => input,
        afterParams: input => input,
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
                  selected: o.select,
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
