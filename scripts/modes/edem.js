export default class Eden {
  constructor() {
    this.container = edenContainer
    this.map = {}
    this.sprite = {}
    this.events = {}
    this.player()
    this.sheet = new CSSStyleSheet()
  }
  destroy() {
    for (const name in this.sprite) {
      clearInterval(this.sprite[name].intervalId)
    }
    this.sprite = {}
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
  tick(callback) {
    const intervalId = setInterval(() => {
      callback()
    }, 800)
    return () => clearInterval(intervalId)
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
        td.onclick = function() {
          td.classList.toggle('wall')
        }
      }
      this.map = map
      this.map.appendChild(tr)
    }
  }
  spawn(name, obj) {
    this.sprite[name] = obj
    this.map.children[obj.y].children[obj.x].classList.add(name)
    this.sheet.addRule('.' + name, `background: ${obj.color};`)
    document.adoptedStyleSheets = [this.sheet]
  }
  grid(y, x) {
    return this.map.children[y].children[x]
  }
  has(sprite, y, x) {
    return this.map.children[y]?.children[x]?.classList.contains(sprite) || false
  }
  move(name, callback) {
    const person = this.sprite[name]
    const stop = () => clearInterval(person.intervalId)
    stop()
    const offset = () => {
      const res = callback(person.y, person.x)
      if (res) {
        this.grid(person.y, person.x).classList.remove(name)
        const { y, x } = res
          if (y !== undefined) person.y = y
          if (x !== undefined) person.x = x
          this.grid(person.y, person.x).classList.add(name)
      }
    }
    if (callback) {
      person.intervalId = setInterval(() => {
        offset()
      }, 800)
    } else offset()
  }
  eventPlayer(event, callback) {
    this.events[event] = callback
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