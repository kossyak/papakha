export default {
  code: '',
  _editor: {},
  current: null,
  update(code) {
    this._editor.setValue(code ?? this.code)
  },
  notify() {
    console.log('notify')
  },
  active(target, tab) {
    this.current?.classList.remove('active')
    this.current = target
    container.className = tab
    this.current.classList.add('active')
  },
  create(code, change, bus) {
    const control = window['view-control']
  
    const btnRefresh = document.createElement('div')
    const btnSplit = document.createElement('div')
    const btnCode = document.createElement('div')
    const btnResult = document.createElement('div')
  
    btnRefresh.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">
<path d="M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2h3.7v2l4-4h-4H4C1.8,0,0,1.8,0,4s1.8,4,4,4h1.7l2-2H4z"/>
<path d="M16,0h-2.3l-2,2H16c1.1,0,2,0.9,2,2s-0.9,2-2,2h-4.3V4l-4,4h4H16c2.2,0,4-1.8,4-4S18.2,0,16,0z"/>
</svg>`
    btnSplit.innerHTML = `<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">
<path d="M16,0H4C1.8,0,0,1.8,0,4s1.8,4,4,4h12c2.2,0,4-1.8,4-4S18.2,0,16,0z M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2h6v4H4z"/>
</svg>`
    btnCode.innerHTML = `<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">
<path d="M16,2c1.1,0,2,0.9,2,2s-0.9,2-2,2H4C2.9,6,2,5.1,2,4s0.9-2,2-2H16 M16,0H4C1.8,0,0,1.8,0,4s1.8,4,4,4h12c2.2,0,4-1.8,4-4
S18.2,0,16,0L16,0z"/>
</svg>`
    btnResult.innerHTML = `<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">
<path d="M16,8H4C1.8,8,0,6.2,0,4v0c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v0C20,6.2,18.2,8,16,8z"/>
</svg>`
  
    btnRefresh.className = 'refreshBtn'
    btnSplit.className = 'splitBtn'
    btnCode.className = 'codeBtn'
    btnResult.className = 'resultBtn'
  
    btnRefresh.title = 'refresh'
    btnSplit.title = 'split'
    btnCode.title = 'code'
    btnResult.title = 'result'
    
    control.appendChild(btnRefresh)
    control.appendChild(btnSplit)
    control.appendChild(btnCode)
    control.appendChild(btnResult)

    btnRefresh.onclick = () => this.update()
    btnSplit.onclick = () => this.active(btnSplit, 'split')
    btnCode.onclick = () => this.active(btnCode, 'code')
    btnResult.onclick = () => this.active(btnResult, 'result')
  
    if (document.documentElement.clientWidth < 620) {
      this.active(btnCode, 'code')
    } else {
      this.active(btnSplit, 'split')
    }
    
    
    this.code = code || ''
    this._editor = CodeMirror(editor, {
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
    result.contentWindow.bus = bus
    this._editor.on('changes', () => {
      this.code = this._editor.getValue()
      try {
        change && change(this.code)
        result.contentWindow.result(this.code)
      } catch (err) {
        console.log(err)
      }
    })
    this.update()
  }
}