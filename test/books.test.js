import { describe, it, expect } from 'vitest'
import Book from '../src/model/book.class'
import Books from '../src/model/books.class'

const booksFixture = [
  { id: 31, userId: 2, moduleCode: '5021', publisher: 'Apunts', price: 14, pages: 76, status: 'bad', soldDate: '2023-03-25', photo: '', comments: '' },
  { id: 35, userId: 2, moduleCode: '7021', publisher: 'McGraw-Hill', price: 34, pages: 116, status: 'good', soldDate: '', photo: '', comments: '' },
  { id: 40, userId: 3, moduleCode: '5021', publisher: 'Apunts', price: 20, pages: 50, status: 'new', soldDate: '', photo: '', comments: '' }
]

describe('Clase Books', () => {
  it('constructor inicializa data como array vacío', () => {
    const books = new Books()
    expect(books.data).toEqual([])
  })

  it('populate carga los libros y los convierte en instancias de Book', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(books.data.length).toBe(booksFixture.length)
    books.data.forEach((b) => expect(b).toBeInstanceOf(Book))
  })

  it('populate no devuelve nada', () => {
    const books = new Books()
    expect(books.populate(booksFixture)).toBeUndefined()
  })

  it('addBook añade un libro y devuelve el nuevo elemento con id asignada', () => {
    const books = new Books()
    books.populate(booksFixture)
    const newBookData = { userId: 3, moduleCode: '5025', publisher: 'Apunts', price: 10, pages: 30, status: 'new' }
    const newBook = books.addBook(newBookData)
    expect(newBook).toBeInstanceOf(Book)
    expect(books.data.length).toBe(booksFixture.length + 1)
    expect(books.data[books.data.length - 1].id).toBe(newBook.id)
  })

  it('addBook asigna un id mayor que el máximo existente', () => {
    const books = new Books()
    books.populate(booksFixture)
    const newBook = books.addBook({ userId: 1, moduleCode: '0001', publisher: 'Apunts', price: 5, pages: 10, status: 'good' })
    expect(newBook.id).toBe(41)
  })

  it('removeBook elimina el libro con esa id', () => {
    const books = new Books()
    books.populate(booksFixture)
    books.removeBook(31)
    expect(books.data.length).toBe(booksFixture.length - 1)
    expect(books.data.some((b) => b.id === 31)).toBe(false)
  })

  it('removeBook lanza excepción si no existe y no modifica el array', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(() => books.removeBook(999)).toThrow()
    expect(books.data.length).toBe(booksFixture.length)
  })

  it('changeBook sustituye el libro y devuelve el modificado', () => {
    const books = new Books()
    books.populate(booksFixture)
    const modified = books.changeBook({ ...booksFixture[0], price: 99 })
    expect(modified).toBeInstanceOf(Book)
    expect(books.getBookById(31).price).toBe(99)
  })

  it('changeBook devuelve una instancia de Book, no un objeto plano', () => {
    const books = new Books()
    books.populate(booksFixture)
    const modified = books.changeBook({ ...booksFixture[0], price: 99 })
    expect(modified).toBeInstanceOf(Book)
  })

  it('changeBook lanza excepción si no existe', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(() => books.changeBook({ ...booksFixture[0], id: 999 })).toThrow()
  })

  it('toString devuelve un string con todos los libros', () => {
    const books = new Books()
    books.populate(booksFixture)
    const texto = books.toString()
    expect(typeof texto).toBe('string')
    booksFixture.forEach((b) => expect(texto).toContain(b.publisher))
  })

  it('getBookById devuelve el libro correcto', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(books.getBookById(31).id).toBe(31)
  })

  it('getBookById lanza excepción si no existe', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(() => books.getBookById(999)).toThrow()
  })

  it('getBookIndexById devuelve la posición correcta', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(books.getBookIndexById(31)).toBe(0)
  })

  it('getBookIndexById lanza excepción si no existe', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(() => books.getBookIndexById(999)).toThrow()
  })

  it('bookExists comprueba si un usuario tiene un libro de un módulo', () => {
    const books = new Books()
    books.populate(booksFixture)
    expect(books.bookExists(2, '5021')).toBe(true)
    expect(books.bookExists(99, '0000')).toBe(false)
  })

  it('booksFromUser devuelve los libros del usuario', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksFromUser(2)
    expect(result.length).toBe(2)
    expect(result.every((b) => b.userId === 2)).toBe(true)
  })

  it('booksFromModule devuelve los libros del módulo', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksFromModule('5021')
    expect(result.length).toBe(2)
    expect(result.every((b) => b.moduleCode === '5021')).toBe(true)
  })

  it('booksCheeperThan devuelve los libros con precio <= al indicado', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksCheeperThan(20)
    expect(result.every((b) => b.price <= 20)).toBe(true)
  })

  it('booksWithStatus devuelve los libros con ese estado', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksWithStatus('new')
    expect(result.every((b) => b.status === 'new')).toBe(true)
  })

  it('averagePriceOfBooks devuelve el precio medio con 2 decimales y €', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.averagePriceOfBooks()
    expect(typeof result).toBe('string')
    expect(result.endsWith('€')).toBe(true)
    expect(result).toMatch(/^\d+\.\d{2}€$/)
  })

  it('averagePriceOfBooks devuelve 0.00€ con array vacío', () => {
    const books = new Books()
    expect(books.averagePriceOfBooks()).toBe('0.00€')
  })

  it('booksOfTypeNotes devuelve solo los apuntes', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksOfTypeNotes()
    expect(result.every((b) => b.publisher === 'Apunts')).toBe(true)
  })

  it('booksNotSold devuelve solo los no vendidos', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.booksNotSold()
    expect(result.every((b) => !b.soldDate)).toBe(true)
  })

  it('incrementPriceOfBooks devuelve un array nuevo sin mutar el original', () => {
    const books = new Books()
    books.populate(booksFixture)
    const preciosOriginales = books.data.map((b) => b.price)
    const result = books.incrementPriceOfBooks(0.1)
    expect(result).not.toBe(books.data)
    expect(books.data.map((b) => b.price)).toEqual(preciosOriginales)
  })

  it('incrementPriceOfBooks devuelve instancias de Book', () => {
    const books = new Books()
    books.populate(booksFixture)
    const result = books.incrementPriceOfBooks(0.1)
    result.forEach((b) => expect(b).toBeInstanceOf(Book))
  })
})