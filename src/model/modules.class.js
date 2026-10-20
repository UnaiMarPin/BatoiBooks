import Module from './module.class'
import { fetchModules } from '../services/api'

export default class Modules {
  constructor() {
    this.data = []
  }

  async fetchAll() {
    try {
      this.data = await fetchModules()
    } catch (error) {
      throw new Error(`No se pudieron cargar los módulos: ${error.message}`)
    }
  }

  toString() {
    return this.data.map((m) => m.toString()).join('\n')
  }

  getModuleByCode(code) {
    const module = this.data.find((m) => m.code === code)
    if (!module) {
      throw new Error(`No existe un módulo con código ${code}`)
    }
    return module
  }
}