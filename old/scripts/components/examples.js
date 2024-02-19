import examples from 'bundle-text:../../icons/examples.svg'
import codes from '../../examples'

export default {
  template: `
  <div class="ex-bns">
    <div class="popup-icon">${examples}</div>
    <div class="item">
      <button class="skeleton br5"></button>
      <div>
        <h2>Skeleton</h2>
        <p>Пример кода CSM модуля, с минимальным набором параметров.</p>
      </div>
    </div>
    <div class="item">
    <button class="flame br5"></button>
      <div>
        <h2>Flame</h2>
        <p>Пример кода CSM модуля, максимально полно отражающий возможности данного модуля.</p>
      </div>
    </div>
    <div class="item">
      <button class="tiger br5"></button>
      <div>
        <h2>Tiger</h2>
        <p>Заготовка для разработки собственной мини игры на движке EDEN.</p>
      </div>
    </div>
  </div>`,
  props: {
    methods: {
      onchange: {}
    }
  },
  nodes() {
    return {
      skeleton: {
        onclick: () => this.method.onchange({code: codes['skeleton']})
      },
      flame: {
        onclick: () => this.method.onchange({code: codes['flame']})
      },
      tiger: {
        onclick: () => this.method.onchange({code: codes['tiger']})
      }
    }
  }
}