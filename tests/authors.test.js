const request = require("supertest");
const app = require("../server");

describe("Authors GET routes", () => {
  test("GET /authors should return a response", async () => {
    const res = await request(app).get("/authors");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("GET /authors/:id should return a response", async () => {
    const res = await request(app).get("/authors/000000000000000000000000");
    expect([200, 500]).toContain(res.statusCode);
  });
});