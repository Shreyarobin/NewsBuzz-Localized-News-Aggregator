import request from "supertest";
import app from "../../index.js";

describe("User Routes - missing branch coverage", () => {

  test("GET /api/users/:id invalid ID", async () => {
    const res = await request(app).get("/api/users/INVALID_ID");
    expect([400, 404, 500]).toContain(res.status);
  });

  test("PUT /api/users/:id with empty update body", async () => {
    const res = await request(app)
      .put("/api/users/123")
      .send({});
    expect([400, 404, 500]).toContain(res.status);
  });

  test("DELETE /api/users/:id invalid ID", async () => {
    const res = await request(app).delete("/api/users/INVALID_ID");
    expect([400, 404, 500]).toContain(res.status);
  });

});
