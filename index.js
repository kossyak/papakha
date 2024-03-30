import control from './control'
import { compress, decompress } from './utils'
import dpi from './utils/dpi.js'

const text = `/* Additional global objects: body, lesta */\n`

window.view = {
  code: decompress(window.location.pathname.slice(1)) || text,
  _editor: {},
  current: null,
  column: false,
  update(code) {
    this._editor.setValue(code ?? this.code)
  },
  notify(v) {
    console.log(v)
  },
  create(code) {
    const editor = document.getElementById('editor')
    const result = document.getElementById('result')
   
    const clearBtn = document.querySelector('.clear')
    clearBtn.innerHTML = dpi('0111000000011100111001110')
    clearBtn.onclick = () => {
      if (confirm('Are you sure you want to clear code and discard the current changes?')) {
        this.update(text)
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
      navigator.clipboard.writeText(window.location.href).then(() =>{
        alert('URL copied')
      }, function(err) {
        alert('copy error')
      })
    }
    
    control.create()
    if (code) this.code = code
    this._editor = CodeMirror(editor, {
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
    result.contentWindow.lesta = lesta
    result.contentWindow.body = result.contentWindow.document.body
    result.contentWindow.body.innerHTML = '<div class="result-txt">Iframe to display the result</div>'
    result.contentWindow.document.head.innerHTML = `
    <style>
        body {
            font-family: Arial;
            font-size: 14px;
        }
        .result-txt {
            color: #666666;
        }
    </style>`
    let scriptTag = null
    const refresh = (code) => {
      scriptTag && scriptTag.remove?.()
      scriptTag = result.contentWindow.document.createElement('script')
      scriptTag.type = 'module'
      scriptTag.innerHTML = code
      result.contentWindow.document.head.appendChild(scriptTag)
    }

    this._editor.on('changes', () => {
      this.code = this._editor.getValue()
      history.pushState(null, null, '/' + compress(this.code))
      try {
        this.onchange?.(this.code)
        refresh(this.code)
        // new Function('csm', 'result', this.code)('csm', this.result)
      } catch (err) {
        console.log(err)
      }
    })
    const lineCount = this._editor.lineCount();
    this._editor.setCursor({ line: lineCount - 1, ch: 2 });
    this.update()
  }
}
view.create()