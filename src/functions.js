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
  const libro = libros.find((libros) => libros.id === id);
  if (!libro) {
    throw new Error(`No existe un libro con id ${id}`);
  }
  return libro;
}


function getBookIndexById(books, bookId){
     const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    throw new Error(`Book not found`);
  }
  return index;
}

function getUserById(usuario, idUsuario){
    const usu = usuario.find((usuario) => usuario.id ===  idUsuario);
    if(!usu){
        throw new Error(`No existe un usuario con id ${idUsuario}`);
    }
    return usu;
}

function getUserIndexById(){
    
}

function getUserByNickName(){
    
}

function getModuleByCode(){
    
}

function booksFromUser(){
    
}

function booksFromModule(){
    
}

function booksCheeperThan(){
    
}

function booksWithStatus(){

}

function averagePriceOfBooks(){
    
}

function booksOfTypeNotes(){
    
}

function bookExists(books, bookId){
 return books.some((b) => b.id === bookId)
}

function booksNotSold(){
    
}

function incrementPriceOfBooks(){
    
}

