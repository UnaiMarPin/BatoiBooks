import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Users from '../src/model/users.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users — persistencia', () => {
  it('fetchAll carga los usuarios en this.data', async () => {
    const users = new Users()
    await users.fetchAll()
    expect(users.data.length).toBe(2)
  })

  it('addUser crea un usuario y lo añade a this.data', async () => {
    const users = new Users()
    const nuevo = { nick: 'Test', email: 'test@test.com', password: '1234' }
    const response = await users.addUser(nuevo)
    
    expect(response.id).toBeDefined()
    expect(response).toEqual({ ...nuevo, id: response.id })
    expect(users.data).toHaveLength(1)
  })

  it('removeUser ante un error 500 rechaza la promesa y no modifica this.data', async () => {
    const users = new Users()
    users.data = [{ id: 1, nick: 'Test', email: 'test@test.com' }]
    
    server.use(
      http.delete('http://localhost:3000/users/:id', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(users.removeUser(1)).rejects.toThrow()
    expect(users.data).toHaveLength(1)
  })

  it('removeUser ante un error 404 rechaza la promesa y no modifica this.data', async () => {
    const users = new Users()
    users.data = [{ id: 1, nick: 'Test', email: 'test@test.com' }]
    
    server.use(
      http.delete('http://localhost:3000/users/:id', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    await expect(users.removeUser(1)).rejects.toThrow()
    expect(users.data).toHaveLength(1)
  })
})