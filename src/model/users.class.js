import User from './user.class'
import { fetchUsers, createUser, deleteUser, updateUser } from '../services/api'

export default class Users {
  constructor() {
    this.data = []
  }

  async fetchAll() {
    try {
      this.data = await fetchUsers()
    } catch (error) {
      throw new Error(`No se pudieron cargar los usuarios: ${error.message}`)
    }
  }

  async addUser(userData) {
    try {
      const created = await createUser(userData)
      const newUser = new User(created)
      this.data.push(newUser)
      return newUser
    } catch (error) {
      throw new Error(`No se pudo añadir el usuario: ${error.message}`)
    }
  }

  async removeUser(userId) {
    try {
      const index = this.data.findIndex((u) => u.id === userId)
      if (index === -1) {
        throw new Error(`No existe un usuario con id ${userId}`)
      }
      await deleteUser(userId)
      this.data.splice(index, 1)
    } catch (error) {
      throw new Error(`No se pudo eliminar el usuario: ${error.message}`)
    }
  }

  async changeUser(newData) {
    try {
      const index = this.data.findIndex((u) => u.id === newData.id)
      if (index === -1) {
        throw new Error(`No existe un usuario con id ${newData.id}`)
      }
      const updated = await updateUser(newData.id, newData)
      const updatedUser = new User(updated)
      this.data[index] = updatedUser
      return updatedUser
    } catch (error) {
      throw new Error(`No se pudo modificar el usuario: ${error.message}`)
    }
  }

  toString() {
    return this.data.map((u) => u.toString()).join('\n')
  }

  getUserById(userId) {
    const user = this.data.find((u) => u.id === userId)
    if (!user) {
      throw new Error(`No existe un usuario con id ${userId}`)
    }
    return user
  }

  getUserIndexById(userId) {
    const index = this.data.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error(`No existe un usuario con id ${userId}`)
    }
    return index
  }

  getUserByNickName(nick) {
    const user = this.data.find((u) => u.nick === nick)
    if (!user) {
      throw new Error(`No existe un usuario con nick ${nick}`)
    }
    return user
  }
}