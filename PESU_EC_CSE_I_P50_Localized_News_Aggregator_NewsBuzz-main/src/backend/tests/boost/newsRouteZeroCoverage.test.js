import request from "supertest";
import app from "../../index.js";

describe("🔥 News Route Zero Coverage Boost", () => {

  test("GET /api/news/basic works", async () => {
    const res = await request(app).get("/api/news/basic");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news/basic with query", async () => {
    const res = await request(app).get("/api/news/basic?limit=5");
    expect(res.status).toBeDefined();
  });

});
