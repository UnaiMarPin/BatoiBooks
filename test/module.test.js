import { describe, it, expect } from 'vitest'
import Module from '../src/model/module.class'

const modulesFixture = [
  { code: '5021', cliteral: 'Incidentes de ciberseguridad', vliteral: 'Incidents de ciberseguretat', courseId: 59 },
  { code: '5025', cliteral: 'Hacking ético', vliteral: 'Hacking ètic', courseId: 59 }
]

describe('Clase Module', () => {
  it('constructor crea un módulo', () => {
    const newModule = new Module(modulesFixture[0])
    expect(newModule).toBeInstanceOf(Module)
    expect(newModule).toEqual(modulesFixture[0])
  })

  it('toString pinta correctamente el módulo', () => {
    const newModule = new Module(modulesFixture[0])
    const texto = newModule.toString()
    expect(texto).toContain(modulesFixture[0].code)
    expect(texto).toContain(modulesFixture[0].cliteral)
  })
})