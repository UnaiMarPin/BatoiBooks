import './style.css';
import logoBatoi from './assets/logoBatoi.png';
import data from './services/datos.js';
import Books from './model/books.class';
import Users from './model/users.class';
import Modules from './model/modules.class';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Logo BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">Abre la consola para ver los resultados</p>
  </div>
`;

const books = new Books();
const users = new Users();
const modules = new Modules();

books.populate(data.books);
users.populate(data.users);
modules.populate(data.modules);

console.log("=== PRUEBAS BATOIBOOKS ===");

console.log("Libros del módulo 5021:", books.booksFromModule("5021"));

console.log("Libros en estado 'new':", books.booksWithStatus("new"));

console.log("Nuevos precios con un 10% de incremento:", books.incrementPriceOfBooks(0.1));