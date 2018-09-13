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
            skuItems: input.skuItems ? input.skuItems.map(q => ({
              id: q.questionId,
              name: 'field-' + q.questionId,
              label: q.questionName,
              finished: q.isSelect || false,
              options: q.answerList.map(a => ({
                value: a.answerId,
                label: a.answerName,
                selected: a.select || false
              }))
            })) : [],
            extraItems: input.extraItems ? input.extraItems.map(q => ({
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
          return output
        }
      }
    }
  ]
}
