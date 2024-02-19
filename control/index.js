import dpi from '../utils/dpi'
import CSM from '../utils/csm'
import schema from './schema'

export default {
  container: document.getElementById('container'),
  control:  document.getElementById('view-control'),
  csm: new CSM(schema),
  buttons: {},
  button(b) {
    const button = document.createElement('button')
    this.buttons[b.name] = button
    button.innerHTML = dpi(b.icon)
    button.className = b.name + '-btn'
    button.title = b.name
    this.control.appendChild(button)
    button.onclick = () => this.csm.do(b.name)
  },
  create() {
    const buttons = [
      { name: 'col', icon: '1111111111000001111111111'},
      { name: 'row', icon: '1111110011100111001111111'},
      { name: 'code', icon: '1111110001100011000111111'},
      { name: 'result', icon: '1111111111111111111111111'}
    ]
    buttons.forEach(b => this.button(b))
    this.csm.init()
    this.csm.on('--update', (event) => {
      this.buttons[event.action]?.classList.add('active')
      event.closed.forEach(c => this.buttons[c]?.classList.remove('active'))
    })
    this.csm.on('--do-col', () => this.container.setAttribute('direction', 'col'))
    this.csm.on('--do-row', () => {
      this.container.setAttribute('direction', 'row')
      this.container.removeAttribute('view')
    })
    this.csm.on('--do-code', () => this.container.setAttribute('view', 'code'))
    this.csm.on('--do-result', () => this.container.setAttribute('view', 'result'))
  
    this.csm.on('--open-scrollToCode', () => this.container.scrollTo({ top: 0 }))
    this.csm.on('--open-scrollToResult', () => this.container.scrollTo({ top: this.container.scrollHeight }))
  
    this.csm.do('row')

    const resizeObserver = new ResizeObserver(() => {
      if (document.documentElement.clientWidth <= 540) {
        this.csm.do('col')
        this.buttons['col'].hidden = true
        this.buttons['row'].hidden = true
      } else {
        this.buttons['col'].hidden = false
        this.buttons['row'].hidden = false
      }
    })
    resizeObserver.observe(this.container)
  }
}