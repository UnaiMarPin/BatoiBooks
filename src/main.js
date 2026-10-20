import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import Books from './model/books.class'
import Users from './model/users.class'
import Modules from './model/modules.class'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">Abre la consola para ver los resultados</p>
  </div>
`

async function main() {
  console.log('=== PRUEBAS BATOIBOOKS (4-ajax) ===')

  const books = new Books()
  const users = new Users()
  const modules = new Modules()

  await books.fetchAll()
  await users.fetchAll()
  await modules.fetchAll()

  console.log('Libros cargados:', books.data.length)
  console.log('Usuarios cargados:', users.data.length)
  console.log('Módulos cargados:', modules.data.length)

  console.log('Libros del módulo 5021:', books.booksFromModule('5021'))
  console.log("Libros en estado 'new':", books.booksWithStatus('new'))
}

main().catch((err) => console.error('Error:', err.message))