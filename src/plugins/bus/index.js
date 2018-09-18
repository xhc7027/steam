import bus from 'vue-cli-plugin-bus'

export default ({app, router, Vue}) => {
  Vue.prototype.$bus = bus
}
