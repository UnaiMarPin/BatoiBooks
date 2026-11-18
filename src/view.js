import logoBatoi from './assets/logoBatoi.png'

export default class View {
  constructor(handlers) {
    this.handlers = handlers
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
        <div id="list" class="page"></div>

        <div id="form" class="page hidden">
          <h2>Añadir libro</h2>
          <form id="bookForm" novalidate>
            <div id="id-container" class="hidden">
              <label for="id">ID:</label>
              <input type="text" id="id" name="id" readonly />
            </div>
            <div>
              <label for="moduleCode">Módulo:</label>
              <select id="moduleCode" name="moduleCode" required>
                <option value="">Selecciona un módulo</option>
              </select>
              <span id="moduleCode-error" class="error-msg"></span>
            </div>
            <div>
              <label for="publisher">Editorial:</label>
              <input type="text" id="publisher" name="publisher" required />
              <span id="publisher-error" class="error-msg"></span>
            </div>
            <div>
              <label for="price">Precio (€):</label>
              <input type="number" id="price" name="price" min="0" step="0.01" required />
              <span id="price-error" class="error-msg"></span>
            </div>
            <div>
              <label for="pages">Páginas:</label>
              <input type="number" id="pages" name="pages" min="1" step="1" required />
              <span id="pages-error" class="error-msg"></span>
            </div>
            <div>
              <label>Estado:</label>
              <label><input type="radio" name="status" value="new" required /> Nuevo</label>
              <label><input type="radio" name="status" value="good" /> Bueno</label>
              <label><input type="radio" name="status" value="used" /> Usado</label>
              <label><input type="radio" name="status" value="bad" /> Malo</label>
              <label><input type="radio" name="status" value="digital" /> Digital</label>
              <span id="status-error" class="error-msg"></span>
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

        <div id="about" class="page hidden">
          <h2>Acerca de...</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div id="not-found" class="page hidden">
          <h2>Página no encontrada</h2>
          <p>La página que buscas no existe. <a href="#list">Volver a la lista</a></p>
        </div>
      </main>

      <footer>
        <p>Unai Martinez Pinteño</p>
      </footer>
    `
  }

  bindEvents() {
    const bookForm = document.querySelector('#bookForm')

    // 1. Escuchadores en tiempo real para validar los campos
    const fields = ['moduleCode', 'publisher', 'price', 'pages', 'status']
    fields.forEach(fieldName => {
      const inputs = bookForm.querySelectorAll(`[name="${fieldName}"]`)
      inputs.forEach(input => {
        input.addEventListener('input', () => this.validateField(fieldName))
        input.addEventListener('change', () => this.validateField(fieldName))
      })
    })

    // 2. EVENTO CRUCIAL: Escuchar el select de módulos para preguntar al servidor
    const moduleSelect = bookForm.elements['moduleCode']
    moduleSelect.addEventListener('change', (e) => {
      this.handlers.onModuleChange(e.target.value)
    })

    // 3. Evento Submit
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      let isValid = true
      fields.forEach(fieldName => {
        if (!this.validateField(fieldName)) isValid = false
      })

      if (!isValid) return

      const formData = new FormData(bookForm)
      const data = Object.fromEntries(formData.entries())
      data.id = bookForm.elements['id'].value
      
      this.handlers.onSubmit(data) 
    })

    // 4. Evento Reset
    bookForm.addEventListener('reset', () => {
      this.clearAllErrors()
      setTimeout(() => this.handlers.onReset(), 0)
    })

    // 5. Enrutador
    window.addEventListener('hashchange', () => {
      this.clearAllErrors()
      this.handlers.onHashChange(window.location.hash)
    })

    window.addEventListener('popstate', () => {
      this.clearAllErrors()
      this.handlers.onHashChange(window.location.hash)
    })
  }

  validateField(fieldName) {
    const input = document.querySelector(`[name="${fieldName}"]`)
    if (!input) return true

    if (!input.validity.valid) {
      if (input.validity.customError) {
        this.showFieldError(fieldName, input.validationMessage)
        return false
      }
      
      if (input.validity.valueMissing) {
        this.showFieldError(fieldName, 'Este campo es obligatorio.')
      } else if (input.validity.badInput) {
        this.showFieldError(fieldName, 'Debes introducir un número válido.')
      } else if (input.validity.rangeUnderflow) {
        if (fieldName === 'price') this.showFieldError(fieldName, 'El precio no puede ser negativo.')
        else if (fieldName === 'pages') this.showFieldError(fieldName, 'Debe haber al menos 1 página.')
      } else if (input.validity.stepMismatch) {
        this.showFieldError(fieldName, 'Usa un formato válido (ej: 12.50).')
      } else {
        this.showFieldError(fieldName, 'Valor incorrecto.')
      }
      return false
    } else {
      this.clearFieldError(fieldName)
      return true
    }
  }

  setCustomModuleError(message) {
    const input = document.querySelector(`[name="moduleCode"]`)
    input.setCustomValidity(message)
    this.validateField('moduleCode')
  }

  clearCustomModuleError() {
    const input = document.querySelector('[name="moduleCode"]')
    input.setCustomValidity('') 
    this.validateField('moduleCode')
  }

  showPage(pageId) {
    document.querySelectorAll('main .page').forEach(page => {
      page.classList.add('hidden')
    })
    const page = document.querySelector(`#${pageId}`)
    if (page) page.classList.remove('hidden')
  }

  setFormModeAdd() {
    document.querySelector('#form h2').textContent = 'Añadir libro'
    document.querySelector('#id-container').classList.add('hidden')
    document.querySelector('#bookForm').reset()
  }

  setFormModeEdit(book) {
    document.querySelector('#form h2').textContent = 'Editar libro'
    document.querySelector('#id-container').classList.remove('hidden')
    
    const form = document.querySelector('#bookForm')
    form.elements['id'].value = book.id
    form.elements['moduleCode'].value = book.moduleCode
    form.elements['publisher'].value = book.publisher
    form.elements['price'].value = book.price
    form.elements['pages'].value = book.pages
    form.elements['photo'].value = book.photo || ''
    form.elements['comments'].value = book.comments || ''
    
    const radio = Array.from(form.querySelectorAll('input[name="status"]')).find(r => r.value === book.status)
    if (radio) radio.checked = true
  }

  updateCartCount(count) {
    document.querySelector('#cart-count').textContent = count
  }

  showFieldError(fieldName, message) {
    const errorSpan = document.querySelector(`#${fieldName}-error`)
    if (errorSpan) {
      errorSpan.textContent = message
      const input = document.querySelector(`[name="${fieldName}"]`)
      if (input) input.classList.add('invalid')
    }
  }

  clearFieldError(fieldName) {
    const errorSpan = document.querySelector(`#${fieldName}-error`)
    if (errorSpan) {
      errorSpan.textContent = ''
      const input = document.querySelector(`[name="${fieldName}"]`)
      if (input) input.classList.remove('invalid')
    }
  }

  clearAllErrors() {
    const fields = ['moduleCode', 'publisher', 'price', 'pages', 'status']
    fields.forEach(f => {
      this.clearFieldError(f)
      if (f === 'moduleCode') {
        const input = document.querySelector(`[name="moduleCode"]`)
        if (input) input.setCustomValidity('')
      }
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
    select.innerHTML = '<option value="">Selecciona un módulo</option>'
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
    const CURRENT_USER_ID = 2

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

    const actionsDiv = document.createElement('div')
    actionsDiv.className = 'card-actions'

    if (String(book.userId) === String(CURRENT_USER_ID)) {
      const editBtn = document.createElement('button')
      editBtn.type = 'button'
      editBtn.setAttribute('aria-label', 'Editar')
      
      const editIcon = document.createElement('span')
      editIcon.className = 'material-icons'
      editIcon.textContent = 'edit'
      editBtn.appendChild(editIcon)
      
      editBtn.addEventListener('click', () => this.handlers.onEditClick(book.id))

      const deleteBtn = document.createElement('button')
      deleteBtn.type = 'button'
      deleteBtn.setAttribute('aria-label', 'Borrar')
      
      const deleteIcon = document.createElement('span')
      deleteIcon.className = 'material-icons'
      deleteIcon.textContent = 'delete'
      deleteBtn.appendChild(deleteIcon)
      
      deleteBtn.addEventListener('click', () => this.handlers.onDeleteClick(book.id, moduleName))

      actionsDiv.append(editBtn, deleteBtn)
    } else {
      const cartBtn = document.createElement('button')
      cartBtn.type = 'button'
      cartBtn.setAttribute('aria-label', 'Añadir al carrito')
      
      const cartIcon = document.createElement('span')
      cartIcon.className = 'material-icons'
      cartIcon.textContent = 'add_shopping_cart'
      cartBtn.appendChild(cartIcon)
      
      cartBtn.addEventListener('click', () => this.handlers.onAddToCartClick(book.id))

      actionsDiv.appendChild(cartBtn)
    }

    card.append(infoDiv, actionsDiv)
    listDiv.appendChild(card)
  }

  updateCard(book, modules) {
    const oldCard = document.querySelector(`.card[data-id="${book.id}"]`)
    if (oldCard) oldCard.remove()
    this.renderBook(book, modules)
  }

  removeBookFromDOM(bookId) {
    const card = document.querySelector(`.card[data-id="${bookId}"]`)
    if (card) card.remove()
  }
}