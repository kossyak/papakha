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
  context: 'down',
  state: {
    up: {
      pop: 'down',
      message: 'gfhfgjfgj'
    },
    down: {
      pop: 'up',
      message: 'gfhfdgdgfsdgjfgj'
    },
    stop: {
    }
  }
}
eden.render()
/*
eden.build('wall', {
  coords: [{y: 3, x: 3}, {y: 3, x: 3}],
  color: 'gray'
})
*/
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
csm.on('up', () => {
  eden.move('tiger', (y, x) => {
  if (y === 0) csm.action('down')
   if (eden.sprite.meet.y > y) {
      csm.action('down')
    }
    if (eden.sprite.meet.y === y) {
      return false
    }
    console.log(eden.has('wall', 3, 0))
    return { y: y-1 }
  })
})

csm.on('down', () => {
  eden.move('tiger', (y, x) => {
    if (y === 9) csm.action('up')
    if (eden.sprite.meet.y < y) csm.action('up')
    if (eden.sprite.meet.y === y) {
      return false
    }
    return { y: y+1 }
  })
})

csm.create(story)`


export default { flame, skeleton, tiger }