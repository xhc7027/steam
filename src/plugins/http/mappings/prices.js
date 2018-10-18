export default {
  apis: [
    {
      path: '/calc', // 前端path
      to: '/getQuotation', // 后端path
      method: 'post',
      params: [ // 传入参数转换
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: 'detectOptions',
          value: '$sections'
        },
        {
          name: 'detVersion',
          value: '$version',
          default: 'v1.0.0'
        },
        {
          name: '_interface',
          value: 'det_getQuotation'
        }
      ],
      fields: [
        {
          name: 'price',
          from: 'quotation'
        }
      ],
      hooks: {
        afterParams: input => {
          console.log('afterParams------------------', input)
          input.login_token = localStorage.getItem('token')
          input.login_user_id = localStorage.getItem('userid')
          input.detectOptions = input.detectOptions.map(q => ({
            id: q.id,
            name: q.label,
            isAdd: q.isAdd, // 无用字段
            isAddOption: q.isAddOption, // 无用字段
            isEditor: q.isEditor, // 无用字段
            childs: q.questions.map(a => ({
              id: a.id,
              name: a.label,
              isMultiple: a.multiple,
              isDet: a.isDet, // 无用字段
              isSelect: a.finished, // 无用字段
              childs: a.options.map(o => ({
                id: o.value,
                name: o.label,
                isDefective: o.isDefective, // 无用字段
                select: o.selected
              }))
            }))
          }))
          return input
        }
      }
    }
  ]
}
