function t(t,e,n,s){Object.defineProperty(t,e,{get:n,set:s,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},a={},r=n.parcelRequire3fbf;null==r&&((r=function(t){if(t in s)return s[t].exports;if(t in a){var e=a[t];delete a[t];var n={id:t,exports:{}};return s[t]=n,e.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){a[t]=e},n.parcelRequire3fbf=r),r.register("kyEFX",(function(e,n){var s,a;t(e.exports,"register",(function(){return s}),(function(t){return s=t})),t(e.exports,"resolve",(function(){return a}),(function(t){return a=t}));var r={};s=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)r[e[n]]=t[e[n]]},a=function(t){var e=r[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),r("kyEFX").register(JSON.parse('{"6T0cF":"index.7d1f6405.js","fqb5M":"logo.45ec4c48.svg","1o8o6":"index.df0623cf.css"}'));const i={update:(t,e,n)=>{const s="function"==typeof e[n]?e[n]():e[n];requestAnimationFrame((e=>{s?requestAnimationFrame((e=>{t.classList.add(n)})):t.classList.remove(n)}))}},o={stop:t=>t.stopPropagation(),create:(t,e,n)=>{"function"==typeof e.hide&&(t.addEventListener("click",n.stop),document.addEventListener("click",e.hide))},destroy:(t,e,n)=>{t.removeEventListener("click",n.stop),document.removeEventListener("click",e.hide)}};var c;c=new URL(r("kyEFX").resolve("fqb5M"),import.meta.url).toString();var l={code:"",_editor:{},current:null,update(t){this._editor.setValue(t??this.code)},notify(){console.log("notify")},active(t,e){this.current?.classList.remove("active"),this.current=t,container.className=e,this.current.classList.add("active")},create(t,e,n){const s=window["view-control"],a=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div"),o=document.createElement("div");a.innerHTML='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">\n<path d="M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2h3.7v2l4-4h-4H4C1.8,0,0,1.8,0,4s1.8,4,4,4h1.7l2-2H4z"/>\n<path d="M16,0h-2.3l-2,2H16c1.1,0,2,0.9,2,2s-0.9,2-2,2h-4.3V4l-4,4h4H16c2.2,0,4-1.8,4-4S18.2,0,16,0z"/>\n</svg>',r.innerHTML='<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">\n<path d="M16,0H4C1.8,0,0,1.8,0,4s1.8,4,4,4h12c2.2,0,4-1.8,4-4S18.2,0,16,0z M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2h6v4H4z"/>\n</svg>',i.innerHTML='<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">\n<path d="M16,2c1.1,0,2,0.9,2,2s-0.9,2-2,2H4C2.9,6,2,5.1,2,4s0.9-2,2-2H16 M16,0H4C1.8,0,0,1.8,0,4s1.8,4,4,4h12c2.2,0,4-1.8,4-4\nS18.2,0,16,0L16,0z"/>\n</svg>',o.innerHTML='<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n viewBox="0 0 20 8" style="enable-background:new 0 0 20 8;" xml:space="preserve">\n<path d="M16,8H4C1.8,8,0,6.2,0,4v0c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v0C20,6.2,18.2,8,16,8z"/>\n</svg>',a.className="refreshBtn",r.className="splitBtn",i.className="codeBtn",o.className="resultBtn",a.title="refresh",r.title="split",i.title="code",o.title="result",s.appendChild(a),s.appendChild(r),s.appendChild(i),s.appendChild(o),a.onclick=()=>this.update(),r.onclick=()=>this.active(r,"split"),i.onclick=()=>this.active(i,"code"),o.onclick=()=>this.active(o,"result"),document.documentElement.clientWidth<620?this.active(i,"code"):this.active(r,"split"),this.code=t||"",this._editor=CodeMirror(editor,{lineNumbers:!0,lineWrapping:!0,styleActiveLine:!0,gutters:["CodeMirror-lint-markers"],lint:{esversion:11,asi:!0},tabSize:2,mode:{name:"javascript",json:!0,statementIndent:2}}),result.contentWindow.bus=n,this._editor.on("changes",(()=>{this.code=this._editor.getValue();try{e&&e(this.code),result.contentWindow.result(this.code)}catch(t){console.log(t)}})),this.update()}};var d={flame:"const story = {\n  name: 'door',\n  description: '',\n  context: ['start', 'lock', 'dark', 'close'],\n  actions: {\n    welcome: {\n      permit: 'start',\n      notify: ['Перед вами дверь...', 'Слева от двери на стене закреплен факел']\n    },\n    light: {\n      pop: 'dark',\n      text: 'Взять факел',\n    },\n    dark: {\n      pop: 'light',\n      text: 'Вставить факел обратно'\n    },\n    lock: {\n      pop: 'unlock',\n      permit: 'close',\n      push: 'trigger',\n      text: 'Запереть дверь'\n    },\n    unlock: {\n      delete: 'start',\n      pop: 'lock',\n      text: 'Отпереть дверь',\n    },\n    close: {\n      pop: 'open',\n      text: 'Закрыть дверь'\n    },\n    open: {\n      pop: 'close',\n      permit: 'unlock',\n      text: 'Открыть дверь',\n    },\n    enter: {\n      permit: 'open',\n      tabu: ['key', 'trigger'],\n      text: 'Войти в комнату',\n      actions: {\n        room: {\n          permit: 'dark',\n          notify: ['Здесь темно и совсем ничего не видно.']\n        },\n        inside: {\n          permit: 'light',\n          notify: ['Вы в пустой комнате...', 'В центре комнаты стоит стол.']\n        },\n        back: {\n          to: '/',\n          text: 'Выйти из комнаты'\n        },\n        table: {\n          permit: 'light',\n          text: 'Осмотреть стол',\n          actions: {\n            key: {\n              to: '/enter',\n              tabu: 'key',\n              delete: 'trigger',\n              text: 'Взять ключ'\n            },\n            empty: {\n              permit: 'key',\n              to: '/enter',\n              text: 'пусто'\n            }\n          }\n        }\n      }\n    },\n    exit: {\n      permit: ['open', 'trigger', 'key'],\n      text: 'Выйти',\n      actions: {\n        end: {\n          text: 'Конец игры'\n        }\n      }\n    }\n  }\n}\ncsm.create(story)",skeleton:"const story = {\n  name: 'toggle',\n  description: '',\n  context: ['off'],\n  state: {\n    on: {\n      pop: 'off'\n    },\n    off: {\n      pop: 'on'\n    }\n  }\n}\ncsm.create(story)",tiger:"eden.map(10, 8)\n\neden.build('wall', {\n  coords: [{y: 2, x: 1}, {y: 2, x: 0}],\n  color: 'gray'\n})\n\neden.listener('left', () => console.log('click left'))\n\neden.spawn('tiger', {\n  y: 5,\n  x: 0,\n  color: 'orange'\n})\neden.spawn('meet', {\n  y: eden.random(9),\n  x: eden.random(9),\n  color: 'red'\n})\n\neden.move('tiger', { y:eden.active.tiger.y-1 })"},h={name:"papakha",current:"sample",data:{sample:d.flame},tabs:["sample"],init(t){const e=localStorage.getItem(this.name);e&&(this.data=JSON.parse(e));const n=localStorage.getItem("tabs");n&&(this.tabs=JSON.parse(n)),this.current=localStorage.getItem("current")||this.current,t([...this.tabs],this.data[this.current],this.current)},rename(t,e){const n=this.tabs[t];n!==e&&(Object.defineProperty(this.data,e,Object.getOwnPropertyDescriptor(this.data,n)),delete this.data[n],localStorage.setItem(this.name,JSON.stringify(this.data)),this.tabs[t]=e,localStorage.setItem("tabs",JSON.stringify(this.tabs)),this.current=e,localStorage.setItem("current",e))},create(t,e){this.current=t,this.data[t]="";const n=JSON.stringify(e);this.tabs=JSON.parse(n),localStorage.setItem("tabs",n),localStorage.setItem(this.name,JSON.stringify(this.data))},remove(t,e){delete this.data[t];const n=JSON.stringify(e);this.tabs=JSON.parse(n),localStorage.setItem(this.name,JSON.stringify(this.data)),localStorage.setItem("tabs",JSON.stringify(this.tabs))},order(t){const e=JSON.stringify(t);this.tabs=JSON.parse(e),localStorage.setItem("tabs",JSON.stringify(this.tabs))},update(t,e){this.data[t]=e,localStorage.setItem(this.name,JSON.stringify(this.data))},active(t){this.current=t,localStorage.setItem("current",t)},checkName(t){return t in this.data},get(t){return this.data[t]},set(t){this.data[this.current]=t}},p={template:'\n    <div class="LstLabel"></div>\n    <input type="text" class="LstInput b0 br pn">\n    <div class="LstMessage"></div>',props:{proxies:{value:{default:""},message:{}},params:{value:{},label:{},name:{},type:{default:"text"},size:{},validate:{},placeholder:{default:""},readonly:{default:!1},autocomplete:{},autofocus:{},maxlength:{},minlength:{},max:{},min:{},step:{}},methods:{change:{},onfocus:{},onblur:{}}},nodes(){return{LstLabel:{textContent:()=>this.param.label},LstMessage:{textContent:()=>this.proxy.message},LstInput:{_attr:{size:this.param.size,readonly:this.param.readonly,required:this.param.validate?.required,minlength:this.param.minlength,maxlength:this.param.maxlength,min:this.param.min,max:this.param.max},value:()=>this.proxy.value||this.param.value||"",type:this.param.type,placeholder:this.param.placeholder,oninput:t=>{this.param.value=t.target.value,this.proxy.value=t.target.value,this.method.change&&this.method.change(this.param)},onfocus:()=>this.method.onfocus&&this.method.onfocus(this.proxy.value),onblur:()=>this.method.onblur&&this.method.onblur(this.proxy.value)}}},methods:{set(t){this.proxy.value=t},validate(){if(this.node.LstInput.checkValidity())return!0;this.proxy.message=this.node.LstInput.validationMessage},blur(){this.node.LstInput.blur()},focus(){this.node.LstInput.focus()},select(){this.node.LstInput.select()},disabled(t){this.node.LstInput.disabled=t}}},m={template:'\n  <button class="LstButton fx-b br pn">\n    <span class="LstButtonIcon"></span>\n    <span class="LstButtonText"></span>\n  </button>',props:{proxies:{color:{},text:{},active:{},disabled:{},hide:{}},params:{name:{default:""},text:{},type:{default:""},size:{default:""},autofocus:{},icon:{default:""}},methods:{change:{}}},nodes(){return{LstButton:{_classes:{hide:()=>this.proxy.hide,active:()=>this.proxy.active,filled:this.param.type&&"text"!==this.param.type},_attr:{size:this.param.size},name:this.param.name,type:this.param.type,onclick:()=>this.method.change(this.param)},LstButtonIcon:{innerHTML:()=>this.param.icon},LstButtonText:{textContent:()=>this.param.text||this.proxy.text}}}},v={template:'<button class="LstLi pn"><span class="LstText"></span><span class="LstClose"></span></button>',props:{proxies:{li:{},selected:{},active:{}},params:{index:{},size:{},draggable:{}},methods:{active:{},remove:{},select:{},change:{}}},nodes(){return{LstLi:{_attr:{size:this.param.size,name:this.param.index},_classes:{selected:()=>this.proxy.selected,active:()=>this.proxy.active},ondragstart:()=>this.method.select(this.param.index),ondragend:()=>this.method.select(null),ondragover:()=>this.method.change(this.param.index),onclick:()=>this.method.active(this.param.index),draggable:this.param.draggable},LstText:{textContent:()=>this.proxy.li},LstClose:{onclick:t=>{t.stopPropagation(),this.method.remove(this.param.index)}}}}},u={template:'\n  <div class="LstList"></div>',props:{proxies:{_tags:{type:"Array"},active:{}},params:{tags:{type:"Array"},size:{},draggable:{}},methods:{active:{},remove:{},move:{}}},proxies:{selected:!1},params:{current:null},nodes(){return{LstList:{component:{src:v,iterate:()=>this.param.tags||this.proxy._tags||[],proxies:{li:t=>t,selected:(t,e)=>this.proxy.selected===e,active:t=>this.proxy.active===t},params:{index:(t,e)=>e,size:this.param.size,draggable:this.param.draggable},methods:{active:this.method.active,remove:this.method.remove,select:t=>this.proxy.selected=t,change:t=>this.param.current=t}},ondragover:t=>{t.preventDefault();this.node.LstList.children[this.proxy.selected]!==this.node.LstList.children[this.param.current]&&(this.method.move(this.proxy.selected,this.param.current),this.proxy.selected=this.param.current)}}}},mounted(){console.log(this.node.LstList.reactivity)}},g={template:'\n  <dialog class="LstDialog">\n    <div class="LstClose"></div>\n    <div section="content"></div>\n  </dialog>',props:{methods:{onclose:{}}},nodes(){return{LstDialog:{},LstClose:{onclick:()=>this.method.onclose&&this.method.onclose()}}},methods:{close(){this.node.LstDialog.close()},open(){this.node.LstDialog.showModal()}}};var x={template:`\n  <div class="ex-bns">\n    <div class="popup-icon">${e('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M0 30v15c0 2.8 2.2 5 5 5h40c2.8 0 5-2.2 5-5V20H0v10zm40 0v10H10V30h30zM45 0H5C2.2 0 0 2.2 0 5v5h50V5c0-2.8-2.2-5-5-5z"/></svg>')}</div>\n    <div class="item">\n      <button class="skeleton br5"></button>\n      <div>\n        <h2>Skeleton</h2>\n        <p>Пример кода CSM модуля, с минимальным набором параметров.</p>\n      </div>\n    </div>\n    <div class="item">\n    <button class="flame br5"></button>\n      <div>\n        <h2>Flame</h2>\n        <p>Пример кода CSM модуля, максимально полно отражающий возможности данного модуля.</p>\n      </div>\n    </div>\n    <div class="item">\n      <button class="tiger br5"></button>\n      <div>\n        <h2>Tiger</h2>\n        <p>Заготовка для разработки собственной мини игры на движке EDEN.</p>\n      </div>\n    </div>\n  </div>`,props:{methods:{onchange:{}}},nodes(){return{skeleton:{onclick:()=>this.method.onchange({code:d.skeleton})},flame:{onclick:()=>this.method.onchange({code:d.flame})},tiger:{onclick:()=>this.method.onchange({code:d.tiger})}}}};var y={template:`\n  <div class="ex-bns">\n    <div class="popup-icon">${e('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M45 0H5C2.2 0 0 2.2 0 5v15h10V10h30v10H25c-2.8 0-5 2.2-5 5v5h25c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM20 40h10v10H20z"/></svg>')}</div>\n    <div class="item">\n      <button data-id="logo"></button>\n      <div>\n        <h2>Papakha</h2>\n        <p>Papakha - это редактор-песочница, который по умолчанию поддерживает язык программирования javascript и следующие модули:</p>\n        <div class="links">\n          <a href="https://github.com/kossyak/csmjs/blob/main/README.md">CSM</a><span>|</span>\n          <a href="https://github.com/kossyak/eden/blob/main/README.md">EDEN</a><span>|</span>\n          <a href="">Leste</a>\n        </div>\n        <h3>CSM</h3>\n        <p>Создавайте свои текстовые игры без программирования, используя только небольшой набор параметров.</p>\n        <h3>EDEN</h3>\n        <p>Изучите основы самого популярного языка программирования Java Script, который широко используется для разработки сайтов и приложений в браузере.</p>\n        <h3>Leste</h3>\n        <p>Создавайте пользовательский интерфейсы и освойте профессию фронтенд разработчика с фреймворком leste.</p>\n      </div>\n    </div>\n  </div>`};var b={template:`\n  <div class="dialog"></div>\n  <div class="wrapper">\n        <header>\n            <div class="logo"><img src="${e(c)}"></div>\n            <div id="view-control"></div>\n        </header>\n        <div id="container">\n            <div id="editor"></div>\n            <iframe id="result" class="iframe" srcdoc sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0"></iframe>\n        </div>\n        <footer>\n            <div class="prompt"></div>\n            <div class="menu"></div>\n            <div class="new"></div>\n            <div class="current"></div>\n            <nav class="tabs"></nav>\n            <div class="group"></div>\n        </footer>\n  </div>`,proxies:{tabs:[],current:""},params:{active:0,buf:null},handlers:{current(t){this.node.current.method.set(t),this.param.active=this.proxy.tabs.findIndex((e=>e===t))||0,h.active(t)}},nodes(){return{iframe:{srcdoc:e('<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    \x3c!-- ui css? --\x3e\r\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kossyak/csmjs@latest/ui/style.min.css" type="text/css"/>\r\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kossyak/eden@latest/styles/eden.min.css" type="text/css"/>\r\n    <script src="https://cdn.jsdelivr.net/gh/lestejs/leste@latest/bundlers/leste.global.min.js"><\/script>\r\n    <style>\r\n        body {\r\n            margin: 0;\r\n            font-family: Arial;\r\n            font-size: 15px;\r\n            max-height: 100vh;\r\n        }\r\n        *, :before, :after {\r\n            box-sizing: border-box;\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div id="root"></div>\r\n    <script type="module" defer>\r\n      import Eden from \'https://cdn.jsdelivr.net/gh/kossyak/eden@latest/eden.min.js\'\r\n      const eden = new Eden(root)\r\n      import csm from \'https://cdn.jsdelivr.net/gh/kossyak/csmjs@latest/csm.min.js\'\r\n      import ui from \'https://cdn.jsdelivr.net/gh/kossyak/csmjs@latest/ui/ui.js\'\r\n      const leste = new Leste({ root })\r\n\r\n      const notify = (v) => console.log(v)\r\n\r\n\r\n      window.result = async (code) => {\r\n        try {\r\n          eden.reset()\r\n          csm.off()\r\n          csm.on(\'_create\', async (entry) => {\r\n            root.unmount && await root.unmount()\r\n            await leste.mount(ui, {\r\n              params: { name: entry.name },\r\n              methods: {\r\n                action: (action) => csm.action(action)\r\n            }})\r\n          })\r\n          csm.on(\'_destroy\', () => leste.unmount())\r\n          csm.on(\'_change\', (arg) => root.method.change(arg))\r\n          new Function(\'notify\', \'eden\', \'csm\', \'leste\', code)(notify, eden, csm, leste)\r\n        } catch (err) {\r\n          console.log(err)\r\n        }\r\n      }\r\n    <\/script>\r\n</body>\r\n</html>')},dialog:{component:{src:g,methods:{onclose:()=>this.node.dialog.method.close()},sections:{content:{}}}},prompt:{component:{src:m,params:{icon:e('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M45 0H5C2.2 0 0 2.2 0 5v15h10V10h30v10H25c-2.8 0-5 2.2-5 5v5h25c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM20 40h10v10H20z"/></svg>')},methods:{change:()=>{this.node.dialog.method.open(),this.node.dialog.integrate("content",{src:y})}}}},menu:{component:{src:m,params:{icon:e('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M0 30v15c0 2.8 2.2 5 5 5h40c2.8 0 5-2.2 5-5V20H0v10zm40 0v10H10V30h30zM45 0H5C2.2 0 0 2.2 0 5v5h50V5c0-2.8-2.2-5-5-5z"/></svg>')},methods:{change:()=>{this.node.dialog.method.open(),this.node.dialog.integrate("content",{src:x,methods:{onchange:t=>{this.method.add(t),this.node.dialog.method.close()}}})}}}},new:{component:{src:m,params:{icon:e('<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path transform="rotate(-90 25 25)" d="M0 20h50v10H0z"/><path d="M0 20h50v10H0z"/></svg>')},methods:{change:this.method.add}}},group:{component:{src:m,params:{icon:e('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M30 50h15c2.8 0 5-2.2 5-5V30H30v20zM45 0H30v20h20V5c0-2.8-2.2-5-5-5zM0 45c0 2.8 2.2 5 5 5h15V30H0v15zM0 5v15h20V0H5C2.2 0 0 2.2 0 5z"/></svg>')},methods:{change:()=>this.node.tabs.classList.toggle("full")}}},current:{component:{src:p,params:{placeholder:"rename",maxlength:12,minlength:1},methods:{change:({value:t})=>{const e=t.trim().replace(/[^a-z0-9]/gi,"");this.proxy.tabs.includes(t)||(this.proxy.tabs[this.param.active]=e,this.param.buf=e,this.proxy.current=e)},onblur:t=>{this.param.buf&&(""===t||h.checkName(t)?(this.proxy.tabs[this.param.active]=this.param.buf,this.proxy.current=this.param.buf):(console.log(this.param.active,t),h.rename(this.param.active,t)),this.param.buf=null)}}}},tabs:{component:{src:u,params:{draggable:!0},proxies:{_tags:()=>this.proxy.tabs,active:()=>this.proxy.current},methods:{active:t=>{const e=this.proxy.tabs[t];this.proxy.current=e;const n=h.get(e);l.update(n)},remove:t=>{if(this.proxy.tabs.length>1){const e=this.proxy.tabs[t];this.proxy.tabs.splice(t,1),h.remove(e,this.proxy.tabs),this.param.active===t?this.proxy.current=0===t?this.proxy.tabs[0]:this.proxy.tabs[this.param.active-1]:t<this.param.active&&this.param.active--;const n=h.get(this.proxy.current);l.update(n)}},move:(t,e)=>{const n=this.proxy.tabs[t];this.proxy.tabs.splice(t,1),this.proxy.tabs.splice(e,0,n),this.param.active=this.proxy.tabs.findIndex((t=>t===this.proxy.current))||0,h.order(this.proxy.tabs)}}}}}},methods:{add({code:t=""}){let e=Math.random().toString(16).slice(8);h.checkName(e)||(this.param.active++,this.proxy.tabs.splice(this.param.active,0,e),this.proxy.current=e,this.node.current.method.focus(),h.create(e,this.proxy.tabs),t&&h.set(t),l.update(t))}},mounted(){this.node.iframe.onload=()=>{h.init(((t,e,n)=>{this.proxy.current=n,this.proxy.tabs=t,l.create(null,(t=>{h.update(this.proxy.current,t)})),l.update(e)}))}}};const f=document.querySelector("#root");new Leste({root:f,directives:{_classes:i,_attr:{update:(t,e,n)=>{const s="function"==typeof e[n]?e[n]():e[n];"boolean"==typeof s?s?t.setAttribute(n,""):t.removeAttribute(n):t.setAttribute(n,s)}},_overlay:o}}).mount(b);
//# sourceMappingURL=index.7d1f6405.js.map
