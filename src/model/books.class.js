import Book from './book.class'
import { fetchBooks, createBook, deleteBook, updateBook, checkBookExists } from '../services/api'

export default class Books {
  constructor() {
    this.data = []
  }

  async fetchAll() {
    this.data = await fetchBooks()
  }

  async addBook(bookData) {
    const created = await createBook(bookData)
    const newBook = new Book(created)
    this.data.push(newBook)
    return newBook
  }

  async removeBook(bookId) {
    const index = this.data.findIndex((b) => String(b.id) === String(bookId))
    if (index === -1) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    await deleteBook(bookId)
    this.data.splice(index, 1)
  }

  async changeBook(newData) {
    const index = this.data.findIndex((b) => String(b.id) === String(newData.id))
    if (index === -1) {
      throw new Error(`No existe un libro con id ${newData.id}`)
    }
    const updated = await updateBook(newData.id, newData)
    const updatedBook = new Book(updated)
    this.data[index] = updatedBook
    return updatedBook
  }

  async bookExists(userId, moduleCode) {
    const books = await checkBookExists(userId, moduleCode)
    return books.length > 0
  }

  toString() {
    return this.data.map((b) => b.toString()).join('\n')
  }

  getBookById(bookId) {
    const book = this.data.find((b) => String(b.id) === String(bookId))
    if (!book) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    return book
  }

  getBookIndexById(bookId) {
    const index = this.data.findIndex((b) => String(b.id) === String(bookId))
    if (index === -1) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    return index
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