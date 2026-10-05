import { describe, it, expect } from 'vitest'
import User from '../src/model/user.class'
import Users from '../src/model/users.class'

const usersFixture = [
  { id: 2, nick: 'Ignasi', email: 'ignasi@test.com', password: '1234' },
  { id: 3, nick: 'Juan', email: 'juan@test.com', password: 'abcd' },
  { id: 4, nick: 'Marta', email: 'marta@test.com', password: 'xyz' }
]

describe('Clase Users', () => {
  it('constructor inicializa data como array vacío', () => {
    const users = new Users()
    expect(users.data).toEqual([])
  })

  it('populate carga los usuarios como instancias de User', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(users.data.length).toBe(usersFixture.length)
    users.data.forEach((u) => expect(u).toBeInstanceOf(User))
  })

  it('addUser añade un usuario y devuelve el nuevo elemento con id', () => {
    const users = new Users()
    users.populate(usersFixture)
    const newUser = users.addUser({ nick: 'Ximo', email: 'ximo@test.com', password: 'pwd' })
    expect(newUser).toBeInstanceOf(User)
    expect(users.data.length).toBe(usersFixture.length + 1)
  })

  it('addUser asigna un id mayor que el máximo existente', () => {
    const users = new Users()
    users.populate(usersFixture)
    const newUser = users.addUser({ nick: 'Ximo', email: 'ximo@test.com', password: 'pwd' })
    expect(newUser.id).toBe(5)
  })

  it('removeUser elimina el usuario', () => {
    const users = new Users()
    users.populate(usersFixture)
    users.removeUser(2)
    expect(users.data.some((u) => u.id === 2)).toBe(false)
  })

  it('removeUser lanza excepción si no existe y no modifica el array', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(() => users.removeUser(999)).toThrow()
    expect(users.data.length).toBe(usersFixture.length)
  })

  it('changeUser sustituye el usuario y devuelve el modificado', () => {
    const users = new Users()
    users.populate(usersFixture)
    const modified = users.changeUser({ ...usersFixture[0], nick: 'IgnasiNou' })
    expect(modified).toBeInstanceOf(User)
    expect(users.getUserById(2).nick).toBe('IgnasiNou')
  })

  it('changeUser lanza excepción si no existe', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(() => users.changeUser({ ...usersFixture[0], id: 999 })).toThrow()
  })

  it('toString devuelve un string con todos los usuarios', () => {
    const users = new Users()
    users.populate(usersFixture)
    const texto = users.toString()
    expect(typeof texto).toBe('string')
    usersFixture.forEach((u) => expect(texto).toContain(u.nick))
  })

  it('getUserById devuelve el usuario correcto', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(users.getUserById(2).id).toBe(2)
  })

  it('getUserById lanza excepción si no existe', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(() => users.getUserById(999)).toThrow()
  })

  it('getUserIndexById devuelve la posición correcta', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(users.getUserIndexById(2)).toBe(0)
  })

  it('getUserIndexById lanza excepción si no existe', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(() => users.getUserIndexById(999)).toThrow()
  })

  it('getUserByNickName devuelve el usuario correcto', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(users.getUserByNickName('Marta').id).toBe(4)
  })

  it('getUserByNickName lanza excepción si no existe', () => {
    const users = new Users()
    users.populate(usersFixture)
    expect(() => users.getUserByNickName('NoExiste')).toThrow()
  })
})