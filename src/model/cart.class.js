export default class Cart {
  constructor() {
    this.items = []
  }

  add(book) {
    if (this.items.find(b => b.id === book.id)) {
      throw new Error('El libro ya está en el carrito')
    }
    if (book.soldDate) {
      throw new Error('El libro ya está vendido')
    }
    // Guardamos una copia (clon) del libro para que si se edita el original, el carrito no cambie por sorpresa
    this.items.push(JSON.parse(JSON.stringify(book)))
  }

  getCount() {
    return this.items.length
  }
}