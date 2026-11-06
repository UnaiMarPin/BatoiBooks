import Books from './model/books.class'
import Modules from './model/modules.class'

const USER_ID = 2

export default class Controller {
  constructor(view) {
    this.view = view
    this.books = new Books()
    this.modules = new Modules()
  }

  async init() {
    try {
      await this.modules.fetchAll()
      this.view.renderModules(this.modules.data)
      
      await this.books.fetchAll()
      this.view.renderAllBooks(this.books.data, this.modules.data)
    } catch (error) {
      this.view.showMessage(`Error al cargar los datos: ${error.message}`, 'danger')
    }
  }

  async handleSubmit(data) {
    if (!data.moduleCode || !data.publisher || !data.price || !data.pages || !data.status) {
      this.view.showMessage('Por favor, rellena todos los campos obligatorios.', 'danger')
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
      const createdBook = await this.books.addBook(newBook)
      this.view.renderBook(createdBook, this.modules.data) // Le pide a la vista que pinte
      this.view.showMessage('Libro añadido correctamente.', 'info')
      this.view.resetForm() // Le pide a la vista que limpie
    } catch (error) {
      this.view.showMessage(`Error al añadir el libro: ${error.message}`, 'danger')
    }
  }

  async handleRemove(id) {
    if (!id) {
      this.view.showMessage('Debes indicar un ID para borrar.', 'danger')
      return
    }

    try {
      await this.books.removeBook(id)
      this.view.removeBookFromDOM(id)
      this.view.showMessage('Libro eliminado correctamente.', 'info')
      this.view.resetForm()
    } catch (error) {
      this.view.showMessage(`Error al eliminar el libro: ${error.message}`, 'danger')
    }
  }
}