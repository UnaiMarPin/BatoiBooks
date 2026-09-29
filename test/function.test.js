import { describe, it, expect } from "vitest";
import * as functions from "../src/functions";
import data from "../src/services/datos";

const books = data.books;
const users = data.users;

describe("function getBookById", () => {
  it("getBookById 1 devuelve el libro con id 1", () => {
    const response = functions.getBookById(books, 1);
    expect(response.id).toBe(1);
  });

  it("getBookById 22 devuelve un error", () => {
    expect(() => functions.getBookById(books, 22)).toThrow();
  });
});

describe("function getBookIndexById", () => {
  it("getBookIndexById 1 devuelve la posición del libro con id 1", () => {
    const response = functions.getBookIndexById(books, 1);
    expect(response).toBe(0);
  });

  it("getBookIndexById 22 devuelve un error", () => {
    expect(() => functions.getBookIndexById(books, 22)).toThrow();
  });
});

describe("function getUserById", () => {
  it("getUserById 4 devuelve el usuario con id 4", () => {
    const response = functions.getUserById(users, 4);
    expect(response.id).toBe(4);
  });

  it("getUserById 99 devuelve un error", () => {
    expect(() => functions.getUserById(users, 99)).toThrow();
  });
});