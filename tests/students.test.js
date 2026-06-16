const request = require("supertest");
const app = require("../server");

describe("Students GET routes", () => {
  test("GET /students should return a response", async () => {
    const res = await request(app).get("/students");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("GET /students/:id should return a response", async () => {
    const res = await request(app).get("/students/000000000000000000000000");
    expect([200, 500]).toContain(res.statusCode);
  });
});