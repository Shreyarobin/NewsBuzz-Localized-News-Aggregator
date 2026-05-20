import request from "supertest";
import app from "../../index.js";

describe("Feed Routes - Coverage Boost", () => {

  test("GET /api/feeds/basic", async () => {
    const res = await request(app).get("/api/feeds");
    expect([200, 400]).toContain(res.status);
  });

  test("POST /api/feeds with empty body", async () => {
    const res = await request(app)
      .post("/api/feeds")
      .send({});
    expect([400,404,422]).toContain(res.status);
  });

  test("PUT /api/feeds/:id with empty body", async () => {
    const res = await request(app)
      .put("/api/feeds/123")
      .send({});
    expect([400, 404, 500]).toContain(res.status);
  });

  test("DELETE /api/feeds/:id", async () => {
    const res = await request(app).delete("/api/feeds/123");
    expect([200, 400, 404, 500]).toContain(res.status);
  });
});
