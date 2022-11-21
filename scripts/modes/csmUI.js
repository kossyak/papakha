export default class csmUI {
  constructor(csm) {
    message.onclick = () => {
      message.textContent = ''
      clearTimeout(this.setTimeoutId)
    }
    this.container = csmContainer
    this.container.attachShadow({mode: 'open'})
    this.container.shadowRoot.innerHTML = `
<style>
h1 {
    font-family: 'Arial';
    font-size: 34px;
    font-weight: normal;
    text-align: center;
    margin: 30px 0 13px 0;
    letter-spacing: -0.003em;
    text-transform: capitalize;
}
.actions {
    margin: 20px;
}
p {
    font-family: monospace;
    font-size: 15px;
    background-color: #f0f0f0;
    padding: 15px 20px;
    margin: 2px 0;
    border-radius: 2px;
    cursor: pointer;
}
/*p:active {*/
/*  background-color: #bdbdbd;*/
/*  outline: 1px solid #bdbdbd;*/
/*}*/
.context {
  margin-top: 30px;
  text-align: center;
}
.blink {
    background-color: #bdbdbd;
}
</style>
<h1></h1>
<div class="context"></div>
<div class="actions"></div>`
    this.container.shadowRoot.lastChild.onclick = (event) => event.target.closest('p') && csm.action(event.target.dataset.id)
    this.state = {}
    this.contexView = []
    this.setTimeoutId = null
  }
  render(actions) {
    this.container.shadowRoot.children[2].textContent = '[ ' + this.contexView.join(' ') + ' ]'
    this.container.shadowRoot.lastChild.innerHTML = actions.reduce((accum, el) => accum + `<p data-id="${el}">${ this.state[el].text || el}</p> `, '')
  }
  create(entry) {
    this.contexView = entry.context
    this.state = entry.state
    this.container.shadowRoot.children[1].textContent = entry.name || 'noname'
  }
  destroy() {
    this.contexView = []
    this.container.shadowRoot.children[1].textContent = 'noname'
    this.container.shadowRoot.children[2].textContent = '[ ' + this.contexView.join(' ') + ' ]'
    this.container.shadowRoot.lastChild.innerHTML = ''
    clearTimeout(this.setTimeoutId)
    message.textContent = ''
  }
  typeWriter(text) {
    let i = 0
    message.textContent = ''
    const typeWriter = () => {
      if (i < text.length) {
        message.textContent += text.charAt(i)
        i++
        this.setTimeoutId = setTimeout(typeWriter, 50)
      } else clearTimeout(this.setTimeoutId)
    }
    clearTimeout(this.setTimeoutId)
    typeWriter()
    
  }
  change(arg) {
    const last = arg.context[arg.context.length - 1]
    if (this.state[last]?.message) this.typeWriter(this.state[last].message)
    const trigger = this.container.shadowRoot.lastChild.querySelector(`[data-id="${arg.trigger}"]`)
    trigger && trigger.classList.add('blink')
    const timeoutID = setTimeout(() => {
      this.contexView = arg.context
      this.render(arg.actions)
      clearTimeout(timeoutID)
    }, 80)
  
  }
}

