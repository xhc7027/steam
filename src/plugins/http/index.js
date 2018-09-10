import http from 'vue-http'
import mappings from './mappings'

let __config = {
  real: {
    scheme: '//',
    host: 'product-line.huishoubao.com.cn',
    base: '/pushApp'
  },
  mock: {
    scheme: '//',
    host: 'api.huishoubao.com'
  }
}

http.setup(__config, mappings)

export default ({app, router, Vue}) => {
  Vue.prototype.$http = http
}
