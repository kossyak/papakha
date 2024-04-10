import control from './control'
import { compress, decompress } from './utils'
import dpi from './utils/dpi.js'

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
  notify(v) {
    console.log(v)
  },
  refresh() {
    this.resultContainer.srcdoc = `
        <script src="https://cdn.jsdelivr.net/gh/lestajs/core@latest/dist/lesta.mountComponent.global.prod.js"></script>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }
        </style>
        <script type="module" defer>${this.code}</script>`
  },
  create(code) {
    const clearBtn = document.querySelector('.clear')
    clearBtn.innerHTML = dpi('0111000000011100111001110')
    clearBtn.onclick = () => {
      if (confirm('Are you sure you want to clear code and discard the current changes?')) {
        this.update('')
      }
    }
    
    const resetBtn = document.querySelector('.reset')
    localStorage.setItem('code', this.code)
    resetBtn.innerHTML = dpi('1110010000101111000011100')
    resetBtn.onclick = () => {
      if (confirm('Are you sure you want to restore the original source code and discard the current changes?')) {
        const code = localStorage.getItem('code')
        code && this.update(code)
      }
    }
    
    const copyBtn = document.querySelector('.copy')
    copyBtn.innerHTML = dpi('1110011100111010000100111')
    copyBtn.onclick = () => {
      const textarea = document.createElement('textarea')
      textarea.value = this.url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('URL copied')
    }
  
    const refreshBtn = document.querySelector('.refresh')
    refreshBtn.innerHTML = dpi('0000011101100011011100000')
    refreshBtn.onclick = () => this.refresh()
    
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
    this._editor.on('changes', () => {
      this.code = this._editor.getValue()
      const compressed = compress(this.code)
      this.url = 'https://papakha.lesta.dev/' + compressed
      history.pushState(null, null, '/' + compressed)
      try {
        this.onchange?.(this.code)
        this.refresh()
        // new Function('csm', 'result', this.code)('csm', this.result)
      } catch (err) {
        console.log(err)
      }
    })
    const lineCount = this._editor.lineCount();
    this._editor.setCursor({ line: lineCount - 1, ch: 2 })
    this.update()
  }
}
view.create()