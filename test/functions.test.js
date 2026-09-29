import { describe, it, expect } from "vitest";
import * as functions from "../src/functions";
import data from "../src/services/datos";

const { books, users, modules } = data;

describe("function getBookById", () => {
  it("devuelve el libro con id 1", () => {
    const result = functions.getBookById(books, 1);
    expect(result.id).toBe(1);
    expect(typeof result).toBe("object");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getBookById(books, 999)).toThrow();
  });
  it("no devuelve un libro con id distinto", () => {
    const result = functions.getBookById(books, 1);
    expect(result.id).not.toBe(2);
  });
});

describe("function getBookIndexById", () => {
  it("devuelve la posición del libro con id 1", () => {
    expect(functions.getBookIndexById(books, 1)).toBe(0);
  });
  it("devuelve un número", () => {
    expect(typeof functions.getBookIndexById(books, 1)).toBe("number");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getBookIndexById(books, 999)).toThrow();
  });
});

describe("function getUserById", () => {
  it("devuelve el usuario con id 4", () => {
    const result = functions.getUserById(users, 4);
    expect(result.id).toBe(4);
    expect(typeof result).toBe("object");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserById(users, 999)).toThrow();
  });
  it("el usuario devuelto no es otro", () => {
    const result = functions.getUserById(users, 4);
    expect(result.id).not.toBe(2);
  });
});

describe("function getUserIndexById", () => {
  it("devuelve la posición del usuario con id 2", () => {
    expect(functions.getUserIndexById(users, 2)).toBe(0);
  });
  it("devuelve un número", () => {
    expect(typeof functions.getUserIndexById(users, 2)).toBe("number");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserIndexById(users, 999)).toThrow();
  });
});

describe("function getUserByNickName", () => {
  it("devuelve el usuario con nick Marta", () => {
    const result = functions.getUserByNickName(users, "Marta");
    expect(result.id).toBe(4);
    expect(result.nick).toBe("Marta");
  });
  it("el usuario devuelto tiene ese nick exacto", () => {
    const result = functions.getUserByNickName(users, "Ignasi");
    expect(result.nick).toBe("Ignasi");
  });
  it("lanza error si no existe", () => {
    expect(() => functions.getUserByNickName(users, "NoExiste")).toThrow();
  });
});

describe("function getModuleByCode", () => {
  it("devuelve el módulo con código 5021", () => {
    const result = functions.getModuleByCode(modules, "5021");
    expect(result.code).toBe("5021");
  });
  it("el módulo devuelto tiene ese código exacto", () => {
    const result = functions.getModuleByCode(modules, "5025");
    expect(result.code).toBe("5025");
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
  it("devuelve un array", () => {
    expect(Array.isArray(functions.booksFromUser(books, 4))).toBe(true);
  });
  it("NO incluye libros de otros usuarios", () => {
    const result = functions.booksFromUser(books, 4);
    expect(result.every((b) => b.userId !== 2)).toBe(true);
    expect(result.every((b) => b.userId !== 3)).toBe(true);
    expect(result.every((b) => b.userId !== 5)).toBe(true);
  });
  it("devuelve array vacío si el usuario no tiene libros", () => {
    const result = functions.booksFromUser(books, 999);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});

describe("function booksFromModule", () => {
  it("devuelve los libros del módulo 5021", () => {
    const result = functions.booksFromModule(books, "5021");
    expect(result.every((b) => b.moduleCode === "5021")).toBe(true);
    expect(result.length).toBe(3);
  });
  it("devuelve un array", () => {
    expect(Array.isArray(functions.booksFromModule(books, "5021"))).toBe(true);
  });
  it("NO incluye libros de otros módulos", () => {
    const result = functions.booksFromModule(books, "5021");
    expect(result.every((b) => b.moduleCode !== "5025")).toBe(true);
  });
  it("devuelve array vacío si el módulo no tiene libros", () => {
    const result = functions.booksFromModule(books, "0000");
    expect(result.length).toBe(0);
  });
});

describe("function booksCheeperThan", () => {
  it("devuelve libros con precio <= 20", () => {
    const result = functions.booksCheeperThan(books, 20);
    expect(result.every((b) => b.price <= 20)).toBe(true);
  });
  it("devuelve un array", () => {
    expect(Array.isArray(functions.booksCheeperThan(books, 20))).toBe(true);
  });
  it("NO incluye libros más caros que el precio dado", () => {
    const result = functions.booksCheeperThan(books, 20);
    expect(result.every((b) => b.price <= 20)).toBe(true);
    expect(result.some((b) => b.price > 20)).toBe(false);
  });
  it("devuelve array vacío si el precio es negativo", () => {
    const result = functions.booksCheeperThan(books, -1);
    expect(result.length).toBe(0);
  });
});

describe("function booksWithStatus", () => {
  it("devuelve libros en estado good", () => {
    const result = functions.booksWithStatus(books, "good");
    expect(result.every((b) => b.status === "good")).toBe(true);
  });
  it("NO incluye libros de otros estados", () => {
    const result = functions.booksWithStatus(books, "good");
    expect(result.some((b) => b.status === "bad")).toBe(false);
    expect(result.some((b) => b.status === "new")).toBe(false);
  });
  it("devuelve array vacío si no hay libros con ese estado", () => {
    const result = functions.booksWithStatus(books, "inexistente");
    expect(result.length).toBe(0);
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
  it("tiene exactamente 2 decimales", () => {
    const result = functions.averagePriceOfBooks(books);
    expect(result).toMatch(/^\d+\.\d{2}€$/);
  });
  it("calcula correctamente la media de un array conocido", () => {
    const testBooks = [{ price: 10 }, { price: 20 }];
    expect(functions.averagePriceOfBooks(testBooks)).toBe("15.00€");
  });
});

describe("function booksOfTypeNotes", () => {
  it("devuelve solo libros con publisher Apunts", () => {
    const result = functions.booksOfTypeNotes(books);
    expect(result.every((b) => b.publisher === "Apunts")).toBe(true);
  });
  it("NO incluye libros de editoriales", () => {
    const result = functions.booksOfTypeNotes(books);
    expect(result.some((b) => b.publisher === "McGraw-Hill")).toBe(false);
  });
  it("devuelve un array", () => {
    expect(Array.isArray(functions.booksOfTypeNotes(books))).toBe(true);
  });
  it("devuelve array vacío si no hay apuntes", () => {
    expect(functions.booksOfTypeNotes([])).toEqual([]);
  });
});

describe("function bookExists", () => {
  it("devuelve true si el usuario tiene libro de ese módulo", () => {
    expect(functions.bookExists(books, 2, "5025")).toBe(true);
  });
  it("devuelve false si no existe", () => {
    expect(functions.bookExists(books, 99, "0000")).toBe(false);
  });
  it("devuelve false si el usuario existe pero no tiene ese módulo", () => {
    expect(functions.bookExists(books, 2, "0000")).toBe(false);
  });
  it("devuelve false si el módulo existe pero no para ese usuario", () => {
    expect(functions.bookExists(books, 99, "5025")).toBe(false);
  });
  it("devuelve un booleano", () => {
    expect(typeof functions.bookExists(books, 2, "5025")).toBe("boolean");
  });
});

describe("function booksNotSold", () => {
  it("devuelve solo libros sin soldDate", () => {
    const result = functions.booksNotSold(books);
    expect(result.every((b) => !b.soldDate)).toBe(true);
  });
  it("devuelve un array", () => {
    expect(Array.isArray(functions.booksNotSold(books))).toBe(true);
  });
  it("NO incluye libros vendidos", () => {
    const result = functions.booksNotSold(books);
    expect(result.some((b) => b.soldDate === "2023-02-01")).toBe(false);
  });
  it("encuentra al menos un libro no vendido", () => {
    const result = functions.booksNotSold(books);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("function incrementPriceOfBooks", () => {
  it("NO modifica el array original", () => {
    const originalPrice = books[0].price;
    functions.incrementPriceOfBooks(books, 0.1);
    expect(books[0].price).toBe(originalPrice);
  });
  it("NO modifica ningún precio del array original", () => {
    const originalPrices = books.map((b) => b.price);
    functions.incrementPriceOfBooks(books, 0.1);
    const currentPrices = books.map((b) => b.price);
    expect(currentPrices).toEqual(originalPrices);
  });
  it("devuelve un nuevo array con precios incrementados", () => {
    const result = functions.incrementPriceOfBooks(books, 0.1);
    expect(result).not.toBe(books);
    expect(result[0].price).toBeCloseTo(books[0].price * 1.1, 2);
  });
  it("mantiene la misma longitud que el array original", () => {
    const result = functions.incrementPriceOfBooks(books, 0.1);
    expect(result.length).toBe(books.length);
  });
  it("devuelve números con 2 decimales máximo", () => {
    const result = functions.incrementPriceOfBooks(books, 0.1);
    result.forEach((b) => {
      expect(Number.isFinite(b.price)).toBe(true);
      expect(b.price.toString().split(".")[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });
  it("conserva el resto de propiedades del libro", () => {
    const result = functions.incrementPriceOfBooks(books, 0.1);
    expect(result[0].id).toBe(books[0].id);
    expect(result[0].userId).toBe(books[0].userId);
    expect(result[0].moduleCode).toBe(books[0].moduleCode);
  });
  it("con porcentaje 0 devuelve los mismos precios", () => {
    const result = functions.incrementPriceOfBooks(books, 0);
    result.forEach((b, i) => {
      expect(b.price).toBe(books[i].price);
    });
  });
});