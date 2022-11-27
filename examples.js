const flame = `const story = {
  name: 'door',
  description: '',
  context: ['lock', 'dark'],
  state: {
    light: {
      pop: 'dark',
      tabu: 'enter',
      text: 'Включить свет'
    },
    dark: {
      pop: 'light',
      tabu: 'enter',
      text: 'Выключить свет'
    },
    lock: {
      pop: 'unlock',
      permit: 'close',
      push: 'trigger',
      text: 'Запереть дверь'
    },
    unlock: {
      pop: 'lock',
      push: 'close',
      text: 'Отпереть дверь'
    },
    close: {
      pop: 'open',
      permit: 'unlock',
      tabu: 'enter',
      text: 'Закрыть дверь'
    },
    open: {
      pop: 'close',
      permit: 'unlock',
      text: 'Открыть дверь'
    },
    enter: {
      permit: 'open',
      tabu: ['enter', 'key'],
      text: 'Войти в комнату'
    },
    back: {
      pop: 'enter',
      delete: 'table',
      text: 'Выйти из комнаты'
    },
    table: {
      permit: ['enter', 'light'],
      tabu: 'table',
      text: 'Осмотреть стол'
    },
    key: {
      permit: ['enter', 'table'],
      tabu: 'key',
      delete: 'trigger',
      text: 'Взять ключ'
    },
    exit: {
      permit: ['key', 'open', 'trigger'],
      tabu: 'exit',
      set: 'exit',
      text: 'Выйти'
    },
    end: {
      permit: 'exit',
      text: 'Конец игры'
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
const tiger = `const story = {
  name: 'toggle',
  context: 'start',
  state: {
    up: {
      permit: 'start'
    },
    down: {
      permit: 'start'
    }
  }
}
eden.render()

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
    y: eden.random(),
    x: eden.random(),
    color: 'red'
})
csm.on('up', async () => {
  if (eden.active.meet.y > eden.active.tiger.y) {
    csm.action('down')
  } else if (eden.active.tiger.y === 0) {
    csm.action('down')
  } else {
    try {
      await eden.move('tiger', { y:eden.active.tiger.y-1 })
      csm.action('up')
    } catch(err) {
      console.log(err)
    }
  }
  /*
    console.log(eden.has('wall', { y:3, x:0 }))
  */
})

csm.on('down', async () => {
  await eden.move('tiger', { y:eden.active.tiger.y+1 })
})

csm.create(story)`


export default { flame, skeleton, tiger }