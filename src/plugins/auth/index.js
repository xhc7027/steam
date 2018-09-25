import auth from './auth'

export default ({app, router, Vue}) => {
  Vue.prototype.$auth = auth
}
