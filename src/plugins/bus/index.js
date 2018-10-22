import bus from 'vue-cli-plugin-bus'

export default ({app, router, Vue}) => {
  bus.on('loginRequired', () => {
    router.push({
      path: '/login',
      query: {
        r: router.currentRoute.fullPath
      }
    })
  })
  Vue.prototype.$bus = bus
}
