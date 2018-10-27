import notify from 'vue-cli-plugin-notify'
import {Notify, Dialog} from 'quasar'
import Modal from './modal.vue'

export default ({app, router, Vue}) => {
  let HsbModal = Vue.extend(Modal)
  let modal = new HsbModal()
  const node = document.createElement('div')
  document.body.appendChild(node)
  modal.$mount(node)
  console.log('notify-------index=====', modal)
  let __config = {
    providers: {
      modal: modal,
      notice: {
        make: ({message}) => {
          Notify.create({
            message: message,
            timeout: 2500,
            color: 'secondary',
            textColor: 'white',
            icon: 'info',
            position: 'top-right'
          })
        }
      },
      dialog: {
        make: ({message, options}) => {
          console.log('dialog----------', Dialog)
          return Dialog.create({
            title: '提示',
            message: message,
            ok: '确定',
            preventClose: true,
            cancel: '取消'
          })
        }
      }
    }
  }
  __config.$bus = Vue.prototype.$bus
  notify.setup(__config)
  Vue.mixin(notify)
}
