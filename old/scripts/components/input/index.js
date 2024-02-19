import './index.css'

export default {
  template: `
    <div class="LstLabel"></div>
    <input type="text" class="LstInput b0 br pn">
    <div class="LstMessage"></div>`,
  props: {
    proxies: {
      value: {
        default: ''
      },
      message: {}
    },
    params: {
      value: {},
      label: {},
      name: {},
      type: {
        default: 'text'
      },
      size: {},
      validate: {},
      placeholder: {
        default: ''
      },
      readonly: {
        default: false
      },
      autocomplete: {},
      autofocus: {},
      maxlength: {},
      minlength: {},
      max: {},
      min: {},
      step: {}
    },
    methods: {
      change: {},
      onfocus: {},
      onblur: {}
    }
  },
  nodes() {
    return {
      LstLabel: {
        textContent: () => this.param.label
      },
      LstMessage: {
        textContent: () => this.proxy.message
      },
      LstInput: {
        _attr: {
          size: this.param.size,
          readonly: this.param.readonly,
          required: this.param.validate?.required,
          minlength: this.param.minlength,
          maxlength: this.param.maxlength,
          min: this.param.min,
          max: this.param.max
        },
        value: () => this.proxy.value || this.param.value || '',
        type: this.param.type,
        placeholder: this.param.placeholder,
        oninput: (event) => {
          this.param.value = event.target.value
          this.proxy.value = event.target.value
          this.method.change && this.method.change(this.param)
        },
        onfocus: () => this.method.onfocus && this.method.onfocus(this.proxy.value),
        onblur: () => this.method.onblur && this.method.onblur(this.proxy.value)
      }
    }
  },
  methods: {
    set(v) {
      this.proxy.value = v
    },
    validate() {
      if (!this.node.LstInput.checkValidity()) {
        this.proxy.message = this.node.LstInput.validationMessage
      } else return true

    },
    blur() {
      this.node.LstInput.blur()
    },
    focus() {
      this.node.LstInput.focus()
    },
    select() {
      this.node.LstInput.select()
    },
    disabled(v) {
      this.node.LstInput.disabled = v
    }
  }
}