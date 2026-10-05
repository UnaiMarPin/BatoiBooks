import { describe, it, expect } from 'vitest'
import Module from '../src/model/module.class'
import Modules from '../src/model/modules.class'

const modulesFixture = [
  { code: '5021', cliteral: 'Incidentes de ciberseguridad', vliteral: 'Incidents de ciberseguretat', courseId: 59 },
  { code: '5025', cliteral: 'Hacking ético', vliteral: 'Hacking ètic', courseId: 59 },
  { code: '0485', cliteral: 'Programación', vliteral: 'Programació', courseId: 32 }
]

describe('Clase Modules', () => {
  it('constructor inicializa data como array vacío', () => {
    const modules = new Modules()
    expect(modules.data).toEqual([])
  })

  it('populate carga los módulos como instancias de Module', () => {
    const modules = new Modules()
    modules.populate(modulesFixture)
    expect(modules.data.length).toBe(modulesFixture.length)
    modules.data.forEach((m) => expect(m).toBeInstanceOf(Module))
  })

  it('toString devuelve un string con todos los módulos', () => {
    const modules = new Modules()
    modules.populate(modulesFixture)
    const texto = modules.toString()
    expect(typeof texto).toBe('string')
    modulesFixture.forEach((m) => expect(texto).toContain(m.code))
  })

  it('getModuleByCode devuelve el módulo correcto', () => {
    const modules = new Modules()
    modules.populate(modulesFixture)
    expect(modules.getModuleByCode('5021').code).toBe('5021')
  })

  it('getModuleByCode lanza excepción si no existe', () => {
    const modules = new Modules()
    modules.populate(modulesFixture)
    expect(() => modules.getModuleByCode('9999')).toThrow()
  })
})