import { describe, it, expect } from 'vitest'
import Module from '../src/model/module.class'
import Modules from '../src/model/modules.class'

const modulesFixture = [
  { code: '5021', cliteral: 'Incidentes de ciberseguridad', vliteral: 'Incidents de ciberseguretat', courseId: 59 },
  { code: '5025', cliteral: 'Hacking ético', vliteral: 'Hacking ètic', courseId: 59 }
]

describe('Clase Modules (métodos síncronos)', () => {
  it('constructor inicializa data como array vacío', () => {
    const modules = new Modules()
    expect(modules.data).toEqual([])
  })

  it('toString devuelve un string con todos los módulos', () => {
    const modules = new Modules()
    modules.data = modulesFixture
    const texto = modules.toString()
    expect(typeof texto).toBe('string')
  })

  it('getModuleByCode devuelve el módulo correcto', () => {
    const modules = new Modules()
    modules.data = modulesFixture
    expect(modules.getModuleByCode('5021').code).toBe('5021')
  })
})