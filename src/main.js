import './style.css';
import logoBatoi from './assets/logoBatoi.png';
import * as functions from './functions.js';
import data from './services/datos.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">Abre la consola para ver los resultados de los arrays</p>
  </div>
`;

const { books, users } = data;

console.log("=== PRUEBAS BATOIBOOKS ===");
console.log("Libros del usuario 4:", functions.booksFromUser(books, 4));

const librosModulo = functions.booksFromModule(books, "5021");
console.log("Libros del módulo 5021 en estado 'good':", functions.booksWithStatus(librosModulo, "good"));

console.log("Precio medio de los libros:", functions.averagePriceOfBooks(books));
console.log("Nuevos precios con un 10% de incremento:", functions.incrementPriceOfBooks(books, 0.10));
