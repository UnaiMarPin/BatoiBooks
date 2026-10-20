import Book from './book.class'
import { fetchBooks, createBook, deleteBook, updateBook } from '../services/api'

export default class Books {
  constructor() {
    this.data = []
  }

  async fetchAll() {
    try {
      this.data = await fetchBooks()
    } catch (error) {
      throw new Error(`No se pudieron cargar los libros: ${error.message}`)
    }
  }

  async addBook(bookData) {
    try {
      const created = await createBook(bookData)
      const newBook = new Book(created)
      this.data.push(newBook)
      return newBook
    } catch (error) {
      throw new Error(`No se pudo añadir el libro: ${error.message}`)
    }
  }

  async removeBook(bookId) {
    try {
      const index = this.data.findIndex((b) => b.id === bookId)
      if (index === -1) {
        throw new Error(`No existe un libro con id ${bookId}`)
      }
      await deleteBook(bookId)
      this.data.splice(index, 1)
    } catch (error) {
      throw new Error(`No se pudo eliminar el libro: ${error.message}`)
    }
  }

  async changeBook(newData) {
    try {
      const index = this.data.findIndex((b) => b.id === newData.id)
      if (index === -1) {
        throw new Error(`No existe un libro con id ${newData.id}`)
      }
      const updated = await updateBook(newData.id, newData)
      const updatedBook = new Book(updated)
      this.data[index] = updatedBook
      return updatedBook
    } catch (error) {
      throw new Error(`No se pudo modificar el libro: ${error.message}`)
    }
  }

  toString() {
    return this.data.map((b) => b.toString()).join('\n')
  }

  getBookById(bookId) {
    const book = this.data.find((b) => b.id === bookId)
    if (!book) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    return book
  }

  getBookIndexById(bookId) {
    const index = this.data.findIndex((b) => b.id === bookId)
    if (index === -1) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    return index
  }

  bookExists(userId, moduleCode) {
    return this.data.some((b) => b.userId === userId && b.moduleCode === moduleCode)
  }

  booksFromUser(userId) {
    return this.data.filter((b) => b.userId === userId)
  }

  booksFromModule(moduleCode) {
    return this.data.filter((b) => b.moduleCode === moduleCode)
  }

  booksCheeperThan(price) {
    return this.data.filter((b) => b.price <= price)
  }

  booksWithStatus(status) {
    return this.data.filter((b) => b.status === status)
  }

  averagePriceOfBooks() {
    if (this.data.length === 0) return '0.00€'
    const total = this.data.reduce((acc, b) => acc + b.price, 0)
    return (total / this.data.length).toFixed(2) + '€'
  }

  booksOfTypeNotes() {
    return this.data.filter((b) => b.publisher === 'Apunts')
  }

  booksNotSold() {
    return this.data.filter((b) => !b.soldDate)
  }
}