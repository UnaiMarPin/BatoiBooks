const NOTES_PUBLISHER = "Apunts";
const TWO_DECIMALS = 2;

export {
  getBookById,
  getBookIndexById,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNotes,
  bookExists,
  booksNotSold,
  incrementPriceOfBooks,
};

function getBookById(books, bookId) {
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    throw new Error(`No existe un libro con id ${bookId}`);
  }
  return book;
}

function getBookIndexById(books, bookId) {
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    throw new Error(`No existe un libro con id ${bookId}`);
  }
  return index;
}

function getUserById(users, userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error(`No existe un usuario con id ${userId}`);
  }
  return user;
}

function getUserIndexById(users, userId) {
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error(`No existe un usuario con id ${userId}`);
  }
  return index;
}

function getUserByNickName(users, nick) {
  const user = users.find((u) => u.nick === nick);
  if (!user) {
    throw new Error(`No existe un usuario con nick ${nick}`);
  }
  return user;
}

function getModuleByCode(modules, code) {
  const module = modules.find((m) => m.code === code);
  if (!module) {
    throw new Error(`No existe un módulo con código ${code}`);
  }
  return module;
}

function booksFromUser(books, userId) {
  return books.filter((b) => b.userId === userId);
}

function booksFromModule(books, moduleCode) {
  return books.filter((b) => b.moduleCode === moduleCode);
}

function booksCheeperThan(books, price) {
  return books.filter((b) => b.price <= price);
}

function booksWithStatus(books, status) {
  return books.filter((b) => b.status === status);
}

function averagePriceOfBooks(books) {
  if (books.length === 0) return (0).toFixed(TWO_DECIMALS) + "€";
  const total = books.reduce((acc, book) => acc + book.price, 0);
  return (total / books.length).toFixed(TWO_DECIMALS) + "€";
}

function booksOfTypeNotes(books) {
  return books.filter((b) => b.publisher === NOTES_PUBLISHER);
}

function bookExists(books, userId, moduleCode) {
  return books.some((b) => b.userId === userId && b.moduleCode === moduleCode);
}

function booksNotSold(books) {
  return books.filter((b) => !b.soldDate);
}

function incrementPriceOfBooks(books, percentage) {
  return books.map((b) => ({
    ...b,
    price: Number((b.price * (1 + percentage)).toFixed(TWO_DECIMALS)),
  }));
}