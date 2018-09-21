import feathers from 'vue-cli-plugin-feathers'
import config from './config'

let $feathers = feathers.make(config)

export default ({app, router, Vue}) => {
  Vue.prototype.$feathers = $feathers
}
