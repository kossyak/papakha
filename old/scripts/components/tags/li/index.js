export default {
  template: `<button class="LstLi pn"><span class="LstText"></span><span class="LstClose"></span></button>`,
  props: {
    proxies: {
      li: {},
      selected: {},
      active: {}
    },
    params: {
      index: {},
      size: {},
      draggable: {}
    },
    methods: {
      active: {},
      remove: {},
      select: {},
      change: {}
    }
  },
  nodes() {
    return {
      LstLi: {
        _attr: {
          size: this.param.size,
          name: this.param.index
        },
        _classes: {
          selected: () => this.proxy.selected,
          active: () => this.proxy.active,
        },
        ondragstart: () => this.method.select(this.param.index),
        ondragend: () => this.method.select(null),
        ondragover: () => this.method.change(this.param.index),
        onclick: () => this.method.active(this.param.index),
        draggable: this.param.draggable
      },
      LstText: {
        textContent: () => this.proxy.li
      },
      LstClose: {
        onclick: (event) => {
          event.stopPropagation(),
          this.method.remove(this.param.index)
        }
      }
    }
  }
}