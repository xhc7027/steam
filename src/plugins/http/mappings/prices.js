export default {
  apis: [
    {
      path: '/save-oms', // 前端path
      to: '/getQuotation', // 后端path
      method: 'post',
      params: [ // 传入参数转换
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: 'sections',
          value: '$sections'
        },
        {
          name: 'sourceDetect',
          value: '$source'
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
          // 组装后端接口格式
          let skuList = input.sections[0].questions
          let checkList = input.sections[1].questions
          let output = {}
          output.skuList = skuList.map(q => ({
            questionName: q.label,
            questionId: q.id,
            select: q.selected,
            answerList: q.options.map(a => ({
              answerId: a.value,
              answerName: a.label,
              select: a.selected || false
            }))
          }))
          output.checkList = checkList.map(q => ({
            questionName: q.label,
            questionId: q.id,
            select: q.selected,
            answerList: q.options.map(a => ({
              answerId: a.value,
              answerName: a.label,
              select: a.selected || false
            }))
          }))
          return output
        }
      }
    },
    {
      path: '/save-xy',
      to: '/pullAppDetectToXyDetect', // 闲鱼用
      method: 'post',
      params: [
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: 'checkList',
          value: '$sections'
        },
        {
          name: 'sourceDetect',
          value: '$source'
        },
        {
          name: 'orderNum',
          value: '$orderNumber'
        },
        {
          name: 'detectinfoId',
          value: '$taskNumber'
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
          input.login_user_name = localStorage.getItem('username')
          input.checkList = input.checkList.map(q => ({
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
                isSelect: o.selected
              }))
            }))
          }))
          return input
        }
      }
    }
  ]
}
