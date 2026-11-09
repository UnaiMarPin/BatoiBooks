import logoBatoi from './assets/logoBatoi.png'

// Constante del usuario actual (como pide el enunciado)
const CURRENT_USER_ID = 2

export default class View {
  constructor(onSubmit) {
    this.onSubmit = onSubmit
    this.renderStructure()
    this.bindEvents()
  }

  renderStructure() {
    document.querySelector('#app').innerHTML = `
      <header>
        <a href="https://vite.dev" target="_blank">
          <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
        </a>
        <h1>BatoiBooks</h1>
        <div class="cart-info">
          <span class="material-icons">shopping_cart</span>
          <span id="cart-count">0</span>
        </div>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </main>

      <footer>
        <p>Unai Martinez Pinteño</p>
      </footer>
    `
  }

  bindEvents() {
    const bookForm = document.querySelector('#bookForm')

    bookForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(bookForm)
      const data = Object.fromEntries(formData.entries())
      this.onSubmit(data) 
    })
  }

  showMessage(text, type = 'info') {
    const messagesDiv = document.querySelector('#messages')
    const alertDiv = document.createElement('div')
    alertDiv.className = `alert alert-${type}`
    
    const textNode = document.createTextNode(text)
    const closeBtn = document.createElement('button')
    closeBtn.type = 'button'
    closeBtn.className = 'btn-close'
    closeBtn.textContent = 'x'
    closeBtn.addEventListener('click', () => alertDiv.remove())

    alertDiv.appendChild(textNode)
    alertDiv.appendChild(closeBtn)
    messagesDiv.appendChild(alertDiv)

    if (type === 'info') {
      setTimeout(() => alertDiv.remove(), 3000)
    }
  }

  renderModules(modules) {
    const select = document.querySelector('#moduleCode')
    modules.forEach(module => {
      const option = document.createElement('option')
      option.value = module.code
      option.textContent = `${module.cliteral} (${module.code})`
      select.appendChild(option)
    })
  }

  renderAllBooks(books, modules) {
    const listDiv = document.querySelector('#list')
    listDiv.innerHTML = ''
    books.forEach(book => this.renderBook(book, modules))
  }

  renderBook(book, modules) {
    const listDiv = document.querySelector('#list')
    const module = modules.find(m => m.code === book.moduleCode)
    const moduleName = module ? module.cliteral : book.moduleCode

    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', book.id)

    const img = document.createElement('img')
    if (book.photo) {
      img.src = book.photo
      img.alt = `Libro: ${book.id}`
      card.appendChild(img)
    }

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

    // --- NUEVO: BOTONES DE ACCIÓN ---
    const actionsDiv = document.createElement('div')
    actionsDiv.className = 'card-actions'

    if (book.userId === CURRENT_USER_ID) {
      // Mis libros: Editar y Borrar
      const editBtn = document.createElement('button')
      editBtn.type = 'button'
      editBtn.setAttribute('aria-label', 'Editar')
      editBtn.innerHTML = '<span class="material-icons">edit</span>'
      editBtn.addEventListener('click', () => this.onEdit(book.id)) // Lo implementaremos luego

      const deleteBtn = document.createElement('button')
      deleteBtn.type = 'button'
      deleteBtn.setAttribute('aria-label', 'Borrar')
      deleteBtn.innerHTML = '<span class="material-icons">delete</span>'
      deleteBtn.addEventListener('click', () => this.onDelete(book.id, moduleName)) // Lo implementaremos luego

      actionsDiv.append(editBtn, deleteBtn)
    } else {
      // Libros de otros: Añadir al carrito
      const cartBtn = document.createElement('button')
      cartBtn.type = 'button'
      cartBtn.setAttribute('aria-label', 'Añadir al carrito')
      cartBtn.innerHTML = '<span class="material-icons">add_shopping_cart</span>'
      cartBtn.addEventListener('click', () => this.onAddToCart(book.id)) // Lo implementaremos luego

      actionsDiv.appendChild(cartBtn)
    }

    card.append(infoDiv, actionsDiv)
    listDiv.appendChild(card)
  }

  removeBookFromDOM(bookId) {
    const card = document.querySelector(`.card[data-id="${bookId}"]`)
    if (card) card.remove()
  }

  resetForm() {
    document.querySelector('#bookForm').reset()
  }
}