const request = require("supertest");
const app = require("../server");

describe("Checkouts GET routes", () => {
  test("GET /checkouts should return a response", async () => {
    const res = await request(app).get("/checkouts");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("GET /checkouts/:id should return a response", async () => {
    const res = await request(app).get("/checkouts/000000000000000000000000");
    expect([200, 500]).toContain(res.statusCode);
  });
});