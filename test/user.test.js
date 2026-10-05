import { describe, it, expect } from 'vitest'
import User from '../src/model/user.class'

const usersFixture = [
  { id: 2, nick: 'Ignasi', email: 'ignasi@test.com', password: '1234' },
  { id: 3, nick: 'Juan', email: 'juan@test.com', password: 'abcd' }
]

describe('Clase User', () => {
  it('constructor crea un usuario', () => {
    const newUser = new User(usersFixture[0])
    expect(newUser).toBeInstanceOf(User)
    expect(newUser).toEqual(usersFixture[0])
  })

  it('toString pinta correctamente el usuario', () => {
    const newUser = new User(usersFixture[0])
    const texto = newUser.toString()
    expect(texto).toContain(String(usersFixture[0].id))
    expect(texto).toContain(usersFixture[0].nick)
    expect(texto).toContain(usersFixture[0].email)
  })
})