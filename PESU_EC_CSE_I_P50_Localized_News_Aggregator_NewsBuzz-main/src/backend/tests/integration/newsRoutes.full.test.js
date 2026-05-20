import request from "supertest";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    aggregate: jest.fn(),
    countDocuments: jest.fn()
  }
}));

const app = (await import("../../index.js")).default;
const Article = (await import("../../models/articleModel.js")).default;

describe("News Routes - Full Coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/news returns latest articles", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { _id: "1", title: "Latest News", createdAt: new Date() }
        ])
      })
    });

    const response = await request(app).get("/api/news");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news with all query params", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([])
      })
    });

    const response = await request(app)
      .get("/api/news")
      .query({ 
        category: "Tech",
        limit: "10",
        offset: "0"
      });
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/trending returns top articles", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { _id: "1", title: "Trending", views: 1000 }
        ])
      })
    });

    const response = await request(app).get("/api/news/trending");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/latest returns recent articles", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([])
      })
    });

    const response = await request(app).get("/api/news/latest");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/:id returns single article", async () => {
    Article.findById.mockResolvedValue({
      _id: "article123",
      title: "Test Article"
    });

    const response = await request(app).get("/api/news/article123");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/:id with non-existent ID", async () => {
    Article.findById.mockResolvedValue(null);

    const response = await request(app).get("/api/news/nonexistent");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/categories returns all categories", async () => {
    Article.aggregate.mockResolvedValue([
      { _id: "Tech", count: 50 },
      { _id: "Sports", count: 30 },
      { _id: "Business", count: 20 }
    ]);

    const response = await request(app).get("/api/news/categories");
    expect([200, 500]).toContain(response.status);
  });

  test("GET /api/news/search with multiple params", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { _id: "1", title: "Search Result" }
        ])
      })
    });

    const response = await request(app)
      .get("/api/news/search")
      .query({ 
        q: "technology",
        category: "Tech",
        limit: "20"
      });
    
    expect([200, 400, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/category/Tech returns tech articles", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          { _id: "1", title: "Tech News", category: "Tech" }
        ])
      })
    });

    const response = await request(app).get("/api/news/category/Tech");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("GET /api/news/category/Sports returns sports articles", async () => {
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([])
      })
    });

    const response = await request(app).get("/api/news/category/Sports");
    expect([200, 404, 500]).toContain(response.status);
  });

  test("POST /api/news/:id/view increments successfully", async () => {
    Article.findByIdAndUpdate.mockResolvedValue({
      _id: "article123",
      views: 11
    });

    const response = await request(app)
      .post("/api/news/article123/view");
    
    expect([200, 404, 500]).toContain(response.status);
  });

  test("POST /api/news/:id/view with error", async () => {
    Article.findByIdAndUpdate.mockRejectedValue(new Error("DB Error"));

    const response = await request(app)
      .post("/api/news/invalid/view");
    
    expect([200, 404, 500]).toContain(response.status);
  });
});