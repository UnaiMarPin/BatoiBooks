import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Books from '../src/model/books.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Books — persistencia', () => {
  it('addBook crea un libro en el servidor y lo añade a this.data', async () => {
    const books = new Books()
    const nuevo = {
      userId: 2,
      moduleCode: 'ABCD',
      publisher: 'Apunts',
      price: 12,
      pages: 40,
      status: 'good'
    }
    const response = await books.addBook(nuevo)

    expect(response.id).toBeDefined()
    // Añadimos los campos por defecto que la clase Book rellena sola
    expect(response).toEqual({ ...nuevo, id: response.id, photo: '', comments: '', soldDate: '' })

    expect(books.data).toHaveLength(1)
    expect(books.data[0].id).toBe(response.id)
  })

  it('removeBook ante un error 500 rechaza la promesa y no modifica this.data', async () => {
    const books = new Books()
    books.data = [{ id: 1, userId: 2, moduleCode: 'ABCD', publisher: 'Apunts', price: 12, pages: 40, status: 'good' }]
    
    server.use(
      http.delete('http://localhost:3000/books/:id', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(books.removeBook(1)).rejects.toThrow()
    expect(books.data).toHaveLength(1)
  })

  it('removeBook ante un error 404 rechaza la promesa y no modifica this.data', async () => {
    const books = new Books()
    books.data = [{ id: 1, userId: 2, moduleCode: 'ABCD', publisher: 'Apunts', price: 12, pages: 40, status: 'good' }]
    
    server.use(
      http.delete('http://localhost:3000/books/:id', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(books.removeBook(1)).rejects.toThrow()
    expect(books.data).toHaveLength(1)
  })
})