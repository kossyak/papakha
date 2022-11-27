export default class Eden {
  constructor() {
    this.container = edenContainer
    this.map = {}
    this.active = {}
    this.sheet = new CSSStyleSheet()
  }
  destroy() {
    for (const name in this.active) {
      clearInterval(this.active[name].intervalId)
    }
    this.active = {}
    this.events = {}
    const count = this.sheet.cssRules.length
    for (let i = 0; i < count; i++) {
      this.sheet.deleteRule(0)
    }
    this.container.innerHTML = ''
  }
  random() {
    const min = 0
    const max = 8
    return Math.floor(Math.random() * (max - min) ) + min
  }
  render() {
    this.container.innerHTML = `
                    <div class="wr-map"><table id="map"></table></div>
                    <div class="panel">
                      <button id="first"></button>
                      <div class="btnGroup">
                        <button id="top"></button>
                        <button id="right"></button>
                        <button id="bottom"></button>
                        <button id="left"></button>
                      </div>
                      <button id="last"></button>
                    </div>`
    for (let i=0; i<8; i++) {
      const tr = document.createElement('tr')
      for (let i=0; i<10; i++) {
        const td = document.createElement('td')
        tr.appendChild(td)
      }
      this.map = map
      this.map.appendChild(tr)
    }
  }
  spawn(name, options) {
    this.active[name] = options
    this.grid(options.y, options.x).classList.add(name)
    this.sheet.addRule('.' + name, `background: ${options.color};`)
    document.adoptedStyleSheets = [this.sheet]
  }
  build(name, options) {
    options?.coords?.forEach(c => {
      this.grid(c.y, c.x).classList.add(name)
      this.sheet.addRule('.' + name, `background: ${options.color};`)
      document.adoptedStyleSheets = [this.sheet]
    })
  }
  grid(y, x) {
    return this.map.children[y].children[x]
  }
  has(active, { y, x }) {
    return this.grid(y, x).classList.contains(active) || false
  }
  async move(name, { y, x }) {
    await new Promise((resolve, reject) => {
      const person = this.active[name]
      clearInterval(person.intervalId)
      const className = this.grid(y || person.y, x || person.x).className
      if (className !== '') {
        reject(className)
        return
      }
      person.intervalId = setTimeout(() => {
        this.grid(person.y, person.x).classList.remove(name)
        if (y !== undefined) person.y = y
        if (x !== undefined) person.x = x
        this.grid(person.y, person.x).classList.add(name)
        clearInterval(person.intervalId)
        resolve()
      }, 800)
    })
  }
  player() {
    document.onkeyup = (event) => {
      this.events[event.code] && this.events[event.code]()
    }
  }
  listener(name, callback) {
    const btn = this.container.querySelector('#'+ name)
    if (btn) btn.onclick = callback
  }
}