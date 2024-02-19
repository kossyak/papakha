export default {
  context: ['start'],
  actions: {
    col: {
      contains: 'start',
      remove: 'row',
      do: 'code'
    },
    row: {
      contains: 'start',
      remove: ['col', 'code', 'result']
    },
    code: {
      contains: 'start',
      remove: ['row', 'result'],
    },
    result: {
      contains: 'start',
      remove: ['row', 'code'],
    },
    scrollToCode: {
      contains: ['code', 'col']
    },
    scrollToResult: {
      contains: ['result', 'col']
    }
  }
}