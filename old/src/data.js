import codes from '../examples'

export default {
  name: 'papakha',
  current: 'sample',
  data: {
    'sample': codes.flame,
  },
  tabs: ['sample'],
  init(callback) {
    const data = localStorage.getItem(this.name)
    if (data) {
      this.data = JSON.parse(data)
    }
    const tabs = localStorage.getItem('tabs')
    if (tabs) {
      this.tabs = JSON.parse(tabs)
    }
    this.current = localStorage.getItem('current') || this.current
    callback([...this.tabs], this.data[this.current], this.current)
  },
  rename(index, new_key) {
    const old_key = this.tabs[index]
    if (old_key !== new_key) {
      Object.defineProperty(this.data, new_key, Object.getOwnPropertyDescriptor(this.data, old_key))
      delete this.data[old_key]
      localStorage.setItem(this.name, JSON.stringify(this.data))
      this.tabs[index] = new_key
      localStorage.setItem('tabs', JSON.stringify(this.tabs))
      this.current = new_key
      localStorage.setItem('current', new_key)
    }
  },
  create(key, tabs) {
    this.current = key
    this.data[key] = ''
    const st = JSON.stringify(tabs)
    this.tabs = JSON.parse(st)
    localStorage.setItem('tabs', st)
    localStorage.setItem(this.name, JSON.stringify(this.data))
  },
  remove(key, tabs) {
    delete this.data[key]
    const st = JSON.stringify(tabs)
    this.tabs = JSON.parse(st)
    localStorage.setItem(this.name, JSON.stringify(this.data))
    localStorage.setItem('tabs', JSON.stringify(this.tabs))
  },
  order(tabs) {
    const st = JSON.stringify(tabs)
    this.tabs = JSON.parse(st)
    localStorage.setItem('tabs', JSON.stringify(this.tabs))
  },
  update(key, code) {
    this.data[key] = code
    localStorage.setItem(this.name, JSON.stringify(this.data))
  },
  active(key) {
    this.current = key
    localStorage.setItem('current', key)
  },
  checkName(name) {
    return name in this.data
  },
  get(key) {
    return this.data[key]
  },
  set(code) {
    this.data[this.current] = code
  }
}