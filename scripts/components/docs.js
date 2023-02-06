import prompt from 'bundle-text:../../icons/prompt.svg'

export default {
  template: `
  <div class="ex-bns">
    <div class="popup-icon">${prompt}</div>
    <div class="item">
      <button data-id="logo"></button>
      <div>
        <h2>Papakha</h2>
        <p>Papakha - это редактор-песочница, который по умолчанию поддерживает язык программирования javascript и следующие модули:</p>
        <div class="links">
          <a href="https://github.com/kossyak/csmjs/blob/main/README.md">CSM</a><span>|</span>
          <a href="https://github.com/kossyak/eden/blob/main/README.md">EDEN</a><span>|</span>
          <a href="">Leste</a>
        </div>
        <h3>CSM</h3>
        <p>Создавайте свои текстовые игры без программирования, используя только небольшой набор параметров.</p>
        <h3>EDEN</h3>
        <p>Изучите основы самого популярного языка программирования Java Script, который широко используется для разработки сайтов и приложений в браузере.</p>
        <h3>Leste</h3>
        <p>Создавайте пользовательский интерфейсы и освойте профессию фронтенд разработчика с фреймворком leste.</p>
      </div>
    </div>
  </div>`
}