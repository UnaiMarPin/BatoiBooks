# BatoiBooks — Unai Martinez Pinteño

Aplicación web para vender libros de texto y apuntes entre estudiantes del CIP FP Batoi.

Proyecto desarrollado para el módulo de **Desarrollo Web en Entorno Cliente (DWEC)** usando **Vite + JavaScript Vanilla** y **Vitest** para los tests.

## 📋 Descripción

La aplicación trabaja con datos de:

- **courses**: ciclos del centro
- **families**: familias profesionales
- **modules**: módulos de cada ciclo
- **sales**: ventas registradas
- **users**: usuarios registrados
- **books**: libros y apuntes en venta

En esta práctica (`2-arrays`) se han implementado las funciones principales para consultar y transformar los datos de libros, usuarios y módulos, usando **programación funcional** (`map`, `filter`, `reduce`, `find`, `some`, `findIndex`).

## 🚀 Cómo arrancar el proyecto

### Requisitos previos

- Node.js 20.19+ o 22.12+ (recomendado)
- npm

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173` y pulsa **F12** para ver la consola con los resultados.

### Ejecutar los tests

```bash
npm run test
```

Para ver los tests en modo watch (se reejecutan al guardar):

```bash
npm run test -- --watch
```

### Build de producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del proyecto

```
BatoiBooks/
├── AUDITORIA.md          # Análisis de código funcional vs imperativo
├── README.md             # Este archivo
├── index.html
├── package.json
├── src/
│   ├── assets/
│   │   └── logoBatoi.png
│   ├── services/
│   │   └── datos.js      # Datos de la aplicación (books, users, modules...)
│   ├── functions.js      # Funciones de consulta y transformación
│   ├── main.js           # Punto de entrada, renderiza la página
│   └── style.css
└── test/
    ├── contrato.test.js  # Verifica que las funciones tienen los nombres exactos
    ├── functions.test.js # Tests de cada función
    └── main.test.js      # Tests básicos de los datos
```

## 🧩 Funciones implementadas

Todas las funciones están en `src/functions.js` y usan **programación funcional** (sin `for`, sin `while`, sin mutar el array original).

| Función | Descripción |
|---|---|
| `getBookById` | Devuelve el libro con la id indicada |
| `getBookIndexById` | Devuelve la posición del libro con esa id |
| `getUserById` | Devuelve el usuario con esa id |
| `getUserIndexById` | Devuelve la posición del usuario con esa id |
| `getUserByNickName` | Devuelve el usuario con ese nick |
| `getModuleByCode` | Devuelve el módulo con ese código |
| `booksFromUser` | Libros puestos a la venta por un usuario |
| `booksFromModule` | Libros de un módulo concreto |
| `booksCheeperThan` | Libros con precio igual o inferior al indicado |
| `booksWithStatus` | Libros en un estado concreto (`new`, `good`, `used`, `bad`, `digital`) |
| `averagePriceOfBooks` | Precio medio con 2 decimales y símbolo € |
| `booksOfTypeNotes` | Libros que son apuntes (no de editorial) |
| `bookExists` | ¿Tiene un usuario un libro a la venta de un módulo concreto? |
| `booksNotSold` | Libros que aún no se han vendido |
| `incrementPriceOfBooks` | Devuelve un array nuevo con los precios incrementados |

## 📤 Salida por consola

Al abrir la aplicación en el navegador, la consola muestra:

- Libros del usuario 4
- Libros del módulo 5021 en estado `"good"`
- Nuevos precios con un 10% de incremento

## 🛠️ Tecnologías

- [Vite](https://vitejs.dev/) — Bundler y servidor de desarrollo
- [Vitest](https://vitest.dev/) — Framework de testing
- JavaScript Vanilla (ES Modules)

## 👤 Autor

**Unai Martinez Pinteño**
- GitHub: [@UnaiMarPin](https://github.com/UnaiMarPin)
