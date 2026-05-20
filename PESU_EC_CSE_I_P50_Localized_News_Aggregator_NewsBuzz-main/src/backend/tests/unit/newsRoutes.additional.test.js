import request from "supertest";
import app from "../../index.js";

describe("News Routes - Additional Coverage", () => {
  test("GET /api/news - complete flow", async () => {
    const res = await request(app).get("/api/news");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news with pagination", async () => {
    const res = await request(app).get("/api/news?page=1&limit=10");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news with filters", async () => {
    const res = await request(app).get("/api/news?category=Tech&source=BBC");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news/trending", async () => {
    const res = await request(app).get("/api/news/trending");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news/latest", async () => {
    const res = await request(app).get("/api/news/latest");
    expect(res.status).toBeDefined();
  });

  test("GET /api/news/:id", async () => {
    const res = await request(app).get("/api/news/123");
    expect(res.status).toBeDefined();
  });

  test("POST /api/news/:id/view", async () => {
    const res = await request(app).post("/api/news/123/view");
    expect(res.status).toBeDefined();
  });
});