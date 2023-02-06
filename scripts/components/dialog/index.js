export default {
  template: `
  <dialog class="LstDialog">
    <div class="LstClose"></div>
    <div section="content"></div>
  </dialog>`,
  props: {
    methods: {
      onclose: {}
    }
  },
  nodes() {
    return {
      LstDialog: {},
      LstClose: {
        onclick: () => this.method.onclose && this.method.onclose()
      }
    }
  },
  methods: {
    close() {
      this.node.LstDialog.close()
    },
    open() {
      this.node.LstDialog.showModal()
    }
  }
}