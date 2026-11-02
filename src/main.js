import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import Books from './model/books.class'
import Users from './model/users.class'
import Modules from './model/modules.class'

const USER_ID = 2 // Constante porque aún no hay login

document.querySelector('#app').innerHTML = `
  <header>
    <a href="https://vite.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>

  <div id="messages"></div>

  <main>
    <div id="list"></div>

    <div id="remove">
      <label for="id-remove">ID del libro a borrar:</label>
      <input type="text" id="id-remove" name="id-remove" />
      <button type="button" id="remove-btn">Borrar Libro</button>
    </div>

    <div id="form">
      <h2>Añadir un Libro</h2>
      <form id="bookForm">
        <div>
          <label for="moduleCode">Módulo:</label>
          <select id="moduleCode" name="moduleCode" required>
            <option value="">Selecciona un módulo</option>
          </select>
        </div>
        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" id="publisher" name="publisher" required />
        </div>
        <div>
          <label for="price">Precio (€):</label>
          <input type="number" id="price" name="price" min="0" step="0.01" required />
        </div>
        <div>
          <label for="pages">Páginas:</label>
          <input type="number" id="pages" name="pages" min="1" required />
        </div>
        <div>
          <label>Estado:</label>
          <label><input type="radio" name="status" value="new" required /> Nuevo</label>
          <label><input type="radio" name="status" value="good" /> Bueno</label>
          <label><input type="radio" name="status" value="used" /> Usado</label>
          <label><input type="radio" name="status" value="bad" /> Malo</label>
          <label><input type="radio" name="status" value="digital" /> Digital</label>
        </div>
        <div>
          <label for="photo">Foto (URL):</label>
          <input type="url" id="photo" name="photo" />
        </div>
        <div>
          <label for="comments">Comentarios:</label>
          <textarea id="comments" name="comments"></textarea>
        </div>
        <button type="submit">Guardar</button>
        <button type="reset">Reset</button>
      </form>
    </div>

    <div id="about">
      <h2>Acerca de...</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </main>

  <footer>
    <p>Unai Martinez Pinteño</p>
  </footer>
`

const books = new Books()
const modules = new Modules()
const users = new Users() // Aunque no se use en la UI, lo instanciamos por si acaso

const messagesDiv = document.querySelector('#messages')
const listDiv = document.querySelector('#list')
const formSelect = document.querySelector('#moduleCode')
const bookForm = document.querySelector('#bookForm')
const removeBtn = document.querySelector('#remove-btn')
const idRemoveInput = document.querySelector('#id-remove')

// --- FUNCIONES DE UI ---

function showMessage(text, type = 'info') {
  const alertDiv = document.createElement('div')
  alertDiv.className = `alert alert-${type}`
  alertDiv.setAttribute('role', 'alert')

  const textNode = document.createTextNode(text)
  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.className = 'btn-close'
  closeBtn.setAttribute('aria-label', 'Cerrar')
  closeBtn.textContent = 'x'

  alertDiv.appendChild(textNode)
  alertDiv.appendChild(closeBtn)
  messagesDiv.appendChild(alertDiv)

  // Escuchador para cerrar
  closeBtn.addEventListener('click', () => alertDiv.remove())

  // Auto-cerrar si es info (3 segundos)
  if (type === 'info') {
    setTimeout(() => alertDiv.remove(), 3000)
  }
}

function renderBook(book) {
  const module = modules.data.find(m => m.code === book.moduleCode)
  const moduleName = module ? module.cliteral : book.moduleCode

  const card = document.createElement('div')
  card.className = 'card'
  card.setAttribute('data-id', book.id)

  // Usamos textContent o sanitización manual para evitar XSS, pero como el HTML pide innerHTML
  // vamos a construirlo de forma segura usando createElement.
  const img = document.createElement('img')
  img.src = book.photo || 'https://via.placeholder.com/150'
  img.alt = `Libro: ${book.id}`

  const infoDiv = document.createElement('div')
  
  const h3 = document.createElement('h3')
  h3.textContent = `${moduleName} (${book.id})`
  
  const h4Publisher = document.createElement('h4')
  h4Publisher.textContent = book.publisher

  const pPages = document.createElement('p')
  pPages.textContent = `${book.pages} páginas`

  const pStatus = document.createElement('p')
  pStatus.textContent = `Estado: ${book.status}`

  const pSold = document.createElement('p')
  pSold.textContent = book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'

  const pComments = document.createElement('p')
  pComments.textContent = book.comments || ''

  const h4Price = document.createElement('h4')
  h4Price.textContent = `${book.price} €`

  infoDiv.append(h3, h4Publisher, pPages, pStatus, pSold, pComments, h4Price)
  card.append(img, infoDiv)

  listDiv.appendChild(card)
}

function renderAllBooks() {
  listDiv.innerHTML = '' // Limpiamos la lista antes de renderizar
  books.data.forEach(book => renderBook(book))
}

// --- LÓGICA PRINCIPAL ---

async function init() {
  try {
    await modules.fetchAll()
    
    // Rellenar el select con los módulos
    modules.data.forEach(module => {
      const option = document.createElement('option')
      option.value = module.code
      option.textContent = `${module.cliteral} (${module.code})`
      formSelect.appendChild(option)
    })

    await books.fetchAll()
    renderAllBooks()
    
  } catch (error) {
    showMessage(`Error al cargar los datos: ${error.message}`, 'danger')
  }
}

// Evento para añadir libro
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const formData = new FormData(bookForm)
  const data = Object.fromEntries(formData.entries())
  
  // Validación manual extra (aunque el HTML ya tiene required)
  if (!data.moduleCode || !data.publisher || !data.price || !data.pages || !data.status) {
    showMessage('Por favor, rellena todos los campos obligatorios.', 'danger')
    return
  }

  const newBook = {
    userId: USER_ID,
    moduleCode: data.moduleCode,
    publisher: data.publisher,
    price: parseFloat(data.price),
    pages: parseInt(data.pages, 10),
    status: data.status,
    photo: data.photo,
    comments: data.comments
  }

  try {
    const createdBook = await books.addBook(newBook)
    renderBook(createdBook) // Lo pintamos en la lista
    showMessage('Libro añadido correctamente.', 'info')
    bookForm.reset()
  } catch (error) {
    showMessage(`Error al añadir el libro: ${error.message}`, 'danger')
  }
})

// Evento para borrar libro
removeBtn.addEventListener('click', async () => {
  const id = idRemoveInput.value.trim()
  
  if (!id) {
    showMessage('Debes indicar un ID para borrar.', 'danger')
    return
  }

  try {
    await books.removeBook(id)
    
    // Quitarlo del DOM
    const cardToRemove = document.querySelector(`.card[data-id="${id}"]`)
    if (cardToRemove) cardToRemove.remove()
    
    showMessage('Libro eliminado correctamente.', 'info')
    idRemoveInput.value = ''
  } catch (error) {
    showMessage(`Error al eliminar el libro: ${error.message}`, 'danger')
  }
})

// Arrancar la app
document.addEventListener('DOMContentLoaded', init)