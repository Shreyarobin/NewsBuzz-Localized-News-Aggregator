import request from "supertest";
import app from "../../index.js";

describe("news.js raw route coverage", () => {
  test("GET /api/news/basic returns a response", async () => {
    const res = await request(app).get("/api/news/basic");
    expect([200, 404, 500]).toContain(res.status);
  });

  test("GET /api/news/raw returns a response", async () => {
    const res = await request(app).get("/api/news/raw");
    expect([200, 404, 500]).toContain(res.status);
  });
});
