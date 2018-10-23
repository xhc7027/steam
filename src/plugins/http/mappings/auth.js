export default {
  apis: [
    {
      path: '/login',
      to: 'http://api-amc.huishoubao.com.cn/login',
      method: 'post',
      params: [
        {
          name: 'system',
          value: 'product-line'
        },
        {
          name: 'system_id',
          value: '114'
        }
      ],
      boxing: input => {
        return input
      },
      unboxing: input => ({
        code: input.body.retcode,
        data: {
          token: input.body.data.login_token,
          userid: input.body.data.user_id
        }
      }),
      fields: [
      ]
    }
  ]
}
// 'username': 'guoyuxiang',
// 'passworid': 'a123123',
// 'system_id': '114'
