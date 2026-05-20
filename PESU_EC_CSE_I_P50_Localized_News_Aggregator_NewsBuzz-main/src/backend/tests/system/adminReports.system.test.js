import request from "supertest";
import app from "../../index.js";

describe("Admin Reports System Test", () => {
  test("GET /api/admin/reports returns a valid response", async () => {
    const res = await request(app).get("/api/admin/reports");
    expect([200, 204]).toContain(res.status);
  });
});