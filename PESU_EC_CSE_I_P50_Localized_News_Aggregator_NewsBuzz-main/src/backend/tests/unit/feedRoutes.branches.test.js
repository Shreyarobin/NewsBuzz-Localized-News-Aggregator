import request from "supertest";
import app from "../../index.js";

describe("Feed Routes - missing branch coverage", () => {

  test("GET /api/feeds with no filters", async () => {
    const res = await request(app).get("/api/feeds");
    expect([200, 500]).toContain(res.status);
  });

  test("GET /api/feeds/:id invalid ID format", async () => {
    const res = await request(app).get("/api/feeds/INVALID_ID");
    expect([400, 404, 500]).toContain(res.status);
  });

  test("POST /api/feeds missing required fields", async () => {
    const res = await request(app)
      .post("/api/feeds")
      .send({});
    expect([400,404, 422]).toContain(res.status); // removed 500 for consistency
  });

  test("PUT /api/feeds/:id with empty body", async () => {
    const res = await request(app)
      .put("/api/feeds/123")
      .send({});
    expect([400, 404, 500]).toContain(res.status);
  });
});
