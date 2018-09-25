export default {
  apis: [
    {
      path: '/login',
      to: 'http://api-amc.huishoubao.com.cn/authlogin',
      method: 'post',
      params: [
        {
          name: 'system',
          value: 'upin'
        },
        {
          name: 'system_id',
          value: 122
        },
        {
          name: 'time',
          value: Math.round((new Date()).getTime() / 1000)
        }
      ],
      boxing: input => {
        let output = {
          head: {
            interface: 'authlogin',
            msgtype: 'request',
            remark: '',
            version: '0.01'
          }
        }
        output.params = input
        return output
      },
      unboxing: input => ({
        code: input.body.retcode,
        data: {
          token: input.body.data.login_token,
          userid: input.body.data.user_id
        }
      }),
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
