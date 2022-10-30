export default class State {
  constructor(root) {
    this.root = root
    this.context = []
    this.actions = {}
    this.events = {}
    if (root) this.ui()
  }
  ui() {
    this.root.attachShadow({mode: 'open'})
    this.root.shadowRoot.innerHTML = `
      <style>
      h1 {
          font-family: 'Arial';
          font-size: 34px;
          font-weight: normal;
          text-align: center;
          margin: 60px 0 13px 0;
          letter-spacing: -0.003em;
          text-transform: capitalize;
      }
      h3 {
        font-family: 'Arial';
        margin: 0;
        font-size: 16px;
        font-weight: normal;
        color: #888;
        text-align: center;
      }
      .actions {
          margin: 20px auto;
          max-width: 300px;
      }
      p {
          font-family: 'Arial';
          font-size: 15px;
          outline: 1px solid #aaa;
          padding: 13px 20px;
          margin: 13px;
          border-radius: 30px;
          cursor: pointer;
      }
      p:active {
        background-color: #bdbdbd;
        outline: 1px solid #bdbdbd;
      }
      .context {
        margin-top: 30px;
        text-align: center;
      }
      </style>
      <h1>noname</h1>
      <h3>Context State Machine</h3>
      <div class="context"></div>
      <div class="actions"></div>`
    this.root.shadowRoot.lastChild.onclick = (event) => event.target.closest('p') && this.action(event.target.dataset.id)
  }
  render(actions) {
    this.root.shadowRoot.children[3].textContent = this.context.join(' ')
    this.root.shadowRoot.lastChild.innerHTML = actions.reduce((accum, el) => accum + `<p data-id="${el}">${ this.actions[el].text || el}</p> `, '')
  }
  create(entry) {
    this.context = entry.context || []
    this.actions = entry.state
    if (this.root) {
      if (entry.name) this.root.shadowRoot.children[1].textContent = entry.name
      if (entry.description) this.root.shadowRoot.children[2].textContent = entry.description
    }
    for (const key in this.actions) {
      this.events[key] = document.createEvent('Event')
      this.events[key].initEvent('csm-' + key, true, false)
    }
    this.update()
  }
  destroy() {
    this.context = []
    this.actions = {}
    this.events = {}
    this.root.shadowRoot.children[1].textContent = 'noname'
    this.root.shadowRoot.children[2].textContent = 'Context State Machine'
    this.root.shadowRoot.children[3].textContent = this.context.join(' ')
    this.root.shadowRoot.lastChild.innerHTML = ''
  }
  value(v) {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
  }
  action(key) {
    const action = this.actions[key]
    if (action) {
      if (!this.context.includes(key)) this.context.push(key)
      this.push(action)
      this.delete(action)
      this.set(action)
      this.update()
    }
  }
  get(key) {
    return this.actions[key]
  }
  set(action) {
    if(action.set) this.context = this.value(action.set)
  }
  push(action) {
    if (action.push) {
      this.value(action.push).forEach(a => {
        if (!this.context.includes(a)) {
          this.context.push(a)
        }
      })
    }
  }
  delete(action) {
    const exclude = [...this.value(action.delete), ...this.value(action.pop)]
    if (exclude.length) {
      const excludeSet = new Set(exclude)
      this.context = this.context.filter(c => !excludeSet.has(c))
    }
  }
  tabu(action) {
    if (action.tabu) {
      return this.value(action.tabu).some((a) => this.context.includes(a))
    }
  }
  update() {
    const result = []
    for (const [key, action] of Object.entries(this.actions)) {
      if (!this.tabu(action)) {
        let count = 0
        const permit = [...this.value(action.pop), ...this.value(action.permit)]
        if (permit.length) {
          for (const p of permit) {
            if (this.context.includes(p)) count++
          }
          if (permit.length === count) result.push(key)
        } else result.push(key)
      }
    }
    result.forEach(key => this.event(key))
    if (this.root) this.render(result)
  }
  event(key) {
    this.events[key].detail = key
    document.dispatchEvent(this.events[key])
  }
  follow(key, callback) {
    document.addEventListener('csm-' + key, (event) => {
      const k = event.detail
      callback(this.actions[k], k, this.context)
    }, false)
  }
  unfollow(key, callback) {
    document.removeEventListener('csm-' + key, (event) => {
      const k = event.detail
      callback(this.actions[k], k, this.context)
    }, false)
  }
}