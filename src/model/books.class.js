import Book from './book.class'

export default class Books {
  constructor() {
    this.data = []
  }

  populate(books) {
    this.data = books.map((b) => new Book(b))
  }

  addBook(bookData) {
    const newId = this.data.length === 0 ? 1 : Math.max(...this.data.map((b) => b.id)) + 1
    const newBook = new Book({ ...bookData, id: newId })
    this.data.push(newBook)
    return newBook
  }

  removeBook(bookId) {
    const index = this.data.findIndex((b) => b.id === bookId)
    if (index === -1) {
      throw new Error(`No existe un libro con id ${bookId}`)
    }
    this.data.splice(index, 1)
  }

  changeBook(newData) {
    const index = this.data.findIndex((b) => b.id === newData.id)
    if (index === -1) {
      throw new Error(`No existe un libro con id ${newData.id}`)
    }
    const updated = new Book(newData)
    this.data[index] = updated
    return updated
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

  incrementPriceOfBooks(percentage) {
    return this.data.map((b) => new Book({ ...b, price: Number((b.price * (1 + percentage)).toFixed(2)) }))
  }
}