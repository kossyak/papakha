export default {
  container: document.getElementById('container'),
  control:  document.getElementById('view-control'),
  buttons: {},
  action(direction) {
    this.container.setAttribute('direction', direction)
    Object.keys(this.buttons).forEach(c => this.buttons[c]?.classList.remove('active'))
    this.buttons[direction]?.classList.add('active')
  },
  create() {
    const buttons = ['columns',  'rows',  'code', 'result']
    buttons.forEach((b,i) => {
      this.buttons[b] = this.control.children[i]
      this.buttons[b].onclick = () => this.action(b)
    })
    const resizeObserver = new ResizeObserver(() => {
      const lessW = document.documentElement.clientWidth <= 540
      const lessH = document.documentElement.clientHeight <= 480
      let direction = 'rows'
      this.buttons['rows'].hidden = lessW
      this.buttons['columns'].hidden = lessH
      if (lessW) direction = 'columns'
      if (lessH) direction = 'rows'
      if (lessW && lessH) direction = 'code'
      this.action(direction)
    })
    resizeObserver.observe(this.container)
  }
}