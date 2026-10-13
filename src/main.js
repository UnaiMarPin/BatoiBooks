import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import Books from './model/books.class'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">Abre la consola para ver los resultados</p>
  </div>
`

const books = new Books()

async function main() {
  console.log('=== PRUEBAS BATOIBOOKS (4-ajax) ===')

  await books.fetchAll()
  console.log('Libros cargados del servidor:', books.data.length)
  console.log('Libros del módulo 5021:', books.booksFromModule('5021'))
  console.log("Libros en estado 'new':", books.booksWithStatus('new'))

  const nuevo = await books.addBook({
    userId: 2,
    moduleCode: '5025',
    publisher: 'Apunts',
    price: 10,
    pages: 30,
    status: 'new',
    photo: '',
    comments: '',
    soldDate: ''
  })
  console.log('Libro añadido:', nuevo)
  console.log('Total de libros ahora:', books.data.length)
}

main().catch((err) => console.error('Error:', err.message))