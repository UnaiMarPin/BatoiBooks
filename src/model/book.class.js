export default class Book {
  constructor({ id, userId, moduleCode, publisher, price, pages, status, photo = '', comments = '', soldDate = '' }) {
    this.id = id
    this.userId = userId
    this.moduleCode = moduleCode
    this.publisher = publisher
    this.price = price
    this.pages = pages
    this.status = status
    this.photo = photo
    this.comments = comments
    this.soldDate = soldDate
  }

  toString() {
    return `Book(id: ${this.id}, publisher: ${this.publisher}, price: ${this.price}€, status: ${this.status}, soldDate: ${this.soldDate || 'no venut'})`
  }
    async bookExists(userId, moduleCode) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books?userId=${userId}&moduleCode=${moduleCode}`)
      if (!response.ok) throw new Error('Error al comprobar')
      const books = await response.json()
      return books.length > 0 // Devuelve true si hay al menos un libro
    } catch (error) {
      throw new Error(`No se pudo comprobar el módulo: ${error.message}`)
    }
  }
}