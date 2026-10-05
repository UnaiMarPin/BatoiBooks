import User from './user.class'

export default class Users {
  constructor() {
    this.data = []
  }

  populate(users) {
    this.data = users.map((u) => new User(u))
  }

  addUser(userData) {
    const newId = this.data.length === 0 ? 1 : Math.max(...this.data.map((u) => u.id)) + 1
    const newUser = new User({ ...userData, id: newId })
    this.data.push(newUser)
    return newUser
  }

  removeUser(userId) {
    const index = this.data.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error(`No existe un usuario con id ${userId}`)
    }
    this.data.splice(index, 1)
  }

  changeUser(newData) {
    const index = this.data.findIndex((u) => u.id === newData.id)
    if (index === -1) {
      throw new Error(`No existe un usuario con id ${newData.id}`)
    }
    const updated = new User(newData)
    this.data[index] = updated
    return updated
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