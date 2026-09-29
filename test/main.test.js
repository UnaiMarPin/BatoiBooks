import { describe, expect, test } from 'vitest'
import data from '../src/services/datos'

describe('Ficheros creados', () => {
  test('Existe data en datos.js y contiene 6 libros', () => {
    expect(data.books.length).toBe(6)
  })
  test('Existen usuarios', () => {
    expect(data.users.length).toBeGreaterThan(0)
  })
  test('Existen módulos', () => {
    expect(data.modules.length).toBeGreaterThan(0)
  })
})