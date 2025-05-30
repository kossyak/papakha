import control from './control'
import { compress, decompress } from './utils'
import { debounce } from './utils/debounce'

window.view = {
  code: decompress(window.location.pathname.slice(1)) || '',
  editorContainer: document.getElementById('editor'),
  resultContainer: document.getElementById('result'),
  _editor: {},
  current: null,
  column: false,
  url: '',
  update(code) {
    this._editor.setValue(code ?? this.code)
  },
  refresh() {
    this.resultContainer.srcdoc = `
        <style>
            body, button, input {
                font-family: 'Verdana';
                font-size: 14px;
            }
        </style>
        <script type="module" defer>${this.code}</script>`
  },
  create(code) {
    const clearBtn = document.querySelector('.clear')
    clearBtn.onclick = () => {
      if (confirm('Are you sure you want to clear code?')) {
        this.update('')
      }
    }
    
    const copyBtn = document.querySelector('.copy')
    copyBtn.onclick = () => {
      const textarea = document.createElement('textarea')
      textarea.value = this.url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('URL copied')
    }
    
    control.create()
    if (code) this.code = code
    this._editor = CodeMirror(this.editorContainer, {
      lineNumbers: true,
      lineWrapping: true,
      styleActiveLine: true,
      autofocus: true,
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
    const d = debounce(() => {
      const compressed = compress(this.code)
      this.url = 'https://papakha.lesta.dev/' + compressed
      history.pushState(null, null, '/' + compressed)
      if (this.url.length > 2000) alert(`Your code is compressed and URL-encoded with ${this.url.length} characters. The maximum allowed length is 2000 characters.`)
      try {
        this.onchange?.(this.code)
        this.refresh()
      } catch (err) {
        console.log(err)
      }
    }, 300)
    this._editor.on('changes', () => {
      this.code = this._editor.getValue()
      d()
    })
    const lineCount = this._editor.lineCount();
    this._editor.setCursor({ line: lineCount - 1, ch: 2 })
    this.update()
  }
}
view.create()