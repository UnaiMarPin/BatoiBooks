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
}