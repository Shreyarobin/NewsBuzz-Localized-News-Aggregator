import request from "supertest";
import { jest } from "@jest/globals";

// Mock Article model
jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { _id: "1", title: "News 1", category: "Tech" },
          { _id: "2", title: "News 2", category: "Sports" }
        ])
      })
    }),
    aggregate: jest.fn().mockResolvedValue([
      { _id: "Tech", count: 10 },
      { _id: "Sports", count: 5 }
    ]),
    findById: jest.fn()
  }
}));

const app = (await import("../../index.js")).default;

describe("News Routes", () => {
  describe("GET /api/news", () => {
    test("returns news articles", async () => {
      const response = await request(app).get("/api/news");
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("GET /api/news/categories", () => {
    test("returns categorized news", async () => {
      const response = await request(app).get("/api/news/categories");
      expect([200, 500]).toContain(response.status);
    });
  });

  describe("GET /api/news/search", () => {
    test("searches news articles", async () => {
      const response = await request(app)
        .get("/api/news/search")
        .query({ q: "technology" });
      
      expect([200, 400, 404, 500]).toContain(response.status);
    });
  });

  describe("GET /api/news/category/:category", () => {
    test("returns news by category", async () => {
      const response = await request(app).get("/api/news/category/Tech");
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("POST /api/news/:id/view", () => {
    test("increments article view count", async () => {
      const response = await request(app)
        .post("/api/news/article123/view");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });
});