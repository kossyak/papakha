import examples from '../examples.js'
import Data from './editor.js'
import exComponent from '../scripts/components/examples.js'
import docsComponent from '../scripts/components/docs.js'

const data = new Data()

const newBtn = document.querySelector('.new')
const nav = document.querySelector('footer nav')
const inpName = document.querySelector('footer .name')
const sampleBtn = document.querySelector('.sample')
const group = document.querySelector('.group')
const bar = document.querySelector('.bar')
const refresh = document.querySelector('.refresh')
const prompt = document.querySelector('.prompt')
const close = document.querySelector('.close')
const popup = document.querySelector('.popup')

let current
let tab

const create = (name) => {
  const btn = document.createElement('div')
  btn.classList.add('btn')
  current = btn
  const span = document.createElement('span')
  const button = document.createElement('button')
  button.classList.add('remove')
  span.textContent = name
  btn.appendChild(span)
  btn.appendChild(button)
  
  btn.onclick = () => {
    current.classList.remove('active')
    current = btn
    btn.classList.add('active')
    inpName.value = span.textContent
    tab = span.textContent
    data.active(tab)
  }
  button.onclick = (event) => {
    event.stopPropagation()
    if (nav.children.length > 1) {
      if (window.confirm(`Вы уверены, что хотите удалить документ "${btn.firstChild.textContent}"?`)) {
        if (current === btn) {
          if (current === nav.firstElementChild) {
            current = btn.nextElementSibling
          } else {
            current = btn.previousElementSibling
          }
          current.classList.add('active')
          tab = current.firstChild.textContent
          inpName.value = tab
          data.active(tab)
        }
        btn.remove()
        data.remove(btn.firstChild.textContent)
      }
    } else alert('Нельзя удалить единственный документ.')
  }
  return btn
}
 const add = (code) => {
   if (nav.children.length <= 10) {
     let value = Math.random().toString(16).slice(8)
     if(!data.checkName(value)) {
       data.create(value)
       inpName.value = tab = value
       current && current.classList.remove('active')
       const btn = create(value)
       nav.insertAdjacentElement('afterbegin', btn)
       current.classList.add('active')
       inpName.focus()
       data.active(tab)
       if (code) data.set(code)
     }
   }
 }


const stories = data.getAll()
if (stories) {
  for (const key in stories) {
    const btn = create(key)
    nav.appendChild(btn)
    tab = key
  }
  const c = localStorage.getItem('current')
  if(data.checkName(c)) tab = c
  const index = Object.keys(stories).findIndex(s => s === tab)
  current = nav.children[index]
  current.classList.add('active')
  inpName.value = tab
  data.active(tab)
}

newBtn.onclick = () => add()

inpName.oninput = () => {
  inpName.value = inpName.value.replace(/[^a-z0-9]/gi,'')
  current.firstChild.textContent = inpName.value.trim()
}
inpName.onblur = () => {
    if (inpName.value !== '')  {
      data.rename(tab, inpName.value)
    } else {
      current.firstChild.textContent = tab
    }
}

sampleBtn.onclick = () => {
  popup.lastElementChild.innerHTML = exComponent.template
  popup.lastElementChild.onclick = (event) => {
    if (event.target.closest('button')) {
      const id = event.target.dataset.id
      add(examples[id])
      popup.classList.remove('show')
    }
  }
  popup.classList.add('show')
  root.classList.add('show')
}
prompt.onclick = () => {
  popup.lastElementChild.innerHTML = docsComponent.template
  popup.classList.add('show')
}


group.onclick = () => nav.classList.toggle('full')
bar.onclick = () => root.classList.toggle('show')
close.onclick = () => popup.classList.remove('show')

refresh.onclick = () => data.update(tab)