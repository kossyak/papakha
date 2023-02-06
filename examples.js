const flame = `const story = {
  name: 'door',
  description: '',
  context: ['start', 'lock', 'dark', 'close'],
  actions: {
    welcome: {
      permit: 'start',
      notify: ['Перед вами дверь...', 'Слева от двери на стене закреплен факел']
    },
    light: {
      pop: 'dark',
      text: 'Взять факел',
    },
    dark: {
      pop: 'light',
      text: 'Вставить факел обратно'
    },
    lock: {
      pop: 'unlock',
      permit: 'close',
      push: 'trigger',
      text: 'Запереть дверь'
    },
    unlock: {
      delete: 'start',
      pop: 'lock',
      text: 'Отпереть дверь',
    },
    close: {
      pop: 'open',
      text: 'Закрыть дверь'
    },
    open: {
      pop: 'close',
      permit: 'unlock',
      text: 'Открыть дверь',
    },
    enter: {
      permit: 'open',
      tabu: ['key', 'trigger'],
      text: 'Войти в комнату',
      actions: {
        room: {
          permit: 'dark',
          notify: ['Здесь темно и совсем ничего не видно.']
        },
        inside: {
          permit: 'light',
          notify: ['Вы в пустой комнате...', 'В центре комнаты стоит стол.']
        },
        back: {
          to: '/',
          text: 'Выйти из комнаты'
        },
        table: {
          permit: 'light',
          text: 'Осмотреть стол',
          actions: {
            key: {
              to: '/enter',
              tabu: 'key',
              delete: 'trigger',
              text: 'Взять ключ'
            },
            empty: {
              permit: 'key',
              to: '/enter',
              text: 'пусто'
            }
          }
        }
      }
    },
    exit: {
      permit: ['open', 'trigger', 'key'],
      text: 'Выйти',
      actions: {
        end: {
          text: 'Конец игры'
        }
      }
    }
  }
}
csm.create(story)`

const skeleton = `const story = {
  name: 'toggle',
  description: '',
  context: ['off'],
  state: {
    on: {
      pop: 'off'
    },
    off: {
      pop: 'on'
    }
  }
}
csm.create(story)`
const tiger = `eden.map(10, 8)

eden.build('wall', {
  coords: [{y: 2, x: 1}, {y: 2, x: 0}],
  color: 'gray'
})

eden.listener('left', () => console.log('click left'))

eden.spawn('tiger', {
  y: 5,
  x: 0,
  color: 'orange'
})
eden.spawn('meet', {
  y: eden.random(9),
  x: eden.random(9),
  color: 'red'
})

eden.move('tiger', { y:eden.active.tiger.y-1 })`


export default { flame, skeleton, tiger }