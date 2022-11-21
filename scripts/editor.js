import csm from './csm.js'

const _editor = CodeMirror(editor, {
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: true,
  readOnly: 'nocursor',
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

import csmUI from './modes/csmUI.js'
import Eden from './modes/edem.js'

const ui = new csmUI(csm)
const eden = new Eden()

export default class Data {
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
      csmContainer.innerHTML = ''
      eden.destroy()
      csm.off()
      csm.on('_create', (entry) => ui.create(entry))
      csm.on('_destroy', () => ui.destroy())
      csm.on('_change', (arg) => ui.change(arg))
      new Function('csm', 'eden', this.data[key])(csm, eden)
    } catch (err) {}
  }
  active(key) {
    this.current = key
    localStorage.setItem('current', key)
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