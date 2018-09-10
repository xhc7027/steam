export default {
  apis: [
    {
      path: '/bind', // 前端path
      to: '/bindDetectBarCode', // 后端path
      method: 'post',
      head: [
        {
          name: '_interface',
          value: 'det_getProfessionDetect'
        }
      ],
      params: [ // 传入参数转换
        {
          name: 'codeInfo',
          value: '$orderSerial',
          default: 4
        },
        {
          name: 'uniqueKey',
          value: '$resultSerial',
          default: []
        },
        {
          name: '_interface',
          value: 'det_getProfessionDetect'
        },
        {
          name: 'detVersion',
          value: '$version',
          default: 'v1.0.'
        }
      ],
      fields: [
      ],
      converts: {
        default: (input) => {
          let result = input
          return result
        }
      }
    }
  ]
}
