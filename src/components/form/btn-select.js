import {QBtn, QBtnGroup} from 'quasar'

// copy from q-btn-toggle
export default {
  name: 'BtnSelect',
  props: {
    value: {
      type: [String, Array],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // To avoid seeing the active raise shadow through the transparent button, give it a color (even white).
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: 'primary'
    },
    toggleTextColor: String,
    options: {
      type: Array,
      required: true,
      validator: v => v.every(opt => ('label' in opt || 'icon' in opt) && 'value' in opt)
    },
    readonly: Boolean,
    disable: Boolean,
    noCaps: Boolean,
    noWrap: Boolean,
    outline: Boolean,
    flat: Boolean,
    dense: Boolean,
    rounded: Boolean,
    push: Boolean,
    size: String,
    glossy: Boolean,
    noRipple: Boolean,
    waitForRipple: Boolean
  },
  computed: {
  },
  data () {
    return {
      selected: []
    }
  },
  methods: {
    click (value, opt) {
      if (this.readonly) {
        return
      }
      if (!this.multiple) { // 多选？单选
        this.selected = [value]
      } else {
        if (this.selected.includes(value)) {
          let index = this.selected.indexOf(value)
          this.selected.splice(index, 1)
        } else {
          this.selected.push(value)
        }
      }
      this.$nextTick(() => {
        if (JSON.stringify(value) !== JSON.stringify(this.value)) {
          this.$emit('input', this.selected, opt)
        }
      })
    }
  },
  render (h) {
    return h(QBtnGroup, {
      staticClass: 'q-btn-toggle',
      props: {
        outline: this.outline,
        flat: this.flat,
        rounded: this.rounded,
        push: this.push
      }
    },
    this.options.map(
      (opt, i) => h(QBtn, {
        key: `${opt.label}${opt.icon}${opt.iconRight}`,
        on: { click: () => this.click(opt.value, opt) },
        props: {
          disable: this.disable,
          label: opt.label,
          // Colors come from the button specific options first, then from general props
          color: this.selected.includes(opt.value) ? opt.toggleColor || this.toggleColor : opt.color || this.color,
          textColor: this.selected.includes(opt.value) ? opt.toggleTextColor || this.toggleTextColor : opt.textColor || this.textColor,
          icon: opt.icon,
          iconRight: opt.iconRight,
          noCaps: this.noCaps || opt.noCaps,
          noWrap: this.noWrap || opt.noWrap,
          outline: this.outline,
          flat: this.flat,
          rounded: this.rounded,
          push: this.push,
          glossy: this.glossy,
          size: this.size,
          dense: this.dense,
          noRipple: this.noRipple || opt.noRipple,
          waitForRipple: this.waitForRipple || opt.waitForRipple,
          tabindex: opt.tabindex
        }
      })
    ))
  }
}
