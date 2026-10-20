# Auditoría — BatoiBooks (rama 3-clases)

## 1. `removeBook`

### Versión incorrecta

```javascript
removeBook(bookId) {
  this.data = this.data.filter(b => b.id !== bookId)
}
```

### Por qué está mal

- **No lanza excepción si el libro no existe.** El enunciado dice literalmente: *"Si no existe lanzará una excepción"*. Aquí, si `bookId` no está, simplemente devuelve un array idéntico sin avisar. El usuario nunca sabe que ha intentado borrar algo que no existe.
- **No se puede distinguir entre "borrado con éxito" y "no existía".** Ambas operaciones terminan igual: sin error y con el array sin ese elemento.
- **Reasigna `this.data`** en vez de modificar el array existente. Funciona, pero rompe la referencia: si alguien tenía guardada la referencia a `books.data` antes de llamar, ya no apunta al array actual.

### Versión correcta

```javascript
removeBook(bookId) {
  const index = this.data.findIndex((b) => b.id === bookId)
  if (index === -1) {
    throw new Error(`No existe un libro con id ${bookId}`)
  }
  this.data.splice(index, 1)
}
```

### Por qué es mejor

- **Comprueba primero si existe** y lanza excepción si no, tal como pide el enunciado.
- **Usa `splice`** para eliminar el elemento **del array actual**, sin reasignar `this.data`, conservando la referencia.
- **Mantiene la intención clara**: buscar, verificar, borrar.

## 2. `addBook`

### Versión incorrecta

```javascript
addBook(bookData) {
  const newBook = new Book({ ...bookData, id: this.data.length + 1 })
  this.data.push(newBook)
  return newBook
}
```

### Por qué está mal

- **Asigna la id como `length + 1`**, lo cual **produce colisiones** si se ha borrado algún elemento. Ejemplo: tenemos ids `[1, 2, 3]`, borramos el 2 → `data.length = 2` → siguiente id = `3`, **choca con el libro existente con id 3**.
- **No comprueba si ya existe esa id.** Aunque el diseño evitara la colisión, nunca está de más asegurarse.
- **Crea la instancia con un objeto plano**, sin validar que los datos mínimos estén presentes.

### Versión correcta

```javascript
addBook(bookData) {
  const newId = this.data.length === 0 ? 1 : Math.max(...this.data.map((b) => b.id)) + 1
  const newBook = new Book({ ...bookData, id: newId })
  this.data.push(newBook)
  return newBook
}
```

### Por qué es mejor

- **Calcula la id como `max(id) + 1`**, evitando colisiones tras borrados.
- **Maneja el caso de array vacío** (empezar por id 1).
- **Crea una instancia de `Book`** con todos los campos validados por el constructor.
- **Cuando los datos vengan de una base de datos**, será la propia BD quien asigne la id (autoincremental) y este cálculo se sustituirá por la id devuelta por la BD. El método seguirá siendo el mismo sitio donde se asigna la id, lo que hace el cambio mínimo.

## 3. `changeBook`

### Versión incorrecta

```javascript
changeBook(newData) {
  const index = this.data.findIndex(b => b.id === newData.id)
  this.data[index] = newData // newData es un objeto plano, no una instancia de Book
  return newData
}
```

### Por qué está mal

- **Guarda un objeto plano en lugar de una instancia de `Book`.** Después de llamar a este método, `this.data` contiene una mezcla de instancias `Book` y objetos planos. La próxima vez que se llame a `toString()` de alguno de estos, **fallará** porque el objeto plano no tiene ese método.
- **No lanza excepción si el libro no existe.** Si `index === -1`, `this.data[-1] = newData` **añade una propiedad `-1` al array** en lugar de dar error. Eso deja el array en un estado corrupto.
- **Rompe la cohesión de la clase**: la colección debe contener siempre instancias de `Book`.

### Versión correcta

```javascript
changeBook(newData) {
  const index = this.data.findIndex((b) => b.id === newData.id)
  if (index === -1) {
    throw new Error(`No existe un libro con id ${newData.id}`)
  }
  const updated = new Book(newData)
  this.data[index] = updated
  return updated
}
```

### Por qué es mejor

- **Comprueba que el libro existe** antes de sustituir; si no, lanza excepción.
- **Envuelve `newData` en `new Book(...)`** para garantizar que el array siempre contiene instancias de `Book` y el `toString()` sigue disponible.
- **Devuelve la instancia creada**, no el objeto plano original, para que quien llame trabaje con el tipo correcto.

---

## Práctica 4 — Persistencia (Auditoría Parte A)

En esta práctica, la gran decisión de diseño es: **¿los métodos de consulta deben pedir datos frescos al servidor o trabajar sobre `this.data` en memoria?**

### Mi decisión: trabajar sobre `this.data` en memoria.

Al arrancar la aplicación (o la clase), se llama a `fetchAll()`. Este método hace una petición HTTP (GET) y guarda el array resultante en la propiedad `this.data`. A partir de ahí, los métodos de consulta (como `booksFromUser`, `booksWithStatus`, `getModuleByCode`) simplemente filtran o buscan dentro de `this.data`. No vuelven a llamar al servidor.

**Ventajas:**
1. **Rendimiento**: Evitamos hacer una petición HTTP cada vez que el usuario busca algo. Las consultas en memoria son instantáneas.
2. **Simplicidad**: Al no requerir red, estos métodos no necesitan ser `async` ni usar `await`, lo que simplifica mucho el código de las clases y de la interfaz.
3. **Menor carga en el servidor**: No saturamos el backend con peticiones constantes.

**Inconvenientes:**
1. **Datos desactualizados**: Si otro usuario modifica la base de datos en el servidor, nuestra aplicación no se enterará hasta que se vuelva a llamar a `fetchAll()`.
2. **Consumo de memoria**: Si la base de datos fuera gigante (millones de libros), cargar todo en memoria al inicio podría ser inviable.

**Conclusión:**
Para una aplicación de este tamaño es la opción ideal. Si en el futuro los datos cambian muy rápido, se podría implementar un sistema de "refresco" (volver a hacer `fetchAll` cada X segundos).