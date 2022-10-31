const door = `const door = {
  name: 'door',
  description: '',
  context: ['lock', 'dark'],
  state: {
    light: {
      pop: 'dark',
      tabu: 'enter',
      text: 'Включить свет'
    },
    dark: {
      pop: 'light',
      tabu: 'enter',
      text: 'Выключить свет'
    },
    lock: {
      pop: 'unlock',
      permit: 'close',
      push: 'trigger',
      text: 'Запереть дверь'
    },
    unlock: {
      pop: 'lock',
      push: 'close',
      text: 'Отпереть дверь'
    },
    close: {
      pop: 'open',
      permit: 'unlock',
      tabu: 'enter',
      text: 'Закрыть дверь'
    },
    open: {
      pop: 'close',
      permit: 'unlock',
      text: 'Открыть дверь'
    },
    enter: {
      permit: 'open',
      tabu: ['enter', 'key'],
      text: 'Войти в комнату'
    },
    back: {
      pop: 'enter',
      delete: 'table',
      text: 'Выйти из комнаты'
    },
    table: {
      permit: ['enter', 'light'],
      tabu: 'table',
      text: 'Осмотреть стол'
    },
    key: {
      permit: ['enter', 'table'],
      tabu: 'key',
      delete: 'trigger',
      text: 'Взять ключ'
    },
    exit: {
      permit: ['key', 'open', 'trigger'],
      tabu: 'exit',
      set: 'exit',
      text: 'Выйти'
    },
    end: {
      permit: 'exit',
      text: 'Конец игры'
    }
  }
}
csm.create(door)`


import State from './state.js'


const root = document.querySelector('#root')
const editor = document.querySelector('#editor')

const csm = new State(root)


// csm.follow('exit', (action, key, context) => console.log(action, key, context))

const _editor = CodeMirror(editor, {  // papakha
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: {
    esversion: 11,
    asi: true
  },
  tabSize: 2,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2
  }
})

class Data {
  constructor() {
    this.data = {
      'mystory': '',
    }
    const data = localStorage.getItem('csm')
    if (data) {
      this.data = JSON.parse(data)
    }
    this.current = 'mystory'
    _editor.on('changes', () => this.update(this.current))
  }
  rename(old_key, new_key) {
    if (old_key !== new_key) {
      Object.defineProperty(this.data, new_key, Object.getOwnPropertyDescriptor(this.data, old_key))
      this.remove(old_key)
    }
  }
  create(key) {
    this.current = key
    this.data[key] = ''
    _editor.setValue('')
  }
  remove(key) {
    delete this.data[key]
    localStorage.setItem('csm', JSON.stringify(this.data))
  }
  update(key) {
    this.data[key] = _editor.getValue()
    localStorage.setItem('csm', JSON.stringify(this.data))
    try {
      eval(this.data[key])
    } catch (err) {}
  }
  active(key) {
    this.current = key
    csm.destroy()
    _editor.setValue(this.data[key])
  }
  checkName(name) {
    return name in this.data
  }
  get(key) {
    return this.data[key]
  }
  getAll() {
    return this.data
  }
  set(code) {
    this.data[this.current] = code
    _editor.setValue(code)
  }
}

const data = new Data()

const newBtn = document.querySelector('.new')
const nav = document.querySelector('footer nav')
const inpName = document.querySelector('footer .name')
const sampleBtn = document.querySelector('.sample')
const group = document.querySelector('.group')
const bar = document.querySelector('.bar')
const refresh = document.querySelector('.refresh')
const prompt = document.querySelector('.prompt')
const close = document.querySelector('.close')
const popup = document.querySelector('.popup')

let current
let tab

const addBtn = (name) => {
  const btn = document.createElement('div')
  btn.classList.add('btn')
  current = btn
  const span = document.createElement('span')
  const button = document.createElement('button')
  button.classList.add('remove')
  span.textContent = name
  btn.appendChild(span)
  btn.appendChild(button)
  
  btn.onclick = () => {
    current.classList.remove('active')
    current = btn
    btn.classList.add('active')
    inpName.value = span.textContent
    tab = span.textContent
    data.active(tab)
    localStorage.setItem('current', tab)
  }
  button.onclick = (event) => {
    event.stopPropagation()
    if (nav.children.length > 1) {
      if (window.confirm(`Вы уверены, что хотите удалить документ "${btn.firstChild.textContent}"?`)) {
        if (current === btn) {
          if (current === nav.firstElementChild) {
            current = btn.nextElementSibling
          } else {
            current = btn.previousElementSibling
          }
          current.classList.add('active')
          tab = current.firstChild.textContent
          inpName.value = tab
          data.active(tab)
        }
        btn.remove()
        data.remove(btn.firstChild.textContent)
      }
    } else alert('Нельзя удалить единственный документ.')
  }
  nav.appendChild(btn)
}

const stories = data.getAll()
if (stories) {
  for (const key in stories) {
    addBtn(key)
    tab = key
  }
  const c = localStorage.getItem('current')
  if(data.checkName(c)) tab = c
  const index = Object.keys(stories).findIndex(s => s === tab)
  current = nav.children[index]
  current.classList.add('active')
  inpName.value = tab
  data.active(tab)
}

newBtn.onclick = () => {
  if (nav.children.length <= 10) {
    let value = Math.random().toString(16).slice(8)
    if(!data.checkName(value)) {
      data.create(value)
      inpName.value = tab = value
      current && current.classList.remove('active')
      addBtn(value)
      current.classList.add('active')
      inpName.focus()
      localStorage.setItem('current', tab)
    }
  }
}

inpName.oninput = () => {
  inpName.value = inpName.value.replace(/[^a-z0-9]/gi,'')
  current.firstChild.textContent = inpName.value.trim()
}
inpName.onblur = () => {
    if (inpName.value !== '')  {
      data.rename(tab, inpName.value)
    } else {
      current.firstChild.textContent = tab
    }
}

sampleBtn.onclick = () => {
  if(data.get(tab) === '') {
    data.set(door)
  } else {
    if (window.confirm('Документ не пустой. Вы уверены, что хотите заменить ваш код на образец?')) {
      data.set(door)
    }
  }
  root.classList.add('show')
}
group.onclick = () => nav.classList.toggle('full')
bar.onclick = () => root.classList.toggle('show')
prompt.onclick = () => popup.classList.add('show')
close.onclick = () => popup.classList.remove('show')

refresh.onclick = () => data.update(tab)