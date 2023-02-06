import { _classes, _attr, _overlay } from './scripts/components/directives'
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

leste.mount(component)