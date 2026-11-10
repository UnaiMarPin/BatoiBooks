import Books from './model/books.class'
import Modules from './model/modules.class'
import Cart from './model/cart.class'

const USER_ID = 2

export default class Controller {
  constructor(view) {
    this.view = view
    this.books = new Books()
    this.modules = new Modules()
    this.cart = new Cart()
    
    this.editingId = null // Estado: null si añadimos, ID si editamos
  }

  async init() {
    try {
      await this.modules.fetchAll()
      this.view.renderModules(this.modules.data)
      
      await this.books.fetchAll()
      this.view.renderAllBooks(this.books.data, this.modules.data)
      
      // Arrancamos el enrutador
      this.handleRoute(window.location.hash || '#list')
    } catch (error) {
      this.view.showMessage(`Error al cargar los datos: ${error.message}`, 'danger')
    }
  }

  handleRoute(hash) {
    if (!hash) hash = '#list'
    
    if (hash === '#list') {
      this.editingId = null
      this.view.showPage('list')
    } 
    else if (hash === '#form') {
      this.editingId = null
      this.view.setFormModeAdd()
      this.view.showPage('form')
    } 
    else if (hash.startsWith('#edit/')) {
      const id = hash.split('/')[1]
      const book = this.books.data.find(b => b.id === id)
      
      if (!book) {
        this.view.showPage('not-found')
      } else if (book.userId !== USER_ID) {
        this.view.showMessage('No puedes editar un libro que no es tuyo', 'danger')
        window.location.hash = '#list'
      } else {
        this.editingId = id
        this.view.setFormModeEdit(book)
        this.view.showPage('form')
      }
    } 
    else if (hash === '#about') {
      this.editingId = null
      this.view.showPage('about')
    } 
    else {
      this.editingId = null
      this.view.showPage('not-found')
    }
  }

  async handleSubmit(data) {
    if (!data.moduleCode || !data.publisher || !data.price || !data.pages || !data.status) {
      this.view.showMessage('Por favor, rellena todos los campos.', 'danger')
      return
    }

    try {
      if (this.editingId) {
        // --- MODO EDICIÓN ---
        const original = this.books.getBookById(this.editingId)
        const updatedData = {
          ...original, // Mantiene userId, soldDate, etc.
          moduleCode: data.moduleCode,
          publisher: data.publisher,
          price: parseFloat(data.price),
          pages: parseInt(data.pages, 10),
          status: data.status,
          photo: data.photo,
          comments: data.comments
        }
        
        const updatedBook = await this.books.changeBook(updatedData)
        this.view.updateCard(updatedBook, this.modules.data)
        this.view.showMessage('Libro editado correctamente.', 'info')
        window.location.hash = '#list'
      } else {
        // --- MODO AÑADIR ---
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
        const createdBook = await this.books.addBook(newBook)
        this.view.renderBook(createdBook, this.modules.data)
        this.view.showMessage('Libro añadido correctamente.', 'info')
        window.location.hash = '#list'
      }
    } catch (error) {
      this.view.showMessage(`Error: ${error.message}`, 'danger')
    }
  }

  handleEditClick(id) {
    window.location.hash = `#edit/${id}`
  }

  async handleDeleteClick(id, moduleName) {
    const confirm = window.confirm(`¿Seguro que quieres borrar el libro ${id} del módulo ${moduleName}?`)
    if (!confirm) return

    try {
      await this.books.removeBook(id)
      this.view.removeBookFromDOM(id)
      this.view.showMessage('Libro eliminado correctamente.', 'info')
    } catch (error) {
      this.view.showMessage(`Error al eliminar: ${error.message}`, 'danger')
    }
  }

  handleAddToCartClick(id) {
    try {
      const book = this.books.getBookById(id)
      this.cart.add(book)
      this.view.updateCartCount(this.cart.getCount())
      this.view.showMessage('Libro añadido al carrito.', 'info')
      console.log('Carrito:', this.cart.items) // El profe lo pide para comprobar
    } catch (error) {
      this.view.showMessage(error.message, 'danger')
    }
  }

  handleReset() {
    window.location.hash = '#form'
  }
}