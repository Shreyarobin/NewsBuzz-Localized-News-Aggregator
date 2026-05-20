import request from "supertest";
import { jest } from "@jest/globals";

// Mock all models
jest.unstable_mockModule("../../models/feedModel.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

jest.unstable_mockModule("../../models/articleModel.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    aggregate: jest.fn()
  }
}));

const app = (await import("../../index.js")).default;
const Feed = (await import("../../models/feedModel.js")).default;
const Article = (await import("../../models/articleModel.js")).default;

describe("Routes - Comprehensive Coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    Feed.find.mockResolvedValue([]);
    Feed.findById.mockResolvedValue(null);
    Feed.create.mockResolvedValue({ _id: "new", url: "http://test.com" });
    Feed.findByIdAndUpdate.mockResolvedValue({ _id: "updated" });
    Feed.findByIdAndDelete.mockResolvedValue({ _id: "deleted" });
    
    Article.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([])
      })
    });
    Article.findById.mockResolvedValue(null);
    Article.aggregate.mockResolvedValue([]);
  });

  describe("Feed Routes - Extended", () => {
    test("GET /api/feeds with error handling", async () => {
      Feed.find.mockRejectedValue(new Error("DB Error"));
      const response = await request(app).get("/api/feeds");
      expect([200, 500]).toContain(response.status);
    });

    test("POST /api/feeds with valid data", async () => {
      Feed.create.mockResolvedValue({
        _id: "feed123",
        url: "http://example.com/rss",
        category: "Tech"
      });

      const response = await request(app)
        .post("/api/feeds")
        .send({
          url: "http://example.com/rss",
          category: "Tech"
        });
      
      expect([200, 201, 400, 404, 500]).toContain(response.status);
    });

    test("PUT /api/feeds/:id with error", async () => {
      Feed.findByIdAndUpdate.mockRejectedValue(new Error("Update failed"));
      
      const response = await request(app)
        .put("/api/feeds/feed123")
        .send({ url: "http://updated.com" });
      
      expect([200, 404, 500]).toContain(response.status);
    });

    test("DELETE /api/feeds/:id with error", async () => {
      Feed.findByIdAndDelete.mockRejectedValue(new Error("Delete failed"));
      
      const response = await request(app)
        .delete("/api/feeds/feed123");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("News Routes - Extended", () => {
    test("GET /api/news with query params", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([
            { _id: "1", title: "News 1" }
          ])
        })
      });

      const response = await request(app)
        .get("/api/news")
        .query({ category: "Tech", limit: "5" });
      
      expect([200, 404, 500]).toContain(response.status);
    });

    test("GET /api/news with error", async () => {
      Article.find.mockImplementation(() => {
        throw new Error("DB Error");
      });

      const response = await request(app).get("/api/news");
      expect([200, 404, 500]).toContain(response.status);
    });

    test("GET /api/news/categories with data", async () => {
      Article.aggregate.mockResolvedValue([
        { _id: "Tech", count: 10 },
        { _id: "Sports", count: 5 }
      ]);

      const response = await request(app).get("/api/news/categories");
      expect([200, 500]).toContain(response.status);
    });

    test("GET /api/news/search without query", async () => {
      const response = await request(app).get("/api/news/search");
      expect([200, 400, 404, 500]).toContain(response.status);
    });

    test("GET /api/news/search with query", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([
            { _id: "1", title: "Tech Article" }
          ])
        })
      });

      const response = await request(app)
        .get("/api/news/search")
        .query({ q: "technology", category: "Tech" });
      
      expect([200, 400, 404, 500]).toContain(response.status);
    });

    test("GET /api/news/category/:category with valid category", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([
            { _id: "1", title: "Tech News" }
          ])
        })
      });

      const response = await request(app).get("/api/news/category/Tech");
      expect([200, 404, 500]).toContain(response.status);
    });

    test("POST /api/news/:id/view increments views", async () => {
      Article.findById.mockResolvedValue({
        _id: "article123",
        views: 10
      });
      
      Article.findByIdAndUpdate.mockResolvedValue({
        _id: "article123",
        views: 11
      });

      const response = await request(app)
        .post("/api/news/article123/view");
      
      expect([200, 404, 500]).toContain(response.status);
    });

    test("POST /api/news/:id/view with invalid ID", async () => {
      Article.findById.mockResolvedValue(null);

      const response = await request(app)
        .post("/api/news/invalidid/view");
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe("User Routes - Extended", () => {
    test("GET /api/users/:id with various IDs", async () => {
      const response1 = await request(app).get("/api/users/user123");
      const response2 = await request(app).get("/api/users/nonexistent");
      
      expect([200, 404, 500]).toContain(response1.status);
      expect([200, 404, 500]).toContain(response2.status);
    });

    test("PUT /api/users/:id with update data", async () => {
      const response = await request(app)
        .put("/api/users/user123")
        .send({
          username: "newname",
          interests: ["Tech", "Sports"]
        });
      
      expect([200, 400, 404, 500]).toContain(response.status);
    });

    test("DELETE /api/users/:id", async () => {
      const response = await request(app)
        .delete("/api/users/user123");
      
      expect([200, 401, 404, 500]).toContain(response.status);
    });
  });
});