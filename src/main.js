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

const { books } = data;

const USER_ID = 4;
const MODULE_CODE = "5021";
const STATUS_GOOD = "good";
const INCREMENT = 0.10;

console.log("=== PRUEBAS BATOIBOOKS ===");

console.log(`Libros del usuario ${USER_ID}:`, functions.booksFromUser(books, USER_ID));

const moduleBooks = functions.booksFromModule(books, MODULE_CODE);
const goodModuleBooks = functions.booksWithStatus(moduleBooks, STATUS_GOOD);
console.log(`Libros del módulo ${MODULE_CODE} en estado "${STATUS_GOOD}":`, goodModuleBooks);

console.log("Nuevos precios con un 10% de incremento:", functions.incrementPriceOfBooks(books, INCREMENT));