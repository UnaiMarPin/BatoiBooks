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
    incrementPriceOfBooks
};

function getBookById(libros, id){
  const libroEncontrado = libros.find((libro) => libro.id === id);
  if (!libroEncontrado) {
    throw new Error(`No existe un libro con id ${id}`);
  }
  return libroEncontrado;
}

function getBookIndexById(books, bookId){
     const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    throw new Error(`Book not found`);
  }
  return index;
}

function getUserById(usuarios, idUsuario){
    const usu = usuarios.find((usuario) => usuario.id ===  idUsuario);
    if(!usu){
        throw new Error(`No existe un usuario con id ${idUsuario}`);
    }
    return usu;
}

function getUserIndexById(users, userId){
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error(`User not found`);
    }
    return index;
}

function getUserByNickName(users, nick){
    const user = users.find((u) => u.nick === nick);
    if (!user) {
        throw new Error(`No existe un usuario con nick ${nick}`);
    }
    return user;
}

function getModuleByCode(modules, code){
    const mod = modules.find((m) => m.code === code);
    if (!mod) {
        throw new Error(`No existe un módulo con código ${code}`);
    }
    return mod;
}

function booksFromUser(books, userId){
    return books.filter((b) => b.userId === userId);
}

function booksFromModule(books, moduleCode){
    return books.filter((b) => b.moduleCode === moduleCode);
}

function booksCheeperThan(books, price){
    return books.filter((b) => b.price <= price);
}

function booksWithStatus(books, status){
    return books.filter((b) => b.status === status);
}

function averagePriceOfBooks(books){
    if (books.length === 0) return "0.00€";
    const total = books.reduce((acc, book) => acc + book.price, 0);
    return (total / books.length).toFixed(2) + "€";
}

function booksOfTypeNotes(books){
    return books.filter((b) => b.publisher === "Apunts");
}

function bookExists(books, userId, moduleCode){
    return books.some((b) => b.userId === userId && b.moduleCode === moduleCode);
}

function booksNotSold(books){
    return books.filter((b) => !b.soldDate);
}

function incrementPriceOfBooks(books, percentage){
    return books.map((b) => ({ ...b, price: b.price + (b.price * percentage) }));
}
