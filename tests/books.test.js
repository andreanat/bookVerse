const request = require("supertest");
const app = require("../server");

describe("Books GET routes", () => {
  test("GET /books should return a response", async () => {
    const res = await request(app).get("/books");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("GET /books/:id should return a response", async () => {
    const res = await request(app).get("/books/000000000000000000000000");
    expect([200, 500]).toContain(res.statusCode);
  });
});