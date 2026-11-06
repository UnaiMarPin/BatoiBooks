# Auditoría — Práctica 5 (DOM y eventos)

El método `renderBook` generado por la IA tiene varios problemas críticos que afectan a la seguridad, la lógica y la estabilidad de la aplicación. Aquí están los fallos encontrados y cómo los he solucionado en mi código.

## Problema 1: Vulnerabilidad XSS (Cross-Site Scripting)
**Qué falla:**
La IA usa `innerHTML` e inyecta datos del usuario (como `book.comments`, `book.publisher`, `book.photo`, etc.) directamente en el HTML sin sanitizar. Cualquier campo interpolado es vulnerable.

**Cómo reproducirlo:**
Si un usuario añade un libro con el comentario `<img src=x onerror="alert('hackeado')">`, al renderizarse la tarjeta, el navegador interpretará esa etiqueta y ejecutará el código malicioso.

**Consecuencias:**
Es un gravísimo riesgo de seguridad (XSS). Un atacante podría robar cookies o la sesión del usuario.

**Cómo lo he corregido en mi código:**
En mi vista (`view.js`), en lugar de usar `innerHTML`, construyo el HTML usando `document.createElement` y asigno los textos con `textContent`. Al usar `textContent`, los datos se tratan como texto plano. Si alguien introduce una etiqueta HTML, se muestra literalmente en pantalla y nunca se ejecuta.

*Código incorrecto de la IA:*
card.innerHTML = `<p>${book.comments}</p>`

*Código corregido en view.js:*
const pComments = document.createElement('p')
pComments.textContent = book.comments || ''

## Problema 2: Lógica invertida en la fecha de venta
**Qué falla:**
La IA escribe `${book.soldDate ? 'En venta' : 'Vendido el ' + book.soldDate}`. El operador ternario está al revés.

**Cómo reproducirlo:**
Si un libro tiene `soldDate` (significa que está vendido), la IA muestra "En venta". Si el libro no tiene `soldDate` (es `undefined`), la rama falsa se ejecuta y concatena el valor, mostrando "Vendido el undefined".

**Consecuencias:**
Es un fallo visual y funcional que confunde al usuario, mostrando información falsa.

**Cómo lo he corregido en mi código:**
He invertido el operador ternario para que tenga la lógica correcta.

*Código incorrecto de la IA:*
<p>${book.soldDate ? 'En venta' : 'Vendido el ' + book.soldDate}</p>

*Código corregido en view.js:*
const pSold = document.createElement('p')
pSold.textContent = book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'

## Problema 3: Error fatal si el módulo no existe (TypeError)
**Qué falla:**
La IA asume que el módulo siempre existe y accede directamente a `module.cliteral`.

**Cómo reproducirlo:**
Si un libro tiene un `moduleCode` que no está en la lista de módulos, `module` será `undefined`. Al intentar leer `.cliteral`, lanzará un error fatal.

**Consecuencias:**
Rompe la aplicación entera. La lista de libros no termina de renderizarse y el usuario se queda con la pantalla en blanco.

**Cómo lo he corregido en mi código:**
En mi vista, hago una búsqueda segura y uso un fallback para mostrar el código del módulo si este no existe.

*Código incorrecto de la IA:*
<h3>${module.cliteral} (${book.id})</h3>

*Código corregido en view.js:*
const module = modules.find(m => m.code === book.moduleCode)
const moduleName = module ? module.cliteral : book.moduleCode
const h3 = document.createElement('h3')
h3.textContent = `${moduleName} (${book.id})`

## Problema 4: El comentario puede ser undefined
**Qué falla:**
La IA hace `<p>${book.comments}</p>` asumiendo que siempre hay un comentario.

**Cómo reproducirlo:**
Si un usuario añade un libro sin escribir comentarios (la propiedad es `undefined`), la tarjeta mostrará la palabra "undefined" en la pantalla.

**Consecuencias:**
Fallo visual. No rompe la app, pero ensucia la interfaz mostrando errores técnicos al usuario.

**Cómo lo he corregido en mi código:**
Añadiendo un operador lógico OR (`||`) para que, si no hay comentarios, se muestre una cadena vacía en su lugar.

*Código incorrecto de la IA:*
<p>${book.comments}</p>

*Código corregido en view.js:*
const pComments = document.createElement('p')
pComments.textContent = book.comments || ''

## Problema 5: La imagen sin fallback
**Qué falla:**
La IA pone `<img src="${book.photo}">` sin comprobar si `book.photo` existe. Si es una cadena vacía `''` o `undefined`, el navegador mostrará una imagen rota.

**Cómo reproducirlo:**
Añade un libro sin URL en la foto. El navegador mostrará el icono de imagen rota.

**Consecuencias:**
Fallo visual, la tarjeta queda fea y poco profesional.

**Cómo lo he corregido en mi código:**
Compruebo si `book.photo` tiene valor antes de crear y añadir la etiqueta `img` al DOM.

*Código incorrecto de la IA:*
<img src="${book.photo}" alt="Libro: ${book.id}">

*Código corregido en view.js:*
if (book.photo) {
  const img = document.createElement('img')
  img.src = book.photo
  img.alt = `Libro: ${book.id}`
  card.appendChild(img)
}

## Tests de regresión

En `test/auditoria.test.js` hay tres tests que fallan con el código de la IA y pasan con el mío:

- **XSS (Problema 1)**: renderiza un libro con comentario `<img class="xss-test" ...>` y comprueba que la tarjeta no contiene `.xss-test`. Con `innerHTML` sí lo contiene; con `textContent` no.
- **Vendido (Problema 2)**: un libro con `soldDate` debe mostrar "Vendido el <fecha>" y no "En venta".
- **En venta (Problema 2)**: un libro sin `soldDate` (null) debe mostrar "En venta" y no "Vendido".