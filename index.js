import { _classes, _attr, _overlay } from '../spnsr/SPA/components/directives'
import component from './src/editor'
const root = document.querySelector('#root')
const leste = new Leste({
  root,
  directives: {
    _classes,
    _attr,
    _overlay
  }
})
// const li = {
//   template: '<div class="li"></div>',
//   props: {
//     proxies: {
//       li: {},
//       text: {}
//     }
//   },
//   handlers: {
//     text() {
//       console.log(33)
//     }
//   },
//   nodes() {
//     return {
//       li: {
//         textContent: () => this.proxy.li.text,
//         innerText: () => this.proxy.text
//       }
//     }
//   }
// }

// const component = {
//   template: '<div class="iter"></div>',
//   params: {
//     test: 5
//   },
//   proxies: {
//     list: [
//       {text: 'text', a: 5}
//     ],
//     test: {t: 4}
//   },
//   nodes() {
//     return {
//       iter: {
//         onclick: () => {
//           // this.proxy.list[0].text = 'hello!'
//           // this.proxy.list.splice(1, 0, {text: 'text3', a: 3})
//           this.proxy.test.t = 77
//           this.nodes = {a: 4}
//           console.log(this.nodes)
//           // this.proxy.list = [{text: 'text335353', a: 8}, {text: 'text2', a: 8}]
//           // console.log(this.node.iter.reactivity)
//         },
//         component: {
//           src: li,
//           iterate: () => this.proxy.list,
//           proxies: {
//             li: (l, index) => { // component_li_list_0, component_li_list_1
//               console.log('li', index)
//               return l // this.proxy.list[0].a = 'hello! , this.proxy.list[0].text = 'hello!
//             },
//             text: () => { // component_text_list_0, component_li_list_1, component_text_list_0_text, component_text_list_1_text, component_text_test, component_text_test_t
//               // console.log('text', index)
//               return this.proxy.test.t// this.proxy.list[0].text = 'hello!
//             }
//           }
//         }
//       }
//     }
//   },
//   mounted() {
//     console.log(this.node.iter.reactivity)
//   }
// }
leste.mount(component)