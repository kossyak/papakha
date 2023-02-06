import '../styles/base.css'
import '../styles/index.pcss'
import '../styles/examples.css'
import logo from 'url:../icons/logo.svg'
import add from 'bundle-text:../icons/add.svg'
import examples from 'bundle-text:../icons/examples.svg'
import group from 'bundle-text:../icons/group.svg'
import prompt from 'bundle-text:../icons/prompt.svg'
// view
import view from '../view/index'
// data'
import data from './data'
// path edit
import '../../spnsr/SPA/components/ui.css'
import input from '../scripts/components/input'
import '../scripts/components/input/index.css'
import button from '../scripts/components/button'
import '../scripts/components/button/index.css'
import tags from '../scripts/components/tags'
import '../scripts/components/tags/index.css'
import dialog from '../scripts/components/dialog'
import '../scripts/components/dialog/index.css'

// popup
import examplesModal from '../scripts/components/examples'
import docsModal from '../scripts/components/docs'
import html from 'bundle-text:../view/result.txt'

export default {
  template: `
  <div class="dialog"></div>
  <div class="wrapper">
        <header>
            <div class="logo"><img src="${logo}"></div>
            <div id="view-control"></div>
        </header>
        <div id="container">
            <div id="editor"></div>
            <iframe id="result" class="iframe" srcdoc sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0"></iframe>
        </div>
        <footer>
            <div class="prompt"></div>
            <div class="menu"></div>
            <div class="new"></div>
            <div class="current"></div>
            <nav class="tabs"></nav>
            <div class="group"></div>
        </footer>
  </div>`,
  proxies: {
    tabs: [],
    current: ''
  },
  params: {
    active: 0,
    buf: null
  },
  handlers: {
    current(v) {
      this.node.current.method.set(v)
      this.param.active = this.proxy.tabs.findIndex(t => t === v) || 0
      data.active(v)
    }
  },
  nodes() {
    return {
      iframe: {
        srcdoc: html
      },
      dialog: {
        component: {
          src: dialog,
          methods: {
            onclose: () => this.node.dialog.method.close()
          },
          sections:{
            content: {}
          }
        }
      },
      prompt: {
        component: {
          src: button,
          params: {
            icon: prompt
          },
          methods: {
            change: () => {
              this.node.dialog.method.open()
              this.node.dialog.integrate('content', {
                src: docsModal
              })
            }
          }
        }
      },
      menu: {
        component: {
          src: button,
          params: {
            icon: examples
          },
          methods: {
            change: () => {
              this.node.dialog.method.open()
              this.node.dialog.integrate('content', {
                src: examplesModal,
                methods: {
                  onchange: (v) => {
                    this.method.add(v)
                    this.node.dialog.method.close()
                  }
                }
              })
            }
          }
        }
      },
      new: {
        component: {
          src: button,
          params: {
            icon: add
          },
          methods: {
            change: this.method.add
          }
        }
      },
      group: {
        component: {
          src: button,
          params: {
            icon: group
          },
          methods: {
            change: () => this.node.tabs.classList.toggle('full')
          }
        }
      },
      current: {
        component: {
          src: input,
          params: {
            placeholder:'rename',
            maxlength: 12,
            minlength: 1
          },
          methods: {
            change: ({value}) => {
              const v = value.trim().replace(/[^a-z0-9]/gi, '')
              if (!this.proxy.tabs.includes(value)) {
                this.proxy.tabs[this.param.active] = v
                this.param.buf = v
                this.proxy.current = v
              }
            },
            onblur: (value) => {
              if(this.param.buf) {
                if (value !== '' && !data.checkName(value)) {
                  console.log(this.param.active, value)
                  data.rename(this.param.active, value)
                } else {
                  this.proxy.tabs[this.param.active] = this.param.buf
                  this.proxy.current = this.param.buf
                  // message
                }
                this.param.buf = null
              }
            },
          }
        }
      },
      tabs: {
        component: {
          src: tags,
          params: {
            draggable: true
          },
          proxies: {
            _tags: () => this.proxy.tabs,
            active: () => this.proxy.current
          },
          methods: {
            active: (index) => {
              const current = this.proxy.tabs[index]
              this.proxy.current = current
              const code = data.get(current)
              view.update(code)
            },
            remove: (index) => {
              if (this.proxy.tabs.length > 1) {
                const buf = this.proxy.tabs[index]
                this.proxy.tabs.splice(index, 1)
                data.remove(buf, this.proxy.tabs)
                if (this.param.active === index) {
                  if (index === 0) {
                    this.proxy.current = this.proxy.tabs[0]
                  } else {
                    this.proxy.current = this.proxy.tabs[this.param.active - 1]
                  }
                } else if (index < this.param.active) this.param.active--
                const code = data.get(this.proxy.current)
                view.update(code)
              }
            },
            move: (from, to) => {
              const buf = this.proxy.tabs[from]
              this.proxy.tabs.splice(from, 1)
              this.proxy.tabs.splice(to, 0, buf)
              this.param.active = this.proxy.tabs.findIndex(t => t === this.proxy.current) || 0
              data.order(this.proxy.tabs)
            }
          }
        }
      }
    }
  },
  methods: {
    add({code = ''}) {
      let value = Math.random().toString(16).slice(8)
      if (!data.checkName(value)) {
        this.param.active++
        this.proxy.tabs.splice(this.param.active, 0, value)
        this.proxy.current = value
        this.node.current.method.focus()
        data.create(value, this.proxy.tabs)
        if (code) data.set(code)
        view.update(code)
      }
    }
  },
  mounted() {
    this.node.iframe.onload = () => {
      data.init((tabs, code, current) => {
        this.proxy.current = current
        this.proxy.tabs = tabs
        view.create(null, (code) => {
          data.update(this.proxy.current, code)
        })
        view.update(code)
      })
    }
  }
}