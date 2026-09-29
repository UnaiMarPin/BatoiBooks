import { describe, it, expect } from 'vitest'
import * as functions from '../src/functions'
import data from '../src/services/datos'

const books = data.books
const users = data.users
const modules = data.modules

describe('function getBookById', () => {
 it('getBookById 1 devuelve el libro con id 1', () => {
   const response = functions.getBookById(books, 1)
   expect(response.id).toBe(1)
 });

 it('getBookById 22 devuelve un error', () => {
   expect(() => functions.getBookById(books, 22)).toThrow()
 });
})