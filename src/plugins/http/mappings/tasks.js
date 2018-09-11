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
      converts: {
        // converts 在 fields转换之后执行, 仅执行data部分
        default: (input) => {
          let output = {
            skuItems: input.skuItems.map(q => ({
              name: 'field-' + q.questionId,
              label: q.questionName,
              options: q.answerList.map(a => ({
                value: a.answerId,
                label: a.answerName
              }))
            })),
            extraItems: input.extraItems.map(q => ({
              name: 'field-' + q.questionId,
              label: q.questionName,
              options: q.answerList.map(a => ({
                value: a.answerId,
                label: a.answerName
              }))
            }))
          }
          return output
        }
      }
    }
  ]
}
