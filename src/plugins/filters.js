import { date } from 'quasar'
export default ({ app, router, Vue }) => {
  /**
   * 成立时间转换为n年
   **/
  Vue.filter('yearsSince', value => {
    let t = new Date(value)
    if (t instanceof Date) {
      let now = new Date()
      let diff = now.getUTCFullYear() - t.getUTCFullYear()
      if (isNaN(diff)) {
        return '(未知)'
      }
      if (diff === 0) {
        return '1 年'
      }
      return diff + ' 年'
    }
    return '(未知)'
  })
  /** 将时间格式化为某年某月某时 **/
  Vue.filter('formatTime', value => {
    let v = value - 0
    if (!isNaN(v)) {
      return date.formatDate(v, 'YYYY年MM月DD日 HH:mm')
    } else {
      return '暂无跟进时间'
    }
  })
  Vue.filter('money', value => {
    let v = value - 0
    if (!isNaN(v)) {
      return '￥' + (v / 100)
    } else {
      return 'value'
    }
  })
}
