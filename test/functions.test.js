import { describe, it, expect } from "vitest";
import * as functions from "../src/functions";
import data from "../src/services/datos";

const { books, users, modules } = data;

describe("function getBookById", () => {
  it("devuelve el libro con id 1", () => {
    expect(functions.getBookById(books, 1).id).toBe(1);
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getBookById(books, 999)).toThrow();
  });
});

describe("function getBookIndexById", () => {
  it("devuelve la posición del libro con id 1", () => {
    expect(functions.getBookIndexById(books, 1)).toBe(0);
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getBookIndexById(books, 999)).toThrow();
  });
});

describe("function getUserById", () => {
  it("devuelve el usuario con id 4", () => {
    expect(functions.getUserById(users, 4).id).toBe(4);
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserById(users, 999)).toThrow();
  });
});

describe("function getUserIndexById", () => {
  it("devuelve la posición del usuario con id 2", () => {
    expect(functions.getUserIndexById(users, 2)).toBe(0);
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserIndexById(users, 999)).toThrow();
  });
});

describe("function getUserByNickName", () => {
  it("devuelve el usuario con nick Marta", () => {
    expect(functions.getUserByNickName(users, "Marta").id).toBe(4);
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserByNickName(users, "NoExiste")).toThrow();
  });
});

describe("function getModuleByCode", () => {
  it("devuelve el módulo con código 5021", () => {
    expect(functions.getModuleByCode(modules, "5021").code).toBe("5021");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getModuleByCode(modules, "9999")).toThrow();
  });
});

describe("function booksFromUser", () => {
  it("devuelve los libros del usuario 4", () => {
    const result = functions.booksFromUser(books, 4);
    expect(result.length).toBe(3);
    expect(result.every((b) => b.userId === 4)).toBe(true);
  });
});

describe("function booksFromModule", () => {
  it("devuelve los libros del módulo 5021", () => {
    const result = functions.booksFromModule(books, "5021");
    expect(result.every((b) => b.moduleCode === "5021")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("function booksCheeperThan", () => {
  it("devuelve libros con precio <= 20", () => {
    const result = functions.booksCheeperThan(books, 20);
    expect(result.every((b) => b.price <= 20)).toBe(true);
  });
});

describe("function booksWithStatus", () => {
  it("devuelve libros en estado good", () => {
    const result = functions.booksWithStatus(books, "good");
    expect(result.every((b) => b.status === "good")).toBe(true);
  });
});

describe("function averagePriceOfBooks", () => {
  it("devuelve un string terminado en €", () => {
    const result = functions.averagePriceOfBooks(books);
    expect(typeof result).toBe("string");
    expect(result.endsWith("€")).toBe(true);
  });
  it("devuelve 0.00€ con array vacío", () => {
    expect(functions.averagePriceOfBooks([])).toBe("0.00€");
  });
});

describe("function booksOfTypeNotes", () => {
  it("devuelve solo libros con publisher Apunts", () => {
    const result = functions.booksOfTypeNotes(books);
    expect(result.every((b) => b.publisher === "Apunts")).toBe(true);
  });
});

describe("function bookExists", () => {
  it("devuelve true si el usuario tiene libro de ese módulo", () => {
    expect(functions.bookExists(books, 2, "5025")).toBe(true);
  });
  it("devuelve false si no existe", () => {
    expect(functions.bookExists(books, 99, "0000")).toBe(false);
  });
});

describe("function booksNotSold", () => {
  it("devuelve solo libros sin soldDate", () => {
    const result = functions.booksNotSold(books);
    expect(result.every((b) => !b.soldDate)).toBe(true);
  });
});

describe("function incrementPriceOfBooks", () => {
  it("NO modifica el array original", () => {
    const originalPrice = books[0].price;
    functions.incrementPriceOfBooks(books, 0.1);
    expect(books[0].price).toBe(originalPrice);
  });
  it("devuelve un nuevo array con precios incrementados", () => {
    const result = functions.incrementPriceOfBooks(books, 0.1);
    expect(result).not.toBe(books);
    expect(result[0].price).toBeCloseTo(books[0].price * 1.1, 2);
  });
});