export default class UI {
  constructor(csm) {
    message.onclick = () => message.textContent = ''
    skeleton.attachShadow({mode: 'open'})
    skeleton.shadowRoot.innerHTML = `
<style>
h1 {
    font-family: 'Arial';
    font-size: 34px;
    font-weight: normal;
    text-align: center;
    margin: 50px 0 13px 0;
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
    outline: 1px solid #bdbdbd;
}
</style>
<h1></h1>
<h3></h3>
<div class="context"></div>
<div class="actions"></div>`
    skeleton.shadowRoot.lastChild.onclick = (event) => event.target.closest('p') && csm.action(event.target.dataset.id)
    this.state = {}
    this.contexView = []
    this.setTimeoutId = null
  }
  render(actions) {
    skeleton.shadowRoot.children[3].textContent = this.contexView.join(' ')
    skeleton.shadowRoot.lastChild.innerHTML = actions.reduce((accum, el) => accum + `<p data-id="${el}">${ this.state[el].text || el}</p> `, '')
  }
  create(entry) {
    this.contexView = entry.context
    this.state = entry.state
    skeleton.shadowRoot.children[1].textContent = entry.name || 'noname'
    skeleton.shadowRoot.children[2].textContent = entry.description || 'Context State Machine'
  }
  destroy() {
    this.contexView = []
    skeleton.shadowRoot.children[1].textContent = 'noname'
    skeleton.shadowRoot.children[2].textContent = 'Context State Machine'
    skeleton.shadowRoot.children[3].textContent = this.contexView.join(' ')
    skeleton.shadowRoot.lastChild.innerHTML = ''
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
    const trigger = skeleton.shadowRoot.lastChild.querySelector(`[data-id="${arg.trigger}"]`)
    trigger && trigger.classList.add('blink')
    const timeoutID = setTimeout(() => {
      this.contexView = arg.context
      this.render(arg.actions)
      clearTimeout(timeoutID)
    }, 80)
  
  }
}

