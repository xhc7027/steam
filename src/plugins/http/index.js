import http from 'vue-http'

export default ({app, router, Vue}) => {
  Vue.prototype.$http = http
}
