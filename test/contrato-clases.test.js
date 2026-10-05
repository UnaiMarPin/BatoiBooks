import { describe, it, expect } from 'vitest'

const modelo = import.meta.glob('../src/model/*.class.js', { eager: true })
const claseDe = (fichero) => modelo[`../src/model/${fichero}.class.js`]?.default

function tieneMetodoPropio(Clase, metodo) {
  return (
    typeof Clase?.prototype?.[metodo] === 'function' &&
    Object.prototype.hasOwnProperty.call(Clase.prototype, metodo)
  )
}

const CONTRATO = {
  book: ['toString'],
  user: ['toString'],
  module: ['toString'],
  books: [
    'populate', 'addBook', 'removeBook', 'changeBook', 'toString',
    'getBookById', 'getBookIndexById', 'bookExists', 'booksFromUser',
    'booksFromModule', 'booksCheeperThan', 'booksWithStatus',
    'averagePriceOfBooks', 'booksOfTypeNotes', 'booksNotSold',
    'incrementPriceOfBooks'
  ],
  users: [
    'populate', 'addUser', 'removeUser', 'changeUser', 'toString',
    'getUserById', 'getUserIndexById', 'getUserByNickName'
  ],
  modules: ['populate', 'toString', 'getModuleByCode']
}

describe('Contrato: ficheros y clases', () => {
  for (const fichero of Object.keys(CONTRATO)) {
    it(`src/model/${fichero}.class.js existe y exporta por defecto una clase`, () => {
      expect(
        typeof claseDe(fichero),
        `No se encuentra src/model/${fichero}.class.js o no hace "export default class".`
      ).toBe('function')
    })
  }
})

describe('Contrato: métodos de cada clase', () => {
  for (const [fichero, metodos] of Object.entries(CONTRATO)) {
    for (const metodo of metodos) {
      it(`${fichero}.class.js tiene el método "${metodo}"`, () => {
        expect(
          tieneMetodoPropio(claseDe(fichero), metodo),
          `Falta el método "${metodo}" en ${fichero}.class.js`
        ).toBe(true)
      })
    }
  }
})

describe('Contrato: limpieza de la práctica anterior', () => {
  it('src/functions.js ya no existe', () => {
    expect(Object.keys(import.meta.glob('../src/functions.js'))).toHaveLength(0)
  })

  it('test/functions.test.js y test/contrato.test.js ya no existen', () => {
    const restos = Object.keys(import.meta.glob(['./functions.test.js', './contrato.test.js']))
    expect(restos).toHaveLength(0)
  })
})