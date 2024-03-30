import dpi from '../utils/dpi'

export default {
  container: document.getElementById('container'),
  control:  document.getElementById('view-control'),
  buttons: {},
  button(b) {
    const button = document.createElement('button')
    this.buttons[b.name] = button
    button.innerHTML = dpi(b.icon)
    button.className = b.name + '-btn'
    button.title = b.name
    this.control.appendChild(button)
    button.onclick = () => this.action(b.name)
  },
  action(direction) {
    this.container.setAttribute('direction', direction)
    Object.keys(this.buttons).forEach(c => this.buttons[c]?.classList.remove('active'))
    this.buttons[direction]?.classList.add('active')
  },
  create() {
    const buttons = [
      { name: 'col', icon: '1111111111000001111111111'},
      { name: 'row', icon: '1111110011100111001111111'},
      { name: 'code', icon: '1111110001100011000111111'},
      { name: 'result', icon: '1111111111111111111111111'}
    ]
    buttons.forEach(b => this.button(b))
    
    const resizeObserver = new ResizeObserver(() => {
      const lessW = document.documentElement.clientWidth <= 540
      const lessH = document.documentElement.clientHeight <= 480
      let direction = 'row'
      this.buttons['row'].hidden = lessW
      this.buttons['col'].hidden = lessH
      if (lessW) direction = 'col'
      if (lessH) direction = 'row'
      if (lessW && lessH) direction = 'code'
      this.action(direction)
    })
    resizeObserver.observe(this.container)
  }
}