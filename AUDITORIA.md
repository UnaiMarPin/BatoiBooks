# Auditoría — BatoiBooks (rama 2-arrays)

## 1. ¿Por qué está mal esta versión de `booksNotSold`?

```javascript
function booksNotSold(books) {
  let result = []
  for (let book of books) {
    if (book.soldDate == null) {
      result.push(book)
    }
  }
  return result
}
```

Está mal por tres motivos:

1. **Usa un bucle `for...of`**, prohibido por el enunciado. Con `filter` expresamos qué queremos (los libros no vendidos) en lugar de cómo obtenerlo (iterar, comprobar, empujar). Es más declarativo y más fácil de leer.
2. **Usa `==` (comparación débil)**. `soldDate` puede ser `""` o `undefined`. `"" == null` es `false`, pero `undefined == null` es `true`. Es frágil. Mejor `!book.soldDate`, que cubre `""`, `null` y `undefined`.
3. **No es funcional**: muta una variable local con `push`. Con `filter` devolvemos directamente un array nuevo sin estado intermedio.

Versión correcta:

```javascript
function booksNotSold(books) {
  return books.filter((book) => !book.soldDate);
}
```

## 2. Variante mutante de `incrementPriceOfBooks`

Versión que SÍ muta el array original (MALA):

```javascript
function incrementPriceOfBooks(books, percentage) {
  books.forEach((book) => {
    book.price = book.price * (1 + percentage);
  });
  return books;
}
```

Versión correcta (la que usamos):

```javascript
function incrementPriceOfBooks(books, percentage) {
  return books.map((book) => ({
    ...book,
    price: Number((book.price * (1 + percentage)).toFixed(2)),
  }));
}
```

¿Por qué es mejor la segunda?

- **Inmutabilidad**: la primera modifica los objetos originales. Si en otra parte de la app tienes una referencia a `books`, verás los precios cambiados sin saber por qué. Eso produce *side effects* difíciles de depurar.
- **Predecibilidad**: la segunda devuelve un array nuevo. El original queda intacto, y quien llame a la función decide qué hacer con el resultado.
- **Composición**: al devolver un array nuevo, puedes encadenar `map`, `filter`, etc. sin miedo a romper el estado original.
- **Testing**: es trivial comprobar que el array original no se ha modificado.