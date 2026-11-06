// @vitest-environment jsdom
import { test, expect } from 'vitest'
import { loadApp, card, BOOKS } from './helpers.js'

test('el comentario de un libro no inyecta HTML (XSS)', async () => {
  const comentarioMalicioso = '<img class="xss-test" src="x" onerror="window.hackeado = true">'
  await loadApp({ books: [{ ...BOOKS[0], comments: comentarioMalicioso }] })

  const tarjeta = card(1)

  // La tarjeta NO debe contener una etiqueta <img> inyectada desde el comentario.
  expect(tarjeta.querySelector('.xss-test')).toBeNull()

  // Y el texto del comentario debe verse literalmente.
  expect(tarjeta.textContent).toContain(comentarioMalicioso)
})