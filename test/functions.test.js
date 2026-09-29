import { describe, it, expect } from "vitest";
import * as functions from "../src/functions";
import data from "../src/services/datos";

const { books, users, modules } = data;

describe("Pruebas de funciones de consulta y arrays en BatoiBooks", () => {
  it("booksFromUser filtra correctamente los libros de un usuario", () => {
    const resultado = functions.booksFromUser(books, 4);
    expect(resultado.length).toBe(3);
    expect(resultado.every(b => b.userId === 4)).toBe(true);
  });

  it("booksCheeperThan filtra los libros por debajo de un precio", () => {
    const resultado = functions.booksCheeperThan(books, 20);
    expect(resultado.every(b => b.price <= 20)).toBe(true);
  });

  it("bookExists comprueba si existe un libro de un usuario para un módulo", () => {
    const existe = functions.bookExists(books, 2, "5025");
    expect(existe).toBe(true);
    const noExiste = functions.bookExists(books, 99, "0000");
    expect(noExiste).toBe(false);
  });

  it("averagePriceOfBooks calcula la media correctamente", () => {
    const media = functions.averagePriceOfBooks(books);
    expect(typeof media).toBe("string");
    expect(media).toContain("€");
  });
});
